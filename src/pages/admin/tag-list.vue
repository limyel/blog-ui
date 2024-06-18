<template>
  <div>
    <!-- 查询 -->
    <el-card shadow="never" class="mb-5">
      <div class="flex items-center">
        <el-text>标签名称</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-input v-model="searchTagName" placeholder="请输入（模糊查询）"/>
        </div>

        <el-text>创建日期</el-text>
        <div class="ml-3 w-30 mr-5">
          <el-date-picker v-model="pickDate" type="daterange" range-separator="至" start-placeholder="开始时间"
                          end-placeholder="结束时间" size="default" :shortcuts="shortcuts" @change="datepickerChange"/>
        </div>

        <el-button type="primary" class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
        <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <!-- 新增按钮 -->
      <div class="mb-5">
        <el-button type="primary" @click="addTagBtnClick">
          <el-icon class="mr-1">
            <Plus/>
          </el-icon>
          新增
        </el-button>
      </div>

      <!-- 分页列表 -->
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="name" label="分类名称" width="180"/>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="deleteTagSubmit(scope.row)">
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
  </div>

  <!-- 添加标签 -->
  <FormDialog ref="formDialogRef" title="添加标签" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="标签名" prop="name" label-width="120px">
        <el-input size="large" v-model="form.name" placeholder="请输入标签名" clearable/>
      </el-form-item>
      <el-form-item label="slug" prop="slug" label-width="120px">
        <el-input size="large" v-model="form.slug" placeholder="请输入 slug" clearable/>
      </el-form-item>
      <el-form-item label="备注" prop="remark" label-width="120px">
        <el-input size="large" v-model="form.remark" placeholder="请确认备注" clearable/>
      </el-form-item>
    </el-form>
  </FormDialog>
</template>

<script setup>
import {ref} from "vue";
import {RefreshRight, Search} from "@element-plus/icons-vue";
import moment from "moment";
import {createTag, deleteTag, getTagPage} from "@/api/admin/tag.js";
import {showMessage, showModel} from "@/composables/util.js";
import FormDialog from "@/components/FormDialog.vue";

const searchTagName = ref('')
const pickDate = ref('')

const tableData = ref([])
const current = ref(1)
const total = ref(0)
const size = ref(10)

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


const tableLoading = ref(false)
function getTableData() {
  tableLoading.value = true
  getTagPage({
    pageNum: current.value,
    pageSize: size.value,
    startTime: startDate.value,
    endTime: endDate.value,
    name: searchTagName.value
  })
      .then(resp => {
        if (resp.code === 'Success') {
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

const reset = () => {
  searchTagName.value = ''
  pickDate.value = ''
  startDate.value = null
  endDate.value = null
}


const formDialogRef = ref(null)
const formRef = ref(null)
const form = ref({
  name: '',
  slug: '',
  remark: ''
})
const rules = {
  name: [
    {
      required: true,
      message: '标签名不能为空',
      tigger: 'blur'
    }
  ],
  slug: [
    {
      required: true,
      message: 'slug 不能为空',
      trigger: 'blur',
    },
  ]
}
const addTagBtnClick = () => {
  formDialogRef.value.open()
}
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    formDialogRef.value.showBtnLoading()
    createTag(form.value).then(resp => {
      if (resp.code === 'Success') {
        showMessage('添加成功')
        form.value = {
          name: '',
          slug: '',
          remark: ''
        }
        getTableData()
        formDialogRef.value.close()
      } else {
        let msg = resp.msg
        showMessage(msg, 'error')
      }
    }).finally(() => formDialogRef.value.closeBtnLoading())
  })
}

const deleteTagSubmit = row => {
  showModel('是否确定要删除该标签？').then(() => {
    deleteTag(row.slug).then(resp => {
      if (resp.code === 'Success') {
        showMessage('删除成功')
        getTableData()
      } else {
        let msg = resp.msg
        showMessage(msg, 'error')
      }
    })
  })
}

</script>