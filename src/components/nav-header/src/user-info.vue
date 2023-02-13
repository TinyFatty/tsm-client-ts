<template>
  <el-dropdown trigger="click" class="el-dropdown" :hide-on-click="false">
    <span class="el-dropdown-link">
      <el-icon-avatar class="el-icon--left" />
      {{ name }}
      <el-icon class="el-icon--right">
        <el-icon-arrowdown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item class="el-dropdown-item"> 工号:{{ id }} </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-item">角色：{{ role }}</el-dropdown-item>
        <el-dropdown-item divided @click="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import router from '@/router'
import cache from '@/utils/cache'
import { useStore } from '@/store'

const store = useStore()
const { id, name, role } = store.state.login.userInfo
const logout = async () => {
  const name = cache.getCache('name')
  const password = cache.getCache('password')
  cache.clearCache()
  cache.setCache('name', name)
  cache.setCache('password', password)
  await router.push('/login')
}
</script>

<style scoped lang="less">
.el-icon--left {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.el-dropdown-menu__item {
  justify-content: center;
}
.el-dropdown {
  cursor: pointer;
}
</style>
