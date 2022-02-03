# Вкладки

## Разметка (W3C)

```pug
.tabs
  ul(role='tablist' aria-label='Entertainment')
    li(role='none')
      button#nils(role='tab' aria-selected='true' aria-controls='nils-panel').
        Nils Frahm
    li(role='none')
      button#agnes(role='tab' aria-selected='false' aria-controls='agnes-panel' tabindex='-1').
        Agnes Obel
    li(role='none')
      button#complex(role='tab' aria-selected='false' aria-controls='complex-panel' tabindex='-1' data-deletable).
        Joke

  //- Use aria-labelledby instead h2.sr-only
  section#nils-panel(tabindex='0' role='tabpanel' aria-labelledby='nils')
    p Nils Frahm is a German musician, composer and record producer based in Berlin. He is known for combining classical and electronic music and for an unconventional approach to the piano in which he mixes a grand piano, upright piano, Roland Juno-60, Rhodes piano, drum machine, and Moog Taurus.

  section#agnes-panel(tabindex='0' role='tabpanel' aria-labelledby='agnes' hidden)
    p Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first album, Philharmonics, was released by PIAS Recordings on 4 October 2010 in Europe. Philharmonics was certified gold in June 2011 by the Belgian Entertainment Association (BEA) for sales of 10,000 Copies.

  section#complex-panel(tabindex='0' role='tabpanel' aria-labelledby='complex' hidden)
    p Fear of complicated buildings:
    p A complex complex complex.
```
