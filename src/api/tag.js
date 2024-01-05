import request from "@/request";
import config from "@/config";

export function getTagList() {
  return request.get('/main/tag');
}

export function getTagDetail(id) {
  return request.get('/main/tag/' + id);
}

export function addTag(data) {
  return request.post('/sys/tag', data);
}

export function getSysTagList(params) {
  return request.get('/sys/tag', {params: params});
}

export function getTagAll() {
  return request.get('/sys/tag/all');
}

export function getSysTag(id) {
  return request.get('/sys/tag/' + id);
}

export function updateTag(data) {
  return request.put('/sys/tag', data);
}

export function deleteTag(id) {
  return request.delete('/sys/tag/' + id);
}