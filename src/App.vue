<template>
  <SetAddress v-if="! this.initialRequestDone" @link-address="linkAddress"></SetAddress>
  <div v-else>
    <div id="headerWrapper" :class="{ 'portrait': isPortrait }">
      <Logo :class="{ 'small': isPortrait }"/>
      <AddAlarm :address="this.address" @add-alarm="addAlarm"/>
    </div>

    <AlarmContainer :alarms='alarms' @deleteAlarm="deleteAlarm"/>
  </div>
</template>

<script>
import Logo from "./components/Logo.vue"
import AlarmContainer from "./components/AlarmContainer.vue";
import AddAlarm from "./components/AddAlarm.vue";
import WeekPicker from "./components/WeekPicker.vue";
import SetAddress from "./components/SetAddress.vue";

export default {
  components: { Logo,  AlarmContainer, AddAlarm, WeekPicker, SetAddress},

  data() {
    return {
      alarms: [],
      isPortrait: false,
      address: "",
      initialRequestDone: false
    }
  },

  methods: {
    linkAddress(address){
      this.address = address
      this.getAlarms(this.address)
    },

    addAlarm(data){
      this.alarms.push(data)
    },

    deleteAlarm(data){
      const alarmData = {
        time: data.time,
        days: data.days.join(','), // Convert array to comma-separated string
        repeatable: data.repeatable ? 'true' : 'false'
      };

      // Send POST request to ESP32
      fetch(`http://${this.address}/removeAlarm`,
          {
            body: new URLSearchParams(alarmData),
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });


      //Update alarms locally
      this.alarms = this.alarms.filter((alarm) => {
        return !(alarm.time === data.time && alarm.days === data.days && alarm.repeatable === data.repeatable)
      })
    },

    parseAlarms(data) {
      if (!data || !data.alarms) {
        console.error('Invalid data format');
        return [];
      }

      return data.alarms.map(alarmData => ({
        time: `${this.padZero(alarmData.hour)}:${this.padZero(alarmData.minute)}`,
        days: alarmData.days,
        repeatable: alarmData.isRepeatable
      }));
    },

    padZero(num) {
      return num.toString().padStart(2, '0');
    },

    getAlarms() {
      let timeout = 3000;

      const fetchAlarms = () => {
        fetch(`http://${this.address}/getAlarms`, {
          signal: AbortSignal.timeout(timeout),
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })
            .then(response => {
              if (response.ok) {
                this.initialRequestDone = true;
                return response.json();
              } else {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            })
            .then(data => {
              this.alarms = this.parseAlarms(data);
            })
            .catch(err => {
              setTimeout(fetchAlarms, timeout);
              console.error("There was an error! ", err);
            });
      };

      fetchAlarms(); // Initial call
    },

    checkOrientation() {
      this.isPortrait = window.innerWidth < window.innerHeight;
    }
  },

  mounted() {
    this.checkOrientation();
    window.addEventListener('resize', this.checkOrientation);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkOrientation);
  }
}
</script>

<style>
#app{
  text-align: center;
}

#headerWrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}

#headerWrapper.portrait {
  justify-content: space-between;
  padding: 0 1rem;
}
</style>