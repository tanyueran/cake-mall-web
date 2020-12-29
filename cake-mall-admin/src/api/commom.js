/**
 * @author tanxin
 * @date $
 * @Description: 公用的api
 */
import request from '../utils/request';
import { API } from '../constant/index';

const api = {
  // 获取主键
  getKey: `/${API}/utils/id`,
  // 文件操作
  uploadFile: `/${API}/utils/file/upload`,
  previewFile: `/${API}/utils/file/preview`,
  downloadFile: `/${API}/utils/file/download`,
  deleteFile: `/${API}/utils/file/delete`, // 删除文件需要token
};

// 获取主键
export async function getKey(num) {
  return request({
    url: `${api.getKey}/${num}`,
  });
}

// 上传文件
export async function uploadFile(formData) {
  return request({
    method: 'post',
    url: `${api.uploadFile}`,
    header: {
      contentType: 'multipart/form-data',
    },
    data: formData,
  });
}

// 预览文件
export function previewFile(fileId) {
  return `${api.previewFile}?fileId=${fileId}`;
}

// 下载文件
export function downloadFile(fileId) {
  return `${api.downloadFile}?fileId=${fileId}`;
}

// 删除文件
export async function deleteFile(fileId) {
  return request({
    method: 'delete',
    url: `${api.deleteFile}`,
    params: {
      fileId,
    },
  });
}
