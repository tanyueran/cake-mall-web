// 用户相关的
import request from '../utils/request.js';
import {
	API
} from "../constant/index.js";

const api = {
	// 登录
	login: `${API}/admin/user/login`,
	// 刷新token
	refreshToken: `${API}/admin/user/refreshToken`,
	// 注册
	register: `${API}/admin/user/register`,
	// 获取用户信息
	getUserInfo: `${API}/admin/user/getInfo`,
	// 编辑用户信息
	editUser: `${API}/admin/user/edit`,
	// 更新密码
	updatePwd: `${API}/admin/user/updatePwd`,
	// 充值
	addMoney: `${API}/admin/user/addMoney`,
}

// 用户登录
export function login(data) {
	return request({
		url: api.login,
		method: 'post',
		data,
	});
}

// 用户注册
export function refreshToken() {
	return request({
		url: api.refreshToken,
		method: 'get',
	})
}

// 注册
export function register(data) {
	return request({
		url: api.register,
		method: 'post',
		data,
	})
}

// 获取用户信息
export function getUserInfo() {
	return request({
		url: api.getUserInfo,
		method: 'get',
	})
}

// 编辑用户信息
export function editUser(data) {
	return request({
		method: 'put',
		url: api.editUser,
		data,
	})
}

// 更新用户密码
export function updatePwd(data) {
	return request({
		method: 'post',
		url: api.updatePwd,
		data,
	})
}

// 充值
export function addMoney(data) {
	return request({
		method: 'post',
		url: api.addMoney,
		data,
	})
}
