import { IUserMenu } from '@/service/login/type'
import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenuToRoutes(UserMenus: IUserMenu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  const _recurseGetRoute = (menus: IUserMenu[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children ?? [])
      }
    }
  }
  _recurseGetRoute(UserMenus)
  return routes
}

export function pathMaptoMenu(userMenus: IUserMenu[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMaptoMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name }) //一级菜单无跳转，不需要path: menu.url
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function pathMaptoBreadcrumb(userMenus: any[], currentPah: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMaptoMenu(userMenus, currentPah, breadcrumbs)
  return breadcrumbs
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type !== 3) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export { firstMenu }
