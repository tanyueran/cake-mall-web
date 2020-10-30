/**
 * @author tanxin
 * @date $
 * @Description: 用户的登录、个人中心的配置api接口
 */
import request from '../utils/request.js';
import {API} from '../constant/index.js';

const api = {
  login: `/${API}/admin/user/aLogin`,
  register: `/${API}/admin/user/register`,
  // 获取用户信息
  getUserInfo: `/${API}/admin/user/getInfo`,
  // 更新用户信息
  updateUserInfo: `/${API}/admin/user/edit`,
  // 更新密码
  updatePwd: `/${API}/admin/user/updatePwd`,
  // 查询用户列表
  getUsersByPage: `/${API}/admin/user/getByPage`,
  // 冻结用户
  freezeUser: `/${API}/admin/user/freeze`,
  unfreezeUser: `/${API}/admin/user/unfreeze`,
  // 添加用户
  addUser: `/${API}/admin/user/add`,
  // 编辑用户信息
  editUser: `/${API}/admin/user/edit`,
  // 获取角色
  allRole: `/${API}/admin/role/all`,
  // 密码初始化
  initPwd: `/${API}/admin/user/initPwd`,
};


// 用户登录
export async function login(data) {
  return request({
    method: 'post',
    url: api.login,
    data,
  });
}

// 获取用户信息
export async function getUserInfo() {
  return request({
    method: 'get',
    url: api.getUserInfo,
  })
}

// 注册
export async function register(data) {
  return request({
    method: 'post',
    url: api.register,
    data,
  })
}

// 编辑用户信息
export async function updateUserInfo(data) {
  return request({
    method: 'put',
    url: api.updateUserInfo,
    data,
  })
}

// 更新用户密码
export async function updatePwd(data) {
  return request({
    method: 'post',
    url: api.updatePwd,
    data,
  })
}

// 查询分页查询分页列表
export async function getUsersByPage(data) {
  return request({
    method: 'post',
    url: api.getUsersByPage,
    data,
  })
}

// 冻结用户
export async function freezeUser(id) {
  return request({
    method: 'put',
    url: `${api.freezeUser}/${id}`,
  })
}

// 解冻账户
export async function unfreezeUser(id) {
  return request({
    method: 'put',
    url: `${api.unfreezeUser}/${id}`,
  })
}

// 添加用户
export async function addUser(data) {
  return request({
    method: 'post',
    url: api.addUser,
    data,
  });
}

// 编辑用户
export async function editUser(data) {
  return request({
    method: 'put',
    url: api.editUser,
    data,
  })
}

// 获取所有的角色
export async function allRole() {
  return request({
    url: api.allRole,
  })
}

// 密码初始化
export async function initPwd(id) {
  return request({
    method: 'put',
    url: `${api.initPwd}/${id}`,
  })
}
