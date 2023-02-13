import 'element-plus/dist/index.css'
import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElForm
} from 'element-plus/lib/components'
import { App } from 'vue'

const components = [ElButton, ElTable, ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge, ElForm]

export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
