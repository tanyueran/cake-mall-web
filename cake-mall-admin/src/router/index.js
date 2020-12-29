/**
 * @author tanxin
 * @date $
 * @Description: 路由配置信息
 */
import MLoading from '../component/MLazyLoad';

const LoginPageUrl = () => import('../pages/login/index');

const notFoundPageUrl = () => import('../pages/notFound/index');

const routers = [
  {
    path: '/login',
    exact: true,
    component: MLoading(LoginPageUrl),
  },
  {
    component: MLoading(() => import('../layout/index')),
    children: [
      // 首页
      {
        path: '/home/index',
        exact: true,
        component: MLoading(() => import('../pages/home/index/index')),
      },
      {
        path: '/home/cakeManager',
        exact: true,
        component: MLoading(() => import('../pages/home/cakeManager/index')),
      },
      {
        path: '/home/orderManager',
        exact: true,
        component: MLoading(() => import('../pages/home/orderManager/index')),
      },
      {
        path: '/home/personInfo',
        exact: true,
        component: MLoading(() => import('../pages/home/personInfo/index')),
      },
      {
        path: '/home/roleManager',
        exact: true,
        component: MLoading(() => import('../pages/home/roleManager/index')),
      },
      {
        path: '/home/userManager',
        exact: true,
        component: MLoading(() => import('../pages/home/userManager/index')),
      },
      {
        path: '/home/categoriesManager',
        exact: true,
        component: MLoading(() => import('../pages/home/categoryManager/index')),
      },

      {
        path: '/home/404',
        component: MLoading(notFoundPageUrl),
      },
    ],
  },
  {
    component: MLoading(notFoundPageUrl),
  },
];

export default routers;
