---
layout: article
title: "Data Structure"
date: 2016-07-16 13:30:29 +0800
categories: algorithm
---

An implementation of few commonly used data structures in C programming language such as doubly circular linked list, AVL tree, heap.

---

## Doubly Circular Linked List

### list.h

{% highlight c %}
#ifndef __LIST_H__
#define __LIST_H__

#include <stdbool.h>
#include <stdlib.h>

typedef int T;

typedef struct node
{
    T data;
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

bool list_push_front(list_struct* list, T data);

bool list_insert(list_struct* list, T data, int index);

bool list_push_back(list_struct* list, T data);

bool list_pop_front(list_struct* list);

bool list_remove(list_struct* list, int index);

bool list_pop_back(list_struct* list);

T list_front(list_struct* list);

T list_at(list_struct* list, int index);

T list_back(list_struct* list);

int list_search(list_struct* list, T data, int (*compare)(T, T));

bool list_is_empty(list_struct* list);

int list_size(list_struct* list);

static list_node* _alloc_node(T data);

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

bool list_push_front(list_struct* list, T data)
{
    list_node* new_node_ptr = _alloc_node(data);
    if(!new_node_ptr)
        return false;

    _insert(list->head, new_node_ptr);
    list->head = new_node_ptr;
    list->size++;

    return true;
}

bool list_insert(list_struct* list, T data, int index)
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

bool list_push_back(list_struct* list, T data)
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

T list_front(list_struct* list)
{
    return list->head ? list->head->data : 0;
}

T list_at(list_struct* list, int index)
{
    if(!list->head || index < 0 || index > list->size - 1)
        return 0;

    list_node* cur_node_ptr = list->head;
    for(int i = 0; i < index; i++)
        cur_node_ptr = cur_node_ptr->next;

    return cur_node_ptr->data;
}

T list_back(list_struct* list)
{
    return list->head ? list->head->prev->data : 0;
}

int list_search(list_struct* list, T data, int (*compare)(T, T))
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

static list_node* _alloc_node(T data)
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

## AVL Tree

### avl_tree.h

{% highlight c %}
#ifndef __AVL_TREE_H__
#define __AVL_TREE_H__

#include <stdbool.h>
#include <stdlib.h>

typedef int T;

typedef struct node
{
    T data;
    struct node* left;
    struct node* right;
    int height;
}avl_tree_node;

typedef struct
{
    avl_tree_node* root;
    int size;
}avl_tree_struct;

avl_tree_struct* avl_tree_create();

avl_tree_struct* avl_tree_destroy(avl_tree_struct* tree);

bool avl_tree_insert(avl_tree_struct* tree, T data, int (*compare)(T, T));

bool avl_tree_remove(avl_tree_struct* tree, T data, int (*compare)(T, T));

bool avl_tree_search(avl_tree_struct* tree, T data, int (*compare)(T, T));

T avl_tree_minimum(avl_tree_struct* tree);

T avl_tree_maximum(avl_tree_struct* tree);

static void _destroy(avl_tree_node* root);

static avl_tree_node* _insert(avl_tree_node* root, avl_tree_node* new_node_ptr, int (*compare)(T, T), bool* success);

static avl_tree_node* _remove(avl_tree_node* root, T data, int (*compare)(T, T), bool* success);

static avl_tree_node* _alloc_node(T data);

static int _height(avl_tree_node* root);

static void _update_height(avl_tree_node* root);

static int _balance(avl_tree_node* root);

static avl_tree_node* _rotate_left(avl_tree_node* root);

static avl_tree_node* _rotate_left_right(avl_tree_node* root);

static avl_tree_node* _rotate_right(avl_tree_node* root);

static avl_tree_node* _rotate_right_left(avl_tree_node* root);

#endif
{% endhighlight %}

### avl_tree.c

{% highlight c %}
#include "avl_tree.h"

avl_tree_struct* avl_tree_create()
{
    return calloc(1, sizeof(avl_tree_struct));
}

avl_tree_struct* avl_tree_destroy(avl_tree_struct* tree)
{
    _destroy(tree->root);
    free(tree);

    return NULL;
}

bool avl_tree_insert(avl_tree_struct* tree, T data, int (*compare)(T, T))
{
    avl_tree_node* new_node_ptr = NULL;
    if(!(new_node_ptr = _alloc_node(data)))
        return false;

    bool success = true;
    tree->root = _insert(tree->root, new_node_ptr, compare, &success);
    if(!success)
        free(new_node_ptr);
    tree->size++;

    return success;
}

bool avl_tree_remove(avl_tree_struct* tree, T data, int (*compare)(T, T))
{
    bool success = true;
    tree->root = _remove(tree->root, data, compare, &success);
    tree->size--;

    return success;
}

bool avl_tree_search(avl_tree_struct* tree, T data, int (*compare)(T, T))
{
    avl_tree_node* root = tree->root;
    while(root)
        if(compare(root->data, data) > 0)
            root = root->left;
        else if(compare(root->data, data) < 0)
            root = root->right;
        else
            return true;

    return false;
}

T avl_tree_minimum(avl_tree_struct* tree)
{
    avl_tree_node* root = tree->root;
    while(root->left)
            root = root->left;

    return root->data;
}

T avl_tree_maximum(avl_tree_struct* tree)
{
    avl_tree_node* root = tree->root;
    while(root->right)
            root = root->right;

    return root->data;
}

static void _destroy(avl_tree_node* root)
{
    if(root)
    {
        _destroy(root->left);
        _destroy(root->right);
        free(root);
    }
}

static avl_tree_node* _insert(avl_tree_node* root, avl_tree_node* new_node_ptr, int (*compare)(T, T), bool* success)
{
    if(!root)
        return new_node_ptr;

    if(compare(root->data, new_node_ptr->data) > 0)
        root->left = _insert(root->left, new_node_ptr, compare, success);
    else if(compare(root->data, new_node_ptr->data) < 0)
        root->right = _insert(root->right, new_node_ptr, compare, success);
    else
        *success = false;
    if(!*success)
        return root;
    _update_height(root);

    if(_balance(root) == 2)
        if(compare(root->left->data, new_node_ptr->data) > 0)
            return _rotate_right(root);
        else
            return _rotate_left_right(root);
    else if(_balance(root) == -2)
        if(compare(root->right->data, new_node_ptr->data) < 0)
            return _rotate_left(root);
        else
            return _rotate_right_left(root);

    return root;
}

static avl_tree_node* _remove(avl_tree_node* root, T data, int (*compare)(T, T), bool* success)
{
    if(!root)
        return NULL;

    if(compare(root->data, data) > 0)
        root->left = _remove(root->left, data, compare, success);
    else if(compare(root->data, data) < 0)
        root->right = _remove(root->right, data, compare, success);
    else
    {
        if(!root->left && !root->right)
        {
            avl_tree_node* del_node_ptr = root;
            root = NULL;
            free(del_node_ptr);
        }
        else if(!root->left || !root->right)
        {
            avl_tree_node* del_node_ptr = root;
            *root = *(root->left ? root->left : root->right);
            free(del_node_ptr);
        }
        else
        {
            avl_tree_node* max_node_ptr = root->right;
            while(max_node_ptr->left)
                max_node_ptr = max_node_ptr->left;
            root->data = max_node_ptr->data;
            bool internal_success = true;
            root->right = _remove(root->right, max_node_ptr->data, compare, &internal_success);
        }
    }
    if(!root)
        return NULL;
    _update_height(root);

    if(_balance(root) > 1)
        if(_balance(root->left) >= 0)
            return _rotate_right(root);
        else
            return _rotate_left_right(root);
    else if(_balance(root) < -1)
        if(_balance(root->right) <= 0)
            return _rotate_left(root);
        else
            return _rotate_right_left(root);

    return root;
}

static avl_tree_node* _alloc_node(T data)
{
    avl_tree_node* new_node_ptr = calloc(1, sizeof(avl_tree_node));
    if(!new_node_ptr)
        return NULL;
    new_node_ptr->data = data;
    new_node_ptr->height = 1;

    return new_node_ptr;
}

static int _height(avl_tree_node* root)
{
    return root ? root->height : 0;
}

static void _update_height(avl_tree_node* root)
{
    root->height = (_height(root->left) > _height(root->right) ? _height(root->left) : _height(root->right)) + 1;
}

static int _balance(avl_tree_node* root)
{
    return _height(root->left) - _height(root->right);
}

static avl_tree_node* _rotate_left(avl_tree_node* root)
{
    avl_tree_node* new_root = root->right;
    avl_tree_node* new_root_child = root->right->left;

    new_root->left = root;
    root->right = new_root_child;

    _update_height(root);
    _update_height(new_root);

    return new_root;
}

static avl_tree_node* _rotate_left_right(avl_tree_node* root)
{
    root->left = _rotate_left(root->left);
    return _rotate_right(root);
}

static avl_tree_node* _rotate_right(avl_tree_node* root)
{
    avl_tree_node* new_root = root->left;
    avl_tree_node* new_root_child = root->left->right;

    new_root->right = root;
    root->left = new_root_child;

    _update_height(root);
    _update_height(new_root);

    return new_root;
}

static avl_tree_node* _rotate_right_left(avl_tree_node* root)
{
    root->right = _rotate_right(root->right);
    return _rotate_left(root);
}
{% endhighlight %}

---

## Heap

### heap.h

{% highlight c %}
#ifndef __HEAP_H__
#define __HEAP_H__

#include <stdbool.h>
#include <stdlib.h>

typedef int T;

typedef struct
{
    T* heap;
    int size;
    int max_size;
}heap_struct;

heap_struct* heap_create();

heap_struct* heap_destroy(heap_struct* heap);

bool heap_insert(heap_struct* heap, T data, int (*compare)(T, T));

bool heap_remove(heap_struct* heap, int (*compare)(T, T));

T heap_top(heap_struct* heap);

static void _extend_heap(heap_struct* heap);

static void _heap_up(heap_struct* heap, int child, int (*compare)(T, T));

static void _heap_down(heap_struct* heap, int parent, int (*compare)(T, T));

static void _swap(T* a, T* b);

#endif
{% endhighlight %}

### heap.c

{% highlight c %}
#include "heap.h"

heap_struct* heap_create()
{
    heap_struct* heap =  calloc(1, sizeof(heap_struct));
    if(heap)
    {
        heap->max_size = 128;
        heap->heap = realloc(NULL, heap->max_size * sizeof(T));
    }

    return heap;
}

heap_struct* heap_destroy(heap_struct* heap)
{
    if(heap->heap)
        free(heap->heap);
    free(heap);

    return heap;
}

bool heap_insert(heap_struct* heap, T data, int (*compare)(T, T))
{
    if(heap->size == heap->max_size)
        return false;

    heap->heap[heap->size++] = data;
    _heap_up(heap, heap->size - 1, compare);
    if(heap->size == heap->max_size)
        _extend_heap(heap);

    return true;
}

bool heap_remove(heap_struct* heap, int (*compare)(T, T))
{
    if(heap->size == 0)
        return false;

    heap->heap[0] = heap->heap[--heap->size];
    _heap_down(heap, 0, compare);

    return true;
}

T heap_top(heap_struct* heap)
{
    return heap->size > 0 ? heap->heap[0] : 0;
}

static void _extend_heap(heap_struct* heap)
{
    heap->max_size *= 2;
    heap->heap = realloc(heap->heap, heap->max_size * sizeof(T));
}

static void _heap_up(heap_struct* heap, int child, int (*compare)(T, T))
{
    if(child != 0)
    {
        int parent = (child - 1) / 2;
        if(compare(heap->heap[parent], heap->heap[child]) < 0)
        {
            _swap(heap->heap + parent, heap->heap + child);
            _heap_up(heap, parent, compare);
        }
    }
}

static void _heap_down(heap_struct* heap, int parent, int (*compare)(T, T))
{
    int right = parent * 2 + 2;
    int left = parent * 2 + 1;
    if(right < heap->size)
    {
        int child = (right >= heap->size) || compare(heap->heap[left], heap->heap[right]) < 0 ? right : left;
        if(compare(heap->heap[parent], heap->heap[child]) < 0)
        {
            _swap(heap->heap + parent, heap->heap + child);
            _heap_down(heap, child, compare);
        }
    }
}

static void _swap(T* a, T* b)
{
    T temp = *a;
    *a = *b;
    *b = temp;
}
{% endhighlight %}

---