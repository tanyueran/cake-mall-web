/**
 * @author tanxin
 * @date $
 * @Description: 蛋糕类型api
 */
import request from '../utils/request';
import { API } from '../constant/index';

const api = {
  // 分页查询类型数据
  queryCategoriesByPage: `/${API}/cake/categories/getByPage`,
  // 新增类型
  addCategory: `/${API}/cake/categories/add`,
  // 编辑类型
  editCategory: `/${API}/cake/categories/update`,
  // 删除类型
  deleteCategory: `/${API}/cake/categories/delete`,
};

// 分页查询角色数据
export async function queryCategoriesByPage(data) {
  return request({
    method: 'post',
    url: api.queryCategoriesByPage,
    data,
  });
}

// 新增角色
export async function addCategory(data) {
  return request({
    method: 'post',
    url: api.addCategory,
    data,
  });
}

// 编辑角色
export async function editCategory(data) {
  return request({
    method: 'put',
    url: api.editCategory,
    data,
  });
}

// 删除角色
export async function deleteCategory(id) {
  return request({
    method: 'delete',
    url: `${api.deleteCategory}/${id}`,
  });
}
