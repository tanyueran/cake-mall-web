// 用户相关的
import request from '../utils/request.js';
import {
	API
} from "../constant/index.js";

const api = {
	// 登录
	login: `${API}/admin/user/login`,
	// 注册
	register: `${API}/admin/user/register`,
}

// 用户登录
export function login(data) {
	return request({
		url: api.login,
		method: 'post',
		data,
	});
}
