# «Выдержка»

Краткое содержание материала — статьи, поста, вакансии, резюме — в формате [медиаобъекта](https://css-tricks.com/media-object-bunch-ways/). Появляется в ленте материалов или в поисковой выдаче.

Поскольку слово `media` используется для группировки стилей изображений, аудио- и видеоматериалов, для «выдержек» выбрано уникальные названия: собственно, `summary`, `resume` etc.

Альтернативой медиаобъекту является карточка.

Родительский элемент — `list-view`.

## Разметка

### Пост / статья

```pug
.summary
  figure.summary__image
    img(src='' alt='')
  .summary__body
    h2 Sandy Sandwiches
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit.
```

### Резюме

```pug
article.resume.is-summary
  figure.resume__image
    img(src='' alt='')
  .resume__body
    h2.resume__heading Heading
    ul.resume__skills
    ul.resume__knowledge
    ul.resume__details
    footer
      button.resume__contact
        svg.icon
        span.sr-only Contact
      .dropdown
        button.dropdown-toggle(type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true')
          svg.icon
          span.sr-only More
        ul.dropdown-menu(aria-label='More')
```


