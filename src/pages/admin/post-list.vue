<template>
  <div>
    <el-card shadow="never" class="mb-5">
      <div class="flex items-center">
        <el-text>文章标题</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-input v-model="searchPostTitle" placeholder="请输入（模糊查询）"/>
        </div>

        <el-text>创建日期</el-text>
        <div class="ml-3 w-30 mr-5">
          <!-- 日期选择组件（区间选择） -->
          <el-date-picker v-model="pickDate" type="daterange" range-separator="至" start-placeholder="开始时间"
                          end-placeholder="结束时间" size="default" :shortcuts="shortcuts" @change="datepickerChange"/>
        </div>

        <el-button type="primary" class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
        <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <!-- 写文章按钮 -->
      <div class="mb-5">
        <el-button type="primary" @click="isPostCreateEditorShow = true">
          <el-icon class="mr-1">
            <EditPen/>
          </el-icon>
          写文章
        </el-button>
      </div>

      <!-- 分页列表 -->
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="id" label="ID" width="180"/>
        <el-table-column prop="title" label="标题" width="180"/>
        <el-table-column prop="status" label="状态" width="180"/>
        <el-table-column prop="top" label="置顶" width="180"/>
        <el-table-column prop="createTime" label="发布时间" width="180"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="showPostUpdateEditor(scope.row)">
              <el-icon class="mr-1">
                <Edit/>
              </el-icon>
              编辑
            </el-button>
            <el-button size="small" @click="goPostDetailPage(scope.row.slug)">
              <el-icon class="mr-1">
                <View />
              </el-icon>
              预览</el-button>
            <el-button type="danger" size="small" @click="deletePostSubmit(scope.row)">
              <el-icon class="mr-1">
                <Delete/>
              </el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-10 flex justify-center">
        <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 50]"
                       :small="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
                       :total="total" @size-change="handleSizeChange" @current-change="getTableData"/>
      </div>

    </el-card>

    <!-- 写博客 -->
    <el-dialog v-model="isPostCreateEditorShow" :fullscreen="true" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <el-affix :offset="20" style="width: 100%;">
          <div class="flex h-10 bg-white">
            <h4 class="font-bold">写文章</h4>
            <div class="ml-auto flex">
              <el-button @click="closePostEditor">取消</el-button>
              <el-button type="primary" @click="createPostSubmit">
                <el-icon class="mr-1">
                  <Promotion/>
                </el-icon>
                发布
              </el-button>
            </div>
          </div>
        </el-affix>
      </template>

      <el-form :model="form" ref="createPostFormRef" label-position="top" size="large" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" autocomplete="off" size="large" maxlength="40" show-word-limit
                    clearable/>
        </el-form-item>
        <el-form-item label="slug" prop="slug">
          <el-input v-model="form.slug" autocomplete="off" size="large" maxlength="40" show-word-limit
                    clearable/>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="form.summary" :rows="3" type="textarea" placeholder="请输入文章摘要"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- Markdown 编辑器 -->
          <MdEditor v-model="form.content" editorId="createPostEditor" />
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <!-- 标签选择 -->
          <el-select v-model="form.tagIds" multiple filterable placeholder="请选择文章标签" :loading="tagSelectLoading"
                     size="large">
            <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status" class="ml-4">
            <el-radio :value="0" size="large">草稿</el-radio>
            <el-radio :value="1" size="large">发布</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="置顶" prop="top">
          <el-switch v-model="form.top" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";
import moment from "moment/moment.js";
import {createPost, deletePost, getPostById, getPostPage, updatePost} from "@/api/admin/post.js";
import {showMessage, showModel} from "@/composables/util.js";
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {getTagSelect} from "@/api/admin/tag.js";
import {useRouter} from "vue-router";

const router = useRouter()

const searchPostTitle = ref('')
const pickDate = ref('')
const startDate = ref({})
const endDate = ref({})

const datepickerChange = e => {
  startDate.value = moment(e[0]).format('YYYY-MM-DD')
  endDate.value = moment(e[1]).format('YYYY-MM-DD')
}

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const reset = () => {
  pickDate.value = ''
  startDate.value = null
  endDate.value = null
  searchPostTitle.value = ''
}

const tableLoading = ref(false)
const tableData = ref([])
const current = ref(1)
const total = ref(0)
const size = ref(10)

function getTableData() {
  tableLoading.value = true
  getPostPage({
    pageNum: current.value,
    pageSize: size.value,
    startTime: startDate.value,
    endTime: endDate.value,
    title: searchPostTitle.value
  }).then(resp => {
    if (resp.code === 0) {
      tableData.value = resp.data.list
      current.value = resp.data.current
      total.value = resp.data.total
    } else {
      showMessage(resp.msg, 'error')
    }
  }).finally(() => {
    tableLoading.value = false
  })
}

getTableData()

const handleSizeChange = (chooseSize) => {
  size.value = chooseSize
  getTableData()
}

const deletePostSubmit = row => {
  showModel('是否确定要删除该文章？').then(() => {
    deletePost(row.id).then(resp => {
      if (resp.code === 0) {
        showMessage('删除成功')
        getTableData()
      } else {
        let msg = resp.msg
        showMessage(msg, 'error')
      }
    })
  })
}

const isPostCreateEditorShow = ref(false)
const createPostFormRef = ref(null)
const form = ref({
  id: null,
  title: '',
  slug: '',
  summary: '',
  content: '',
  status: 1,
  top: false,
  tagIds: []
})
const rules = {
  title: [
    {
      required: true,
      message: '请输入文章标题',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 64,
      message: '文章标题要求大于 1 个字符，小于 40 个字符',
      trigger: 'blur'
    }
  ],
  slug: [
    {
      required: true,
      message: '请输入文章 slug',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true
    }
  ]
}

const tags = ref([])
getTagSelect().then(resp => {
  if (resp.code === 0) {
    tags.value = resp.data
  } else {
    showMessage(resp.msg, 'error')
  }
})

const createPostSubmit = () => {
  createPostFormRef.value.validate(valid => {
    if (!valid) {
      return false
    }
  })

  if (form.value.id === null) {
    createPost(form.value).then(resp => {
      if (resp.code === 0) {
        showMessage('发布成功')
        isPostCreateEditorShow.value = false

        form.value = {
          id: null,
          title: '',
          slug: '',
          summary: '',
          content: '',
          status: 1,
          top: false
        }

        getTableData()
      } else {
        showMessage(resp.msg, 'error')
      }
    })
  } else {
    updatePost(form.value).then(resp => {
      if (resp.code === 0) {
        showMessage('更新成功')
        isPostCreateEditorShow.value = false

        form.value = {
          id: null,
          title: '',
          slug: '',
          summary: '',
          content: '',
          status: 1,
          top: false
        }

        getTableData()
      } else {
        showMessage(resp.msg, 'error')
      }
    })
  }


}

function showPostUpdateEditor(row) {
  getPostById(row.id).then(resp => {
    if (resp.code === 0) {
      form.value = resp.data
      isPostCreateEditorShow.value = true
    } else {
      showMessage(resp.msg, 'error')
    }
  })
}

function closePostEditor() {
  form.value = {
    id: null,
    title: '',
    slug: '',
    summary: '',
    content: '',
    status: 1,
    top: false
  }
  isPostCreateEditorShow.value = false
}


// 跳转文章详情
const goPostDetailPage = (slug) => {
  console.log(slug)
  router.push('/post/' + slug)
}
</script>

<style>
.md-editor-footer {
  height: 40px;
}

.el-select--large {
  width: 600px;
}
</style>