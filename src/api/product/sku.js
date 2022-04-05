// sku管理模块接口
import request from '@/utils/request'

// 获取sku数据列表
export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get'
})

// 商品上架
export const reqOnSale = skuId => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get'
})

// 商品下架
export const reqCancelSale = skuId => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get'
})

// 获取sku详情接口
export const reqSkuInfo = skuId => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})