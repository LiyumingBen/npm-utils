#### 介绍

> 招才猫接口加密/解密 npm 包，加密实现方式同 zcm：https://ishare.58corp.com/articleDetail?id=37299
> 主暴露加解密接口/获取 uid 2 个方法：
>
> 1. http_secret_zcm({url, params = {}, req }) url 为 baseUrl，params 为请求参数， req 为 node 服务接收的 request 对象； 返回一个Promise对象
> 2. getUid() ，返回 uid

#### 使用

##### 1. 安装（切换 58 源）

```shell
    npm i @58fe/http-secret-zcm
```

##### 2. 引入

```js
	import { http_secret_zcm } from "@58fe/http-secret-zcm";
```