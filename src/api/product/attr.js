//平台属性管理模块接口
// 获取品牌管理列表接口
import request from '@/utils/request'

// 获取一级分类
export const reqAttrCategory1 = _ => request({
  url: `/admin/product/getCategory1`,
  method: 'get'
})

// 获取二级分类
export const reqAttrCategory2 = (id) => request({
  url: `/admin/product/getCategory2/${id}`,
  method: 'get'
})

// 获取三级分类
export const reqAttrCategory3 = (id) => request({
  url: `/admin/product/getCategory3/${id}`,
  method: 'get'
})

// 获取商品基础属性
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 添加属性名 属性值
// data: {
//   "attrName": "string",
//   "attrValueList": [
//     {
//       "attrId": 0,
//       "id": 0,
//       "valueName": "string"
//     }
//   ],
//   "categoryId": 0,  // 3级分类id
//   "categoryLevel": 3  
// }
export const reqAddAttr = data => request({
  url: `/admin/product/saveAttrInfo`,
  method: 'post',
  data
})

// 删除属性名
export const reqDelAttr = attrId => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'delete'
})

// 获取属性名中的 属性值
export const reqAttrInfoById = attrId => request({
  url: `/admin/product/getAttrValueList/${attrId}`,
  method: 'get'
})