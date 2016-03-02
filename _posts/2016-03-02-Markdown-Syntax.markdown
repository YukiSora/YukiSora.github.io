---
layout: article
title: "Markdown Syntax"
date: 2016-03-02 16:10:43 +0800
categories: development
---

In order to write blog by using static site generator, need to learn Markdown syntax. Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

### HTML

For any markup that is not covered by Markdown’s syntax, you simply use HTML itself.

### Header

`# This is an h1`

`## This is an h2`

`### This is an h3`

`#### This is an h4`

`##### This is an h5`

`###### This is an h6`

### Blockquote

`> This is a blockquote.`

### List

```
* This is a unordered list
* This is a unordered list
* This is a unordered list
```

```
1. This is an ordered list
2. This is an ordered list
3. This is an ordered list
```

### code

<code>`This is an inline code`</code>

````
```
This is an block code
```
````

Using Liquid tag to use Jekyll built-in highlight.

<pre><code>&#123;% highlight java %&#125;
public class Poi {
    public static void main(String[] args) {
        System.out.println("Poi");
    }
}
&#123;% endhighlight %&#125;
</code></pre>

### Horizontal rule

`---`

### Link

`[Link text](http://example.net/)`

### Image

`![Alt text](img.jpg)`

### Table

Table is extended Markdown syntax.

```
| Header One | Header Two |
| - | - |
| Item One | Item Two |
```
