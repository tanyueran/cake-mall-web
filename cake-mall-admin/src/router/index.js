/**
 * @author tanxin
 * @date $
 * @Description: 路由配置信息
 */
import MLoading from "../component/MLazyLoad";

const LoginPageUrl = () => import('../pages/login/index.js');

const notFoundPageUrl = () => import('../pages/notFound/index.js');

const routers = [
  {
    path: '/login',
    exact: true,
    component: MLoading(LoginPageUrl),
  },
  {
    component: MLoading(() => import('../layout/index.js')),
    children: [
      // 首页
      {
        path: '/home/index',
        exact: true,
        component: MLoading(() => import('../pages/home/index/index.js')),
      },
      {
        path: '/home/cakeManager',
        exact: true,
        component: MLoading(() => import('../pages/home/cakeManager/index.js')),
      },
      {
        path: '/home/orderManager',
        exact: true,
        component: MLoading(() => import('../pages/home/orderManager/index.js')),
      },
      {
        path: '/home/personInfo',
        exact: true,
        component: MLoading(() => import('../pages/home/personInfo/index.js')),
      },
      {
        path: '/home/roleManager',
        exact: true,
        component: MLoading(() => import('../pages/home/roleManager/index.js')),
      },
      {
        path: '/home/userManager',
        exact: true,
        component: MLoading(() => import('../pages/home/userManager/index.js')),
      },
      {
        path: '/home/categoriesManager',
        exact: true,
        component: MLoading(() => import('../pages/home/categoryManager/index.js')),
      },

      {
        path: '/home/404',
        component: MLoading(notFoundPageUrl),
      },
    ]
  },
  {
    component: MLoading(notFoundPageUrl),
  }
];

export default routers;
