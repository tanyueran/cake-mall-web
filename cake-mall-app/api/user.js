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
