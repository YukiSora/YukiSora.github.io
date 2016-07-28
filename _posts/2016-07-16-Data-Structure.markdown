---
layout: article
title: "Data Structure"
date: 2016-07-16 13:30:29 +0800
categories: algorithm
---

An ADT implementation of few commonly used data structures in C programming language such as doubly circular linked list.

---

## Doubly Circular Linked List

### list.h

{% highlight c %}
#ifndef __LIST_H__
#define __LIST_H__

#include <stdbool.h>
#include <stdlib.h>

typedef struct node
{
    void* data_ptr;
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

bool list_push_front(list_struct* list, void* data_ptr);

bool list_insert(list_struct* list, void* data_ptr, int index);

bool list_push_back(list_struct* list, void* data_ptr);

bool list_pop_front(list_struct* list);

bool list_remove(list_struct* list, int index);

bool list_pop_back(list_struct* list);

void* list_front(list_struct* list);

void* list_at(list_struct* list, int index);

void* list_back(list_struct* list);

int list_search(list_struct* list, void* data_ptr, int (*compare)(void* argu1, void* argu2));

bool list_is_empty(list_struct* list);

int list_size(list_struct* list);

list_node* _alloc_node(void* data_ptr);

void _free_node(list_node* del_node_ptr);

void _insert(list_node* cur_node_ptr, list_node* new_node_ptr);

list_node* _remove(list_node* cur_node_ptr);

#endif
{% endhighlight %}

### list.c

{% highlight c %}
#include "list.h"

list_struct* list_create()
{
    list_struct* list = (list_struct*)malloc(sizeof(list_struct));

    if(list)
    {
        list->head = NULL;
        list->size = 0;
    }

    return list;
}

list_struct* list_destroy(list_struct* list)
{
    if(list->head)
    {
        for(int i = 0; i < list->size; i++)
        {
            list_node* del_node_ptr = list->head;
            list->head = list->head->next;
            _free_node(del_node_ptr);
        }
    }
    free(list);

    return NULL;
}

bool list_push_front(list_struct* list, void* data_ptr)
{
    list_node* new_node_ptr = NULL;
    if(!(new_node_ptr = _alloc_node(data_ptr)))
        return false;

    _insert(list->head, new_node_ptr);
    list->head = new_node_ptr;
    list->size++;

    return true;
}

bool list_insert(list_struct* list, void* data_ptr, int index)
{
    if(index < 0 || index > list->size)
        return false;

    list_node* new_node_ptr = NULL;
    if(!(new_node_ptr = _alloc_node(data_ptr)))
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

bool list_push_back(list_struct* list, void* data_ptr)
{
    list_node* new_node_ptr = NULL;
    if(!(new_node_ptr = _alloc_node(data_ptr)))
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

    _free_node(del_node_ptr);

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

    _free_node(del_node_ptr);

    return true;
}

bool list_pop_back(list_struct* list)
{
    if(!list->head)
        return false;

    list_node* del_node_ptr = _remove(list->head->prev);
    if(!list->head->next)
        list->head = NULL;
    list->size--;

    _free_node(del_node_ptr);

    return true;
}

void* list_front(list_struct* list)
{
    return list->head ? list->head->data_ptr : NULL;
}

void* list_at(list_struct* list, int index)
{
    if(!list->head || index < 0 || index > list->size - 1)
        return NULL;

    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < index; i++)
        cur_node_ptr = cur_node_ptr->next;

    return cur_node_ptr->data_ptr;
}

void* list_back(list_struct* list)
{
    return list->head ? list->head->prev->data_ptr : NULL;
}

int list_search(list_struct* list, void* data_ptr, int (*compare)(void* argu1, void* argu2))
{
    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < list->size; i++)
    {
        if(compare(cur_node_ptr->data_ptr, data_ptr) == 0)
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

list_node* _alloc_node(void* data_ptr)
{
    list_node* new_node_ptr = (list_node*)malloc(sizeof(list_node));
    if(!new_node_ptr)
        return NULL;
    new_node_ptr->data_ptr = data_ptr;

    return new_node_ptr;
}

void _free_node(list_node* del_node_ptr)
{
    free(del_node_ptr->data_ptr);
    del_node_ptr->data_ptr = NULL;
    free(del_node_ptr);
}

void _insert(list_node* cur_node_ptr, list_node* new_node_ptr)
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
        new_node_ptr->prev = new_node_ptr;
        new_node_ptr->next = new_node_ptr;
    }
}

list_node* _remove(list_node* cur_node_ptr)
{
    list_node* del_node_ptr = cur_node_ptr;
    if(cur_node_ptr->prev != cur_node_ptr)
    {
        cur_node_ptr->prev->next = cur_node_ptr->next;
        cur_node_ptr->next->prev = cur_node_ptr->prev;
    }
    else
    {
        cur_node_ptr->prev = NULL;
        cur_node_ptr->next = NULL;
    }

    return del_node_ptr;
}
{% endhighlight %}

---
