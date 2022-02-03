# Форма

## Переименование компонентов

Так как ввод данных в современных веб-интерфейсах не ограничивается традиционными формами, логично отойти от сложившеися практики именования полей ввода, как потомков формы. Постепенно заменяем названия.



## Разметка

См. также:

- [`WTF, forms?`](http://wtfforms.com/). Стилизация сложных для CSS полей формы: чекбоксов, радиокнопок, загрузки файлов. Проект Марка Отто.
- [The Cleanest Trick for Autogrowing Textareas](https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/)

### Поле на всю ширину формы

```pug
//- Full width input

.input
  label(for='form-my-input') Label
  input#form-my-input.input__control(name='name' type='text' placeholder='Label')
  .input__alert(role='alert') Message

.input
  label(for='form-my-email') * Label:
  input#form-my-email.input__control(name='email' inputmode='email' type='email' required)

.input
  label(for='form-my-textarea') * Label
  textarea#form-my-textarea.input__control(name='comment' required)
    | Placeholder
  .input__alert(role='alert') Message
```



### Несколько полей в ряд

```pug
.input.is-row
  .col-sm-4
    +formItem('Caption', 'my-name', 'text', false, 'Message')(required=true)
  .col-sm-8
    //- etc
```

## Чекбоксы и радиокнопки

Добавлять обёртку `.input__options`, если нужны опции в столбик.

```pug
.input__options
  label.input.has-option
    input.input__option(name='isadult', type='checkbox')
    | Сообщество содержит материалы для взрослых

  label.input.has-option
    input.input__option(name='enabled', type='checkbox')
    | Это сообщество доступно другим пользователям

.input__options
  label.input.has-option
    input.input__option(name='delivery' type='radio' value='Самовызов' checked)
    | Самовызов: Москва,  Адмирала Корнилова, вл. 5 (только будни)

  label.input.has-option
    input.input__option(name='delivery' type='radio' value='постамат')
    | Доставка по Москве через постаматы — ориентировочно 300 ₽
```

### Социальная авторизация

```pug
p Continue with your social network or messenger account:

ul.buttons.is-social-login
  li
    +button('Facebook', 'brand-facebook', 'is-icon is-ghost', true)(onclick='facebookoauth()')
  li
    +button('Google', 'brand-google', 'is-icon is-ghost', true)(onclick='googleoauth()')
  li
    +button('Facebook', 'brand-yandex', 'is-icon is-ghost', true)(onclick='yandexoauth()')
  li
    +button('Facebook', 'brand-telegram', 'is-icon is-ghost', true)(onclick='preloginmsg(\'telegram\')')
  li
    +button('Facebook', 'brand-viber', 'is-icon is-ghost', true)(onclick='preloginmsg(\'viber\')')
```

// wtfforms.com — Mark Otto ide project, form controls customization
// css-tricks.com/the-cleanest-trick-for-autogrowing-textareas

### Атрибут `inputmode`

Используется для выбора подходящей клавиатуры на мобильных устройствах.

```html
<input type="text" inputmode="url">
<input type="text" inputmode="email">
<input type="text" inputmode="search">
<input type="text" inputmode="numeric">
<input type="text" inputmode="tel">
```

Клавиатура для значения `inputmode="decimal"` почти идентична клавиатуре для `inputmode="tel"`. Но вместо клавиши `+*#` появляется клавиша десятичной точки (для англоязычного формата дробей).

```html
<input type="text" inputmode="decimal">
```

### Всё вместе: основные типы полей, валидация с «регулярками»

```pug
form#form-needs-validation(action='/', method='post', novalidate)
  input(type='hidden', name='my-hidden-stuff', value='')

  .input
    +formItem('Name', 'name', 'text', false, 'Message')(value='', maxlength='128', pattern='[A-Za-z -]+', required=true)

  .input
    +formItem('Email', 'email', 'email', false, 'Message')(inputmode='email', value='', maxlength='128', required=true)

  .input__row
    .input.col-4
      +formItem('Country code', 'country-code', 'text', false, 'Message')(inputmode='numeric', value='', maxlength='3', pattern='\d{3}', required=true)

    .input.col-8
      +formItem('Phone number', 'phone', 'text', false, 'Message')(inputmode='numeric', value='', maxlength='9', pattern='\d{8,9}', required=true)

  .input
    label(for='form-state') State
    select#form-state.input__control.is-select(name='state')
      option(value='AL') Alabama
      option(value='AK') Alaska
      option(value='AZ') Arizona

  .input.has-checkbox
    input#form-terms.input__input(type='checkbox', name='terms', required)
    label(for='form-terms')
      | You agree to our
      a(href='', target='_blank', rel='noopener noreferrer') Terms
    .input__alert(role='alert') Message

  button#form-submit.btn.is-submit(type='submit') Sign Up
    svg.spinner.is-sm(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 48 48')
      circle.spinner__circle(cx='24', cy='24', r='20')
```
