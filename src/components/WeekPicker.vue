<template>
  <div id="weekpickerWraper">
    <v-row dense>
      <v-col
          v-for="day in days"
          :key="day.day"
          cols="12"
          sm="6"
          class="py-0"
      >
        <v-sheet class="ma-1">
          <v-checkbox
              v-model="day.selected"
              :label="day.day"
              density="compact"
              hide-details
          ></v-checkbox>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [
        { selected: true, day: 'Lundi' },
        { selected: true, day: 'Mardi' },
        { selected: true, day: 'Mercredi' },
        { selected: true, day: 'Jeudi' },
        { selected: true, day: 'Vendredi' },
        { selected: true, day: 'Samedi' },
        { selected: true, day: 'Dimanche' },
      ],
    };
  },

  methods: {
    resetDays(){
      for (let i = 0; i < this.days.length; i++) {
        this.days[i].selected = true
      }
    }
  },

  components: {},

  computed: {},
}
</script>

<style scoped>
  #weekpickerWraper{
    margin: 2vh auto 5vh;
  }
</style>