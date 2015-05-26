##基于jQuery的图片懒加载插件

###简介
当页面中的图片数量很多时，我们没必要一次把所有的图片就加载进来，只需要先把可视区域中的图片加载进来。此插件就是为了实现这个功能而编写的。

此插件充分利用jQuery的缓存机制，做了很多的性能优化，减少了大量的DOM操作，使得页面性能大幅提高，尤其是当页面中图片数量较多时，使用此插件不会有卡顿的感觉。
###demo示例：
[水平滚动](http://itkaoyan.cn/zui/demo/imageLazy/test/horizontal.html)   
[垂直滚动](http://itkaoyan.cn/zui/demo/imageLazy/test/verticle.html)
###API
 - container：指定包含图片的容器，默认值为window
 - verticle：值为true时表示垂直滚动
 - dataSrc: img元素中存放图片地址的属性，默认为data-src
 - threshold : 触发距离，默认为0

###示例：
在html中的img标签可以这样写：`<img src="占位图片的地址" data-src="图片的真实地址">`

js调用的代码,在此之前需要引入jQuery和此插件

```js
//使用默认值的情况
$('img').imgLoader({
	//如果不传参，那么会使用默认值
})

//传递参数的情况
$('selector.img').imgLoader({
	vertical: false, //表示水平滚动
    container: selector
})

```
