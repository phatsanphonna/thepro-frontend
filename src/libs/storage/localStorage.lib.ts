export interface LocalStorageItem {
    getLocalStorageItem: (key: string) => string | null;
    setLocalStorageItem: (key: string, value: string) => void;
    removeLocalStorageItem: (key: string) => void;
}

export const useLocalStorage = (): LocalStorageItem => {
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