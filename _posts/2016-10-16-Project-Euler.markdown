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

### Problem 10: Summation of primes

{% highlight python %}
import math

sieve = [False, True] * 1000001
sieve[1] = False
sieve[2] = True

for i in range(3, math.floor(math.sqrt(2000001))):
    if sieve[i]:
        for j in range(i * i, 2000001, 2 * i):
            sieve[j] = False

sum = 2
for i in range(3, 2000001, 2):
    if sieve[i]:
        sum = sum + i

print(sum)
{% endhighlight %}

---

### Problem 11: Largest product in a grid

{% highlight python %}
digits = [[8, 2, 22, 97, 38, 15, 0, 40, 0, 75, 4, 5, 7, 78, 52, 12, 50, 77, 91, 8],
        [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 4, 56, 62, 0],
        [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 3, 49, 13, 36, 65],
        [52, 70, 95, 23, 4, 60, 11, 42, 69, 24, 68, 56, 1, 32, 56, 71, 37, 2, 36, 91],
        [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80],
        [24, 47, 32, 60, 99, 3, 45, 2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50],
        [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70],
        [67, 26, 20, 68, 2, 62, 12, 20, 95, 63, 94, 39, 63, 8, 40, 91, 66, 49, 94, 21],
        [24, 55, 58, 5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72],
        [21, 36, 23, 9, 75, 0, 76, 44, 20, 45, 35, 14, 0, 61, 33, 97, 34, 31, 33, 95],
        [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 3, 80, 4, 62, 16, 14, 9, 53, 56, 92],
        [16, 39, 5, 42, 96, 35, 31, 47, 55, 58, 88,24, 0, 17, 54, 24, 36, 29, 85, 57],
        [86, 56, 0, 48, 35, 71, 89, 7, 5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58],
        [19, 80, 81, 68, 5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 4, 89, 55, 40],
        [4, 52, 8, 83, 97, 35, 99, 16, 7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66],
        [88, 36, 68, 87, 57, 62, 20, 72, 3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69],
        [4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 8, 46, 29, 32, 40, 62, 76, 36],
        [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 4, 36, 16],
        [20, 73, 35, 29, 78, 31, 90, 1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 5, 54],
        [1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 1, 89, 19, 67, 48]]

greatest = 0
for i in range(0, 17):
    for j in range(0, 17):
        a = digits[i][j] * digits[i][j + 1] * \
            digits[i][j + 2] * digits[i][j + 3]
        b = digits[i][j] * digits[i + 1][j] * \
            digits[i + 2][j] * digits[i + 3][j]
        c = digits[i][j] * digits[i + 1][j + 1] * \
            digits[i + 2][j + 2] * digits[i + 3][j + 3]
        d = digits[i + 3][j] * digits[i + 2][j + 1] * \
            digits[i + 1][j + 2] * digits[i][j + 3]
        greatest = max(greatest, a, b, c, d)

print(greatest)
{% endhighlight %}

---
