import Vue from "vue";
import VueRouter from "vue-router";

const PumpTransactions = () => import('../views/Branch/pump__transactions')

Vue.use(VueRouter);

let routes = [
    {
        path: "/",
        name: "PumpTransactions",
        component: PumpTransactions,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

  

  export default router

