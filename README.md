# naxui-manager

The [naxui-manager](https://www.npmjs.com/package/naxui-manager) is an innovative React library that revolutionizes the process of creating custom UI library. developers gain the freedom to define their own UI library from scratch, tailoring it to meet their specific project requirements. The process of creating a custom UI library becomes an enjoyable and efficient experience. 

The [naxui-manager](https://www.npmjs.com/package/naxui-manager) is using the [naxcss](https://www.npmjs.com/package/naxcss) library. which is very light and strong css library. 

## Table of Contents

- [Quick Start](#quick-start)
Create Component
  - [Tag](#tag)
  - [Creare First Component](#create-first-component)
  - [useProps](#useprops)
  - [useVariant](#usevariant)
  - [Props List](#props-list)
  - [Aliases](#aliases)
- Theme
  - [ThemeProvider](#themeprovider)
  - [createTheme](#createtheme)
  - [useTheme](#usetheme)
  - [changeTheme](#changetheme)
  - [mergeTheme](#mergetheme)
  - [Default Theme Option](#default-theme-option)
  - [SX Prop](#sx-prop)
  - [CSS Value](#css-value)
  - [Use Gradient](#use-gradient)
  - [css_option](#css_option)
- Hooks
  - [useMediaScreen](#usemediascreen)
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
    sx={} // css style sheet
    typography="h1" // theme typography name
    hover={} // css style for hover effect
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
                bgcolor: "primary.dark",
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




## useVariants
the `useVariant` hook you can use to get the color variant.

```tsx
import {useVariant} from 'naxui-manager'


// variants: containe | outline | text
// colors: "primary" | "secondary" | "success" | "error" | "warning"
const css = useVariant("containe", color: "primary")

// custom variant and ts
type MoreVariants = "A" | "B"
const css = useVariant<MoreVariants>("containe", "primary", (variant, color) => {
  switch(variant){
    case "A":
      return {} // CSS Props
      break;
    case "B":
      return {}
      break;
  }
})

```


## Props List
you can import the typescript type `CSSPropAsAttr` from `naxui-manager` to see what kind aliases and css props you can use as a component attribute.


## Aliases
In this library there are already included many css property aliases. If you want to use your more custom aliases then you can set `css_option` in [ThemeProvider](#themeprovider). If you don't know how to create an alias then you can learn about the [naxcss](https://www.npmjs.com/package/naxcss)

| Name  |  Description |
|---|---|
| `bgcolor` | `background-color`, you can pass string or theme colors name example: `primary`, `primary.main`|
| `bgImage` | `background-image` |
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
| `shadow` | `box-shadow`, you can pass string or theme shadows, example: `shadow.1`, `shadow.2`|
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
    <ThemeProvider css_option={{}} defaultFontFamily="Inter">
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
  <summary>color</summary>

  In the theme already has some predefine color pallate. here is the list.

  ```js
    color: {
      background: {
        main: "#ffffff",
        light: "#f5f5f5",
        dark: "#e9e9e9"
      },
      text: {
        primary: "#111111",
        secondary: "#666666"
      },
      primary: {
        light: "#60a5fa",
        dark: "#2563eb",
        main: "#205fff",
        text: '#eff6ff',
      },
      secondary: {
        light: "#2dd4bf",
        dark: "#0d9488",
        main: '#14b8a6',
        text: '#f0fdfa',
      },
      success: {
        light: "#4ade80",
        dark: "#16a34a",
        main: "#22c55e",
        text: '#f0fdf4',
      },
      error: {
        light: "#f87171",
        dark: "#b91c1c",
        main: '#ef4444',
        text: '#fef2f2',
      },
      warning: {
        light: "#ff9800",
        dark: "#e65100",
        main: "#f97316",
        text: '#fff7ed',
      },
      grey: {
        1: "#f9fafb",
        2: "#f3f4f6",
        3: "#e5e7eb",
        4: "#d1d5db",
        5: "#9ca3af",
        6: "#6b7280",
        7: "#4b5563",
        8: "#374151",
        9: "#1f2937",
        10: "#111827",
      }
    }
  ```
</details>
<details>
  <summary>typography</summary>

  Theme typography option. in the `scale` you can set the typography scale.

  ```js
  typography: {
    scale: {

      /*
      - All scale names
      minor-second
      major-second
      Minor-third
      major-third
      perfect-fourth
      augmented-fourth
      perfect-fifth
      golden-ratio
      */
      name: "major-third",
      baseFontSize: 15,
      sizes: []
    },
    h1: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.7',
      color: "text.primary"
    },
    h2: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.6',
      color: "text.primary"
    },
    h3: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.5',
      color: "text.primary"
    },
    h4: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.4',
      color: "text.primary"
    },
    h5: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.3',
      color: "text.primary"
    },
    h6: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.2',
      fontWeight: 600,
      color: "text.primary"
    },
    text: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.1',
      fontWeight: 400,
      color: "text.primary"
    },
    subtext: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.1',
      fontWeight: 400,
      color: "text.secondary"
    },
    button: {
      fontFamily: 'font-family',
      fontSize: 'fontsize.1',
      fontWeight: 400,
      color: "primary.text",
      bgcolor: "primary.main"
    }
  }
  ```
</details>
<details>
  <summary>shadow</summary>

  Theme default shadows.

  ```js
  shadow: {
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
    bgcolor:"primary.main",

    // responsive
    bgcolor: {
      sm: "red",
      md: (theme) => theme.color.primary.main,
    },

    // function
    bgcolor: (theme) => theme.color.error.main
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
  bgcolor="primary.main"

  // responsive
  bgcolor={{
    sm: "red",
    md: (theme) => theme.color.primary.main
  }}

  // function
  bgcolor={(theme) => theme.color.error.main}
/>
```
Here you can see the value  is `primary.main` so it will automatically get the theme primary.main color. in this way you can use everything from theme. like you want to use the `shadow` so you can pass the value `shadow.1`.




## Use Gradient
How you can use the `gradient color`. you can use the geadient in `background` and text `color`
```jsx
<MyComp 
  // use theme color props
  bgcolor="linear(90deg, primary, secondary.main)"
  // use rgb or hex
  bgcolor="linear(90deg, rgb(255, 0, 0), secondary.main 20%)"

  // text color
  color="linear(90deg, primary, secondary.main)"
  // use rgb or hex
  color="linear(90deg, rgb(255, 0, 0), secondary.main 20%)"
/>
```



## css_option
this is a function where the customized the `naxcss` option. If you need it you can use it.


## useMediaScreen
this hook help you to responsive.
```ts
import {useMediaScreen} from 'naxui-manager'

const screen = useMediaScree()
screen.is("xs" | "sm" | "md" | "lg" | "xl" | number)
screen.isDown("xs" | "sm" | "md" | "lg" | "xl" | number)
screen.isUp("xs" | "sm" | "md" | "lg" | "xl" | number)

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
You can learn the [naxcss](https://www.npmjs.com/package/naxcss#server-side-rendering) for server side rendering or you can use a `component` from this library. you need to call `ServerStyles` at the root of your project. If you are using the `nextjs` then you can call this in the `__document.ts` or `useServerInsertedHTML` registry.

```js
import {ServerStyles} from 'naxui-manager'

<ServerStyles />

```

## Typescript
You can directly import typescript types from the library. 
