# 博客管理系统

学习 Node 时的一个全栈练手项目，可以实现对用户、文章、评论等维度的数据管理操作。

## 效果展示
> 录屏待补充

## 技术栈
**API**
- 框架：egg（洋葱模型）
- 存储：MongoDB，使用 mongoose 进行模型管理和数据操作
- 鉴权：采用 JWT 进行用户签名

**前端**
- 脚手架：umi
- UI 框架：React
- UI 组件库：antd
- 编程语言：TypeScript、CSS3、HTML5
- 状态管理库：zustand，目前用于用户信息的跨组件通信

## 项目启动

### 环境准备

- **Node 版本**：16

### Api

#### 安装依赖
```bash
cd api
yarn
```

#### 启动服务
```bash
yarn dev
```

### Web

#### 安装依赖
```bash
cd web
yarn
```

#### 启动服务
```bash
yarn dev
```


