import {TagList} from "@/types/main/tag";

export interface PostSimple {
    id: bigint
    title: string
    description: string
    top: boolean
    commentNum: number
    tags: TagList
    publishTime: bigint
}