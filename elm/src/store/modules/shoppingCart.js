import * as type from '../mutation-types.js';

const state = {
	shoppingCartProducts:{},
}

const getters = {
	shoppingCartProducts:state => state.shoppingCartProducts,

}

const actions = {



}




const mutations = {

	[type.ADD_TO_SHOPPINGCART](state,{foodName,shopId,price,shopName,foodType,foodId,foodNum}){
		//判断购物中是否有此店铺
		if (Object.prototype.hasOwnProperty.call(state.shoppingCartProducts,shopId)) {
			let eachFlag = true;
			// 是否有相同的（包括同一商品类型不同）商品
			state.shoppingCartProducts[shopId].foodList.forEach((e,i) => {
				if (e.foodType === foodType && e.foodId === foodId) {
					eachFlag = false;
					e.foodNum ++; //如果有 就添加数量
					let tempFoodNum = state.shoppingCartProducts[shopId].foodIdList.get(foodId);
					state.shoppingCartProducts[shopId].foodIdList.set(foodId,++tempFoodNum); 
				}
			});
			if (eachFlag) {
				state.shoppingCartProducts[shopId].foodIdList.set(foodId,1);
				state.shoppingCartProducts[shopId].foodList.push({foodName,price,foodType,foodNum,foodId});

				if (state.shoppingCartProducts[shopId].foodIdList.has(foodId)) {
					let tempFoodNum = state.shoppingCartProducts[shopId].foodIdList.get(foodId);
					state.shoppingCartProducts[shopId].foodIdList.set(foodId,++tempFoodNum); 
				}else{
					state.shoppingCartProducts[shopId].foodIdList.set(foodId,1); 
				}
			}
		}else{
			let tempObject = {};
			tempObject[shopId] = {shopName}; //创建当前商店
			tempObject[shopId].foodList = []; //创建选中的当前商店中的商品数组
			tempObject[shopId].foodIdList = new Map(); //创建选中的当前商店中的商品的ID的 Map key:ID value:商品数量
			tempObject[shopId].foodIdList.set(foodId,1); //添加当前商品的ID
			tempObject[shopId].foodList.push({foodName,price,foodType,foodNum,foodId}); //在选中商品数组当中添加当前商品
			Object.assign(state.shoppingCartProducts,tempObject);
		}
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}