import Vue from 'vue';
import Router from 'vue-router';
import tieba from '@/components/tieba';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tieba',
      component: tieba
    }
  ]
});
