<template>
  <div id="wrapper">
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-row>
            <v-col>
              <v-text-field
                  autocomplete="password"
                  type="password"
                  @keydown.enter="linkAddress"
                  v-model="address"
                  density="compact"
                  :rules="rules"
                  label="Adresse IP de l'alarme"
                  :disabled="linking"
                  clearable
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn type="submit" :loading="linking" color="#82C270" text="Lier" @click="linkAddress"></v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    linking: false,
    rules: [
      v => !!v || 'Vous devez spécifier une adresse !',
      v => /([\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}):([\d]{1,5})/.test(v) || "L'adresse spécifiée n'est pas valide !",
    ],
    address: "",
  }),

  methods: {
    linkAddress() {
      if (/([\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}):([\d]{1,5})/.test(this.address)) {
        this.linking = true
        this.$emit("link-address", this.address)
      }
    },
  }
}
</script>

<style scoped>
#wrapper {
  height: 100vh;
}
</style>