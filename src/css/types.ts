import * as CSS from 'csstype'
import { ThemeOptions } from '../theme';
import { ColorsRefTypes, BreakpointsType, TypographyRefTypes, } from '../theme/types';

export type FN = (theme: ThemeOptions) => string | number
export type CSSBreakpointType = { [key in BreakpointsType]: string | number | FN }
export type CSSValueType<T extends keyof CSS.Properties> = CSS.Properties[T] | Partial<CSSBreakpointType> | number | FN

export type AliasesTypes = {
    bgcolor?: CSSValueType<'background'> | ColorsRefTypes;
    bgimage?: CSSValueType<'backgroundImage'>;
    bg?: CSSValueType<'background'> | ColorsRefTypes;
    p?: CSSValueType<'padding'>;
    pt?: CSSValueType<'padding'>;
    pr?: CSSValueType<'padding'>;
    pb?: CSSValueType<'padding'>;
    pl?: CSSValueType<'padding'>;
    px?: CSSValueType<'padding'>;
    py?: CSSValueType<'margin'>;
    m?: CSSValueType<'margin'>;
    mt?: CSSValueType<'margin'>;
    mr?: CSSValueType<'margin'>;
    mb?: CSSValueType<'margin'>;
    ml?: CSSValueType<'margin'>;
    mx?: CSSValueType<'margin'>;
    my?: CSSValueType<'margin'>;
    size?: CSSValueType<'width'>;
    spacing?: Partial<CSSBreakpointType> | number;

    radius?: CSSValueType<'borderRadius'> | number;
    borderRadius?: CSSValueType<'borderRadius'> | number;
    shadow?: CSSValueType<'boxShadow'> | number;
    w?: CSSValueType<"width">;
    h?: CSSValueType<"height">;
    maxw?: CSSValueType<"width"> | BreakpointsType;
    minw?: CSSValueType<"width"> | BreakpointsType;
    maxh?: CSSValueType<"height">;
    minh?: CSSValueType<"height">;

    flexBox?: boolean;
    flexRow?: boolean;
    flexColumn?: boolean;
    flexWraped?: boolean;
    direction?: "row" | "column" | CSSValueType<'direction'>;

    color?: CSSValueType<'color'> | ColorsRefTypes;
    width?: CSSValueType<'width'> | BreakpointsType;
    height?: CSSValueType<'height'> | BreakpointsType;
    borderColor?: CSSValueType<'backgroundColor'> | ColorsRefTypes;

    fontFamily?: CSSValueType<"fontFamily"> | "font-family";
    fontSize?: CSSValueType<"fontSize"> | TypographyRefTypes;
    minWidth?: CSSValueType<"minWidth"> | BreakpointsType;
    maxWidth?: CSSValueType<"maxWidth"> | BreakpointsType;
    minHeight?: CSSValueType<"minHeight"> | BreakpointsType;
    maxHeight?: CSSValueType<"maxHeight"> | BreakpointsType;
}