table-drag-sort-resize
======================

Dragging (drag'n'drop), resizing and sorting columns of html tables. Simple and small standalone javascript component.

###Samples

See [here](http://irhc.github.io/table-drag-sort-resize) for some samples.

###Description

table-drag-sort-resize is a small javascript component which adds basic functionality to html tables: dragging, sorting, resizing. It is completely independent from other javascript libraries but should work side-by-side with any other library like jQuery,etc.

Any html tables which have a thead and tbody tag can be used, e.g.

```html
<table id="example">
    <thead>
        <tr>
            <th>Name</th>
            <th>&Auml;nderungsdatum</th>
            <th>Typ</th>
            <th>Gr&ouml;&szlig;e</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>libraries</td>
            <td>08.10.2013 12:38</td>
            <td>Dateiordner</td>
            <td></td>
        </tr>
        <tr>
            <td>views</td>
            <td>08.10.2013 12:38</td>
            <td>Dateiordner</td>
            <td></td>
        </tr>
        <tr>
            <td>css</td>
            <td>18.05.2014 11:08</td>
            <td>Dateiordner</td>
            <td></td>
        </tr>
        <tr>
            <td>.htaccess</td>
            <td>03.06.2013 14:29</td>
            <td>HTACCESS-Datei</td>
            <td>1 KB</td>
        </tr>
        <tr>
            <td>config.php</td>
            <td>03.06.2013 14:29</td>
            <td>PHP-Datei</td>
            <td>3 KB</td>
        </tr>
        <tr>
            <td>blank.html</td>
            <td>18.05.2014 11:08</td>
            <td>HTLM-Datei</td>
            <td>1 KB</td>
        </tr>
    </tbody>
</table>
```

#####Supported sorting types

Many different column types can be sorted: numbers, text, web addresses, dates and many more.
See [Javascript Natural Sort Algorithm With Unicode Support](http://www.overset.com/2008/09/01/javascript-natural-sort-algorithm-with-unicode-support/) for a detailed description of supported sorting types.

###How to use

In the head section of your html file put

```html
<link href='table-drag-sort-resize.css' rel='stylesheet'>
```

Just before the end of your body section simply put

```html
<script src='table-drag-sort-resize.min.js'></script>
<script>
  new TableDragSortResize(document.getElementById('example'));
</script>
```

If you don't want to use default options, pass in an options object as second parameter

```html
  new TableDragSortResize(document.getElementById('example'), {distance: 100, minWidth: 60, restoreState: true, fixed: true});
```

###Options

- **distance**: [type: number] [default: 0] [version: 1.0]

Sets the radius of a circle, where no drag action is triggered as long as mouse movements are within the circle.

- **minWidth**: [type: number] [default: 30] [version: 1.0]

Sets the minimum width of the cells.

- **restoreState**: [type: boolean] [default: true] [version: 1.0]

localStorage is used to remember the last width of the cells if true.

- **fixed**: [type: boolean] [default: false] [version: 1.1]

If fixed is set true resizing a column shrinks or expands the next column. Thus the overall table width doesn't change. In the default behavior (fixed = false) resizing of a column works independently.


###Supported browsers

- Internet Explorer 8 and newer
- Opera
- Chrome
- Firefox
- Safari 5.1.7 (and highly possible newer)

###References

This small javascript component uses or is based on other javascript projects and code snippets:

- [mouse-handler](https://github.com/irhc/mouse-handler)
- [table-drag](https://github.com/irhc/table-drag)
- [table-sort](https://github.com/irhc/table-sort)
- [table-resize](https://github.com/irhc/table-resize)

### Licence

MIT
