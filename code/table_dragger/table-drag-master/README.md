table-drag
==========

Dragging (drag'n'drop) columns of html tables.

###Samples

See [here](http://irhc.github.io/table-drag) for some samples. Its a pain to get it working with all popular render engines; uncommon table layouts will maybe not work perfectly.

###Description

table-drag is a small javascript component which adds basic functionality to html tables: dragging (drag'n'drop) columns. It is completely independent from other javascript libraries but should work side-by-side with libraries like jQuery, etc.

Any html tables which have at least one tr tag can be used (a thead or tbody tag is not mandatory), e.g.

```html
<table id="example">
    <tbody>
        <tr>
            <th>Name</th>
            <th>&Auml;nderungsdatum</th>
            <th>Typ</th>
            <th>Gr&ouml;&szlig;e</th>
        </tr>
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

###How to use

Just before the end of your body section simply put

```html
<script src='table-drag.min.js'></script>
<script>
  new TableDrag(document.getElementById('example'));
</script>
```

If you don't want to use default options, pass in an options object as second parameter

```html
  new TableDrag(document.getElementById('example'), { distance: 0, restoreState: true });
```

###Options

- distance (default 0): Sets the radius of a circle, where no drag action is triggered as long as mouse movements are within the circle.
- restoreState (default true): localStorage is used to remember the order of the cells if true.

###Supported browsers

- Internet Explorer 8 and newer
- Opera
- Chrome
- Firefox
- Safari 5.1.7 (and highly possible newer)

###References

This small javascript component uses or is based on other javascript projects and code snippets:

- [mouse-handler](https://github.com/irhc/mouse-handler)
- [dragtable: Visually reorder all your table columns](http://www.danvk.org/wp/dragtable/)
- [jquery dragtable by akottr](http://akottr.github.io/dragtable/)
- [mouse.js by jQuery](https://github.com/jquery/jquery-ui/blob/master/ui/mouse.js)
- [Reordering arrays on stackoverflow](http://stackoverflow.com/questions/2440700/reordering-arrays)
- [addEvent() recoding contest entry](http://ejohn.org/apps/jselect/event.html)
- [Coordinates from javascript.info](http://javascript.info/tutorial/coordinates)
- [Swapping table columns](https://groups.google.com/forum/#!msg/comp.lang.javascript/durZ17iSD0I/rnH2FqrvkooJ)
- [sign function on stackoverflow](http://stackoverflow.com/questions/7624920/number-sign-in-javascript)
- [findIndex polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

### Licence

MIT

