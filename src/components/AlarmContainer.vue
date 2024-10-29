<template>
    <ul class="wrapper">
      <AlarmElement v-for="alarm in alarms" :time="alarm.time" :days="alarm.days" :repeatable="alarm.repeatable"></AlarmElement>
    </ul>
</template>

<script>
import AlarmElement from './AlarmElement.vue';

export default {
    props: ["alarms"],

    components: { AlarmElement },
}
</script>

<style scoped>
    .wrapper {
      width: 90vw;
      height: 80vh;
      margin: auto;
      padding: 8px;
      background-color: #005C78;
      border-radius: 10px;
    }

    ul {
      overflow-y:scroll;
    }
</style>