---
layout: article
title: "Cracking The Coding Interview"
date: 2016-04-01 08:03:34 +0800
categories: development
---

In order to get a good job, I need to prepare some experience for job interview. This book include 150 programming interview questions from Google.

## Question 1

Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?

### C

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>

bool is_all_unique(char* str);

int main(void)
{
    char str[] = "qwerta";

    printf("%d", is_all_unique(str));

    return 0;
}

bool is_all_unique(char* str)
{
    for(char* s1 = str; *s1; s1++)
        for(char* s2 = s1 + 1; *s2; s2++)
            if(*s1 == *s2)
                return false;

    return true;
}
{% endhighlight %}

---

## Question 2

### C

Implement a function void reverse (char* str) in C or C++ which reverses a null-terminated string.

{% highlight c %}
#include <stdio.h>
#include <string.h>

void reverse(char* s);

int main(void)
{
    char s[] = "123456";

    reverse(s);
    printf("%s", s);

    return 0;
}

void reverse(char* s)
{
    for(char* begin = s, *end = s + strlen(s) - 1; begin < end; begin++, end--)
    {
        char temp = *begin;
        *begin = *end;
        *end = temp;
    }
}
{% endhighlight %}

---

## Question 3

Given two strings, write a method to decide if one is a permutation of the other.

### C

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool is_permutation(char* s1, char* s2);

int cmp(const void* a, const void* b)
{
    return *(char*)a - *(char*)b;
}

int main(void)
{
    char s1[] = "asdasd";
    char s2[] = "asdasd";

    printf("%d", is_permutation(s1, s2));

    return 0;
}

bool is_permutation(char* s1, char* s2)
{
    if(strlen(s1) != strlen(s2))
        return false;

    qsort(s1, strlen(s1), sizeof(*s1), cmp);
    qsort(s2, strlen(s2), sizeof(*s2), cmp);

    while(*s1)
        if(*s1++ != *s2++)
            return false;

    return true;
}
{% endhighlight %}

---

## Question 4

Write a method to replace all spaces in a string with %20. You may assume that the string has sufficient space at the end of the string to hold the additional characters, and that you are given the true length of the string. (Note: If implementing in Java, please use a character array so that you can perform this operation in place.)

### C

{% highlight c %}
#include <stdio.h>

void convert(char* s1);

int main(void)
{
    char s[100] = "Mr John Smith";

    convert(s);
    printf("%s", s);

    return 0;
}

void convert(char* s1)
{
    int count = 0;
    while(*s1)
        if(*s1++ == ' ')
            count++;

    char* s2 = s1 + count * 2;
    *s2-- = *s1--;
    for(; s1 != s2; s1--)
    {
        if(*s1 == ' ')
        {
            *s2-- = '0';
            *s2-- = '2';
            *s2-- = '%';
        }
        else
        {
            *s2-- = *s1;
        }
    }
}
{% endhighlight %}

---

## Question 5

Implement a method to perform basic string compression using the count of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string.

### C

{% highlight c %}
#include <stdio.h>
#include <string.h>

void compress(char* str);

int main(void)
{
    char str[] = "aabbbcccccccccc";

    compress(str);
    printf("%s", str);

    return 0;
}

void compress(char* str)
{
    char temp[strlen(str) + 1];
    strcpy(temp, str);
    char* s1 = str, *s2 = temp;

    while(*s2)
    {
        char last;
        int count = 1;
        last = *s1++ = *s2++;
        while(last == *s2 && *s2++)
            count++;
        s1 += sprintf(s1, "%d", count);
    }
    *s1 = '\0';

    if(strlen(str) >= strlen(temp))
        strcpy(str, temp);
}
{% endhighlight %}

---

## Question 6

Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

### C

{% highlight c %}
#include <stdio.h>

void rotate(int n, int matrix[n][n]);

int main(void)
{
    int matrix[5][5] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25};

    rotate(5, matrix);

    for(int i = 0; i < 5; i++)
        for(int j = 0; j < 5; j++)
            printf("%d%c", matrix[i][j], j == 4 ? '\n' : ' ');

    return 0;
}

void rotate(int n, int matrix[n][n])
{
    for(int i = 0; i < n / 2; i++)
    {
        for(int j = i; j < n - i - 1; j++)
        {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
        }
    }
}
{% endhighlight %}

---

## Question 7

Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

### C

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>

void set_zero(int m, int n, int matrix[n][n]);

int main(void)
{
    int matrix[5][4] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 0, 16, 17, 18, 19, 20};

    set_zero(5, 4, matrix);

    for(int i = 0; i < 5; i++)
        for(int j = 0; j < 4; j++)
            printf("%d%c", matrix[i][j], j == 3 ? '\n' : ' ');

    return 0;
}

void set_zero(int m, int n, int matrix[m][n])
{
    bool row[m], col[n];
    for(int i = 0; i < m; i++)
        row[i] = false;
    for(int i = 0; i < n; i++)
        col[i] = false;

    for(int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            if(matrix[i][j] == 0)
                row[i] = col[j] = true;

    for(int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            if(row[i] || col[j])
                matrix[i][j] = 0;
}
{% endhighlight %}

---

## Question 8

Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring (e.g., “waterbottle” is a rotation of “erbottlewat”).

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

bool is_rotate(char* s1, char* s2);

int main(void)
{
    char s1[] = "waterbottle";
    char s2[] = "erbottlewat";

    printf("%d", is_rotate(s1, s2));

    return 0;
}

bool is_rotate(char* s1, char* s2)
{
    char temp[strlen(s1) * 2 + 1];
    strcpy(temp, s1);
    strcat(temp, s1);

    return strstr(temp, s2);
}
{% endhighlight %}

---
