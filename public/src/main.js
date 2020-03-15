import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuelidate from 'vuelidate';

import SpacerComponent from './components/Spacer';
import Button from './components/Button';
import Input from './components/Input';

Vue.component('SpacerComponent', SpacerComponent);
Vue.component('Button', Button);
Vue.component('Input', Input);

Vue.use(vuelidate);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
