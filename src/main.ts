import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import registerElement from '@/global/register-element'
import registerProperties from '@/global/register-properties'
import registerIcons from '@/global/register-icons'
import 'normalize.css'
import './assets/css/index.less'
import './assets/font/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { SetupStore } from './store'

const app = createApp(App)
app.use(registerProperties)
app.use(registerIcons)
app.use(ElementPlus, {
  locale: zhCn
})
SetupStore()
app.use(store).use(router).mount('#app')
