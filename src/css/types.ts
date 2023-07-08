import * as CSS from 'csstype'
import { ThemeOptions } from '../theme';
import { ColorsRefTypes, BreakpointsType, ShadowRefTyeps, TypographyRefTypes } from '../theme/types';
type ValueType<T extends keyof CSS.Properties> = CSS.Properties[T] | ThemeOptions['breakpoints'] | number


export type AliasesTypes = {
    bgcolor?: ValueType<'background'> | ColorsRefTypes;
    bgImage?: ValueType<'backgroundImage'>;
    bg?: ValueType<'background'> | ColorsRefTypes;
    p?: ValueType<'padding'>;
    pt?: ValueType<'padding'>;
    pr?: ValueType<'padding'>;
    pb?: ValueType<'padding'>;
    pl?: ValueType<'padding'>;
    px?: ValueType<'padding'>;
    py?: ValueType<'margin'>;
    m?: ValueType<'margin'>;
    mt?: ValueType<'margin'>;
    mr?: ValueType<'margin'>;
    mb?: ValueType<'margin'>;
    ml?: ValueType<'margin'>;
    mx?: ValueType<'margin'>;
    my?: ValueType<'margin'>;
    size?: ValueType<'width'>;

    radius?: ValueType<'borderRadius'> | number;
    shadow?: ValueType<'boxShadow'> | ShadowRefTyeps;
    w?: ValueType<"width">;
    h?: ValueType<"height">;
    maxw?: ValueType<"width"> | BreakpointsType;
    minw?: ValueType<"width"> | BreakpointsType;
    maxh?: ValueType<"height">;
    minh?: ValueType<"height">;
    bgSize?: ValueType<'backgroundSize'>,
    bgPosition?: ValueType<'backgroundPosition'>,
    bgRepeat?: ValueType<'backgroundRepeat'>,
    border?: ValueType<'border'>;

    flexBox?: boolean;
    flexRow?: boolean;
    flexColumn?: boolean;
    flexWraped?: boolean;

    color?: ValueType<'color'> | ColorsRefTypes;
    width?: ValueType<'width'> | BreakpointsType;
    height?: ValueType<'height'> | BreakpointsType;
    borderColor?: ValueType<'backgroundColor'> | ColorsRefTypes;

    fontFamily?: ValueType<"fontFamily"> | "default-font-family";
    fontSize?: ValueType<"fontSize"> | TypographyRefTypes | "default-font-size";
    minWidth?: ValueType<"minWidth"> | BreakpointsType;
    maxWidth?: ValueType<"maxWidth"> | BreakpointsType;
    minHeight?: ValueType<"minHeight"> | BreakpointsType;
    maxHeight?: ValueType<"maxHeight"> | BreakpointsType;
}