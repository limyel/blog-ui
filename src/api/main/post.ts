import {PageParam} from "@/types/common";
import axios from '../index'

export function list<T>(pageParam: PageParam) {
  return axios.get<T>(`?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`)
}