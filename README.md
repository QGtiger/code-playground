# 项目初始化

## tailwindcss

https://tailwindcss.com/docs/installation/using-postcss

编译用的 [@babel/standalone](https://babeljs.io/docs/babel-standalone)，这个是 babel 的浏览器版本

```
@babel/standalone
@types/babel__standalone

// 插件类型
@types/babel__core
```

URL.createObjectURL(new Blob([code1], { type: 'application/javascript' })); 解决文件引用问题

importmap 机制 解决 react， react-dom 问题

allotment https://www.npmjs.com/package/allotment 分割视图

@monaco-editor/react 作为编辑器

@typescript/ata 解决代码提示问题

错误提示 => window.parent.postMessage

tailwindcss 支持 => iframe 引入 tailwindcss 在线 cdn

## 分享

files 直接 复制到链接上，但是是明文的 而且，可能户提爱唱，这边就使用 [fflate](https://www.npmjs.com/package/fflate) 进行加密压缩
