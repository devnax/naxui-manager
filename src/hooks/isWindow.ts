
const useWindow = (): Window | void => typeof window !== 'undefined' ? window : undefined

export default useWindow