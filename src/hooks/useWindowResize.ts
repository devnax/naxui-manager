import { useEffect, useId, } from "react"
type FactoryType = {
    callback: Function
}

const factory = new Map<string, FactoryType>()

const useWindowResize = (callback: Function) => {
    const id = useId()
    useEffect(() => {
        const items = Array.from(factory)
        if (!items.length) {
            // load only first time
            window.addEventListener("resize", () => factory.forEach(f => f.callback()))
            callback()
        }
        factory.set(id, { callback })
        return () => {
            factory.delete(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useWindowResize