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

### Program 4: Largest palindrome product

{% highlight python %}
def isPalindrome(n):
    return str(n)[::-1] == str(n)

max = 0
for i in range(999, 99, -1):
    for j in range(999, 99, -1):
        n = i * j
        if n < max:
            break
        if isPalindrome(n) and n > max:
            max = n

print(max)
{% endhighlight %}

---

### Problem 5: Smallest multiple

{% highlight python %}
import math

primes = [2, 3, 5, 7, 11, 13, 17, 19]

max = 1
for prime in primes:
    max *= prime ** math.floor(math.log(20) / math.log(prime))

print(max)
{% endhighlight %}

---

### Problem 6: Sum square difference

{% highlight python %}
squareOfSum = ((1 + 100) * 100 // 2) ** 2
sumOfSquare = 100 * (100 + 1) * (2 * 100 + 1) // 6

print(squareOfSum - sumOfSquare)
{% endhighlight %}

---

### Problem 7: 10001st prime

{% highlight python %}
primes = [2, 3, 5, 7, 11, 13]

n = primes[-1] + 2
while len(primes) < 10001:
    while True:
        for prime in primes:
            if n % prime == 0:
                break
        else:
            break
        n += 2
    primes.append(n)

print(primes[-1])
{% endhighlight %}

---
