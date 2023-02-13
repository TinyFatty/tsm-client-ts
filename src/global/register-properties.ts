import { App } from 'vue'
import { formatUTCString } from '@/utils/date-format'

export default function registerProperties(app: App): void {
  app.config.globalProperties.$filters = {
    formattime(value: string, format?: string) {
      return formatUTCString(value, format)
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      formattime: typeof formatUTCString
    }
  }
}
