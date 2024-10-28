'use client'
import React, { ReactElement, forwardRef } from 'react';
import Tag, { TagProps, TagComponentType } from './src/Tag';
import useInterface from './src/hooks/useInterface'
import { ThemeColor, useTheme } from './src';

export type ButtonProps<T extends TagComponentType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    size?: "small" | "medium" | "large";
    loading?: boolean;
    variant?: keyof ThemeColor;
    color?: string;
}


const _Button = <T extends TagComponentType = 'button'>({ children, ...props }: ButtonProps<T>, ref: React.Ref<any>) => {
    const theme = useTheme()

    let [{ variant, color, startIcon, endIcon, size, loading, ...rest }] = useInterface<any>("Button", props, {
        loading: false,
        size: "medium"
    } as any)

    rest.sx = (rest as any).sx || {};
    size = size ?? "medium"

    const sizes = {
        small: {
            px: 1.2,
            py: .5,
            fontSize: "block"
        },
        medium: {
            px: 2,
            py: 1,
        },
        large: {
            px: 2,
            py: 1,
            fontSize: "text"
        }
    }

    return (
        <Tag
            radius={1}
            component='button'
            border={0}
            cursor="pointer"
            fontSize="button"
            fontWeight="button"
            fontFamily="default"
            display="inline-flex"
            textTransform="uppercase"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            lineHeight="button"
            position="relative"
            overflow="hidden"
            transition=".2s"
            {...(sizes[size] || {})}
            {...rest}
            {...theme.colors[variant]?.template[color]}
            hover={{
                ...theme.colors[variant]?.template[color].hover,
                ...((rest as any).hover || {})
            }}
            disabled={loading ?? rest.disabled ?? false}
            ref={ref}
        >


            {startIcon && <Tag component='span' mr={1} ml={-.5} display="inline-block">{startIcon}</Tag>}
            {children}
            {endIcon && <Tag component='span' ml={1} mr={-.5} display="inline-block">{endIcon}</Tag>}
        </Tag>
    )
}
const Button = forwardRef(_Button) as typeof _Button
export default Button