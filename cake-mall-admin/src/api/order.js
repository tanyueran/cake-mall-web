/**
 * @author tanxin
 * @date $
 * @Description: 订单api
 */
import request from '../utils/request';
import { API } from '../constant/index';

const api = {
  // 分页查询订单
  pageQueryList: `${API}/order/action/pageQuery`,
  // 拒绝订单
  refuseOrder: `${API}/order/action/refuseOrder`,
  // 接受订单
  giveOrder: `${API}/order/action/giveOrder`,
  // 发货
  send: `${API}/order/action/send`,
  // 完成订单
  orderOver: `${API}/order/action/orderOver`,
};

// 分页查询订单列表
export async function pageQueryList(data) {
  return request({
    url: api.pageQueryList,
    method: 'post',
    data,
  });
}

// 拒绝订单
export async function refuseOrder(orderId) {
  return request({
    url: `${api.refuseOrder}/${orderId}`,
    method: 'post',
  });
}

// 接受订单
export async function giveOrder(data) {
  return request({
    url: api.giveOrder,
    method: 'post',
    data,
  });
}

// 发货
export async function send(data) {
  return request({
    url: api.send,
    method: 'post',
    data,
  });
}

// 订单完成
export async function orderOver(data) {
  return request({
    url: api.orderOver,
    method: 'post',
    data,
  });
}
