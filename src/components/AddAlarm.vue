<template>
    <div id="wrapper">
      <v-btn id="addBtn" base-color="#82C270" prepend-icon="mdi mdi-plus" v-model=addAlarmDialog>Ajouter alarme
        <v-dialog v-model="addAlarmDialog" activator="parent" max-width="800">
          <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-clock-time-four-outline" title="Ajouter une Alarme">
              <v-checkbox style="margin: auto" v-model="repeatAlarm" label="Répéter l'alarme ?"></v-checkbox>

              <week-picker ref="weekpicker"></week-picker>

              <v-col cols="auto" sm="auto">
                <v-text-field
                    v-model="time"
                    @click="timePickerDialog = true"
                    label="Veuillez choisir l'heure"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly>
                </v-text-field>
              </v-col>

              <v-card-actions>
                <v-btn class="ml-auto" text="Annuler" @click="isActive.value = false"
                ></v-btn>

                <v-btn color="#82C270" text="Ajouter" @click=addAlarm></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
      <v-dialog v-model="timePickerDialog" activator="parent" width="auto">
        <v-time-picker
            v-if="timePickerDialog"
            v-model="time"
            format="24hr"
        >
          <template v-slot:title>
            <h3>Choissisez l'heure</h3>
          </template>

          <template v-slot:actions>
            <v-btn class="ml-auto" text="Valider" @click="timePickerDialog = false"></v-btn>
          </template>
        </v-time-picker>
      </v-dialog>
    </div>
</template>

<script>
import WeekPicker from "./WeekPicker.vue";

export default {
    props: ['address'],
    data() {
        return {
          repeatAlarm: false,
          time: null,
          timePickerDialog: false,
          addAlarmDialog: false
        };
    },
    
    methods: {
      addAlarm(){
        if (this.time != null){
          let daysData = this.$refs.weekpicker.days
          let daysArray = daysData.map(day => day.selected);

          this.$emit("add-alarm", {time: this.time, days: daysArray, repeatable: this.repeatAlarm})

          const alarmData = {
            time: this.time,
            days: daysArray.join(','), // Convert array to comma-separated string
            repeatable: this.repeatAlarm ? 'true' : 'false'
          };


          // Send POST request to ESP32
          fetch(`http://${this.address}/addAlarm`,
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

          this.time = null
          this.$refs.weekpicker.resetDays()
          this.repeatAlarm = false

          this.timePickerDialog = false
          this.addAlarmDialog = false
        }
      }
    },
    components: {WeekPicker},

}
</script>

<style scoped>
    #addBtn{
      font-size: 1vmax;
    }

    #wrapper {
        position: absolute;
        right: 1vw;
    }
</style>