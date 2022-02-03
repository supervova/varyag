# Заготовки страницы

## Шаблон

```pug
doctype html
html(lang='{{ page.lang }}' prefix='og: http://ogp.me/ns#')
head
  meta(charset='utf-8')
  meta(name='viewport' content='width=device-width, initial-scale=1')
  title {{ site.title }}
  meta(name='description' content='{{ site.description }}')

  meta(property='og:title' content='{{ site.title }}')
  meta(property='og:description' content='{{ site.description }}')
  meta(property='og:image' content='{{ page.image }}')
  meta(property='og:url' content='{{ page.link }}')
  meta(property='og:locale' content='{{ page.lang }}')
  meta(property='og:site_name' content='{{ site.name }}')
  meta(property='og:type' content='website')
  meta(name='twitter:card' content='summary_large_image')
  //- meta(name='twitter:creator' content='{{ site.author.twitter }}')
  //- Vladimir Nikishin, www.super-mark.ru
  meta(name='author' content='{{ site.author.summary }}')
  //- link(rel='author' href='{{ site.theme.link }}/humans.txt')

  //- Referrer-Policy
  meta(name='referrer' content='strict-origin-when-cross-origin')
  meta(name='apple-mobile-web-app-title' content='{{ site.short_name }}')
  link(rel='manifest' href='/manifest.json')
  link(rel='apple-touch-icon' href='{{ site.icons.appleTouch }}')
  //- SVG-иконка. Пока работает только в Safari
  link(rel='mask-icon' href='{{ site.icons.svg }}' color='site.colors.primary')
  //- favicon.ico — в корне проекта

  link(rel='canonical' href='{{ page.link }}')
  link(rel='alternate' href='{{ post.hreflangRu }}' hreflang='ru')
  link(rel='alternate' href='{{ post.hreflangEn }}' hreflang='en')
  link(rel='sitemap' href='/sitemap.xml' type='application/xml')

  link(rel='alternate' href='/feed.xml' type='application/rss+xml' title='{{ site.rss_title }}')

  link(rel='preconnect' href='https://fonts.googleapis.com/')
  link(rel='stylesheet' href='https://fonts.googleapis.com/css2?family={{ site.fonts }}&display=swap')
  link(rel='stylesheet' href='{{ site.styles }}')

  //- Желаемые элементы интерфейса браузера (пока работает только на Android)
  meta(name='theme-color' content='{{ site.colors.browser }}')

body
  header.header
    //- На мобилках
    //- Хотя ссылки можно собирать и без UL'ов — просто набор ссылок в nav-обёртке
    //- я предпочитаю использовать маркированные списки, потому что навигация
    //- в такой разметке приемлемо смотрится даже без стилей. А вложенные
    //- конструкции без списков вообще невозможны
    ul#mobile-header.header__mobile-section(role='navigation')
      //- Nav Toggler
      li: a#header-mobile-section-toggler.header__mobile-section-toggler(href='#menustate' role='button' aria-label='Open Main Menu')
            svg.icon(aria-hidden='true')

      //- Лого
      li: a.logo(href='/' aria-label='Главная страница веб-сайта')
            svg.logo
              title {{ site.name }}

      //- Кнопки поиска, корзины или телефон
      li: a.header__mobile-section-search-or-smth-else(href='')

    //- Главное меню — стандартная панель на десктопе, выдвижная — на мобилках
    ul#global-nav.global-nav(role='navigation')
      li
        a.logo(href='/' aria-label='Главная страница веб-сайта')
          svg.logo
            title {{ site.name }}
      li
        a.global-nav__link(href='/first-section') First Section

      //- Другие пункты меню

      li(role='search')
        a#global-nav-link-search.global-nav__link.is-search(href='/search' aria-label='Search apple.com')

    //- Поиск
    form#global-search.search(action='/search' role='search' method='get')
      input#search-input.search__input(type='search' autocomplete='off' placeholder='Search...')
      button.search__submit(type='submit' aria-label='Search')
        svg.icon(aria-hidden='true')
      button.search__reset(type='reset' aria-label='Clear Search')
        svg.icon(aria-hidden='true')
      button.search__cancel(type='button' aria-label='Cancel Search')
        svg.icon(aria-hidden='true')

  //- Навигация о разделу
  nav#local-nav.local-nav(aria-label='Local Navigation')
    ul
      li
        a.local-nav__link(href='/first-subsection') First Subsection
        //- Другие пункты меню

  //- MAIN
  main.main
    article
      header.hero
        .container
          .row
            //- Одна или несколько колонок
            .col
              //- a.hero__eyebrow
              p.hero__eyebrow
              h1.hero__heading Lorem ipsum dolor sit
              p.hero__subhead
              h2.typography-experience-headline An all-screen design
              //- Или figure.hero__image, если картинка сборная
              //- Или picture.hero__image, если картинка меняется в зависимости
              //- от устройства
              img.hero__image
              .hero__cta.buttons
                a.btn.-is-primary(href='/first-page') Label
                a.btn.-is-2ry(href='/second-page') Label

      section.section.is-features
        .container
          .row
            //- Одна или несколько колонок
            .col
              h2.section__heading
              //- Содeржание: параграфы, списки, изображения (img, figure, picure)

  //- FOOTER
  footer#footer.footer
    nav.footer__nav
      li.footer__copyright Copyright &copy; 2020 {{ site.name }} All rights reserved.
      li: a.footer__nav-link(href='/legal/privacy') Privacy Policy
      li: a.footer__nav-link(href='/legal/terms') Terms of Use
      li: a.footer__nav-link(href='/shop/help/sales-refunds') Sales and Refunds
      li: a.footer__nav-link(href='/sitemap') Site Map

  script(src='{{ site.scripts }}')
```

## Техники макета

☝️🧐 Надо стремиться к тому, чтобы все макеты укладывались в одну схему: `header+main+footer`. И ни шапка, ни подвал, ни область основного содержания не менялись в зависимости от раздела. Никакой дополнительной разметки, никаких специальных классов (за исключением классов body).

Разделы страницы на всю ширину экрана — внутри ограниченного по ширине main техникой margin-left + transform (/components/section/section.scss:.section.is-full-bleed).

Разделы страницы средней ширины — техникой отрицательных боковых `margin`, в том числе — с процентными значениями.

Вложенные контейнеры <main.main> и <article> с разметкой schema.org меняются на уровне шаблонов: index.twig, blog.twig, archive.twig; single.twig, page.twig.

Исходя из изложенного верстать лучше со внутренней страницы, вроде privacy policy.

## Рекомендации

- Использовать `data`-атрибуты — для аналитики и скриптов: `data-role`, `data-analytics-region` и т.д.
- [Не использовать role='menu' для навигации](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html). И вообще, стараться использовать семантические теги — `nav`, `footer` etc. — а не атрибуты role.

Шпаргалка для тех случаев, когда aria-разметка всё-таки необходима.

- `role='navigation'` если используется ul, не вложенный в nav
- `role='region'` для раздела без заголовка, размеченного div'ом
- `role='button'` для a-элементов, выполняющих функции кнопок
- `role='combobox'` + `aria-autocomplete='list|both'` + `aria-owns='list-id'` + `aria-expanded='false'` - для комбобоксов
- `role='alert'`
- `role='listbox'` / `role='option'` — для структур, содержащих скрытые элементы: каруселей, выпадающих меню, имитирующих `<select>`

```pug
ul.filter(role='listbox')
  li.filter_item
    a.filter_option(href='?s=featured', role='option', tabindex='-1', aria-selected='true') Featured
```

- `role='menu'` и `role='menuitem'`. Первым помечается панель меню — например, `ul`. А вторым — интерактивные элементы меню: `li` (если обрабатываются клики на них), a или `button`.
- `role='none'` или `role='presentation'` — для дочерних элементов, не выполняющих функциональную роль. Например. `ul[role='menu']>li[role='none']>a[role='list-item']`
- `role='tree'`, `role='group'` и `role='treeitem'` — для древовидной навигации, аккордеонов.

Интерактивные элементы — модальные / диалоговые окна, выпадающие меню, всплывающие подсказки (tooltip'ы) помечаются aria-атрибутами для того, чтобы их понимали пользователи экранных считывающих устройств.

Самые популярные aria-атрибуты.

- `aria-hidden='true'`. Помечаются иконки и др. декоративные графические элементы.
- `aria-label` и `aria-labelledby`. Помечаются «обёртки» виджетов
- `aria-controls`. Помечаются кнопки управления виджетом. В значении указывается ID виджета: `button(aria-controls='my-dropdown')` … `nav#my-dropdown`
- `aria-haspopup`. Помечаются кнопки управления выпадающими меню и панелями (диалоговые окна к этой категории не относятся): `button(aria-haspopup='true', aria-controls='my-dropdown')`
- `aria-expanded`. Помечаются кнопки управления скрываемыми виджетами — например, выпадающими меню. В значении указывается состояние виджета: `false` или `true`. W3C рекомендует использовать вместе с `aria-haspopup`, хотя Bootstrap и Saleforce игнорируют:
  `button(aria-controls='my-dropdown', aria-expanded='false')`

[Примеры](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/)

    \((.*?)\) ➜ [$1] - заменить круглые скобки pug'а на квадратные emmet'а

## Запрет индексирования

```pug
<!-- noindex-->
Официальная техника Яндекса
<!-- /noindex-->
```

В ссылку можно добавить атрибут rel="nofollow".

```pug
a(href='url' rel='nofollow') label
```

```html
<!-- googleoff: all-->
Такой синтаксис запрета индексации Googl'ом использует Apple. <a href="https://perishablepress.com/tell-google-to-not-index-certain-parts-of-your-page/comment-page-3/">Подробнее</a>.
<!-- googleon: all-->
```
