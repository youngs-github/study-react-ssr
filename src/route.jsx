import AboutPage from './page/about';
import HomePage from './page/home';
import UserPage from './page/user';
import NotFound from './page/404';

export default [
  {
    key: '/',
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    key: '/about',
    path: '/about',
    exact: true,
    component: AboutPage
  },
  {
    key: '/user',
    path: '/user',
    exact: true,
    component: UserPage
  },
  {
    key: '/not-found',
    component: NotFound
  }
];
