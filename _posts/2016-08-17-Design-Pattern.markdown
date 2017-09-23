---
layout: article
title: "Design Pattern"
date: 2016-08-17 11:30:13 +0800
categories: development
---

Design Pattern.

---

## Chain of Responsibility 职责链

将数个对象连接成一条链，从链首发送一条请求，对象可以自己处理请求或将请求传给下一个对象。<br>

请求的分发方式可以有很多种实现，比如缺省实现自动将请求传给下一个对象或条件判断是否将请求传给下一个对象。<br>

请求的处理也可以有多种实现，比如自己吞下请求，自己处理请求后仍将请求传给下一个对象，先将请求传给下一个对象后再自己处理请求。<br>

### UML

![UML](/image/2016-08-17-Design-Pattern/chain_of_responsibility.png)

### 实现

{% highlight java %}
public abstract class Handler {
    private Handler successor;

    public void handlerRequest() {
        if (successor != null) {
            successor.handlerRequest();
        }
    }

    public void setSuccessor(Handler successor) {
        this.successor = successor;
    }
}
{% endhighlight %}

{% highlight java %}
public class ConcreteHandler1 extends Handler {
    @Override
    public void handlerRequest() {
        super.handlerRequest();
    }
}
{% endhighlight %}

{% highlight java %}
public class ConcreteHandler2 extends Handler {
    @Override
    public void handlerRequest() {
        System.out.println("Handled by ConcreteHandler2");
        super.handlerRequest();
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
        Handler handler1 = new ConcreteHandler1();
        Handler handler2 = new ConcreteHandler2();

        handler1.setSuccessor(handler2);

        handler1.handlerRequest();
        handler2.handlerRequest();
    }
}
{% endhighlight %}

输出结果：

```
Handled by ConcreteHandler2
Handled by ConcreteHandler2
```

---
