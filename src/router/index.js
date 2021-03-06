import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/resource',
    component: Layout,
    meta: {
      title: '制造资源模块',
      icon: 'table'
    },
    children: [
      {
        path: 'type',
        name: 'ResourceType',
        component: () => import('@/views/resource-type/index'),
        meta: { title: '资源类型模块', icon: 'list' }
      },
      {
        path: '',
        name: 'Resource',
        component: () => import('@/views/resource/index'),
        meta: { title: '资源实例模块', icon: 'list' }
      }
    ]
  },

  {
    path: '/task',
    component: Layout,
    name: 'Task',
    meta: {
      title: '制造任务模块',
      icon: 'table'
    },
    children: [
      {
        path: 'to-be-accepted',
        name: 'ToBeAccepted',
        component: () => import('@/views/task/to-be-accepted'),
        meta: { title: '待接受的任务', icon: 'list' }
      },
      {
        path: 'processing',
        name: 'Processing',
        component: () => import('@/views/task/processing'),
        meta: { title: '正在加工的任务', icon: 'list' }
      },
      {
        path: 'completed',
        name: 'Completed',
        component: () => import('@/views/task/completed'),
        meta: { title: '已完成的任务', icon: 'list' }
      }
    ]
  },

  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Monitor',
        component: () => import('@/views/monitor/index'),
        meta: { title: '监管模块', icon: 'monitor' }
      },
      {
        path: '/monitor/:uuid',
        hidden: true,
        name: 'Detail',
        component: () => import('@/views/monitor/detail'),
        meta: { title: '监管模块', icon: 'monitor' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
