
> 起因：个人开发过程经常会使用到Vue3+SpringBoot技术栈来开发项目，每次在项目初始化时都需要涉及一些重复的整理工作，于是结合一些个人觉得不错的前后端模板进行整合，打通一些大多数项目都需要的实现的基础功能，以便于快速开发项目。代码已按个人力所能及的规范编写，如有不足多多见谅~

# 一.功能预览

为了提高模板的通用性与精简性，只实现一些基础的功能：

- 登录 \ 注册
- 密码修改 \ 重置
- 用户管理（增删改分页）
- 个人信息查看 \ 修改
- 头像上传

## (1) 登录

登录、注册、修改密码、重置密码表单后端已实现基础的格式校验。
![输入图片说明](https://foruda.gitee.com/images/1691388952329134936/0c1d962f_11413979.png "1.png")


## (2) 注册

验证码方面都是采用邮箱验证码，可根据个人需要进行配置或者修改。参考博客：

- [手机验证码](https://blog.csdn.net/m0_66570338/article/details/129041619)
- [邮箱验证码](https://blog.csdn.net/m0_66570338/article/details/128994951)
![输入图片说明](https://foruda.gitee.com/images/1691388965068324703/c3afb9de_11413979.png "2.png")


## (3) 重置密码
![输入图片说明](https://foruda.gitee.com/images/1691388977196516660/a530b7ee_11413979.png "3.png")

## (4) 主页
![输入图片说明](https://foruda.gitee.com/images/1691388983721848967/c65d6b00_11413979.png "4.png")


## (5) 用户管理

基础的增删改查功能，包括图片上传（admin角色状态展示）

![输入图片说明](https://foruda.gitee.com/images/1691388992264506845/4e2e68d2_11413979.png "5.png")


## (6) 修改密码
![输入图片说明](https://foruda.gitee.com/images/1691388999027015483/2f139a28_11413979.png "6.png")


## (7) 个人信息
![输入图片说明](https://foruda.gitee.com/images/1691389007238320313/3e2be054_11413979.png "7.png")

## (8) 编辑个人信息
![输入图片说明](https://foruda.gitee.com/images/1691389014150446947/5d66e6e7_11413979.png "8.png")


# 二.必备配置

上述预览效果必要配置项：

- 前端
  - 使用如下指令安装依赖包即可 

```shell
# 1. 安装依赖包
pnpm install
# 2. 启动项目
pnpm dev
```

- 后端
  - 根据`/sql`目录下的`/create_table.sql`创建表
  - 修改`application.yml`文件中的 `MySQL数据库连接`、`Redis数据库连接`
  - 修改`/utils/CodeUtils.java`中的邮箱配置
  - 阿里云oss配置

# 三.代码说明

- 代码地址：[https://gitee.com/fspStudy/quick-develop-template.git   ](https://gitee.com/fspStudy/quick-develop-template.git) （前后端项目放在了同一个父目录中，可以根据需要分别管理）

- 前端模板基于[Pure Admin ](https://yiming_chang.gitee.io/pure-admin-doc/pages/introduction/#预览)进行二次开发，可以参考一下原始模板。
- 后端模板基于[b站程序员鱼皮编程导航](https://yupi.icu/)中的通用版本模板进行二次开发，星球质量非常赞，学编程的朋友可以去了解一下。

![输入图片说明](https://foruda.gitee.com/images/1691389022661012600/53bbf980_11413979.png "9.png")


