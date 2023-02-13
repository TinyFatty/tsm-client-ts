<template>
  <div class="header">
    <el-icon class="fold" size="25px" @click="handleClickChange">
      <component :is="isFold ? 'el-icon-expand' : 'el-icon-fold'" />
    </el-icon>
    <div class="breadcrumb">
      <TfBreadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import UserInfo from './user-info.vue'
import TfBreadcrumb from '@/base-ui/breadcrumb'
import { pathMaptoBreadcrumb } from '@/utils/map-menus'

const store = useStore()
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleClickChange = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const breadcrumbs = computed(() => {
  const currentPath = useRoute().path
  const userMenus = store.state.login.userMenu
  return pathMaptoBreadcrumb(userMenus, currentPath)
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  width: 100%;

  .fold {
    cursor: pointer;
  }

  .breadcrumb {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
