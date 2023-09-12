# naxui-manager

The [naxui-manager](https://www.npmjs.com/package/naxui-manager) is an innovative React library that revolutionizes the process of creating custom UI library. developers gain the freedom to define their own UI library from scratch, tailoring it to meet their specific project requirements. The process of creating a custom UI library becomes an enjoyable and efficient experience. 

The [naxui-manager](https://www.npmjs.com/package/naxui-manager) is using the [naxcss](https://www.npmjs.com/package/naxcss) library. which is very light and strong css library. 

## Table of Contents

- [Quick Start](#quick-start)
Create Component
  - [Tag](#tag)
  - [Creare First Component](#create-first-component)
  - [useProps](#useprops)
  - [useVariants](#usevariants)
  - [Props List](#props-list)
  - [Aliases](#aliases)
- Theme
  - [ThemeProvider](#themeprovider)
  - [createTheme](#createtheme)
  - [useTheme](#usetheme)
  - [changeTheme](#changetheme)
  - [modifyTheme](#modifytheme)
  - [mergeTheme](#mergetheme)
  - [Default Theme Option](#default-theme-option)
  - [SX Prop](#sx-prop)
  - [CSS Value](#css-value)
  - [Use Gradient](#use-gradient)
  - [css_option](#css_option)
  - [alpha](#alpha)
- Hooks
  - [useMediaScreen](#usemediascreen)
  - [useAnimation](#useanimation)
  - [useTransiton](#usetransiton)
  - [useTransitons](#usetransitons)
  - [useWindowResize](#usewindowresize)
  - [useWindow](#usewindow)
- [CSS](#css) - Learn the [naxcss](https://www.npmjs.com/package/naxcss)
- [Server Side Rendering](#server-side-rendering)
- [Typescript](#typescript)

## Quick Start

Install the package using npm or yarn in your project directory.

```bash
npm install naxui-manager
or
yarn add naxui-manager
```


## Tag
this is the base component you can use it to [create custom component](#create-first-component). 
```tsx
import { Tag } from 'naxui-manager'

const App = () => {
  return <Tag
    component="div"
    baseClass="my-comp" 
    classNames={["a", "b"]} // see naxcss classNames funcion
    sx={} // css style sheet
    typography="h1" // theme typography name
    hover={} // css style for hover effect
    spacing={} // children spacing (number | breackpoin)
    // you can also pass all the css property as attribute
  > My UI Library</Tag>
}

```



## Create First Component
Here is the example to create your custom `Button` component
```tsx
import * as React from 'react';
import {Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type ButtonProps<T extends TagComponenntType = 'button'> = TagProps<T> & {
    // Additional props specific to the Button component can be defined here
};

const Button = <T extends TagComponenntType = "button">({ children, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            component="button"
            border={0}
            minWidth={100}
            height={40}
            radius={1.5}
            cursor="pointer"
            typography="button"
            {...rest}
            hover={{
                bgcolor: alpha("color.primary", 1.2),
            }}
            sx={{
                transition: "background .3s",
            }}
            ref={ref}
        >
            {children}
        </Tag>
    )
}
export default React.forwardRef(Button) as typeof Button

```


## useProps
the `useProps` function is except an object where you can pass [css aliases](#aliases) and all others `css` attributes and also your component props. This function already used in `Tag` component.
```tsx
import {useProps} from 'naxui-manager'

const Child = (props) => {
  const {isShow, ...rest} = useProps(props)
  return (
    <div {...rest}>
      {isShow && <div>wellcome</div>}
    </div>
  )
}


const App = () => {
  return  (
    <div>
      <Child 
        isShow={true}
        bgcolor="red"
        padding={2}
        margin={3}
      />
    </div>
  )
}
```

## Props List
you can import the typescript type `CSSPropAsAttr` from `naxui-manager` to see what kind aliases and css props you can use as a component attribute.


## Aliases
In this library there are already included many css property aliases. If you want to use your more custom aliases then you can set `css_option` in [ThemeProvider](#themeprovider). If you don't know how to create an alias then you can learn about the [naxcss](https://www.npmjs.com/package/naxcss)

| Name  |  Description |
|---|---|
| `bgcolor` | `background-color`, you can pass string or theme colors name example: `primary`, `primary.color`|
| `bgimage` | `background-image` |
| `bg` | `background` |
| `p` | `padding`|
| `pt` |`paddng-top` |
| `pr` | `padding-right`|
| `pb` | `padding-bottom`|
| `pl` | `padding-left`|
| `px` | `paddingleft` and `padding-right`|
| `py` | `padding-top` and `padding-bottom`|
| `m` | `margin` |
| `mt` | `margin-top`|
| `mr` | `margin-right`|
| `mb` | `margin-bottom`|
| `ml` | `margin-left`|
| `mx` | `margin-left` and `margin-right` |
| `my` | `margin-top` and `margin-bottom`|
| `radius` | `border-radius`, if you pass a number then it will multiply with `8`|
| `shadow` | `box-shadow`, you can pass number, string or theme shadows, example: `shadow.1`, `shadow.2`|
| `border` | `border`|
| `w` | `width` |
| `h` | `height` |
| `maxw` | `max-width`|
| `minw` | `min-width`|
| `maxh` | `max-height`|
| `minh` | `min-height`|
| `flexBox` | `display: flex`|
| `flexRow` | `flex-direction: row`|
| `flexColumn` | `flex-direction: column`|
| `flexWraped` | `flex-wrap: wrap`|



## ThemeProvider
The `ThemeProvider` component to handle the theme. you must be call this at the root of the app. you can pass the `css_option` and `defaultFontFamily` in this component.

```tsx
import {ThemeProvider} from 'naxui-manager'

const App = () => {
  return (
    <ThemeProvider css_option={{...naxcss_option}} defaultFontFamily="Inter" defaultTheme="default">
      <div>Hello<div>
    </ThemeProvider>
  )
}
```



## createTheme
With this function you can create your own theme. You can pass `name`  and some `theme option` props. The props will merge with default theme.

```js
import {createTheme} from 'naxui-manager'

createTheme("my-theme", {...themeOption})

```

## useTheme and getTheme
You can read the theme in your component by using these function. If you are usign `useTheme`, If the theme is change then the component will re-render. but the `getTheme` will not do any thing. you just read the theme only.

```js
import {useTheme, getTheme} from 'naxui-manager'

const theme = useTheme()

```

## changeTheme
You can change the theme by calling this function. you have to pass the theme name which you want to change.

```js
import {changeTheme} from 'naxui-manager'

changeTheme("my-theme")

```


## modifyTheme
Sometime you need to modify the existing theme then you can use this function. like you want to modidy the `default` theme primary color and others.

```js
import {modifyTheme} from 'naxui-manager'

modifyTheme("default", {
  colors: {
    primary: {
      color: "red",
      text: "#fff"
    }
  }
})

```

## mergeTheme
This is a optional function. If you need then you can use this function to merge two theme

```js
import {mergeTheme} from 'naxui-manager'

mergeTheme(theme1, theme2)

```

## Default Theme Option


{
<details>
  <summary>name</summary>

  theme name `string`, the default the name is `default` and the default dark theme name is `default-dark`
  ```js
    name: "my-theme"
  ```
</details>
<details>
  <summary>breakpoints</summary>

  ```js
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  }
  ```
</details>
<details>
  <summary>globalStyle</summary>

  If you are add some css in `globalStyle` and that will load at the header globally.

  ####  Example
  ```js
    globalStyle: {
      body: {
        p: 0,
        m: 0        
      }
    }
  ```
</details>
<details>
  <summary>colors</summary>

  In the theme already has some predefine color pallate. here is the list.

  ```js
    colors: {
      common: "#FFFFFF",
      paper: "#f3f3f3",
      divider: "#ededed",
      text: "#111111",
      subtext: "#666666"
      primary: {
        color: "#2563eb",
        text: '#ffffff',
      },
      secondary: {
        color: '#0d9488',
        text: '#ffffff',
      },
      success: {
        color: "#16a34a",
        text: '#ffffff',
      },
      error: {
        color: '#dc2626',
        text: '#ffffff',
      },
      warning: {
        color: "#d97706",
        text: '#ffffff',
      }
    }
  ```
</details>
<details>
  <summary>typography</summary>

  Theme typography option. in the `scale` you can set the typography scale.

  ```js
  typography: {
    fontFamily: '"Inter","Helvetica","Arial",sans-serif',
    h1: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.h1',
      color: "color.text"
    },
    h2: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.h2',
      color: "color.text"
    },
    h3: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.h3',
      color: "color.text"
    },
    h4: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.h4',
      color: "color.text"
    },
    h5: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.h5',
      color: "color.text"
    },
    h6: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.h6',
      color: "color.text"
    },
    text: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.text',
      fontWeight: 400,
      color: "color.text"
    },
    subtext: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.text',
      fontWeight: 400,
      color: "color.subtext"
    },
    button: {
      fontFamily: 'typography.font-family',
      fontSize: 'fontsize.button',
      fontWeight: 500,
      textTransform: "uppercase",
    }
  }
  ```
</details>
<details>
  <summary>shadows</summary>

  Theme default shadows.

  ```js
  shadows: {
    1: "0 1px 2px 0 rgb(0 0 0 / 0.05);",
    2: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
    3: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
    4: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
    5: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
    6: "0 25px 50px -12px rgb(0 0 0 / 0.25);",
    7: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
    8: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
    9: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
    10: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px"
  }
  ```
</details>
<details>
  <summary>interfaces</summary>

  Interface is just an object. You can set global props for a component. so when you are creating a component at that time you can use this props by `getTheme()`

  ```js
  interfaces: {
    // Example
    Button: (userProps) => {
      return {
        ...
      }
    }
  },
  ```
</details>
}



## SX Prop
The sx prop is a shortcut for defining custom styles.

```tsx
<MyComp 
  sx={{ 
    bgcolor:"red",

    // use theme prop
    bgcolor:"color.primary",

    // responsive
    bgcolor: {
      sm: "red",
      md: (theme) => theme.colors.primary.color,
    },

    // function
    bgcolor: (theme) => theme.colors.error.color
  }} 
/>

```




## CSS Value
There are many way to pass css value. `string`, `number`, `breakpoint` or `function`. in the `string` you can pass string value and also theme prop. with the `breakpoint` you can do responsive design. and the `function` you can read the theme and return the value.

`Example`
```jsx
<MyComp 
  bgcolor="red"
  
  // use theme prop
  bgcolor="color.primary"

  // responsive
  bgcolor={{
    sm: "red",
    md: (theme) => theme.colors.primary.color
  }}

  // function
  bgcolor={(theme) => theme.colors.error.color}
/>
```
Here you can see the value  is `color.primary` so it will automatically get the theme primary.color color. in this way you can use everything from theme. like you want to use the `shadow` so you can pass the value `shadow.1`.




## Use Gradient
How you can use the `gradient color`. you can use the geadient in `background` and text `color`
```jsx
<MyComp 
  // use theme color props
  bgcolor="linear(90deg, primary, color.secondary)"
  // use rgb or hex
  bgcolor="linear(90deg, rgb(255, 0, 0), color.secondary  20%)"

  // text color
  color="redial(90deg, primary, color.secondary)"
  // use rgb or hex
  color="redial(90deg, rgb(255, 0, 0), color.secondary  20%)"
/>
```



## css_option
this is a function where the customized the `naxcss` option. If you need it you can use it.

## alpha
customize you color. first argument you can pass the color name or hex and the second arg you can pass `0-2` this number will present the color light to dark and `1` will present the same color which you pass in first arg.
```tsx
import {alpha} from 'naxui-manager'

<Tag 
  bgcolor={alpha("color.primary", .3)}
/>

```

## useMediaScreen
this hook help you to responsive.
```ts
import {useMediaScreen} from 'naxui-manager'

const screen = useMediaScree()
screen.is("xs" | "sm" | "md" | "lg" | "xl" | number)
screen.isDown("xs" | "sm" | "md" | "lg" | "xl" | number)
screen.isUp("xs" | "sm" | "md" | "lg" | "xl" | number)

```


## useAnimation
you can create attractive animation with css `keyframes`
```ts
import {useAnimation} from 'naxui-manager'

const classname = useAnimation({
  from: {},
  to: {},
  delay: 0,
  duration: 600,
  ease: "ease" | "easeIn" | "easeOut" | "easeInOut" | "linear" | "bouncEaseIn" | "bounceEaseOut", 
  onStart: () => {},
  onFinish: () => {}
})

```
## useTransiton
create css transition
```ts
import {useTransiton} from 'naxui-manager'

const [ref, classname] = useTransiton({
  initial: {},
  from: {},
  to: {},
  delay: 0,
  duration: 600,
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)", // optional
  easing: "easeInOut"| "easeOut"| "easeIn"| "sharp"| "linear"| "bounceEaseOut", 
  onStart: () => {},
  onFinish: () => {}
})
```

## useTransitons
You can use with some predefined transitions. you can use them with this function.
```ts
import {useTransitons} from 'naxui-manager'

let type = "fade" //or "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"
// or
let type = (transitionBoxInfo) => {
  return {
    in: {
      from: {},
      to: {}
    },
    out: {
      from: {},
      to: {}
    }
  }
}
let In = true
const [ref, classname] = useTransitons(type, In, {
  delay: 0,
  duration: 600,
  ease: "ease" | "easeIn" | "easeOut" | "easeInOut" | "linear" | "bouncEaseIn" | "bounceEaseOut", 
  onStart: () => {},
  onFinish: () => {}
})
```

## useWindowResize
this hook expect a callback and when the screen is resizing at that time the callback will firing.
```ts
import {useWindowResize} from 'naxui-manager'
useWindowResize(() => {
  ...
})
```


## isWindow
this hook will help to get the `window`. so you can work with server side and client side.
```ts
import {isWindow} from 'naxui-manager'

const win = isWindow()
if(win){
  // then  do something
}

```

## css
You can learn the [naxcss](https://www.npmjs.com/package/naxcss). and you must need to import them from `naxui-manager`

```js
import {css, keyframes, alpha} from 'naxui-manager'

```

## Server Side Rendering
You can learn the [naxcss](https://www.npmjs.com/package/naxcss#server-side-rendering) for server side rendering or you can use a function `serverStyleTags` to render server-side style tags. If you are using the `nextjs` then you can call this in the `__document.ts` or `useServerInsertedHTML` registry.

```js
import {serverStyleTags} from 'naxui-manager'

const styles = serverStyleTags()

```

## Typescript
You can directly import typescript types from the library. 
