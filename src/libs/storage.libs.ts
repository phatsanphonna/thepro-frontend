export const useStorage = () => {
  const getStorageItem = (key: string) => {
    return localStorage.getItem(key)
  }

  const setStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  const removeStorageItem = (key: string) => {
    localStorage.removeItem(key)
  }

  return { getStorageItem, setStorageItem, removeStorageItem }
}