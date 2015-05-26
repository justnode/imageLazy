(function($){
    var defaults = {
        dataSrc : 'data-src', //存放图片真实地址的属性
        container : window, //图片的父容器
        vertical : true, //是否是纵向
        threshold : 0  //触发的距离
    }
    /**
     *  判断图片是否出现在可视区域内
     * @param  {[type]}  imgOffset    [图片距离文档顶部或左边的距离]
     * @param  {[type]}  container [window对象]
     * @return {Boolean}           [description]
     */
    function isVisible(imgOffset,container,options){
        var vertical = options.vertical
        var offset = vertical? container.scrollTop():container.scrollLeft()
        var winSize = vertical? container.height():container.width()
        return imgOffset > offset && imgOffset < (winSize + offset)
    }

    /**
     * 把图片的src替换为 data-src的值，实现图片的加载
     * @param  {[type]} elem    [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function loadImg(elem,options){
        var imgurl = elem.attr(options.dataSrc);
        elem.attr('src',imgurl);

    }
    /**
     * 给container添加事件绑定
     * @param  {[type]} elems      [description]
     * @param  {[type]} $container [description]
     * @param  {[type]} options    [description]
     * @return {[type]}            [description]
     */
    function bindEvent(elems,$container,options){
        $.each(['scroll','reset'],function(index,value){
            $container.on(value,function(){
                initImg(elems,$container,options)
            })
        })
    }
    /**
     * 判断图片是否在可视区域内,如果在则调用加载函数
     * @param  {[数组]} elems      [description]
     * @param  {[jQ对象]} $container [description]
     * @param  {[obj]} options    [description]
     * @return {[type]}            [description]
     */
    function initImg(elems,$container,options){
        for(var i=0,len=elems.length;i<len;i++){
            var elem = elems[i];
            var $elem = $(elem);
            var imgDataName = 'lazy_img';
            //如果图片不是懒加载的，就跳出循环
            if(!$elem.attr(options.dataSrc)) continue;

            //得到每个图片的offset值，并且缓存起来
            var imgOffset = $elem.data(imgDataName);
            if(imgOffset == undefined){
                imgOffset = options.vertical? $elem.offset()['top']:$elem.offset()['left'];
                $elem.data(imgDataName, imgOffset);
            }
            
            if(isVisible(imgOffset,$container,options)){
                loadImg($elem,options);
                $elem.removeData(imgDataName);
                elems.splice(i--,1);
            }
        }
    }
    $.fn.imgLoader = function(options){
        var options =  $.extend(defaults,options);
        var elems = $.makeArray($(this));
        var $container = $(options.container); 

        initImg(elems,$container,options);
        bindEvent(elems,$container,options);
    }
})(jQuery)
