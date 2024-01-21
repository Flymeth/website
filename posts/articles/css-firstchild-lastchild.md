---
title: "CSS :first-child and :last-child selector"
description: "How these powerful selectors can be used to target and style the first and last child elements of a parent element, providing precise control over the visual presentation of HTML content."
category: Cascading Style Sheet
tags:
- CSS
- Pseudoclass
- Style
- Programing
- Code
- HTML
- Website
---

When working with CSS, understanding the `:first-child` and `:last-child` pseudo-classes can significantly enhance the styling and presentation of your HTML elements. These selectors provide a powerful way to target the first and last child of a parent element. In this article, we will explore how to use them effectively.

## :first-child

The `:first-child` pseudo-class targets the first child of a parent element. This can be useful for applying a specific style to the first element in a list or a series of similar elements.

```css
/* Example style for the first child */
ul li:first-child {
    font-weight: bold;
    color: #3498db;
}
```

In this example, all first `<li>` elements in an unordered list (`<ul>`) will have bold font and a specific color.

## :last-child

Conversely, the `:last-child` pseudo-class targets the last child of a parent element. This can be handy for styling the last element in a list or a group of elements.

```css
/* Example style for the last child */
ol li:last-child {
    text-decoration: underline;
    color: #e74c3c;
}
```

In this case, all last `<li>` elements in an ordered list (`<ol>`) will have underline and a different color.

## Combined Use

These two pseudo-classes can also be combined to target specific elements within a more complex structure.

```css
/* Example style for the first and last child */
article > div:first-child {
    background-color: #ecf0f1;
    padding: 10px;
}

article > div:last-child {
    background-color: #2ecc71;
    color: #fff;
    padding: 15px;
}
```

In this example, the first `<div>` child of each `<article>` will have a different background and padding, while the last child will have a different background and text color.

## Conclusion

By utilizing the `:first-child` and `:last-child` pseudo-classes, you can finely tune your CSS styles. These selectors provide increased flexibility in styling HTML elements, thereby enhancing the visual appeal of your website. Feel free to experiment with these selectors to discover how they can best meet your design needs.
