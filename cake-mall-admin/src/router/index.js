/**
 * @author tanxin
 * @date $
 * @Description: 路由配置信息
 */
import MLoading from "../component/MLazyLoad";

const LoginPageUrl = () => import('../pages/login/index.js');

const notFoundPageUrl = () => import('../pages/notFound/index.js');

export default [
  {
    path: '/login',
    exact: true,
    component: MLoading(LoginPageUrl),
  },
  {
    path: '/register',
    exact: true,
    component: MLoading(() => import('../pages/register/index.js')),
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
        path: '/home/404',
        component: MLoading(notFoundPageUrl),
      },
    ]
  },
  {
    component: MLoading(notFoundPageUrl),
  }
]
