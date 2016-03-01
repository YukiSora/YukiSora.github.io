---
layout: article
title: "Javascript DOM"
date: 2016-03-01 16:29:19 +0800
categories: development
---

Handling DOM is one of the basic usage of JavaScript. The Document Object Model(DOM) is a platform- and language-neutral interface that will allow programs and scripts to dynamically access and update the content, structure and style of documents.

## 获取元素

### getElementByID

返回指定 ID 的对象。

{% highlight javascript %}
document.getElementByID("ID");
{% endhighlight %}

### getElementsByTagName

返回指定 tag 的对象数组，就算只有 1 个元素也是返回对象数组。

{% highlight javascript %}
document.getElementsByTagName("tag");
{% endhighlight %}

可以使用通配符 *，这样会返回包含所有节点的对象数组。

{% highlight javascript %}
document.getElementsByTagName("*");
{% endhighlight %}

### getElementsByClassName

返回指定 class 的对象数组，它可以查找带有多个 class 的元素，class 顺序无影响。

{% highlight javascript %}
document.getElementsByTagName("class1 class2");
{% endhighlight %}

这是 HTML5 新增的方法，可能无法使用，所以要向后兼容。

{% highlight javascript %}
function getElementsByClassName (node, classname) {
    if (node.getElementByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var results = new Array();
        var elements = node.getElementsByTagName('*');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className.indexOf(classname) != -1) {
                results[results.length] = elements[i];
            }
        }
        return results;
    }
}
{% endhighlight %}

### childNodes

返回某元素的所有子节点的对象数组。

{% highlight javascript %}
element.childNodes;
{% endhighlight %}

也可以直接返回第一个或最后一个子节点对象。

{% highlight javascript %}
element.firstChild;
element.lastChild;
{% endhighlight %}

但是它返回的不仅仅包括元素节点，还有属性节点和文本节点。文件里的每一个空格或换行都会被当作节点。

用 nodeType 可以判断是哪一种节点。元素节点的 nodeType 是 1，属性节点的 nodeType 是 2，文本节点的 nodeType 是 3，除此之外还有 9 个无意义的 nodeType。

元素节点的第一个子节点通常是文本节点。

{% highlight javascript %}
node.nodeType;
{% endhighlight %}

用 nodeName 可以返回节点是什么元素，返回值是大写的 HTML 元素。

{% highlight javascript %}
node.nodeName;
{% endhighlight %}

### parentNode

返回某节点的父元素节点对象，父节点只能为元素节点。

{% highlight javascript %}
element.parentNodes;
{% endhighlight %}

### nextSibling

返回某节点的下一个兄弟节点对象。

{% highlight javascript %}
element.nextSibling;
{% endhighlight %}

### previousSibling
返回某节点的前一个兄弟节点对象。

{% highlight javascript %}
element.previousSibling;
{% endhighlight %}

---

## 获取和设置节点的值

### nodeValue

只有当节点是文本节点的时候才能获取到文本。返回的值是可写的。

{% highlight javascript %}
node.nodeValue;
{% endhighlight %}

元素节点需要先获取到文本子节点，然后才能获取文本，否则返回 NULL。

{% highlight javascript %}
node.childNodes[0].nodeValue;
{% endhighlight %}

---

## 获取和设置属性

### getAttribute

获取元素节点对象的属性的值，如果没有指定属性则返回 NULL。

{% highlight javascript %}
object.getAttribute("attribute");
{% endhighlight %}

### setAttribute

设置元素节点对象的属性的值。

{% highlight javascript %}
object.setAttribute("attribute", "value");
{% endhighlight %}

### className

获取或设置 class 属性。

{% highlight javascript %}
element.className
{% endhighlight %}

但是这样只是替换 class 而不是追加，需要连接字符串。

{% highlight javascript %}
element.className += " className"
{% endhighlight %}

但是如果没有 class 就会返回 null，所以需要自己写一个函数。

{% highlight javascript %}
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        element.className += " " + value;
    }
}
{% endhighlight %}

### style

返回一个 style 属性，但是这样只能获得内嵌样式，外部样式式无法获得的。所以在获取样式方面它没有什么用，但是可以用来设置样式。

{% highlight javascript %}
element.style.property
{% endhighlight %}

---

## 动态创建标记

### createElement

创建元素节点，nodeName 需要用引号扩起来，大小写均可。

{% highlight javascript %}
document.createElement("nodeName");
{% endhighlight %}

### createTextNode

创建文本节点

{% highlight javascript %}
document.createTextNode("text");
{% endhighlight %}

### appendChild

将节点添加为某节点的子节点,元素节点要添加文字节点也要这么做。

{% highlight javascript %}
parentNode.appendChild(childNode);
{% endhighlight %}

举个例子：

{% highlight javascript %}
var elementNode = document.createElement("p");
var textNode = document.createTextNode("Text");
elementNode.appendChild(textNode);
var parentElement = document.getElementById("parent");
parentElement.appendChild(elementNode);
{% endhighlight %}

### insertBefore

在某元素节点前面插入元素节点

{% highlight javascript %}
parentElement.insertBefore(newElement, targetElement);
{% endhighlight %}

但是也不必知道父元素节点是哪个，可以通过 parentNode 获得。

{% highlight javascript %}
targetElement.parentNode.insertBefore(newElement, targetElement);
{% endhighlight %}

### insertAfter

在某元素后面插入元素，很遗憾并没有这个方法，但是可以自己写一个函数。

{% highlight javascript %}
function insertAfter(newElement, targetElement) {
    var parentElement = targetElement.parentNode;
    if (parentElement.lastChild == targetElement) {
        parentElement.appendChild(newElement);
    } else {
        parentElement.insertBefore(newElement, targetElement.nextSibling);
    }
}
{% endhighlight %}

---
