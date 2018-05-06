# youzan
> 本项目使用Vue重构了有赞商城，基本实现了商城首页、商品分类页、商品详情页、购物车页及地址管理页的主要功能。采用RAP接口管理平台模拟后台数据，使用vue-router实现了新增地址、编辑地址的路由变化。
## 商城首页
![youzan-home](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-home.png)
+ 使用mint-ui infinityScroll插件实现下拉加载功能
+ 将轮播图抽离成一个组件，引入swiper插件实现轮播效果
+ 底部导航条抽出来作为组件

## 商品分类页
![youzan-category](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-category.png)
+ 底部导航条使用之前抽离出来的组件

## 商品详情页
![youzan-details](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-details.png)
+ 顶部轮播采用之前抽离出来的轮播插件

## 购物车页
![youzan-cart](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-cart.png)
![youzan-cart2](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-cart2.png)
+ 结算状态下，实现商品选择、店铺选择、全选之间的切换, 在商品上左滑出现删除按钮，右滑回到之前的状态
+ 编辑状态下，只能编辑当前店铺下的商品

## 地址管理页
![youzan-address](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-address.png)
![youzan-address2](https://github.com/zouyg/youzan/blob/master/screenshots/youzan-address2.png)
+ 使用vue-router实现了新增地址、编辑地址的路由变化



