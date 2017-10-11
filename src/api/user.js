import axios from 'axios';

export const userLogin = (data) => axios.post('/ElmPro/User/login.do', data); // 用户登录

export const checkUserName = (data) => axios.post('/ElmPro/User/checkUserName.do', data); // 检测用户名是否已经存在

export const register = (data) => axios.post('/ElmPro/User/register.do', data); // 注册用户

export const addAddress = (data) => axios.post('/ElmPro/User/addAddress.do', data); // 添加地址

export const getUserAddress = (data) => axios.post('/ElmPro/User/findAddressByUserId.do', data); // 获取用户的所有地址

export const deleteAddress = (data) => axios.post('/ElmPro/User/deleteAddressById.do', data); // 删除地址 
