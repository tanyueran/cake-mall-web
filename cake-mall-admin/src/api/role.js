/**
 * @author tanxin
 * @date $
 * @Description: 角色api
 */
import request from '../utils/request';
import { API } from '../constant/index';

const api = {
  // 分页查询角色数据
  queryRolesByPage: `${API}/admin/role/getByPage`,
  // 新增角色
  addRole: `${API}/admin/role/add`,
  // 编辑角色
  editRole: `${API}/admin/role/update`,
  // 删除角色
  deleteRole: `${API}/admin/role/delete`,
};

// 分页查询角色数据
export async function queryRolesByPage(data) {
  return request({
    method: 'post',
    url: api.queryRolesByPage,
    data,
  });
}

// 新增角色
export async function addRole(data) {
  return request({
    method: 'post',
    url: api.addRole,
    data,
  });
}

// 编辑角色
export async function editRole(data) {
  return request({
    method: 'put',
    url: api.editRole,
    data,
  });
}

// 删除角色
export async function deleteRole(id) {
  return request({
    method: 'delete',
    url: `${api.deleteRole}/${id}`,
  });
}
