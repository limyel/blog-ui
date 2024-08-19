<template>
  <div>
    <!-- 查询 -->
    <el-card shadow="never" class="mb-5">
      <div class="flex items-center">
        <el-text>标签名称</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-input v-model="searchName" placeholder="请输入（模糊查询）"/>
        </div>

        <el-text>项目状态</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-select v-model="searchStatus" clearable placeholder="状态" size="default" style="width: 100%">
            <el-option
                v-for="item in projectStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>

        <el-button type="primary" class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
        <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <!-- 新增按钮 -->
      <div class="mb-5">
        <el-button type="primary" @click="addProjectBtnClick">
          <el-icon class="mr-1">
            <Plus/>
          </el-icon>
          新增
        </el-button>
      </div>

      <!-- 分页列表 -->
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="name" label="项目名称" width="180"/>
        <el-table-column prop="url" label="项目地址" width="180"/>
        <el-table-column prop="status" label="项目状态" width="180"/>
        <el-table-column prop="lastCommitTime" label="最后提交时间" width="180"/>
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

  <!-- 添加项目 -->
  <FormDialog ref="formDialogRef" title="添加项目" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="auto">
      <el-form-item label="名称" prop="name">
        <el-input size="default" v-model="form.name" placeholder="请输入名称" clearable/>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input size="default" v-model="form.summary" placeholder="请输入摘要" clearable/>
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input size="default" v-model="form.url" placeholder="请输入地址" clearable/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable placeholder="状态" size="default">
          <el-option
              v-for="item in projectStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </FormDialog>
</template>

<script setup>
import {ref} from "vue";
import {RefreshRight, Search} from "@element-plus/icons-vue";
import {getProjectPage} from "@/api/admin/project.js";
import {showMessage} from "@/composables/util.js";
import FormDialog from "@/components/FormDialog.vue";
import {createProject} from "@/api/admin/project.js";

const projectStatus = [
  {
    value: 0,
    label: '停止维护'
  },
  {
    value: 1,
    label: '维护中'
  }
]

const searchName = ref(null)
const searchStatus = ref(null)

const tableData = ref([])
const current = ref(1)
const total = ref(0)
const size = ref(10)

const tableLoading = ref(false)

function getTableData() {
  tableLoading.value = true
  getProjectPage({
    pageNum: current.value,
    pageSize: size.value,
    name: searchName.value,
    status: searchStatus.value
  })
      .then(resp => {
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

const rest = () => {
  searchName.value = null
  searchStatus.value = null
}


const formDialogRef = ref(null)
const formRef = ref(null)
const form = ref({
  name: '',
  summary: '',
  url: '',
  status: 1
})
const rules = {
  name: [
    {
      required: true,
      message: '项目名称不能为空',
      tigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      message: '项目地址不能为空',
      trigger: 'blur',
    },
  ],
  status: [
    {
      required: true,
      message: '项目状态不能为空',
      trigger: 'blur'
    }
  ]
}

const addProjectBtnClick = () => {
  formDialogRef.value.open()
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    formDialogRef.value.showBtnLoading()
    createProject(form.value).then(resp => {
      if (resp.code === 0) {
        showMessage('添加成功')
        form.value = {
          name: '',
          summary: '',
          url: '',
          status: 1
        }
        getTableData()
        formDialogRef.value.close()
      } else {
        showMessage(resp.msg, 'error')
      }
    }).finally(() => formDialogRef.value.closeBtnLoading())
  })
}

</script>