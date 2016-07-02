# 简介 Introduction

## 关于样式表 Introduction To CSS

### 说明

本手册针对的是已有一定网页设计制作经验的读者。其目的是提供最新的样式表内容的快速索引及注释。所以对于样式表的基础知识，在此仅简单介绍，恕不赘述。 

### 什么是层叠样式表

>CSS是Cascading Style Sheet（层叠样式表）的缩写。是用于（增强）控制网页样式并允许将样式信息与网页内容分离的一种标记性语言。 
>CSS不需要编译,可以直接由浏览器执行(属于浏览器解释型语言)。 
>CSS2.1是目前被使用最广泛的版本，而目前还在开发中的CSS3具有更吸引人的特性。 
>本手册除了CSS2.1外，还涵盖了大部分的CSS3内容。但由于CSS3尚未定稿，不可避免会出现一些变动。

# 属性 Properties

## 定位 Positioning

### positon

**语法:**  
position：static | relative | absolute | fixed | center | page | sticky  
默认值：static  
适用于：除display属性定义为table-column-group | table-column之外的所有元素  
继承性：无  
动画性：否  
计算值：指定值  
媒体：视觉  

**取值**  
static： 对象遵循常规流。此时4个定位偏移属性不会被应用。   
relative： 对象遵循常规流，并且参照自身在常规流中的位置通过top，right，bottom，left这4个定位偏移属性进行偏移时不会影响常规流中的任何元素。   
absolute： 对象脱离常规流，此时偏移属性参照的是离自身最近的定位祖先元素，如果没有定位的祖先元素，则一直回溯到body元素。盒子的偏移位置不影响常规流中的任何元素，其margin不与其他任何margin折叠。   
fixed： 与absolute一致，但偏移定位是以窗口为参考。当出现滚动条时，对象不会随着滚动。   
center： 与absolute一致，但偏移定位是以定位祖先元素的中心点为参考。盒子在其包含容器垂直水平居中。（CSS3）   
page： 与absolute一致。元素在分页媒体或者区域块内，元素的包含块始终是初始包含块，否则取决于每个absolute模式。（CSS3）   
sticky： 对象在常态时遵循常规流。它就像是relative和fixed的合体，当在屏幕中时按常规流排版，当卷动到屏幕外时则表现如fixed。该属性的表现是现实中你见到的吸附效果。（CSS3）   

**说明**  
检索对象的定位方式。  
* 当position的值为非static时，其层叠级别通过z-index属性定义。
* 绝对定位的元素，在top，right，bottom，left属性未设置时，会紧随在其前面的兄弟元素之后，但在位置上不影响常规流中的任何元素。用这个特性你或许会干这样的事：
* 对应的脚本特性为position

<iframe width="100%" height="300" src="//jsrun.net/uaKKp/embedded/html,css,result/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### z-index

**语法**  

z-index: auto | (<int>)
