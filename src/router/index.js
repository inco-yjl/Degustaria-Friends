import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/register.vue'),
  },
  {
    path: '/',
    name: 'baseHeader',
    component: () => import(/* webpackChunkName: "about" */ '../views/Header/BaseHeader.vue'),
    children: [
      {
        path: '/search',
        name: 'searchHeader',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Header/SearchHeader.vue'),
        children: [
          {
            path: '/fakehome',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
            children: [
              {
                path: '/home',
                name: 'home_focus',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Home_son/HomeSon1.vue')
              },
              {
                path: '/home/recommend',
                name: 'home_recommend',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Home_son/HomeSon2.vue')
              },
              {
                path: '/home/collection',
                name: 'home_collection',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Home_son/HomeSon3.vue')
              },

            ]
          },
          {
            path: '/searchResult',
            name: '/searchResult',
            component:()=>import("../views/SearchResult/SearchResultPage")
          },
          {
            path: '/scholarShow/:scholar_id',
            name: 'ScholarShow',
            component: () => import('../views/Scholar/ScholarShow.vue')
          },
        ]
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "about" */ '../views/Statistics/Statistics.vue'),
        children: [
          {
            path: '/statistics/illustration',
            name: 'statisticsIllustration',
            component: () => import(/* webpackChunkName: "about" */ '../views/Statistics/Illustration.vue')
          },
          {
            path: '/statistics/rank',
            name: 'statisticsRank',
            component: () => import(/* webpackChunkName: "about" */ '../views/Statistics/Rank.vue')
          }
        ]
      },{
        path:'/scholar',
        name:'scholar',
        component: () => import(/* webpackChunkName: "about" */ '../views/Scholar/Claim.vue'),
        children: [
        
        ]
      },
      {
        path: '/paperDetail',
        name: 'paperDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/PaperDetail.vue'),
      },
      {
        path: '/institution/institutionHomepage',
        name: 'institutionHomepage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Institution/InstitutionHomepage.vue'),
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
