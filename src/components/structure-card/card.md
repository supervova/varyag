# Карточка

## Использование микроразметки

```pug
figure.card(itemscope itemtype='https://schema.org/Product')
  a(class='card__link' href='jondoe-gadgets.com/dell-30.html' itemprop='url' )
    img.card__image(src='' alt='' itemprop='image' )
    figcaption (itemprop='name') Игра
      span(itemprop='offers' itemscope itemtype='https://schema.org/Offer')
        span(itemprop='price') 4399 р.
```
