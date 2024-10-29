<template>
    <div id="taskElementWrapper">
        <div id="leftContainer">
          <p id="time">{{ time }}</p>
          <p id="repeatableInfo"> {{ repeatableStr }}</p>
        </div>

        <div id="alarmDays">
          <v-icon id="daysInfoIcon" color="black" :icon="iconType()"></v-icon>
          <p id="daysInfo">{{ availableDayString }}</p>
        </div>

        <div id="alarmDelete" @click="deleteAlarm">
          <v-icon id="cross" color="rgba(255, 0, 0, 1.0)" icon="mdi mdi-close"></v-icon>
        </div>
    </div>
</template>

<script>
export default {
    props: ["time", "days", "repeatable"],

    data() {
      return {
        daysLookupTable: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
      };
    },

    methods: {
      deleteAlarm(){
        this.$parent.$emit("deleteAlarm", {time: this.time, days: this.days, repeatable: this.repeatable})
      },

      getDayGroup(){
        let isWeekendsChecked = (this.selectedDays.indexOf('Samedi') >= 0 && this.selectedDays.indexOf('Dimanche') >= 0);

        if(this.selectedDays.length === 7){
          return 0;
        }

        if(this.selectedDays.length === 2 && isWeekendsChecked){
          return 1;
        }

        if(this.selectedDays.length === 5 && !isWeekendsChecked){
          return 2;
        }

        return 3;
      },

      iconType(){
        let dayGroup = this.getDayGroup()

        if(dayGroup === 0){
          return 'mdi mdi-repeat-variant';
        }

        if(dayGroup === 1){
          return 'mdi mdi-island';
        }

        if(dayGroup === 2){
          return 'mdi mdi-briefcase';
        }

        return "mdi mdi-calendar-month"
      }
    },

    computed: {
      repeatableStr() {
        return this.repeatable ? 'Répétable' : 'Une fois'
      },

      selectedDays(){
        let selectedDays = []

        for (let i = 0; i < this.days.length; i++) {
          if(this.days[i]){
            selectedDays.push(this.daysLookupTable[i])
          }
        }

        return selectedDays;
      },

      availableDayString(){
        let dayGroup = this.getDayGroup();

        if(dayGroup === 0){
          return 'Tous les jours';
        }

        if(dayGroup === 1){
          return 'Le weekend';
        }

        if(dayGroup === 2){
          return 'Du Lundi au Vendredi';
        }

        return this.selectedDays.join(', ');
      },
    },
}
</script>

<style scoped lang="scss">
    #cross{
      font-size: 8vmin;
      margin: auto;
    }

    #daysInfoIcon{
      font-size: 8vmin;
      margin-left: 1vw;
    }

    #leftContainer p{
      font-family: "Product Sans",serif;
    }

    #time{
      font-size: 4.8vmin;
    }

    #repeatableInfo{
      font-size: 2.8vmin;
    }

    #daysInfo{
      font-size: 3.8vmin;
    }

    p {
      font-family: "Product Sans",serif;
      color: black;
      word-wrap: break-word;
      margin: auto;
    }

    #taskElementWrapper div{
        padding: 0 10px;
        min-width: 0;
        min-width: 0;
        display: flex;
        align-items: center;
        border: 1px solid black;
    }

    #leftContainer{
      background-color: #ABC270;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 20vmin;
    }

    #alarmDays{
        flex: 1;
        background-color: #C27470;
    }

    #alarmDelete{
      padding-right: 0;
      padding-left: 0;
      background-color: #C2B070;
      aspect-ratio: 1/1;
    }

    #alarmDelete:hover{
      cursor: pointer;
    }

    #taskElementWrapper{
        background-color: #e8ad95;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        display: flex;
        margin-bottom: 5px;
        box-sizing: border-box;
    }
</style>