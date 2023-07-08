import { getTheme } from "../theme"

// eslint-disable-next-line import/no-anonymous-default-export
export default (prop: string, value: string) => {
    const { typography } = getTheme()
    const props: any = {
        'typography': typography,
    }

    if (props[prop] && props[prop][value]) {
        return props[prop][value]
    }
}