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

