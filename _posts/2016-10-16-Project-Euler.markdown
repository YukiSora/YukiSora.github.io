---
layout: article
title: "Project Euler"
date: 2016-10-16 23:27:09 +0800
categories: development
---

Project Euler.

---

### Problem 1: Multiples of 3 and 5

{% highlight python %}
three = (3 + 999) * 999 // 3 // 2
five = (5 + 995) * 995 // 5 // 2
fifteen = (15 + 990) * 990 // 15 // 2
sum = three + five - fifteen

print(sum)
{% endhighlight %}
