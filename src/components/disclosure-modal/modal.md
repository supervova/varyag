# Модальное окно

## Разметка

Поддержка экспериментального [HTML-элемента `dialog`](https://developer.mozilla.org/ru/docs/Web/HTML/Element/dialog) пока [ниже 75%](https://caniuse.com/?search=dialog)…

```pug
dialog(open) This is an open dialog window
```

Но, гипотетически, это просто решается с момощью стилей.

```css
dialog[open] {
  display: block;
}
```

[How to Implement and Style the Dialog Element](https://tympanus.net/codrops/2021/10/06/how-to-implement-and-style-the-dialog-element/)

До тех пор, пока не будет времени спроектировать окно на основе тега `dialog`, используем компонент BS.

⚠️ В BS5 не нужно добавлять `role="dialog"` — роль добавляется через JS.

```pug
 button.btn.is-primary(type='button', data-bs-toggle='modal', data-bs-target='#modal') Launch modal

 #modal.modal.fade(aria-labelledby='modal-title' tabindex='-1' aria-modal='true' role='dialog' style='display: block;')
   .modal-dialog
     .modal__box
       .modal__header
         h3#modal-title.modal__heading Lorem ipsum
         button.btn.is-close(type='button' data-bs-dismiss='modal' aria-label='Закрыть')
           svg.icon(aria-hidden='true' focusable='false')
             use(href='/path/to/theme/base/graphics/sprite.svg#icon-x-mark')
       .modal__body
         | Lorem, ipsum dolor.
       .modal__footer
         button.btn.is-primary(type='submit') Submit
```
