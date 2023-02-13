class LocalCache {
  setCache(key: string, value: any, isLocalStorage = true) {
    if (isLocalStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string, isLocalStorage = true) {
    if (isLocalStorage) {
      const value = window.localStorage.getItem(key)
      if (value && value !== 'undefined') {
        return JSON.parse(value)
      }
    } else {
      const value = window.sessionStorage.getItem(key)
      if (value && value !== 'undefined') {
        return JSON.parse(value)
      }
    }
  }

  deleteCache(key: string, isLocalStorage = true) {
    if (isLocalStorage) {
      window.localStorage.removeItem(key)
    } else {
      window.sessionStorage.removeItem(key)
    }
  }

  clearCache() {
    window.localStorage.clear()
    window.sessionStorage.clear()
  }
}

export default new LocalCache()
