type IDescriptionType = 'normal' | 'date' | 'href' | 'multilines'

export interface IDescriptionItem {
  field: string
  label: string
  type: IDescriptionType
}

export interface IDescription {
  title?: string
  formItems: IDescriptionItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
  itemLayout?: any
}
