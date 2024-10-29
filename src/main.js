import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import '@mdi/font/css/materialdesignicons.css'



const vuetify = createVuetify({
    components: {
        VTimePicker,
    },
    directives,
    theme: {
        defaultTheme: 'dark'
    },
})

createApp(App).use(vuetify).mount('#app')
