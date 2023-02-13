<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span class="title" v-if="!collapse">一体化查询平台</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      :default-openeds="['1', '9', '13', '16', '21']"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in UserMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <el-icon v-if="subitem.icon">
                  <component :is="subitem.icon" />
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMaptoMenu } from '@/utils/map-menus'

const store = useStore()
const router = useRouter()
const route = useRoute()
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const UserMenus = computed(() => store.state.login.userMenu)
// 获取当前url对应menu，防止刷新后menu失去选中
let defaultValue = ref('11')
const menu = pathMaptoMenu(UserMenus.value, route.path)
if (menu) {
  defaultValue = ref(menu.id + '')
}

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? ''
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 120%;
      margin: 10px;
    }

    .title {
      font-size: 15px;
      font-weight: 700;
      padding-left: 0px;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #ffffff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #ffffff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
