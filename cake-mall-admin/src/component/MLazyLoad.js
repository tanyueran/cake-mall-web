/**
 * @author tanxin
 * @date 2020/12/31
 * @Description: 组件懒加载
 */
import Loadable from 'react-loadable';
import Loading from './MLoading';

/**
 * 懒加载组件
 * @param loader   需要加载的组件
 * @param loading  正在加载中的组件
 */
const lazy = (loader, loading = Loading) => Loadable({
  loader,
  loading,
});

export default lazy;
