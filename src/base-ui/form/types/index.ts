type IFormType = 'input' | 'password' | 'select' | 'virtualized select' | 'datepicker' | 'readonly'

export interface IFormItem {
  field: string
  label: string
  type: IFormType
  isDynamic?: boolean
  dictName?: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}

export interface IForm {
  title?: string
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout?: any
  itemLayout?: any
}
