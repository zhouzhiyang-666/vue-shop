import mockRequest from '@/utils/mockRequest'
const state = {}
const mutations = {}
const actions = {
  // 发送请求获取首页的mock数据
  async getData({ commit }) {
    let res = await mockRequest.get('/home/list')
    if (res.code === 200) {
      
    }
  }
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}