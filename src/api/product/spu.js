// spu管理模块接口
import request from '@/utils/request'

// 获取SPU列表
export const reqProductList = (page,limit,category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: {category3Id}
})

// 获取某一个SPU信息
export const reqSpuById = spuId => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get'
})

// 获取品牌信息
export const reqTradeMarkList = _ => request({
  url: `/admin/product/baseTrademark/getTrademarkList`,
  method: 'get'
})

// 获取SPU图片
export const reqSpuImageList = spuId => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

// 获取全部平台的销售属性
export const reqBaseSaleAttrList = _ => request({
  url: `/admin/product/baseSaleAttrList`,
  method: 'get'
})

// 添加或修改SPU
export const reqSaveSpuInfo = data => {
  if (data.id) {
    return request({
      url: `/admin/product/updateSpuInfo`,
      method: 'post',
      data
    })
  } else {
    return request({
      url: `/admin/product/saveSpuInfo`,
      method: 'post',
      data
    })
  }
  
}

// 删除SPU
export const reqDelSpu = spuId => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})

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

// 查看sku列表数据接口
export const reqSkuList = spuId => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get'
})