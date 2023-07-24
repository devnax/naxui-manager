import * as React from 'react'
import { NAXCSS_CACHE } from 'naxcss'

const serverStyleTags = () => {
    let gen: any = []
    NAXCSS_CACHE.forEach((c, idx) => {
        gen.push(<style
            key={c.classname + idx}
            data-naxcss={c.classname}
            dangerouslySetInnerHTML={{ __html: c.css }}
        />)
    })
    NAXCSS_CACHE.clear()
    return gen
}

export default serverStyleTags