#### 介绍

> 招才猫 中接口传输字段加密/解密 npm 包，加密实现方式同 zcm：https://ishare.58corp.com/articleDetail?id=37299
> 主暴露加密/解密/获取 uid 3 个方法：
>
> 1. encode(data)，data 为需要加密的参数，一般为 JSON 对象，返回加密后的字段；
> 2. decode(data) ，data 为需要解密的字段，一般为服务端返回的加密字符串,返回解密后的真实数据
> 3. getUid() ，返回 uid

#### 使用

##### 1. 安装（切换 58 源）

```shell
    npm i @58fe/zcm-secret
```

##### 2. 引入

```js
	import { encode, decode } from "@58fe/zcm-secret";
```