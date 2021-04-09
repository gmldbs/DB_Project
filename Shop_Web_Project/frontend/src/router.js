import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/admin/dashboard/Index'),
      children: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          component: () => import('@/views/admin/dashboard/Dashboard'),
        },
        {
          name: 'User List',
          path: '/admin/userlist',
          component: () => import('@/views/admin/dashboard/UserList'),
        },
        {
          name: 'ProductList',
          path: '/admin/productList',
          component: () => import('@/views/admin/dashboard/ProductList'),
        },
        {
          name: 'Order List',
          path: '/admin/orderlist',
          component: () => import('@/views/admin/dashboard/Orderlist'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/admin/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/admin/dashboard/component/Icons'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/admin/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/admin/dashboard/Upgrade'),
        },
        {
          name: 'Home',
          path: '/Home',
          component: () => import('@/views/customer/Home'),
        },
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/views/admin/dashboard/Login'),
        },
        {
          name: 'UserInfo',
          path: '/userInfo',
          component: () => import('@/views/customer/UserInfo'),
        },
        {
          name: 'Products',
          path: '/products',
          component: () => import('@/views/customer/Products'),
        },
        {
          name: 'Cart',
          path: '/cart',
          component: () => import('@/views/customer/Cart'),
        },
        {
          name: 'DeliveryInfo',
          path: '/admin/deliveryList',
          component: () => import('@/views/admin/dashboard/DeliveryList'),
        },
        {
          name: 'First',
          path: '/',
          component: () => import('@/views/customer/Home'),
        },
      ],
    },
  ],
})
