import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import {
	getUserInfo,
	refreshToken,
} from "../api/user.js";

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo: {},
	},
	getters: {
		getToken(state) {
			if (state.token !== "") {
				return state.token;
			} else {
				let token = uni.getStorageSync("token");
				if (token !== "") {
					Vue.set(state, "token", token);
				}
				return state.token;
			}
		}
	},
	mutations: {
		init(state) {
			let token = uni.getStorageSync('token');
			if (token) {
				Vue.set(state, "token", token);
			}
			let userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				Vue.set(state, "userInfo", userInfo);
			}
		},
		setToken(state, val) {
			uni.setStorageSync("token", val);
			Vue.set(state, "token", val);
		},
		setUserInfo(state, val) {
			uni.setStorageSync("userInfo", val);
			Vue.set(state, "userInfo", val);
		}
	},
	actions: {
		refreshToken({
			commit
		}) {
			refreshToken().then(res => {
				commit("setToken", res);
			}).catch(err => {})
		},
		getUserInfo({
			commit
		}) {
			getUserInfo().then(res => {
				commit("setUserInfo", res);
			}).catch(err => {

			})
		},
		logout({
			commit
		}) {
			uni.reLaunch({
				url: '/pages/login/index',
				success() {
					commit("setToken", "");
					commit("setUserInfo", {});
				}
			});
		}
	}
});

export default store
