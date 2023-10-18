import * as React from 'react';
import Tag, { TagProps, TagComponenntType } from '../../src/Tag';

export type ButtonProps<T extends TagComponenntType = 'button'> = TagProps<T> & {
    // Additional props specific to the Button component can be defined here
    datalist?: any
};

const Button = <T extends TagComponenntType = "button">({ children, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {

    return (
        <Tag
            component="button"
            interface="Button"
            border={0}
            color="color.primary.text"
            minWidth={100}
            height={40}
            radius={1}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            {...rest}
            hover={{
                bgcolor: "color.error",
                ...((rest as any).hover || {})
            }}

            ref={ref}
        >
            {children}
        </Tag>
    )
}
export default React.forwardRef(Button) as typeof Button
