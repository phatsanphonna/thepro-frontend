export const useSessionStorage = () => {
    const getSessionStorageItem = (key: string) => {
        return sessionStorage.getItem(key)
    }

    const setSessionStorageItem = (key: string, value: string) => {
        sessionStorage.setItem(key, value)
    }

    const removeSessionStorageItem = (key: string) => {
        sessionStorage.removeItem(key)
    }

    return { getSessionStorageItem, setSessionStorageItem, removeSessionStorageItem }
}