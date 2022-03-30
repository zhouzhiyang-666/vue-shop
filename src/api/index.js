// 将模块请求的接口统一暴露
import * as trademark from './product/tradeMask';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';

// 对外暴露
export default {
  trademark,
  attr,
  sku,
  spu
}