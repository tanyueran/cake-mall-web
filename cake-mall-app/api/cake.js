// 蛋糕模块
import request from '../utils/request.js';
import {
	API
} from "../constant/index.js";

const api = {
	// 获取蛋糕
	getCake: `${API}/cake/product/getPage`,
	// 根据id查询蛋糕详情
	getCakeInfoById: `${API}/cake/product/detail`,
	// 下单
	createOrder: `${API}/order/action/create`,
	// 查询“我的”页面的数据
	getMyPageInfo: `${API}/order/action/orderCollectionInfo`,
	// 分页查询订单数据
	getOrderByPage: `${API}/order/action/pageQuery`,
	// 查询订单详情
	getOrderDetailById: `${API}/order/action/orderDetail`,
	// 订单付款
	orderPay: `${API}/order/action/order/pay`,
}

// 分页查询蛋糕
export function getCake(data) {
	return request({
		url: api.getCake,
		method: 'post',
		data,
	});
}


// 根据蛋糕id查询详情
export function getCakeInfoById(id) {
	return request({
		url: `${api.getCakeInfoById}/${id}`,
		method: 'get',
	})
}

// 下单
export function createOrder(data) {
	return request({
		url: api.createOrder,
		method: 'post',
		data,
	})
}

// 查询个人订单集合数据
export function getMyPageInfo(userId) {
	return request({
		url: `${api.getMyPageInfo}/${userId}`,
		method: 'get',
	})
}

// 分页查询订单列表
export function getOrderByPage(data) {
	return request({
		url: api.getOrderByPage,
		method: 'post',
		data,
	})
}


// 查询订单详情
export function getOrderDetailById(id) {
	return request({
		url: `${api.getOrderDetailById}/${id}`,
	})
}

// 订单付款
export function orderPay(data) {
	return request({
		url: api.orderPay,
		method: 'post',
		data,
	})
}
