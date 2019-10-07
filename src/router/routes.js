let beforeEnter = (to, from, next) => {
    if(to.meta.tokenRequired === true){
        if(localStorage.getItem('jwt')!= null){
            next()
        }else{
            next({ path: '/sigin'})
        }
    }else{
        next()
    }
}

var devRoutes = []
let router = require('./router.js')
devRoutes = devRoutes.concat(router.default.routes)
for (let x = 0; x < devRoutes.length; x++) {
    devRoutes[x]['beforeEnter'] = beforeEnter
}
let routes = [
    {
    path: '/',
    redirect: "home/main",
    component: resolve => require(['@/components/admin/menu/Home.vue'], resolve),
        beforeEnter: beforeEnter
    }
]

routes = routes.concat(devRoutes)
export default{
    routes: routes
}