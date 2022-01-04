import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
    return () => import(`@/components/${view}.vue`)
}

const routes = [
    {
        path: '*',
        component: loadView('DonationForm'),
        props: route => ({ donation_form_id: route.query.donation_form_id, setting: route.query.setting })
    }
]

var router = new Router({
    routes,
    scrollBehavior(to) {
        if (to.hash) {
          return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },
})
export default router
