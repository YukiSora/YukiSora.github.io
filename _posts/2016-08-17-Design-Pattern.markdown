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

请求的处理也可以有多种实现，比如自己吞下请求，自己处理请求后仍将请求传给下一个对象，先将请求传给下一个对象后再自己处理请求。<br

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

---

## Command

将请求封装起来以实现请求的复用、记录、逆调用，并且将调用者与实现者解耦。

{% highlight java %}
public interface Command {
    void execute();
}
{% endhighlight %}

{% highlight java %}
public class ConcreteCommand1 implements Command {
    private Receiver receiver;

    public ConcreteCommand1(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.action1();
    }
}
{% endhighlight %}

{% highlight java %}
public class ConcreteCommand2 implements Command {
    private Receiver receiver;

    public ConcreteCommand2(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.action2();
    }
}
{% endhighlight %}

{% highlight java %}
public class Receiver {
    public void action1() {
        System.out.println("Action1 executed");
    }

    public void action2() {
        System.out.println("Action2 executed");
    }
}
{% endhighlight %}

{% highlight java %}
public class Invoker {
    private Command command1;
    private Command command2;

    public Invoker(Command command1, Command command2) {
        this.command1 = command1;
        this.command2 = command2;
    }

    public void executeAction1() {
       command1.execute();
    }

    public void executeAction2() {
       command2.execute();
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
       Receiver receiver = new Receiver();
       Command command1 = new ConcreteCommand1(receiver);
       Command command2 = new ConcreteCommand2(receiver);
       Invoker invoker = new Invoker(command1, command2);

       invoker.executeAction1();
       invoker.executeAction2();
    }
}
{% endhighlight %}

---
