# Выдвижная панель (drawer)

TODO: перевести и добавить коспект [Material Design](https://material.io/components/navigation-drawer)

A panel which slides in from the edge of the screen. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

It is most common for drawers to open from the right side of the page, though they can also come from the left, top or bottom.

![Выдвижная панель Cisco](https://wp.collab-ui.com/media/drawer-right-40@2x.png)

## When To Use

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Floating panel and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.
- Можно использовать для раздела комментариев.

## Layout

Left and right side drawers will always take up a specific percentage of the screen width, and will not adhere directly to the usual layout grids. They will always have their own 12 column grid (they do not follow the page grid).

Top and bottom drawers should stay within a 200-380 px range (depending on the content), and should generally be reserved for more graphical elements like charts and graphs.

## Accessibility

We have built in functionality based on the recommendations for dialogs and drawers in WAI-ARIA Authoring Practices 1.1.

- Upon opening, focus will be transferred to the first interactive element (unless autofocus is set to false)
- Container element has aria-label="drawer"
- Escape key closes the drawer
- Click on backdrop (anywhere outside dialog) hides drawer.
- Background is not be scrollable while drawer is open (position: fixed).
- Upon closing, focus should return to element that triggered drawer.
