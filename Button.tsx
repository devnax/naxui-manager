'use client'
import React, { ReactElement, forwardRef } from 'react';
import Tag, { TagProps, TagComponenntType } from './src/Tag';
import useInterface from './src/hooks/useInterface'

export type ButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    size?: "small" | "medium" | "large";
    loading?: boolean;
}


const _Button = <T extends TagComponenntType = 'button'>({ children, startIcon, endIcon, size, loading, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    size = size ?? "medium"

    const defaultProps = useInterface<ButtonProps>("Button", {
        loading: false,
        size: "large"
    }, {
        loading: false,
        // size: "small"
    })


    // console.log(defaultProps);

    const sizes = {
        small: {
            px: 1.2,
            py: .5,
            fontSize: "fontsize.block"
        },
        medium: {
            px: 2,
            py: 1,
        },
        large: {
            px: 2,
            py: 1,
            fontSize: "fontsize.text"
        }
    }

    return (
        <Tag
            component='button'
            border={0}
            cursor="pointer"
            typography="button"
            bgcolor="paper.main"
            color="text.main"
            display="inline-flex"
            textTransform="uppercase"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            lineHeight={!(startIcon || endIcon) ? 1.75 : "inherit"}
            position="relative"
            overflow="hidden"
            {...(sizes[size] || {})}
            {...rest}
            hover={{
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