<template>
  <div id="logoWrapper">
    <div :class="{ 'small': $parent.isPortrait }">
      <h1>RÉVEIL À TUBES NIXIE</h1>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
h1 {
  font-family: "Toon Around", serif;
  font-size: 5vh;
  margin: auto;
  width: auto;
  text-align: center;
  color: hsl(284, 35%, 35%);
  letter-spacing: 0.05em;
}

.small h1 {
  font-size: 3vh;
  text-align: left;
}

#logoWrapper {
  background-color: #8AA1B1;
  padding: 0 1vw;
  border-radius: 10px;
}
</style>