import request from "@/request";

export function getPostList(params) {
  return request.get('/main/post', {params});
}

export function getPost(id) {
  return request.get('/main/post/' + id);
}

export function getArchive() {
  return request.get('/main/post/archive');
}

export function addPost(data) {
  return request.post('/sys/post', data);
}

export function updatePost(data) {
  return request.put('/sys/post', data);
}

export function getSysPostList(params) {
  return request.get('/sys/post', {params});
}

export function getSysPost(id) {
  return request.get('/sys/post/' + id);
}

export function deletePost(id) {
  return request.delete('/sys/post/' + id);
}