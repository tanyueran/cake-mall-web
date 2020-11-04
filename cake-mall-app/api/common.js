// 公用的
import request from '../utils/request.js';
import {
	API
} from "../constant/index.js";

const api = {
	// 预览文件
	previewFile: `${API}/utils/file/preview`,
}

// 预览文件
export function previewFile(fileId) {
	return `${api.previewFile}?fileId=${fileId}`;
}
