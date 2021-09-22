import request from '../axios';

export function getSidebar(type) {
  return request.get('/getsidebar', { params: { type } });
}
export function getGoodsList(type, page, size) {
  return request.get('/getGoodsList', {
    params: {
      type,
      page,
      size,
    },
  });
}
// 模糊搜索匹配
export function getLikeSearch(likeValue) {
  return request.get('/likeSearch', { params: { likeValue } });
}
// 搜索信息查询
export function getSearch(type, page, size) {
  return request.get('/search', { params: { type, page, size } });
}
// 购物车获取
export function getGoodsByIds(value) {
  return request.get('/getGoodsByIds', { params: { value } });
}
