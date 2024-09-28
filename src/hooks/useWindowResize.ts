import * as React from "react"
type FactoryType = {
    callback: Function
}

const factory = new Map<string, FactoryType>()
const handler = () => factory.forEach(f => f.callback())

const useWindowResize = (callback: Function) => {
    const id = React.useId()
    React.useEffect(() => {
        const items = Array.from(factory)
        if (!items.length) {
            window.addEventListener("resize", handler)
            callback()
        }
        factory.set(id, { callback })
        return () => {
            window.removeEventListener("resize", handler)
            factory.delete(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useWindowResize