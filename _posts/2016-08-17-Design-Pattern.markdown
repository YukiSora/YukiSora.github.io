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

## Interpreter

将问题归纳为公式，并构建一个解释器，给参数算结果。

{% highlight java %}
public interface AbstractExpression {
    String interpret(Context context);
}
{% endhighlight %}

{% highlight java %}
public class TerminalExpression implements AbstractExpression {
    private String key;

    public TerminalExpression(String key) {
        this.key = key;
    }

    @Override
    public String interpret(Context context) {
        return context.getValue(key);
    }
}
{% endhighlight %}

{% highlight java %}
public class NonterminalExpression implements AbstractExpression {
    private AbstractExpression expression1;
    private AbstractExpression expression2;

    public NonterminalExpression(AbstractExpression expression1, AbstractExpression expression2) {
        this.expression1 = expression1;
        this.expression2 = expression2;
    }

    @Override
    public String interpret(Context context) {
        return expression1.interpret(context) + expression2.interpret(context);
    }
}
{% endhighlight %}

{% highlight java %}
public class Context {
    private HashMap<String, String> values;

    public Context() {
        values = new HashMap<>();
    }

    public void setValue(String key, String value) {
        values.put(key, value);
    }

    public String getValue(String key) {
        return values.get(key);
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
        Context context = new Context();
        TerminalExpression s1 = new TerminalExpression("s1");
        TerminalExpression s2 = new TerminalExpression("s2");
        NonterminalExpression op = new NonterminalExpression(s1, s2);
        context.setValue("s1", "NicoNico");
        context.setValue("s2", "Ni");

        System.out.println(op.interpret(context));
    }
}
{% endhighlight %}

---

## Iterator

迭代聚合而不暴露聚合的实现。

{% highlight java %}
public interface Iterator<T> {
    void first();
    void next();
    boolean isDone();
    T currentItem();
}
{% endhighlight %}

{% highlight java %}
public class ConcreteIterator<T> implements Iterator<T> {
    private Aggregate<T> aggregate;
    private int index;

    public ConcreteIterator(Aggregate<T> aggregate) {
        this.aggregate = aggregate;
    }

    @Override
    public void first() {
        index = 0;
    }

    @Override
    public void next() {
        if (index < aggregate.size()) {
            index++;
        }
    }

    @Override
    public boolean isDone() {
        return index >= aggregate.size();
    }

    @Override
    public T currentItem() throws IndexOutOfBoundsException {
        return aggregate.get(index);
    }
}
{% endhighlight %}

{% highlight java %}
public interface Aggregate<T> {
    Iterator<T> createIterator();
    int size();
    void add(T value);
    T get(int index);
}
{% endhighlight %}

{% highlight java %}
public class ConreteAggregate<T> implements Aggregate<T> {
    private ArrayList<T> list;

    public ConreteAggregate() {
        list = new ArrayList<>();
    }

    @Override
    public Iterator<T> createIterator() {
        return new ConcreteIterator<T>(this);
    }

    @Override
    public int size() {
        return list.size();
    }

    @Override
    public void add(T value) {
        list.add(value);
    }

    @Override
    public T get(int index) {
        return list.get(index);
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
        ConreteAggregate<String> aggregate = new ConreteAggregate<>();
        Iterator<String> iterator = aggregate.createIterator();
        aggregate.add("1");
        aggregate.add("2");
        aggregate.add("3");

        while (!iterator.isDone()) {
            System.out.println(iterator.currentItem());
            iterator.next();
        }
    }
}
{% endhighlight %}

---
