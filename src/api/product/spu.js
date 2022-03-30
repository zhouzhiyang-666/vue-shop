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
