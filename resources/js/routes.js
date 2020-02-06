import AppLayout from './pages/admin/layouts/App';
import Login from './pages/admin/auth/Login';

export default {
  mode: 'history',

  routes: [
    {
      path: '*',
      redirect: { name: 'admin' },
    },
    {
      path: '/login',
      component: Login
    },
    {
      name: 'admin',
      path: '/admin',
      component: AppLayout,
      children: []
    }
  ]
}
