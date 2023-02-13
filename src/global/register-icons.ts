import * as ElIcons from '@element-plus/icons'
import { App } from 'vue'

export default function (app: App): void {
  for (const name in ElIcons) {
    app.component('el-icon-' + name.toLowerCase(), (ElIcons as any)[name])
  }
}
