# «Раскрывашка»

TODO: сделать разметку `details.accordion + summary`, добавить полифил [ebay](https://github.com/javan/details-element-polyfill).

TODO: закончить изучение компонента в ключевых дизайн-системах:

- [GOV.UK Design System](https://design-system.service.gov.uk/components/accordion/)
- [Helsinki Design System](https://hds.hel.fi/components/accordion)
- [Salesforce Lightning Accordion](https://www.lightningdesignsystem.com/components/accordion/)
- [Salesforce Lightning Expandable Section](https://www.lightningdesignsystem.com/components/expandable-section/)
- [Salesforce Lightning Summary Detail](https://www.lightningdesignsystem.com/components/summary-detail/)
- [Cisco Momentum](https://momentum.design/components/accordion/code)
- [Mozilla](https://protocol.mozilla.org/patterns/molecules/details.html)
- [British Gas Accordion](https://britishgas.design/docs/components/ns-accordion)
- [British Gas Expander](https://britishgas.design/docs/components/ns-expander)
- [Skandinaviska Enskilda Banken Accordion](https://designlibrary.sebgroup.com/components/component-accordion)
- [Skandinaviska Enskilda Banken Expander](https://designlibrary.sebgroup.com/components/component-section-expander)
- [Adobe Spectrum](https://opensource.adobe.com/spectrum-css/accordion.html)
- [Stack Overflow Expandable](https://stackoverflow.design/product/components/expandable/)
- [United States government](https://designsystem.digital.gov/components/accordion/)
- [W3C](https://design-system.w3.org/components/collapsible-containers.html)

TODO: перевести на русский.

The accordion component delivers large amounts of content in a small space through progressive disclosure. The header title give the user a high level overview of the content allowing the user to decide which sections to read.

It may either stand alone or be connected to a larger surface, such as a card. A group of accordions can be auto collapsible.

## Usage

- Grouping and organizing content to keep the page clean and digestible.
- Often used in sidebars and navigation menus for the progressive disclosure of links and filters.
- Accordions are used when space is at a premium and long content cannot be displayed all at once, like on a mobile interface or in a side panel.
- Accordions are best used for lightweight editing of an element, such as selecting a value for a setting. For example, an app that contains tables may use collapses to adjust settings on table elements.
- Accordions may be displayed in a sequence to form creation flows. For example, a tool for creating ad campaigns may display a series of collapses to collect campaign details.

### Filters

Usage of sidebars along with Accordions is the most common pattern for implementing filters, properties, and more.

![Filters in mobile sidebar](https://miro.medium.com/max/1400/1*JxLUoU4Rgy6wYTd0Hs1wxA.png)

## Behavior

Collapses have three different states: collapsed, hover, focus and expanded.

![Accordion states](https://miro.medium.com/max/1400/1*-YeLMM9l1m0Ljk04ZeaLqg.png)

### Collapsed state

A header of accordion displays summary information. Upon selecting the collapsed panel, it expands to display the full panel.

Helper text may be added to the panel to assist the user.

### Hover and focus state

Состояния закрытых «гармошек», попавших в фокус или под курсор. Обычно отличаются измененным цветом фона и, в случае фокуса, специальной рамкой.

On a keyboard, users may traverse through list items by using the Tab key.

### Expanded state

Upon selection, a collapsed panel expands, allowing users to read, add or edit information.

If multiple Accordions are used, the expanded state needs to be highlighted. By this, we help the user understand which Accordion element is opened. Here is how to stylize the highlight:
Shadow with elevation
Background fill
Outline border

![Expanded accordion](https://miro.medium.com/max/1400/1*0U0Xd24Y7Ln9jYKvBx5j7Q.png)
![Expanded accordion](https://miro.medium.com/max/1400/1*XFiUU2zcUiW_CTJY1UcPFA.png)

### Contained Accordion

In the vast majority of cases, we might want to use a contained Accordion. Divide its items with a slightly noticeable separator. This approach will save some vertical space.

![Contained Accordion](https://miro.medium.com/max/1400/1*tsA4vcSy6YLIdRzztw5O4w.png)

## Specs

![Material Design](https://material.io/archive/guidelines/assets/0B7WCemMG6e0VTFFiWFF4SWVHQ1E/components-material-expansionpanels-spec2.png)

![IBM Carbon](https://www.carbondesignsystem.com/static/2aa2aaffb6c819e1a860fcca39d4b0d4/3cbba/accordion-style-3.png)

In rare scenarios, the accordion can be modified to place the icon in front of the title to function more like a tree. However, most instances should use the default alignment.

## Icon

The chevron icon [most clearly indicated](https://www.nngroup.com/articles/accordion-icons/) to users that it would open an accordion in place, rather than linking directly to a new page.

After clicking on the Accordion, the Chevron rotates to indicate that the element has been successfully expanded. When clicked again, a collapse occurs, which returns the Chevron to its initial position.

We may also use these symbols instead of Chevron:
Caret
Arrow
`+ / -`

## Dos & Donts

- The title of the accordion must always be labelled bold to show there's an interaction.
- The arrows must face the way the content will expand (when in the default state) or collapse (when in it's expanded state).
- When there's no Javascript, all of the accordion content should be exposed and separated by headings.
- We can give more information about what's inside each drawer. For example, if you have eight items in a drawer, you can show this information alongside the title.
  ![Accordion helper text](https://ichef.bbci.co.uk/images/ic/1008xn/p06kylk1.png)

## CSS

Для кроссбраузерной стилизации маркера, чтобы скрыть дефолтный и добавить кастомный, необходимо для Firefox установить элементу summary `{display: block;}`, а для Chrome и Safari's установить `::-webkit-details-marker {display: none;}`. После этого дефолтный маркер будет скрыт, после чего можно установить свой маркер любым доступным способом стилизации.

## JavaScript

Each nested details element requires [a polyfill](https://github.com/javan/details-element-polyfill) for browsers that lack native support.

For accordions that allow all panels to be open at once, no other scripting is necessary; each nested details widget will handle the open and close mechanics.

For accordions that are restricted to a single open panel, the JavaScript steps can be briefly summarised as the following:

1. Find each nested details element
2. Listen to toggle event of each details element
3. When receiving a toggle event, if the details state has moved from closed to open, close all other details elements

That's it. Pretty straightforward. You can reference [our example code on GitHub](https://github.com/eBay/mindpatterns/blob/gh-pages/_js/accordion.es6.js).

## Разметка details+summary

````pug
//- Необязательный контейнер
aside.accordions(aria-label='Component title' data-role='auto-collapsible-accordions')

  details.accordion
    summary.accordion__header
      h2 Some details
    .accordion__content
      p More info about the details.

  details.accordion
    summary.accordion__header
      h2 The 2nd section heading
    .accordion__content
      p The 2nd section content.

## Разметка eBay — details+summary

```pug
ul.accordion(role='list' aria-roledescription='accordion')
  li
    details.accordion__details(open)
      summary: h2 Heading of the first section
      p Content of the first section
  li
    details.accordion__details
      summary: h2 Heading of the 2nd section
      ul
        li Content
        li of the 2nd section
```

## Разметка W3C

```pug
.collapse#accordion-01(data-role='accordion')

  h3: button.collapse__header#collapse-toggle-1(aria-expanded='true' aria-controls='sect1')
      | Personal Information
       +icon('chevron-down')

  section.collapse__content#sect1(role='region' aria-labelledby='collapse-toggle-1')
    //-  Variable content within section, may include any type of markup
         or interactive widgets.
    fieldset
      p
        label(for='filter-name')
          | Name <span aria-hidden="true">* </span>:
        input#filter-name.required(type='text' name='name' aria-required='true')
      p
        label(for='filter-email')
          | Email <span aria-hidden="true">* </span>:
        input#filter-email(type='email' name='email' aria-required='true')

  h3: button.collapse__header#collapse-toggle-2(aria-expanded='false' aria-controls='sect2')
      | Billing Address
      +icon('chevron-down')

  section.collapse__content#sect2(role='region' aria-labelledby='collapse-toggle-2')
    fieldset
      p
        label(for='filter-add') Address:
        input#filter-add(type='text' name='filter-add')
      p
        label(for='filter-city') City:
        input#filter-city(type='text' name='filter-city')
```

## Используемая разметка — основана на BS3

```html
<h3 class="collapse-title mt-1" id="collapse-advanced-title" href="#collapse-advanced" aria-controls="collapse-advanced" role="button" data-toggle="collapse" aria-expanded="false">
  Advanced settings
  <svg class="icon is-sm" aria-hidden="true" focusable="false">
    <use href="/images/socmedical/base/graphics/sprite.svg#icon-chevron-down-sm"></use>
  </svg>
</h3>

<section class="collapse" id="collapse-advanced" aria-labelledby="collapse-advanced-title">Lorem ipsum dolor sit amet.</section>
```

```pug
h3.collapse-title.mt-1#collapse-advanced-title(role='button' data-toggle='collapse' href='#collapse-advanced' aria-controls='collapse-advanced' aria-expanded='false')
  | Advanced settings
  +icon('chevron-down-sm', 'is-sm')

section.collapse#collapse-advanced(aria-labelledby='collapse-advanced-title')
  Lorem ipsum dolor sit.
```
````
