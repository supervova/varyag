# Varyag Game Website Theme

It's based on the Timber starter theme.

## TODO


- Сделать разметку woo/product под модальное окно

Совместить:
- templates/static/legal/*.twig
- разметку schema.org из шаблона Timber
- и разметку продукта из статического home.html

Все три части уже добавлены в шаблон.

- Добавить три оставшихся товара.

- перечитать в Notes конспекты 6. 💰 WooCommerce и 1.5 🌲 Timber — WooCommerce
и параллельно настроить WooCommerce

Остановился на 3. Добавление продуктов: Добавление товара

https://beseller.by/blog/kak-sozdat-internet-magazin-na-woocommerce/
https://ecommerce-platforms.com/ru/ecommerce-reviews/woocommerce-review

- 404.twig

- Вынести содержание модальных окон на отдельные страницы. Поскольку лонгриды считаются более привлекательными для поисковых систем, лучше собирать из содержательной части этих страниц один лендинг, используя шорткоды. Разделив большую страницу на части, мы облегчим Паше самостоятельное редактирование. Ну, и технологическое решение станет элегантнее.

  [Вставка содержания шорткодами](https://stackoverflow.com/questions/16347865/

  А страницы типа публичной оферты вынести за скобки, то есть подгружать AJAX'ом.

- Создать пользовательский тип материала `modals`. См. ~/Sites/michael-ravits/darren/cbbr/html/wp-content/themes/cbbr/functions.php ➜ `$attr_faq = array`.
См. также [Пользовательский тип материалов в Timber](https://www.youtube.com/watch?v=19T0MStDLSQ)
- Создать страницы типа `modals` с содержанием модальных окон.
- Вернуться к настройкам WooCommerce и определить.
  - Страницу корзины.
  - Страницу оформления заказа
  - Страницу «Мой аккаунт» («Учетная запись»)
  - Правила и условия (Terms and Conditions)
- Перенести сайт на [machost](https://mchost.ru/qa/q/kak-razmestit-v-makkhoste-sayt)

### После запуска

- Изменить адрес магазина в [настройках WooCommerce](/wp-admin/admin.php?page=wc-settings)
- Ввести [размеры и вес каждого товара](/wp-admin/admin.php?page=wc-settings&tab=products)
- ввести адрес электронной почты для оповещений о покупках: [здесь](/wp-admin/admin.php?page=wc-settings&tab=products&section=inventory) и [здесь](l/wp-admin/admin.php?page=wc-settings&tab=email)
- протестировать email'ы на телефоне — если подтвердится подозрение, что они не адаптивные, погуглить, как исправить, и починить.


## Timber stuff

`templates/` contains all Twig templates. These pretty much correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy. At the end of each PHP template, you'll notice a `Timber::render()` function whose first parameter is the Twig file where that data (or `$context`) will be used.

`bin/` and `tests/` ... basically don't worry about (or remove) these unless you know what they are and want to.

### Markup

- The project uses [Twig.js](https://github.com/twigjs/twig.js/wiki) HTML templating engine.
- The main content markup uses microdata and JSON-LD:
  - [Offer](http://schema.org/Offer)
  - [Product](http://schema.org/Product)

## CSS

- Styles are written using [Bootstrap utilities](https://getbootstrap.com/docs/5.0/utilities/api/).
- [Sass (SCSS)](https://sass-lang.com) is used for pre-processing CSS files.
- The modified principles of [BEM](https://en.bem.info) methodology are used for naming classes: `.block__element.is-modifier`.

## JavaScript

The site code is divided into component files, which are stored in the appropriate folders. All scripts are written in vanilla JS. Each script contains short documentation in [JSDoc](https://devdocs.io/jsdoc/about-getting-started).

### The source code architecture

```yaml
base/
  content/
    _body.scss
    _headings.scss
    _media.scss
    content.js
  graphics/                 # SVG sprite source
  input/                    # Various field styles and
                            # validation script
  layout/
  _animation.scss
  _button.scss
  _layout.scss
  _mixins.scss
  _normalize.scss
  _print.scss
  _shared.scss
  _variables.scss
components/
pages/
util/
style.scss                  # The main SCSS file into which
                            # all the above fragments are
                            # imported.
```

## How to work with frontend sources

The project uses [Gulp](https://gulpjs.com) — a cross-platform, streaming task runner that automate all development tasks including a build process.

1. Install [Node.js](https://nodejs.org/en/).
2. For Windows, you may need to install a Unix shell command line interface, such as [Git Bash](https://git-scm.com/downloads).
3. Check npm (node package manager) is installed via command prompt: `$ npm`.
4. Open terminal from this folder and run `$ npm install`.
5. Run `$ npm install gulp-cli -g` to install Gulp CLI.
6. Check Gulp CLI is installed via `$ gulp --help`.
7. Run development server: `$ gulp s`. Or build for production:  `$ gulp --p`

More information can be found inside gulpfile.js.
