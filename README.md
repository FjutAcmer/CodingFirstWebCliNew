# 一码当先 | CodingFirst 在线评测系统 Web 客户端（新版，采用 Quasar 组件构建）

## 介绍

一码当先 | CodingFirst 在线评测系统 Web 新版客户端，采用 Quasar 组件构建

## 软件架构

1. 项目采用 Vue.js 编写，利用 Quasar cli 进行了构建
2. 为了符合国内习惯，引入了部分 ElementUI 的组件
3. 采用了 Echarts 作为图表内容的展示
4. 开发环境和部署环境进行了自动分离

## 开发教程

1. 下载并安装 VSCode 或者 WebStorm，并安装好开发 VUE 项目的必要插件
2. 下载并安装好 NodeJs，并配置好环境变量
3. 运行安装依赖命令

```bash
npm install
```

4. 运行测试服务器命令

```bash
npm run dev
```

## 部署教程

> 需在 CentOS7 操作系统下，其他操作系统类似

1. 在服务器中安装好 Docker、NodeJS 等必要环境
2. 手动运行项目根目录下的 deploy.sh（也可以采用 jenkins 自动化构建）

## 参与贡献

1. Fork 本仓库，建立自己的分仓库；
2. 新建分支，编写自己的代码；
3. 提交代码到自己的分仓库中；
4. 新建 Pull Request，提请提交到主仓库中；
5. 主仓库审核完毕，即可并入主仓库主线；
6. 主仓库审核失败，退回。
