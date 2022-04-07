export const useLocalStorage = () => {
    const getLocalStorageItem = (key: string) => {
        return localStorage.getItem(key)
    }

    const setLocalStorageItem = (key: string, value: string) => {
        localStorage.setItem(key, value)
    }

    const removeLocalStorageItem = (key: string) => {
        localStorage.removeItem(key)
    }

    return { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem }
}