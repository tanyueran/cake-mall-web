// 蛋糕模块
import request from '../utils/request.js';
import {
	API
} from "../constant/index.js";

const api = {
	// 获取蛋糕
	getCake: `${API}/cake/product/getPage`,
}

// 分页查询蛋糕
export function getCake(data) {
	return request({
		url: api.getCake,
		method: 'post',
		data,
	});
}
