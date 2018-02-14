---
layout: article
title: "Design Pattern"
date: 2016-08-17 11:30:13 +0800
categories: development
node: development
---

Design Pattern.

---

## Chain of Responsibility 职责链

将数个对象连接成一条链，从链首发送一条请求，对象可以自己处理请求或将请求传给下一个对象。<br>

请求的分发方式可以有很多种实现，比如缺省实现自动将请求传给下一个对象或条件判断是否将请求传给下一个对象。<br>

请求的处理也可以有多种实现，比如自己吞下请求，自己处理请求后仍将请求传给下一个对象，先将请求传给下一个对象后再自己处理请求。

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

## Command 命令

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

## Interpreter 解释器

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

## Iterator 迭代器

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

## Mediator 中介者

接管多个对象间的复杂通信，使对象之间不需要相互引用。

{% highlight java %}
public abstract class Colleague {
    protected Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
        mediator.addColleague(this);
    }

    public abstract void call();

    public abstract void action();
}
{% endhighlight %}

{% highlight java %}
public class ConcreteColleague1 extends Colleague {
    public ConcreteColleague1(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void call() {
        mediator.action(this);
    }

    @Override
    public void action() {
        System.out.println("action1");
    }
}
{% endhighlight %}

{% highlight java %}
public class ConcreteColleague2 extends Colleague {
    public ConcreteColleague2(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void call() {
        mediator.action(this);
    }

    @Override
    public void action() {
        System.out.println("action2");
    }
}
{% endhighlight %}

{% highlight java %}
public interface Mediator {
    void addColleague(Colleague colleague);
    void action(Colleague colleague);
}
{% endhighlight %}

{% highlight java %}
public class ConcreteMediator implements Mediator {
    private ArrayList<Colleague> colleagues;

    public ConcreteMediator() {
        colleagues = new ArrayList<>();
    }

    @Override
    public void addColleague(Colleague colleague) {
        colleagues.add(colleague);
    }

    @Override
    public void action(Colleague colleague) {
        for (Colleague thisColleague : colleagues) {
            if (thisColleague != colleague) {
                thisColleague.action();
            }
        }
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
        Mediator mediator = new ConcreteMediator();
        Colleague colleague1 = new ConcreteColleague1(mediator);
        Colleague colleague2 = new ConcreteColleague2(mediator);

        colleague1.call();
        colleague2.call();
    }
}
{% endhighlight %}

---

## Memento 备忘录

在对象外保存对象状态，并可复原到这个状态。

{% highlight java %}
public class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
{% endhighlight %}

{% highlight java %}
public class Originator {
    private String state;

    public Memento createMemento() {
        return new Memento(state);
    }

    public void setMemento(Memento memento) {
        state = memento.getState();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
{% endhighlight %}

{% highlight java %}
public class Caretaker {
    private Memento memento;

    public Memento getMemento() {
        return memento;
    }

    public void setMemento(Memento memento) {
        this.memento = memento;
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();

        originator.setState("state1");
        System.out.println(originator.getState());

        caretaker.setMemento(originator.createMemento());
        originator.setState("state2");
        System.out.println(originator.getState());

        originator.setMemento(caretaker.getMemento());
        System.out.println(originator.getState());
    }
}
{% endhighlight %}

---

## Observer 观察者

当对象发生改变时，通知所有依赖它的对象。

{% highlight java %}
public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyUpdate();
}
{% endhighlight %}

{% highlight java %}
public class ConcreteSubject implements Subject {
    private ArrayList<Observer> observers;
    private String state;

    public ConcreteSubject() {
        observers = new ArrayList<>();
    }

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyUpdate() {
        for (Observer observer : observers) {
            observer.update();
        }
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
{% endhighlight %}

{% highlight java %}
public interface Observer {
    void update();
}
{% endhighlight %}

{% highlight java %}
public class ConcreteObserver implements Observer {
    private ConcreteSubject subject;
    private String state;

    public ConcreteObserver(ConcreteSubject subject) {
        this.subject = subject;
    }

    @Override
    public void update() {
        state = subject.getState();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
{% endhighlight %}

{% highlight java %}
public class Client {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();
        ConcreteObserver observer1 = new ConcreteObserver(subject);
        ConcreteObserver observer2 = new ConcreteObserver(subject);
        subject.attach(observer1);
        subject.attach(observer2);

        subject.setState("state");
        subject.notifyUpdate();

        System.out.println(observer1.getState());
        System.out.println(observer2.getState());
    }
}
{% endhighlight %}

---
