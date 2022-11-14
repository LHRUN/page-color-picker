<h1 align="center">page-color-picker</h1>
<div align="center">

  The page color picker implemented by js only, just create an instance on the required page, Then call the `open` method when using

</div>

## Preview

Link: [https://songlh.top/page-color-picker/](https://songlh.top/page-color-picker/)

![](https://s1.ax1x.com/2022/11/05/xOoXo4.png)

## Usage

Because not uploaded to npm, it needs to be built in `packages/page-color-picker`

```bash
git clone https://github.com/LHRUN/page-color-picker.git
cd page-color-picker
pnpm install
cd packages/page-color-picker
pnpm run build
cp -r dist "<folder>"
```

and import

```js
import { ColorPicker } from "<folder>/dist/index.js"
```

## Props

|  name   | desc  |  type   | defaultValue  |
|  ----  | ----  |  ----  | ----  |
| `onChange`  | mouse click callback | (color: string) => void | undefined |

## Methods
|  name   | desc  |  type   |
|  ----  | ----  |  ----  |
| `open`  | open color picker | () => void |

## examples
```bash
git clone https://github.com/LHRUN/page-color-picker.git
cd page-color-picker
pnpm install
cd packages/examples
pnpm run dev
```

## file list
```js
├─ packages
│  ├─ examples
│  └─ page-color-picker
│       ├─index.ts // ColorPicker class
│       └─utils
│          ├─constant
│          ├─tools
│          └─types
│
// ...
```

## Document
[颜色选择器的纯JS实现](https://lhrun.github.io//2022/11/05/%E9%A2%9C%E8%89%B2%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E7%BA%AFJS%E5%AE%9E%E7%8E%B0/)
