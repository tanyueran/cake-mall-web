// 公用的
import request from '../utils/request.js';
import {
	API
} from "../constant/index.js";

const api = {
	// 预览文件
	previewFile: `${API}/utils/file/preview`,
	// 获取主键
	getKey: `${API}/utils/id`,
	// 文件操作
	uploadFile: `${API}/utils/file/upload`,
	downloadFile: `${API}/utils/file/download`,
}

// 预览文件
export function previewFile(fileId) {
	return `${api.previewFile}?fileId=${fileId}`;
}


// 获取主键
export function getKey(num) {
	return request({
		url: `${api.getKey}/${num}`,
	});
}

// 上传文件
export function uploadFile(filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: api.uploadFile,
			filePath,
			name: 'file',
			success: (res) => {
				let json = JSON.parse(res.data);
				if (json.code == 200) {
					resolve(json.data);
				} else {
					reject(json.data)
				}
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

// 下载文件
export function downloadFile(fileId) {
	return `${api.downloadFile}?fileId=${fileId}`;
}
