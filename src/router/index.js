import Vue from 'vue'
import Router from 'vue-router'
import routeController from './routes'

Vue.use(Router)
export default new Router({
    routes: routeController.routes
})