---
layout: article
title: "Text Searching"
date: 2016-08-13 14:18:27 +0800
categories: algorithm
node: algorithm
---

An implementation of few commonly used text searching method in C programming language such as KMP.

## KMP

{% highlight c %}
void _calculate_next(char* str, int* next, int len)
{
    for(int i = 1, j = 0; i < len; i++)
    {
        while(j > 0 && str[i] != str[j])
            j = next[j - 1];
        if(str[i] == str[j])
            j++;
        next[i] = j;
    }
}

int kmp(char* string, int string_len, char* pattern, int pattern_len)
{
    int next[pattern_len] = {0};
    _calculate_next(pattern, next, pattern_len);

    for(int i = 0, j = 0; i < string_len; i++)
    {
        while(j > 0 && string[i] != pattern[j])
            j = next[j - 1];
        if (string[i] == pattern[j])
            j++;
        if (j == pattern_len)
            return i - j + 1;
    }

    return -1;
}
{% endhighlight %}

---
