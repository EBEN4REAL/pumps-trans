import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { GridPlugin } from "@syncfusion/ej2-vue-grids";
import moment from "moment-timezone";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)



moment.tz.setDefault("Africa/Lagos");

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.use(GridPlugin);


Vue.prototype.$moment = moment;


Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);


Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    components: { App }
}).$mount("#app");