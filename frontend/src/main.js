import Vue from 'vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';

import '@/assets/css/tailwind.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import Embed from 'v-video-embed'

// global register
Vue.use(Embed);

Vue.component('multiselect', Multiselect);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);

Vue.config.silent = true;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
