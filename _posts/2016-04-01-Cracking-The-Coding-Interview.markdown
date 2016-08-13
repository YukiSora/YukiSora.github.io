---
layout: article
title: "Cracking The Coding Interview"
date: 2016-04-01 08:03:34 +0800
categories: development
---

In order to get a good job, I need to prepare some experience for job interview. This book include 150 programming interview questions from Google.

## Arrays and Strings

### Question 1

Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?

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

### Question 2

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

### Question 3

Given two strings, write a method to decide if one is a permutation of the other.

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

### Question 4

Write a method to replace all spaces in a string with %20. You may assume that the string has sufficient space at the end of the string to hold the additional characters, and that you are given the true length of the string. (Note: If implementing in Java, please use a character array so that you can perform this operation in place.)

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

### Question 5

Implement a method to perform basic string compression using the count of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string.

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

### Question 6

Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

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

### Question 7

Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

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

### Question 8

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

## Linked Lists

{% highlight c %}
#ifndef __LIST_H__
#define __LIST_H__

#include <stdlib.h>
#include <stdio.h>

typedef struct list_struct
{
    int data;
    struct list_struct* next;
}list_struct;

list_struct* create();

list_struct* destroy(list_struct* head);

void push_back(list_struct* head, int data);

void push_front(list_struct* head, int data);

void pop_back(list_struct* head);

void pop_front(list_struct* head);

int back(list_struct* head);

int front(list_struct* head);

void display(list_struct* head);

#endif
{% endhighlight %}

{% highlight c %}
#include "list.h"

list_struct* create()
{
    list_struct* new_node_ptr = (list_struct*)malloc(sizeof(list_struct));
    new_node_ptr->data = 0;
    new_node_ptr->next = NULL;

    return new_node_ptr;
}

list_struct* destroy(list_struct* head)
{
    list_struct* prev_node_ptr = head;

    while(prev_node_ptr->next)
    {
        list_struct* del_node_ptr = prev_node_ptr;
        prev_node_ptr = prev_node_ptr->next;
        free(del_node_ptr);
    }
}

void push_back(list_struct* head, int data)
{
    list_struct* prev_node_ptr = head;

    list_struct* new_node_ptr = (list_struct*)malloc(sizeof(list_struct));
    new_node_ptr->data = data;
    new_node_ptr->next = NULL;

    while(prev_node_ptr->next)
        prev_node_ptr = prev_node_ptr->next;
    prev_node_ptr->next = new_node_ptr;
}

void push_front(list_struct* head, int data)
{
    list_struct* prev_node_ptr = head;

    list_struct* new_node_ptr = (list_struct*)malloc(sizeof(list_struct));
    new_node_ptr->data = data;
    new_node_ptr->next = prev_node_ptr->next;

    prev_node_ptr->next = new_node_ptr;
}

void pop_back(list_struct* head)
{
    list_struct* prev_node_ptr = head;

    while(prev_node_ptr->next->next)
        prev_node_ptr = prev_node_ptr->next;

    list_struct* del_node_ptr = prev_node_ptr->next;
    prev_node_ptr->next = NULL;
    free(del_node_ptr);
}

void pop_front(list_struct* head)
{
    list_struct* prev_node_ptr = head;

    list_struct* del_node_ptr = prev_node_ptr->next;
    prev_node_ptr->next = prev_node_ptr->next->next;
    free(del_node_ptr);
}

int back(list_struct* head)
{
    list_struct* prev_node_ptr = head;

    while(prev_node_ptr->next)
        prev_node_ptr = prev_node_ptr->next;
    return prev_node_ptr->data;
}

int front(list_struct* head)
{
    return head->next->data;
}

void display(list_struct* head)
{
    list_struct* prev_node_ptr = head;

    while(prev_node_ptr->next)
    {
        printf("%d\n", prev_node_ptr->next->data);
        prev_node_ptr = prev_node_ptr->next;
    }
}
{% endhighlight %}

### Question 1

Write code to remove duplicates from an unsorted linked list. How would you solve this problem if a temporary buffer is not allowed.

{% highlight c %}
#include <stdio.h>

#include "list.h"

void remove_duplicate(list_struct* head);

int main(void)
{
    list_struct* head = create();

    for(int i = 0; i < 100; i++)
        push_back(head, rand() % 10);

    remove_duplicate(head);
    display(head);

    destroy(head);

    return 0;
}

void remove_duplicate(list_struct* head)
{
    list_struct* prev_node_ptr = head;
    while(prev_node_ptr->next)
    {
        int data = prev_node_ptr->next->data;
        list_struct* cur_node_ptr = prev_node_ptr->next;
        while(cur_node_ptr->next)
        {
            if(cur_node_ptr->next->data == data)
            {
                list_struct* del_node_ptr = cur_node_ptr->next;
                cur_node_ptr->next = cur_node_ptr->next->next;
                free(del_node_ptr);
            }
            else
            {
                cur_node_ptr = cur_node_ptr->next;
            }
        }
        prev_node_ptr = prev_node_ptr->next;
    }
}
{% endhighlight %}

---

### Question 2

Implement an algorithm to find the kth to the last element of a singly linked list.

{% highlight c %}
#include <stdio.h>

#include "list.h"

int backward_at(list_struct* head, int index);

int main(void)
{
    list_struct* head = create();

    for(int i = 0; i < 10; i++)
        push_back(head, i);

    printf("%d\n", backward_at(head, 1));

    destroy(head);

    return 0;
}

int backward_at(list_struct* head, int index)
{
    list_struct* slow_node_ptr = head->next;
    list_struct* fast_node_ptr = head->next;

    for(int i = 0; i < index; i++)
        fast_node_ptr = fast_node_ptr->next;
    while(fast_node_ptr->next)
    {
        slow_node_ptr = slow_node_ptr->next;
        fast_node_ptr = fast_node_ptr->next;
    }

    return slow_node_ptr->data;
}
{% endhighlight %}

---

### Question 3

Implement an algorithm to delete a node in the middle of a singly linked list, given only access to that node.

{% highlight c %}
#include <stdio.h>

#include "list.h"

void remove_this(list_struct* cur_node_ptr);

int main(void)
{
    list_struct* head = create();

    for(int i = 0; i < 10; i++)
        push_back(head, i);

    remove_this(head->next->next->next);
    display(head);

    destroy(head);

    return 0;
}

void remove_this(list_struct* cur_node_ptr)
{
    list_struct* del_node_ptr = cur_node_ptr->next;
    cur_node_ptr->data = del_node_ptr->data;
    cur_node_ptr->next = del_node_ptr->next;
    free(del_node_ptr);
}
{% endhighlight %}

---

### Question 4

Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x.

{% highlight c %}
#include <stdio.h>

#include "list.h"

void partition(list_struct* head, int data);

int main(void)
{
    list_struct* head = create();

    push_back(head, 233);
    for(int i = 0; i < 20; i++)
        push_back(head, rand() % 10);

    partition(head, 5);
    display(head);

    destroy(head);

    return 0;
}

void partition(list_struct* head, int data)
{
    list_struct* cur_node_ptr = head->next;

    while(cur_node_ptr->next)
    {
        if(cur_node_ptr->next->data < data)
        {
            list_struct* temp_node_ptr = head->next;
            head->next = cur_node_ptr->next;
            cur_node_ptr->next = cur_node_ptr->next->next;
            head->next->next = temp_node_ptr;
        }
        else
        {
            cur_node_ptr = cur_node_ptr->next;
        }
    }
}
{% endhighlight %}

---

### Question 5

You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head if the list. Write a function that adds the two numbers and returns the sum as a linked list. Suppose the digits are stored in forward order. Repeat the above problem.

{% highlight c %}
#include <stdio.h>

#include "list.h"

list_struct* backward_addition(list_struct* head1, list_struct* head2);
list_struct* forward_addition(list_struct* head1, list_struct* head2);
list_struct* _addition(list_struct* prev_node_ptr1, list_struct* prev_node_ptr2, int* returned_carry);

int main(void)
{
    list_struct* head1 = create();
    push_back(head1, 1);
    push_back(head1, 7);
    push_back(head1, 1);

    list_struct* head2 = create();
    push_back(head2, 5);
    push_back(head2, 9);
    push_back(head2, 2);

    list_struct* result1 = backward_addition(head1, head2);
    display(result1);
    destroy(result1);

    list_struct* result2 = forward_addition(head1, head2);
    display(result2);
    destroy(result2);

    destroy(head1);
    destroy(head2);

    return 0;
}

list_struct* backward_addition(list_struct* head1, list_struct* head2)
{
    list_struct* prev_node_ptr1 = head1;
    list_struct* prev_node_ptr2 = head2;
    list_struct* result = create();

    int carry = 0;
    while(prev_node_ptr1->next || prev_node_ptr2->next)
    {
        int digit = (prev_node_ptr1->next ? prev_node_ptr1->next->data : 0) +
                    (prev_node_ptr2->next ? prev_node_ptr2->next->data : 0) +
                    carry;
        push_back(result, digit % 10);
        carry = digit / 10;
        if(prev_node_ptr1->next)
            prev_node_ptr1 = prev_node_ptr1->next;
        if(prev_node_ptr2->next)
            prev_node_ptr2 = prev_node_ptr2->next;
    }
    if(carry != 0)
        push_back(result, carry);

    return result;
}

list_struct* forward_addition(list_struct* head1, list_struct* head2)
{
    int len1 = 0, len2 = 0;
    for(list_struct* node_ptr = head1; node_ptr->next; node_ptr = node_ptr->next)
        len1++;
    for(list_struct* node_ptr = head2; node_ptr->next; node_ptr = node_ptr->next)
        len2++;

    list_struct* result = NULL;
    int carry = 0;
    if(len1 != len2)
    {
        list_struct* zeroized_head = create();
        for(int i = 0; i < abs(len1 - len2); i++)
            push_back(zeroized_head, 0);
        list_struct* temp_node_ptr = len1 > len2 ? head2 : head1;
        while(temp_node_ptr->next)
        {
            push_back(zeroized_head, temp_node_ptr->next->data);
            temp_node_ptr = temp_node_ptr->next;
        }
        result = _addition(len1 > len2 ? head1 : head2, zeroized_head, &carry);
        destroy(zeroized_head);
    }
    else
    {
        result = _addition(head1, head2, &carry);
    }

    if(carry != 0)
        push_front(result, carry);

    return result;
}

list_struct* _addition(list_struct* prev_node_ptr1, list_struct* prev_node_ptr2, int* returned_carry)
{
    list_struct* result = NULL;
    if(prev_node_ptr1->next && prev_node_ptr2->next)
    {
        int carry = 0;
        result = _addition(prev_node_ptr1->next, prev_node_ptr2->next, &carry);
        int digit = prev_node_ptr1->next->data + prev_node_ptr2->next->data + carry;
        push_front(result, digit % 10);
        *returned_carry = digit / 10;
    }
    else
    {
        result = create();
    }

    return result;
}
{% endhighlight %}

---

### Question 6

Given a circular linked list, implement an algorithm which returns the node at the beggining of the loop.

{% highlight c %}
#include <stdio.h>

#include "list.h"

list_struct* circular_start_at(list_struct* head);

int main(void)
{
    list_struct* head = create();
    push_back(head, 1);
    push_back(head, 2);
    push_back(head, 3);
    push_back(head, 4);
    head->next->next->next->next->next = head->next->next;

    printf("%d\n", circular_start_at(head)->data);

    return 0;
}

list_struct* circular_start_at(list_struct* head)
{
    list_struct* slow_node_head = head->next;
    list_struct* fast_node_head = head->next;

    while(fast_node_head && fast_node_head->next)
    {
        slow_node_head = slow_node_head->next;
        fast_node_head = fast_node_head->next->next;
        if(fast_node_head->data == slow_node_head->data)
            break;
    }

    slow_node_head = head->next;
    while(slow_node_head->data != fast_node_head->data)
    {
        slow_node_head = slow_node_head->next;
        fast_node_head = fast_node_head->next;
    }

    return slow_node_head;
}
{% endhighlight %}

---

### Question 7

Implement a function to check if a linked list is a palindrome.

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>

#include "list.h"

bool is_palindrome(list_struct* head);

int main(void)
{
    list_struct* head = create();
    push_back(head, 1);
    push_back(head, 2);
    push_back(head, 3);
    push_back(head, 4);
    push_back(head, 5);
    push_back(head, 4);
    push_back(head, 3);
    push_back(head, 2);
    push_back(head, 1);

    printf("%d\n", is_palindrome(head));

    destroy(head);

    return 0;
}

bool is_palindrome(list_struct* head)
{
    list_struct* slow_node_ptr = head->next;
    list_struct* fast_node_ptr = head->next;
    while(fast_node_ptr->next && fast_node_ptr->next->next)
    {
        slow_node_ptr = slow_node_ptr->next;
        fast_node_ptr = fast_node_ptr->next->next;
    }
    if(fast_node_ptr->next)
        slow_node_ptr = slow_node_ptr->next;

    list_struct* reverse_head = create();
    while(slow_node_ptr)
    {
        push_front(reverse_head, slow_node_ptr->data);
        slow_node_ptr = slow_node_ptr->next;
    }

    list_struct* prev_node_ptr1 = head;
    list_struct* prev_node_ptr2 = reverse_head;
    while(prev_node_ptr1->next && prev_node_ptr2->next)
    {
        if(prev_node_ptr1->next->data != prev_node_ptr2->next->data)
        {
            destroy(reverse_head);
            return false;
        }
        prev_node_ptr1 = prev_node_ptr1->next;
        prev_node_ptr2 = prev_node_ptr2->next;
    }

    destroy(reverse_head);

    return true;

}
{% endhighlight %}

---

## Stacks and Queues

### Question 1

Describe how you could use a single array to implement three stacks.

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX 20

typedef struct
{
    int stack[MAX * 3];
    int top[3];
}stack;

bool push(stack* stack, int n, int data);
bool pop(stack* stack, int n);
int top(stack* stack, int n);

int main(void)
{
    stack stack;
    stack.top[0] = stack.top[1] = stack.top[2] = -1;

    push(&stack, 0, 3);
    push(&stack, 0, 2);
    push(&stack, 0, 1);

    push(&stack, 1, 6);
    push(&stack, 1, 5);
    push(&stack, 1, 4);

    push(&stack, 2, 9);
    push(&stack, 2, 8);
    push(&stack, 2, 7);

    for(int i = 0; i < 3; i++)
    {
        while(top(&stack, i) != 0)
        {
            printf("%d\n", top(&stack, i));
            pop(&stack, i);
        }
    }

    return 0;
}

bool push(stack* stack, int n, int data)
{
    if(stack->top[n] == MAX)
        return false;

    stack->stack[MAX * n + ++stack->top[n]] = data;

    return true;
}

bool pop(stack* stack, int n)
{
    if(stack->top[n] == -1)
        return false;

    stack->top[n]--;

    return true;
}

int top(stack* stack, int n)
{
    if(stack->top[n] == -1)
        return 0;

    return stack->stack[MAX * n + stack->top[n]];
}
{% endhighlight %}

---
### Question 2

How could you design a stack which, in addition to push and pop, also has a function min which returns the minimum element? Push, pop and min should all operate in O(1) times.

{% highlight c %}
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX 20

typedef struct
{
    int stack[MAX];
    int top;
    int min_stack[MAX];
    int min_top;
}stack;

bool push(stack* stack, int data);
bool pop(stack* stack);
int top(stack* stack);
int min(stack* stack);

int main(void)
{
    stack stack;
    stack.top = -1;
    stack.min_top = -1;

    push(&stack, 2);
    push(&stack, 3);
    push(&stack, 1);
    push(&stack, 4);

    while(top(&stack) != 0)
    {
        printf("top: %d, min: %d\n", top(&stack), min(&stack));
        pop(&stack);
    }

    return 0;
}

bool push(stack* stack, int data)
{
    if(stack->top == MAX)
        return false;

    stack->stack[++stack->top] = data;
    if(stack->min_top == -1 || data < stack->min_stack[stack->min_top])
        stack->min_stack[++stack->min_top] = data;

    return true;
}

bool pop(stack* stack)
{
    if(stack->top == -1)
        return false;

    if(stack->stack[stack->top] == stack->min_stack[stack->min_top])
        stack->min_top--;
    stack->top--;

    return true;
}

int top(stack* stack)
{
    if(stack->top == -1)
        return 0;

    return stack->stack[stack->top];
}

int min(stack* stack)
{
    if(stack->top == -1)
        return 0;

    return stack->min_stack[stack->min_top];
}
{% endhighlight %}

---
