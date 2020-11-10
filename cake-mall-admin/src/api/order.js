/**
 * @author tanxin
 * @date $
 * @Description: 订单api
 */
import request from '../utils/request.js';
import {API} from '../constant/index.js';

const api = {
  // 分页查询订单
  pageQueryList: `/${API}/order/action/pageQuery`,
};


// 分页查询订单列表
export async function pageQueryList(data) {
  return request({
    url: api.pageQueryList,
    method: 'post',
    data,
  })
}
