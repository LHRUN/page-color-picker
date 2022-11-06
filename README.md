## 页面颜色选择器
纯JS实现的页面颜色选择器，只需在所需页面创建实例，然后在使用时调用`open`方法。  

预览地址：[https://songlh.top/page-color-picker/](https://songlh.top/page-color-picker/)
![](https://s1.ax1x.com/2022/11/05/xOoXo4.png)

### 使用说明
因为还未上传npm，如需导入使用，需要在packages/page-color-picker下执行构建命令，然后把构建后的文件移动到你的项目里，可按以下步骤操作
```
git clone https://github.com/LHRUN/page-color-picker.git
cd page-color-picker
pnpm install
cd packages/page-color-picker
pnpm run build
cp -r dist ”所需文件夹“
import { ColorPicker } from "所需文件夹/dist/index.js"
```

### Props

|  name   | desc  |  type   | defaultValue  |
|  ----  | ----  |  ----  | ----  |
| onChange  | 创建实例时传入，用于鼠标点击后获取颜色值 | (color: string) => void | undefined |

### Methods
|  name   | desc  |  type   |
|  ----  | ----  |  ----  |
| open  | 开启颜色选择器 | () => void |

### examples
```
git clone https://github.com/LHRUN/page-color-picker.git
cd page-color-picker
pnpm install
cd packages/examples
pnpm run dev
```

### 目录说明
```js
├─ packages
│  ├─ examples // 示例
│  └─ page-color-picker // 页面颜色选择器
│       ├─index.ts // ColorPicker 主逻辑实现
│       └─utils
│          ├─constant
│          ├─tools
│          └─types
│
// ...
```

### 实现逻辑
1. 所需页面创建实例，初始化数据
2. 需开启时调用open方法开启取色器，网页截屏生成canvas，初始化监听事件和浮动元素(放大镜)
3. 鼠标移动时根据坐标获取颜色数据修改放大镜颜色
4. 鼠标点击或者按Esc键后销毁
5. [颜色选择器的纯JS实现](https://lhrun.github.io//2022/11/05/%E9%A2%9C%E8%89%B2%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E7%BA%AFJS%E5%AE%9E%E7%8E%B0/)
