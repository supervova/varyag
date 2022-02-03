# Таблица

## Разметка

```pug
//- Responsive table
.has-responsive-table(role='region', tabindex='0', aria-labelledby='caption-01')
  table
    caption#caption-01 Books in a Scrolling Container
    thead
      tr
        th Author
        th Title
        th Year
        th ISBN-13
        th ISBN-10
    tbody
      tr
        td Miguel De Cervantes
        td The Ingenious Gentleman Don Quixote of La Mancha
        td 1605
        td 9783125798502
        td 3125798507
      tr
        td Gabrielle-Suzanne Barbot de Villeneuve
        td La Belle et la B&ecirc;te
        td 1740
        td 9781910880067
        td 191088006X
  ```
