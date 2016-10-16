---
layout: article
title: "Project Euler"
date: 2016-10-16 23:27:09 +0800
categories: development
---

Yvonne 加油poi ๑乛◡乛๑

### Problem 1: Multiples of 3 and 5

{% highlight python %}
three = (3 + 999) * 999 // 3 // 2
five = (5 + 995) * 995 // 5 // 2
fifteen = (15 + 990) * 990 // 15 // 2
sum = three + five - fifteen

print(sum)
{% endhighlight %}

---

### Problem 2: Even Fibonacci numbers

{% highlight python %}
sum, a, b = 0, 1, 2
while a < 4000000:
    if a % 2 == 0:
        sum += a
    a, b = b, a + b

print(sum)
{% endhighlight %}

---

### Problem 3: Largest prime factor

{% highlight python %}
import math

n = prime = 600851475143

i = 2
if n % i == 0:
    prime = i
    while n % i == 0:
        n //= i
i = 3
while n > 1 and i < math.ceil(math.sqrt(n)):
    if n % i == 0:
        prime = i
        while n % i == 0:
            n //= i
    i += 2

print(max(n, prime))
{% endhighlight %}

---
