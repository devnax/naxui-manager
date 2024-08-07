import { AliasFN } from 'naxcss'
import { AliasesTypes } from './types'

const isStr = (v: any, or: any) => typeof v === 'string' ? v : or

const aliases: { [key in keyof AliasesTypes]: AliasFN } = {
   bgcolor: v => ({ "background-color": v }),
   bgimage: v => ({ "background-image": `url(${v})`, "background-size": "cover", "background-repeat": "no-repeat" }),
   bg: v => ({ 'background': v }),
   p: v => ({ "padding": isStr(v, 8 * v) }),
   pt: v => ({ "padding-top": isStr(v, 8 * v) }),
   pr: v => ({ "padding-right": isStr(v, 8 * v) }),
   pb: v => ({ "padding-bottom": isStr(v, 8 * v) }),
   pl: v => ({ "padding-left": isStr(v, 8 * v) }),
   px: v => ({ "padding-left": isStr(v, 8 * v), "padding-right": isStr(v, 8 * v) }),
   py: v => ({ "padding-top": isStr(v, 8 * v), "padding-bottom": isStr(v, 8 * v) }),
   m: v => ({ "margin": isStr(v, 8 * v) }),
   mt: v => ({ "margin-top": isStr(v, 8 * v) }),
   mr: v => ({ "margin-right": isStr(v, 8 * v) }),
   mb: v => ({ "margin-bottom": isStr(v, 8 * v) }),
   ml: v => ({ "margin-left": isStr(v, 8 * v) }),
   mx: v => ({ "margin-left": isStr(v, 8 * v), "margin-right": isStr(v, 8 * v) }),
   my: v => ({ "margin-top": isStr(v, 8 * v), "margin-bottom": isStr(v, 8 * v) }),
   radius: v => ({ "border-radius": isStr(v, 8 * v) }),
   borderRadius: v => ({ "border-radius": isStr(v, 8 * v) }),
   shadow: v => ({ "box-shadow": v }),
   flexBox: v => (v ? { "display": "flex" } : {}),
   flexRow: v => (v ? { "flex-direction": "row" } : {}),
   flexColumn: v => (v ? { "flex-direction": "column" } : {}),
   flexWraped: v => (v ? { "flex-wrap": "wrap" } : {}),
   direction: v => (v === 'row' || v === 'column' ? { "flex-direction": v } : { direction: v }),
   gap: v => ({ "gap": isStr(v, 8 * v) }),
};

export default aliases