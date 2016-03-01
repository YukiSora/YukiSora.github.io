---
layout: article
title: "Java Concurrent"
date: 2016-03-02 02:08:11 +0800
categories: algorithm
---

Implementing concurrent by using Java. Here has three algorithms to solve mutual exclusion Problem. There are Dekker's algorithm, Peterson's algorithm, Lamport's bakery algorithm. In addition there are some advanced methods.

## Java Thread

There are two way to implement additional threads in Java.

### Extend the class Thread

{% highlight java %}
public class Poi extends Thread {
    Poi(String name) {
        super(name);
    }

    public static void main(String[] args) {
        new Poi("Poi").start();
    }

    @Override
    public void run() {
        System.out.println("Thread ID: " + getId());
        System.out.println("Thread name: " + getName());
    }
}
{% endhighlight %}

### Implement the interface Runnable

{% highlight java %}
public class Poi implements Runnable {
    public static void main(String[] args) {
        new Thread(new Poi(), "Poi").start();
    }

    @Override
    public void run() {
        System.out.println("Thread ID: " + Thread.currentThread().getId());
        System.out.println("Thread name: " + Thread.currentThread().getName());
    }
}
{% endhighlight %}

### Thread states

Thread has seven states which are new, runnable, running, suspended, blocked, suspended-blocked and dead.

---

## Mutual exclusion Problem

### Critical section

A critical section is a part of a multi-process program that may not be concurrently executed by more than one of the program's processes.

The three criteria to solve the critical section problem are mutual exclusion, progress, and bounded waiting.

* Mutual exclusion: No two process may be simultaneously inside their critical section.
* Progress: No process running outside its critical section may block other processes trying to enter its critical section.
* Bounded waiting: No process should have to wait forever to enter its critical section.

### Software solution for two threads

#### Dekker's algorithm

This is first working software solution, discovered by Dekker in the early 1960s. However, it does allow starvation in the presence of contention which mean when one thread haven't executed `desires[id] = true`, the other thread had already executed while `(desires[other()])`.

{% highlight java %}
public class Dekker implements Runnable {
    private static boolean[] desires = new boolean[2];
    private static volatile int turn;
    private final int id;

    public static void main(String[] args) {
        new Thread(new Dekker(0), "Poi 0").start();
        new Thread(new Dekker(1), "Poi 1").start();
    }

    public Dekker(int id) {
        this.id = id;
    }

    private int other() {
        return id == 0 ? 1 : 0;
    }

    public void wantToEnterCriticalSection() {
        desires[id] = true;
        while (desires[other()]) {
            if (turn != id ) {
                desires[id] = false;
                while (turn != id) {
                    Thread.yield();
                }
                desires[id] = true;
            }
        }
    }

    public void criticalSection() {
        System.out.println(Thread.currentThread().getName() + " is working");
    }

    public void finishCriticalSection() {
        desires[id] = false;
        turn = other();
    }

    @Override
    public void run() {
        while (true) {
            wantToEnterCriticalSection();
            criticalSection();
            finishCriticalSection();
        }
    }
}
{% endhighlight %}

#### Peterson's algorithm

This is a complete solution, discovered by Peterson in 1981.

{% highlight java %}
public class Peterson implements Runnable {
    private static boolean[] desires = new boolean[2];
    private static volatile int last;
    private final int id;

    public static void main(String[] args) {
        new Thread(new Peterson(0), "Poi 0").start();
        new Thread(new Peterson(1), "Poi 1").start();
    }

    public Peterson(int id) {
        this.id = id;
    }

    private int other() {
        return id == 0 ? 1 : 0;
    }

    public void wantToEnterCriticalSection() {
        desires[id] = true;
        last = id;
        while (desires[other()] && last == id) {
            Thread.yield();
        }
    }

    public void criticalSection() {
        System.out.println(Thread.currentThread().getName() + " is working");
    }

    public void finishCriticalSection() {
        desires[id] = false;
    }

    @Override
    public void run() {
        while (true) {
            wantToEnterCriticalSection();
            criticalSection();
            finishCriticalSection();
        }
    }
}
{% endhighlight %}

### Software solution for more than two threads

#### Lamport's bakery algorithm

{% highlight java %}
import java.util.*;

public class Lamport implements Runnable {
    private static ArrayList ticket = new ArrayList();
    private static ArrayList entering = new ArrayList();
    private final int id;

    public static void main(String[] args) {
        for (int i = 0; i < 10; i ++) {
            new Thread(new Lamport(i), "Poi " + i).start();
        }
    }

    public Lamport(int id) {
        this.id = id;
        ticket.add(id);
        entering.add(false);
    }

    public void wantToEnterCriticalSection() {
        entering.set(id, true);
        int max = 0;
        for (int i = 0; i < ticket.size(); i++) {
            int temp = ticket.get(i);
            if (temp > max) {
                max = temp;
            }
        }
        ticket.set(id, 1 + max);
        entering.set(id, false);
        for (int i = 0; i < ticket.size(); ++i) {
            if (i != id) {
                while (entering.get(i)) {
                    Thread.yield();
                }
                while (ticket.get(i) != 0 && (ticket.get(id) > ticket.get(i) || ticket.get(id) == ticket.get(i) && id > i)) {
                    Thread.yield();
                }
            }
        }
    }

    public void criticalSection() {
        System.out.println(Thread.currentThread().getName() + " is working");
    }

    public void finishCriticalSection() {
        ticket.set(id, 0);
    }

    @Override
    public void run() {
        while (true) {
            wantToEnterCriticalSection();
            criticalSection();
            finishCriticalSection();
        }
    }
}
{% endhighlight %}
