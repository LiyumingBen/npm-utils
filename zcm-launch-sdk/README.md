#### 介绍

> 唤起招才猫 SDK
> 主暴露 1 个方法：
>
> 1. launchZCM(params)

```javascript
/**
 * @param { string }  schema      非必填  唤起招才猫的协议 (默认是唤起招才猫的协议，更多协议，查看备注[4])
 * @param { string }  channel     非必填  渠道号  用途： 埋点区分、下载招才猫渠道区分
 * @param { function } zcmDownCallback     非必填  下载招才猫回调函数
 * @param { function } zcmLaunchCallback   非必填  唤起招才猫回调函数
 */
```

#### 使用

##### 1. 安装（切换 58 源）

```shell
    npm i @58fe/zcm-launch-sdk
```

##### 2. 引入

```js
import { launchZCM } from "@58fe/zcm-launch-sdk";
```

##### 3. 备注：

[1] 如果需要在 58 同城 app 或者赶集 app 内拉起招才猫，则另需引入 58SDK: https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js

[2] 唤起招才猫的协议： http://iwiki.58corp.com/shorturl/2DlNd4A1kL

[3] 成功唤起招才猫 app 埋点为：zcm_642 其中 642 是渠道号， 格式 zcm_channel， 查询方式云窗 hive：hdp_58_cluster

容器支持：

微信、58、赶集、UC、QQ、华为、今日头条、支付宝、360、猎豹、搜狗、夸克等