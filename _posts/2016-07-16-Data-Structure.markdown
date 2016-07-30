---
layout: article
title: "Data Structure"
date: 2016-07-16 13:30:29 +0800
categories: algorithm
---

An implementation of few commonly used data structures in C programming language such as doubly circular linked list.

---

## Doubly Circular Linked List

### list.h

{% highlight c %}
#ifndef __LIST_H__
#define __LIST_H__

#include <stdbool.h>
#include <stdlib.h>

typedef int data_t;

typedef struct node
{
    data_t data;
    struct node* prev;
    struct node* next;
}list_node;

typedef struct
{
    list_node* head;
    int size;
}list_struct;

list_struct* list_create();

list_struct* list_destroy(list_struct* list);

bool list_push_front(list_struct* list, data_t data);

bool list_insert(list_struct* list, data_t data, int index);

bool list_push_back(list_struct* list, data_t data);

bool list_pop_front(list_struct* list);

bool list_remove(list_struct* list, int index);

bool list_pop_back(list_struct* list);

data_t list_front(list_struct* list);

data_t list_at(list_struct* list, int index);

data_t list_back(list_struct* list);

int list_search(list_struct* list, data_t data, int (*compare)(data_t argu1, data_t argu2));

bool list_is_empty(list_struct* list);

int list_size(list_struct* list);

static list_node* _alloc_node(data_t data);

static void _insert(list_node* cur_node_ptr, list_node* new_node_ptr);

static list_node* _remove(list_node* cur_node_ptr);

#endif
{% endhighlight %}

### list.c

{% highlight c %}
#include "list.h"

list_struct* list_create()
{
    return (list_struct*)calloc(1, sizeof(list_struct));
}

list_struct* list_destroy(list_struct* list)
{
    if(list->head)
    {
        for(int i = 0; i < list->size; i++)
        {
            list_node* del_node_ptr = list->head;
            list->head = list->head->next;
            free(del_node_ptr);
        }
    }
    free(list);

    return NULL;
}

bool list_push_front(list_struct* list, data_t data)
{
    list_node* new_node_ptr = _alloc_node(data);
    if(!new_node_ptr)
        return false;

    _insert(list->head, new_node_ptr);
    list->head = new_node_ptr;
    list->size++;

    return true;
}

bool list_insert(list_struct* list, data_t data, int index)
{
    if(index < 0 || index > list->size)
        return false;

    list_node* new_node_ptr = _alloc_node(data);
    if(!new_node_ptr)
        return false;

    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < index; i++)
        cur_node_ptr = cur_node_ptr->next;
    _insert(cur_node_ptr, new_node_ptr);
    if(index == 0)
        list->head = new_node_ptr;
    list->size++;

    return true;
}

bool list_push_back(list_struct* list, data_t data)
{
    list_node* new_node_ptr = _alloc_node(data);
    if(!new_node_ptr)
        return false;

    _insert(list->head, new_node_ptr);
    if(!list->head)
        list->head = new_node_ptr;
    list->size++;

    return true;
}

bool list_pop_front(list_struct* list)
{
    if(!list->head)
        return false;

    list_node* del_node_ptr = _remove(list->head);
    list->head = list->head->next;
    list->size--;

    free(del_node_ptr);

    return true;
}

bool list_remove(list_struct* list, int index)
{
    if(index < 0 || index > list->size - 1)
        return false;

    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < index; i++)
        cur_node_ptr = cur_node_ptr->next;
    list_node* del_node_ptr = _remove(cur_node_ptr);
    if(index == 0)
        list->head = list->head->next;
    list->size--;

    free(del_node_ptr);

    return true;
}

bool list_pop_back(list_struct* list)
{
    if(!list->head)
        return false;

    list_node* del_node_ptr = _remove(list->head->prev);
    if(!list->head->next)
        list->head = list->head->next;
    list->size--;

    free(del_node_ptr);

    return true;
}

data_t list_front(list_struct* list)
{
    return list->head ? list->head->data : 0;
}

data_t list_at(list_struct* list, int index)
{
    if(!list->head || index < 0 || index > list->size - 1)
        return 0;

    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < index; i++)
        cur_node_ptr = cur_node_ptr->next;

    return cur_node_ptr->data;
}

data_t list_back(list_struct* list)
{
    return list->head ? list->head->prev->data : 0;
}

int list_search(list_struct* list, data_t data, int (*compare)(data_t argu1, data_t argu2))
{
    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < list->size; i++)
    {
        if(compare(cur_node_ptr->data, data) == 0)
            return i;
        cur_node_ptr = cur_node_ptr->next;
    }

    return -1;
}

bool list_is_empty(list_struct* list)
{
    return list->size == 0;
}

int list_size(list_struct* list)
{
    return list->size;
}

static list_node* _alloc_node(data_t data)
{
    list_node* new_node_ptr = calloc(1, sizeof(list_node));
    if(!new_node_ptr)
        return NULL;
    new_node_ptr->data = data;

    return new_node_ptr;
}

static void _insert(list_node* cur_node_ptr, list_node* new_node_ptr)
{
    if(cur_node_ptr)
    {
        cur_node_ptr->prev->next = new_node_ptr;
        new_node_ptr->prev = cur_node_ptr->prev;
        new_node_ptr->next = cur_node_ptr;
        cur_node_ptr->prev = new_node_ptr;
    }
    else
    {
        new_node_ptr->prev = new_node_ptr->next = new_node_ptr;
    }
}

static list_node* _remove(list_node* cur_node_ptr)
{
    list_node* del_node_ptr = cur_node_ptr;
    if(cur_node_ptr->prev != cur_node_ptr)
    {
        cur_node_ptr->prev->next = cur_node_ptr->next;
        cur_node_ptr->next->prev = cur_node_ptr->prev;
    }
    else
    {
        cur_node_ptr->prev = cur_node_ptr->next = NULL;
    }

    return del_node_ptr;
}
{% endhighlight %}

---
