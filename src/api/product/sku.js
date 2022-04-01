// sku管理模块接口
import request from '@/utils/request'

// 获取sku图片数据
export const reqSkuImageList = spuId => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

// 获取销售属性列表
export const reqSpuSaleAttrList = spuId => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get'
})

// 获取商品基本信息列表
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 保存sku信息
export const reqSaveSkuInfo = data => request({
  url: `/admin/product/saveSkuInfo`,
  method: 'post',
  data
})