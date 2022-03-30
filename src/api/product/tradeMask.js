// 获取品牌管理列表接口
import request from '@/utils/request'

// 获取品牌列表接口
export const reqTradeMarkList = (page,limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

// 添加品牌接口
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if ( tradeMark.id ) {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: 'put',
      data: tradeMark
    })
  } else {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data: tradeMark
    })
  }
}

// 删除品牌接口
export const reqDelTradeMark = (tradeMarkId) => {
    return request({
      url: `/admin/product/baseTrademark/remove/${tradeMarkId}`,
      method: 'delete'
    })
}