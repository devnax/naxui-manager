import * as React from 'react'
import { NAXCSS_CACHE } from 'naxcss'

const ServerStyles = () => {
    let css = React.useMemo(() => {
        let gen: any = []
        NAXCSS_CACHE.forEach((c, idx) => {
            gen.push(<style
                key={c.classname + idx}
                data-naxcss={c.classname}
                dangerouslySetInnerHTML={{ __html: c.css }}
            />)
        })
        return gen
    }, [])
    return <>{css}</>
}

export default ServerStyles