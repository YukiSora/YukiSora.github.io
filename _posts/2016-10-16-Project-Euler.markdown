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
### Problem 8: Largest product in a series

{% highlight python %}
from functools import reduce

s = list('73167176531330624919225119674426574742355349194934\
96983520312774506326239578318016984801869478851843\
85861560789112949495459501737958331952853208805511\
12540698747158523863050715693290963295227443043557\
66896648950445244523161731856403098711121722383113\
62229893423380308135336276614282806444486645238749\
30358907296290491560440772390713810515859307960866\
70172427121883998797908792274921901699720888093776\
65727333001053367881220235421809751254540594752243\
52584907711670556013604839586446706324415722155397\
53697817977846174064955149290862569321978468622482\
83972241375657056057490261407972968652414535100474\
82166370484403199890008895243450658541227588666881\
16427171479924442928230863465674813919123162824586\
17866458359124566529476545682848912883142607690042\
24219022671055626321111109370544217506941658960408\
07198403850962455444362981230987879927244284909188\
84580156166097919133875499200524063689912560717606\
05886116467109405077541002256983155200055935729725\
71636269561882670428252483600823257530420752963450')
digits = [int(n) for n in s]

greatest = max([reduce(lambda x, y: x * y, digits[i: i + 13])
                for i in range(len(digits) - 11)])
print(greatest)
{% endhighlight %}

---

### Problem 9: Special Pythagorean triplet

{% highlight python %}
for m in range(2, 21):
    for n in range(1, m):
        if 2 * m ** 2 + 2 * m * n == 1000:
            a, b, c = m ** 2 - n ** 2, 2 * m * n, m ** 2 + n ** 2
            print(a * b * c)
{% endhighlight %}

---
