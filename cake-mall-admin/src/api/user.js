/**
 * @author tanxin
 * @date $
 * @Description: 用户的登录、个人中心的配置api接口
 */
import request from '../utils/request.js';
import {API} from '../constant/index.js';

const api = {
  login: `/${API}/admin/user/login`,
  register: `/${API}/admin/user/register`,
  // 获取用户信息
  getUserInfo: `/${API}/admin/user/getInfo`,
  // 更新用户信息
  updateUserInfo: `/${API}/admin/user/edit`,
  // 更新密码
  updatePwd: `/${API}/admin/user/updatePwd`,
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
