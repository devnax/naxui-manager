import * as React from 'react'
import { NAXCSS_CACHE } from 'naxcss'

const serverStyleTags = () => {
    return Array.from(NAXCSS_CACHE.values()).map((c, idx) => <style
        key={c.classname + idx}
        data-naxcss={c.classname}
        dangerouslySetInnerHTML={{ __html: c.css }}
    />)
}

export default serverStyleTags