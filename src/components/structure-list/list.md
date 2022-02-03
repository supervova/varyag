# Summary list

По зрелому размышлению, я решил отказаться от связи классов коллекций с классами отдельных элементов и решил для коллекций использовать  компонент `list-view` с модификаторами. А вмеcто `summary` использовать класса медиаобъекта `media`.

Причем `list-view` может быть, как списком `ul` или `ol`, так и `div`'ом с `articl`'ами. А модификаторы могут указывать на содержимое, если требует макет (например, для определения списка в ячейку CSS Grid).

```pug
ul.list-view

  li.media
    img(src='', width='', alt='')
    .media__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

  li.media
    img(src='', width='', alt='')
    .media__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

.list-view

  li.resume
    img(src='', width='', alt='')
    .resume__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

  li.resume
    img(src='', width='', alt='')
    .resume__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

ul.list-view.is-grid

  li.card
    img(src='', width='', alt='')
    .card__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

  li.card
    img(src='', width='', alt='')
    .card__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

ul.list-view.is-row

  li.product
    img(src='', width='', alt='')
    .product__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

  li.product
    img(src='', width='', alt='')
    .product__body
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.


```



Use the summary list to summarise information, for example, a user’s responses at the end of a form.

## Разметка

```pug
.summaries
  article.summary
    a.summary__link
      figure.summary__img
        img
      .summary__copy
        h2.summary__heading
        p.summary__lead
```

## When to use summary lists

Use the summary list component to present pairs of related information, known as key-value pairs, in a list, where:

When to use summary lists
Use the summary list component to present pairs of related information, known as key-value pairs, in a list, where:

the key is a label, like "Name"
the value is the piece of information itself, like "John Smith"
Think about how you can use the summary list along with other components or patterns to give users a sense of control. You can use it to summarise a user’s responses at the end of a form, for example as part of the GOV.UK check answers pattern.

When not to use summary lists
The summary list uses the description list <dl> HTML element, so only use it to present information that has a key and at least 1 value.

Do not use it for tabular data or a simple list of information or tasks, like a task list page. (See the GOV.UK task list page pattern.) For those, use a <table>, <ul> or <ol>.

How to use summary lists
There are 2 ways to use the summary list component. You can use HTML or, if you’re using Nunjucks or the NHS.UK prototype kit, you can use the Nunjucks macro.
