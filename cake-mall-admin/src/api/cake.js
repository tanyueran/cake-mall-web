/**
 * @author tanxin
 * @date $
 * @Description: 蛋糕类型api
 */
import request from '../utils/request';
import { API } from '../constant/index';

const api = {
  // 查询所有的类型
  getAllCategories: `${API}/cake/categories/all`,
  // 分页查询蛋糕
  getCakesByPage: `${API}/cake/product/getPage`,
  // 添加蛋糕
  addCake: `${API}/cake/product/add`,
  // 删除蛋糕
  deleteCake: `${API}/cake/product/delete`,
  // 编辑蛋糕信息
  updateCake: `${API}/cake/product/update`,
};

// 查询所有的类型
export async function getAllCategories() {
  return request({
    url: api.getAllCategories,
  });
}

// 分页查询列表
export async function getCakesByPage(data) {
  return request({
    url: api.getCakesByPage,
    method: 'post',
    data,
  });
}

// 删除蛋糕
export async function deleteCake(id) {
  return request({
    url: `${api.deleteCake}/${id}`,
    method: 'delete',
  });
}

// 编辑蛋糕
export async function updateCake(data) {
  return request({
    url: api.updateCake,
    method: 'put',
    data,
  });
}

// 新增蛋糕
export async function addCake(data) {
  return request({
    url: api.addCake,
    method: 'post',
    data,
  });
}
