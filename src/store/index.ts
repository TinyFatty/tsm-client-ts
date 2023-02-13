import { createStore, Store, useStore as VuexStore } from 'vuex'
import system from '@/store/main/system/system'
import { IGoodsState } from '@/store/main/goods/types'
import project from '@/store/main/project/project'
import { IProjectState } from '@/store/main/project/types'
import constant from '@/store/main/constant/constant'
import { IConstantState } from '@/store/main/constant/types'
import analysis from '@/store/main/analysis/analysis'
import { IAnalysisState } from '@/store/main/analysis/types'
import gis from '@/store/main/gis/gis'
import { IGisState } from '@/store/main/gis/types'
import nlp from '@/store/main/nlp/nlp'
import { INlpState } from '@/store/main/nlp/types'

export interface IRootState {
  name: string
}

export interface IRootAndModule {
  system: ISystemState
  project: IProjectState
  constant: IConstantState
  analysis: IAnalysisState
  gis: IGisState
  nlp: INlpState
}

export type IStoreType = IRootState & IRootAndModule

const store = createStore<IRootState>({
  state: () => {
    return {}
  },
  mutations: {},
  actions: {},
  modules: { login, system, project, constant, analysis, gis, nlp }
})

export function useStore(): Store<IStoreType> {
  return VuexStore()
}

export default store
