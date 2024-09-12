---
title: Doubly linked list with C
date: '12-19-2022'
tags: ['Tutorials']
draft: false
summary: Coding a doubly linked list with C
images: /static/images/banners/doubly-linked-list.jpg
---

<h3>en | ptBR</h3>

![image](/static/images/banners/doubly-linked-list.jpg)

### What is a doubly linked list?

A [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) is a data structure that consists of a set of nodes that are linearly connected. Each node in a doubly linked list contains two pointers: one pointing to the previous node and one pointing to the next node. This allows for efficient insertion and deletion of elements from the list, as well as the ability to traverse the list in either direction.

### What about pointers?

[Pointers](<https://en.wikipedia.org/wiki/Pointer_(computer_programming)>) are special variables that store memory addresses instead of values. This allows them to be used to access and manipulate the values stored at a given memory address.

To declare a pointer, simply use the asterisk operator [`*`](https://en.wikipedia.org/wiki/Operators_in_C_and_C%2B%2B) before the variable name and optionally specify the data type. For example, the following declaration creates an integer pointer called `ptr`:

```c
int *ptr;
```

To assign a memory address to a pointer, you can use the address operator [`&`](https://en.wikipedia.org/wiki/Operators_in_C_and_C%2B%2B) before the variable whose address you want to obtain. For example, to assign the address of variable `x` to pointer `ptr`, you can use the following line of code:

```c
int *ptr;
ptr = &x;
```

To access the value stored at the address assigned to a pointer, simply use the dereference operator [`*`](https://en.wikipedia.org/wiki/Operators_in_C_and_C%2B%2B) before the pointer's name. For example, the following line of code displays the value stored at the address assigned to `ptr`:

```c
int *ptr;
ptr = &x;
printf("%d", *ptr);
```

### Creating a doubly linked list

When we use `typedef struct`, we are creating a new data type that is a structure. For example:

```c
typedef struct Person
{
  char *name;
  int age;
} Person;
```

This code creates a new data type called "Person", which is a structure that contains a string and an integer. To create a new variable of type "Person":

```c
typedef struct Person
{
  char *name;
  int age;
} Person;

Person person;
```

Now, lets define our Node and List data types.

```c
typedef struct Node
{
    char *value;
    struct Node *prev;
    struct Node *next;
} Node;

typedef struct List
{
    Node *head;
    Node *tail;
} List;
```

The first struct, represents a node in a linked list, that has three fields:
- `value`: a pointer to a string of characters `char *`;
- `prev`: a pointer to another node in the list, which represents the previous node in the list.
- `next`: a pointer to another node in the list, which represents the next node in the list.

The second struct, represents a list, that has two fields:
- `head`: a pointer to the first node in the list.
- `tail`: a pointer to the last node in the list.

Now, we need to create functions to insert, find, and delete items from the list.

### Creating a new node