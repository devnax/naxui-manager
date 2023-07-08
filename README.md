# naxui-manager

The [naxui-manager](https://www.npmjs.com/package/naxui-manager) is an innovative React library that revolutionizes the process of creating custom UI library. developers gain the freedom to define their own UI library from scratch, tailoring it to meet their specific project requirements. The process of creating a custom UI library becomes an enjoyable and efficient experience. 

The [naxui-manager](https://www.npmjs.com/package/naxui-manager) is using the [naxcss](https://www.npmjs.com/package/naxcss) library. which is very light and strong css library. 

## Table of Contents

- [Quick Start](#quick-start)
Create Component
  - [Tag](#tag)
  - [Creare First Component](#create-first-component)
  - [useProps](#useProps)
  - [Props List](#props-list)
  - [Aliases](#aliases)
- Theme
  - [ThemeProvider](#themeprovider)
  - [createTheme](#createtheme)
  - [useTheme](#usetheme)
  - [changeTheme](#changetheme)
  - [mergeTheme](#mergetheme)
  - [Default Theme Option](#default-theme-option)
- [CSS](#css) - Learn the [naxcss](https://www.npmjs.com/package/naxcss)
- [Server Side Rendering](https://www.npmjs.com/package/naxcss#server-side-rendering)
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
  return <Tag> My UI Library</Tag>
}

```



## Create First Component
Here is the example to create your custom `Button` component
```tsx
import * as React from 'react';
import Tag, { TagProps, TagComponenntType } from 'naxui-manager';

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
            display="flex"
            flexDirection="row"
            alignItems="center"
            {...rest}
            hover={{
                bgcolor: "primary.dark",
                ...((rest as any).hover || {})
            }}
            sx={{
                transition: "background .3s",
                ...((rest as any).sx || {})
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
The `ThemeProvider` component to handle the theme. you must be call this at the root of the app. you can pass the `css_option` in this component which will work for all the css rendering.
```tsx
import {ThemeProvider} from 'naxui-manager'

const App = () => {
  return (
    <ThemeProvider>
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
This is a optional function. If you need then you can use this function to merge two them

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
        secondary: "#666666",
        disabled: "#999999"
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
    fontFamily: '"Inter","Helvetica","Arial",sans-serif',
    fontSize: 16,
    h1: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.7',
      color: "text.primary"
    },
    h2: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.6',
      color: "text.primary"
    },
    h3: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.5',
      color: "text.primary"
    },
    h4: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.4',
      color: "text.primary"
    },
    h5: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.3',
      color: "text.primary"
    },
    h6: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.2',
      fontWeight: 600,
      color: "text.primary"
    },
    text: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.1',
      fontWeight: 400,
      color: "text.primary"
    },
    subtext: {
      fontFamily: 'default-font-family',
      fontSize: 'fontsize.1',
      fontWeight: 400,
      color: "text.secondary"
    },
    button: {
      fontFamily: 'default-font-family',
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


## css
You can learn the [naxcss](https://www.npmjs.com/package/naxcss). and you must need to import them from `naxui-manager`

```js
import {css, keyframes, alpha} from 'naxui-manager'

```

## Typescript
You can directly import typescript types from the library. 
