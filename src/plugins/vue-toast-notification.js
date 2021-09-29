import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
 
Vue.use(VueToast);
Vue.$toast.open('You did it!');
Vue.$toast.open({/* options */});
 
// Close all opened toast immediately
Vue.$toast.clear();