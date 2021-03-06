import * as types from '../mutation-types';
import { analysisLocation } from '../../api/location';

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  currentLocation: '', // 当前位置名称
  tempAddress: {}, // 已选择当前的具体位置信息
};

const getters = {
  currentLocation: state => state.currentLocation,
  latitude: state => state.latitude,
  longitude: state => state.longitude,
  tempAddress: state => state.tempAddress,
};

const actions = {
  async getLocation({ commit, state }, location) {
    try {
      const res = await analysisLocation(location);
      const { result: { addressComponent: { province: currentLocation } } } = JSON.parse(res.data.data);
      commit(types.ALERT_LOCATION, { currentLocation, ...location });
    } catch (error) {
      console.log(error);
      state.currentLocation = '未获取到地址请手动选择';
    }
  },
};

const mutations = {
  [types.ALERT_LOCATION](state, { currentLocation, latitude, longitude }) {
    state.currentLocation = currentLocation;
    state.latitude = latitude;
    state.longitude = longitude;
  },
  [types.ALERT_TEMPADDRESS](state, tempAddress) {
    Object.assign(state.tempAddress, tempAddress);
    /* eslint-disable no-undef */
    sessionStorage.setItem('tempAddress', JSON.stringify(state.tempAddress));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
