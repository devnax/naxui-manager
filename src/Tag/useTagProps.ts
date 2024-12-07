import * as React from 'react';
import { classNames as mergecls } from 'naxcss';
import { TagComponentType, TagProps, TagPropsRoot } from '.';
import { CSS_PROP_LIST } from './parceProps';
import { css } from '../css';

const useTagProps = <T extends TagComponentType = "div">(props: TagPropsRoot<T>): TagProps<T> => {

   let f = React.useMemo(() => {
      let _css: any = props.sxr || {}
      let keys: any = []

      for (let prop in props) {
         if (prop === 'sxr' || prop === 'baseClass' || prop === 'classNames') {
            continue;
         } else if (prop === 'sx') {
            _css = {
               ..._css,
               ...(props as any).sx
            }
         } else if (prop === 'hover') {
            _css['&:hover'] = props.hover
         } else if (CSS_PROP_LIST[prop]) {
            _css[prop] = (props as any)[prop]
         } else {
            keys.push(prop)
         }
      }

      return {
         keys,
         cls: mergecls([
            props.baseClass ? "nui-" + props.baseClass : "",
            ...props.classNames || [],
            Object.keys(_css).length ? css(_css) : "",
            props.className
         ])
      }
   }, [JSON.stringify(props)]);

   const _props: any = {};
   for (let prop of f.keys) {
      _props[prop] = (props as any)[prop]
   }
   if (f.cls) {
      _props.className = f.cls
   }
   return _props
}


export default useTagProps