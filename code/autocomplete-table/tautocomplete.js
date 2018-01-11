/*
 * 将html表格数据转化为json数组
 * */
(function ($) {
    'use strict';
    $.fn.tableToJSON = function (opts) {

        // Set options
        var defaults = {
            ignoreColumns: [],
            onlyColumns: null,
            ignoreHiddenRows: true,
            ignoreEmptyRows: false,
            headings: null,
            allowHTML: false,
            includeRowId: false,
            textDataOverride: 'data-override',
            extractor: null,
            textExtractor: function (cellIndex, $cell) {
                return $cell.find('input').prop("checked") || $cell.find('input, select').val() || $cell.text();
            }
        };
        opts = $.extend(defaults, opts);

        var notNull = function (value) {
            return value !== undefined && value !== null;
        };

        var notEmpty = function (value) {
            return value !== undefined && value.length > 0;
        };

        var ignoredColumn = function (index) {
            if (notNull(opts.onlyColumns)) {
                return $.inArray(index, opts.onlyColumns) === -1;
            }
            return $.inArray(index, opts.ignoreColumns) !== -1;
        };

        var arraysToHash = function (keys, values) {
            var result = {},
                index = 0;
            $.each(values, function (i, value) {
                // when ignoring columns, the header option still starts
                // with the first defined column
                if (index < keys.length && notNull(value)) {
                    if (notEmpty(keys[index])) {
                        result[keys[index]] = value;
                    }
                    index++;
                }
            });
            return result;
        };

        var cellValues = function (cellIndex, cell, isHeader) {
            var $cell = $(cell),
                // extractor
                extractor = opts.extractor || opts.textExtractor,
                override = $cell.attr(opts.textDataOverride),
                value;
            // don't use extractor for header cells
            if (extractor === null || isHeader) {
                return $.trim(override || (opts.allowHTML ? $cell.html() : cell.textContent || $cell.text()) || '');
            } else {
                // overall extractor function
                if ($.isFunction(extractor)) {
                    value = override || extractor(cellIndex, $cell);
                    return typeof value === 'string' ? $.trim(value) : value;
                } else if (typeof extractor === 'object' && $.isFunction(extractor[cellIndex])) {
                    value = override || extractor[cellIndex](cellIndex, $cell);
                    return typeof value === 'string' ? $.trim(value) : value;
                }
            }
            // fallback
            return $.trim(override || (opts.allowHTML ? $cell.html() : cell.textContent || $cell.text()) || '');
        };

        var rowValues = function (row, isHeader) {
            var result = [];
            var includeRowId = opts.includeRowId;
            var useRowId = (typeof includeRowId === 'boolean') ? includeRowId : (typeof includeRowId === 'string') ? true : false;
            var rowIdName = (typeof includeRowId === 'string') === true ? includeRowId : 'rowId';
            if (useRowId) {
                if (typeof $(row).attr('id') === 'undefined') {
                    result.push(rowIdName);
                }
            }
            $(row).children('td,th').each(function (cellIndex, cell) {
                result.push(cellValues(cellIndex, cell, isHeader));
            });
            return result;
        };

        var getHeadings = function (table) {
            var firstRow = table.find('tr:first').first();
            return notNull(opts.headings) ? opts.headings : rowValues(firstRow, true);
        };

        var construct = function (table, headings) {
            var i, j, len, len2, txt, $row, $cell,
                tmpArray = [],
                cellIndex = 0,
                result = [];
            table.children('tbody,*').children('tr').each(function (rowIndex, row) {
                if (rowIndex > 0 || notNull(opts.headings)) {
                    var includeRowId = opts.includeRowId;
                    var useRowId = (typeof includeRowId === 'boolean') ? includeRowId : (typeof includeRowId === 'string') ? true : false;

                    $row = $(row);

                    var isEmpty = ($row.find('td').length === $row.find('td:empty').length) ? true : false;

                    if (($row.is(':visible') || !opts.ignoreHiddenRows) && (!isEmpty || !opts.ignoreEmptyRows) && (!$row.data('ignore') || $row.data('ignore') === 'false')) {
                        cellIndex = 0;
                        if (!tmpArray[rowIndex]) {
                            tmpArray[rowIndex] = [];
                        }
                        if (useRowId) {
                            cellIndex = cellIndex + 1;
                            if (typeof $row.attr('id') !== 'undefined') {
                                tmpArray[rowIndex].push($row.attr('id'));
                            } else {
                                tmpArray[rowIndex].push('');
                            }
                        }

                        $row.children().each(function () {
                            $cell = $(this);
                            // skip column if already defined
                            while (tmpArray[rowIndex][cellIndex]) {
                                cellIndex++;
                            }

                            // process rowspans
                            if ($cell.filter('[rowspan]').length) {
                                len = parseInt($cell.attr('rowspan'), 10) - 1;
                                txt = cellValues(cellIndex, $cell);
                                for (i = 1; i <= len; i++) {
                                    if (!tmpArray[rowIndex + i]) {
                                        tmpArray[rowIndex + i] = [];
                                    }
                                    tmpArray[rowIndex + i][cellIndex] = txt;
                                }
                            }
                            // process colspans
                            if ($cell.filter('[colspan]').length) {
                                len = parseInt($cell.attr('colspan'), 10) - 1;
                                txt = cellValues(cellIndex, $cell);
                                for (i = 1; i <= len; i++) {
                                    // cell has both col and row spans
                                    if ($cell.filter('[rowspan]').length) {
                                        len2 = parseInt($cell.attr('rowspan'), 10);
                                        for (j = 0; j < len2; j++) {
                                            tmpArray[rowIndex + j][cellIndex + i] = txt;
                                        }
                                    } else {
                                        tmpArray[rowIndex][cellIndex + i] = txt;
                                    }
                                }
                            }

                            txt = tmpArray[rowIndex][cellIndex] || cellValues(cellIndex, $cell);
                            if (notNull(txt)) {
                                tmpArray[rowIndex][cellIndex] = txt;
                            }
                            cellIndex++;
                        });
                    }
                }
            });
            $.each(tmpArray, function (i, row) {
                if (notNull(row)) {
                    // remove ignoredColumns / add onlyColumns
                    var newRow = notNull(opts.onlyColumns) || opts.ignoreColumns.length ?
                        $.grep(row, function (v, index) {
                            return !ignoredColumn(index);
                        }) : row,

                        // remove ignoredColumns / add onlyColumns if headings is not defined
                        newHeadings = notNull(opts.headings) ? headings :
                        $.grep(headings, function (v, index) {
                            return !ignoredColumn(index);
                        });

                    txt = arraysToHash(newHeadings, newRow);
                    result[result.length] = txt;
                }
            });
            return result;
        };

        // Run
        var headings = getHeadings(this);
        return construct(this, headings);
    };
})(jQuery);

(function ($) {
    "use strict";

    $.fn.tautocomplete = function (options, callback) {

        // default parameters
        var settings = $.extend({
            width: "500px",
            columns: [],
            onchange: null,
            norecord: "No Records Found",
            dataproperty: null,
            regex: "^[a-zA-Z0-9\b]+$",
            data: null,
            placeholder: null,
            theme: "default"
        }, options);


        var cssClass = [
            ["default", "adropdown"],
            ["classic", "aclassic"],
            ["white", "awhite"]
        ];

        // set theme
        cssClass.filter(function (v, i) {
            if (v[0] == settings.theme) {
                settings.theme = v[1];
                return;
            }
        });

        // initialize DOM elements
        var el = {
            ddDiv: $("<div>", {
                class: settings.theme
            }),
            ddTable: $("<table></table>", {
                style: "width:" + settings.width
            }),
            ddTableCaption: $("<caption>" + settings.norecord + "</caption>"),
            ddTextbox: $("<input type='text'>")
        };

        var keys = {
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            TAB: 9
        };

        var errors = {
            columnNA: "Error: Columns Not Defined",
            dataNA: "Error: Data Not Available"
        };

        // plugin properties
        var tautocomplete = {
            id: function () {
                return el.ddTextbox.data("id");
            },
            text: function () {
                return el.ddTextbox.data("text");
            },
            searchdata: function () {
                return el.ddTextbox.val();
            },
            isNull: function () {
                if (el.ddTextbox.data("id") == "")
                    return true;
                else
                    return false;
            }
        };

        // delay function which listens to the textbox entry
        var delay = (function () {
            var timer = 0;
            return function (callsback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callsback, ms);
            };
        })();

        var focused = false;

        // check if the textbox is focused.
        if (this.is(':focus')) {
            focused = true;
        }

        // get number of columns
        var cols = settings.columns.length;

        var orginalTextBox = this;

        // wrap the div for style
        this.wrap("<div class='acontainer'></div>");

        // create a textbox for input
        this.after(el.ddTextbox);
        el.ddTextbox.attr("autocomplete", "off");
        el.ddTextbox.css("width", this.width + "px");
        el.ddTextbox.css("font-size", this.css("font-size"));
        el.ddTextbox.attr("placeholder", settings.placeholder);

        // check for mandatory parameters
        if (settings.columns == "" || settings.columns == null) {
            el.ddTextbox.attr("placeholder", errors.columnNA);
        } else if (settings.data == "" || settings.data == null) {
            el.ddTextbox.attr("placeholder", errors.dataNA);
        }

        // append data property
        if (settings.dataproperty != null) {
            for (var key in settings.dataproperty) {
                el.ddTextbox.attr("data-" + key, settings.dataproperty[key]);
            }
        }

        // append div after the textbox
        this.after(el.ddDiv);

        // hide the current text box (used for stroing the values)
        this.hide();

        // append table after the new textbox
        el.ddDiv.append(el.ddTable);
        el.ddTable.attr("cellspacing", "0");
        el.ddTable.attr("id", "tautocompleteTable");

        // append table caption
        el.ddTable.append(el.ddTableCaption);

        // create table columns
        var header = "<thead><tr>";
        // header = header + "<th style='display:none;'>id</th>";
        for (var i = 0; i <= cols - 1; i++) {
            if (settings.columns[i].isShow) {
                header = header + "<th data-override='" + settings.columns[i].code + "'>" + settings.columns[i].name + "</th>"
            } else {
                header = header + "<th style='display:none;' data-override='" + settings.columns[i].code + "'>" + settings.columns[i].name + "</th>"
            }
        }
        header = header + "<th style='display:none;'>choseStatus</th>";
        header = header + "</thead></tr>"
        el.ddTable.append(header);

        // assign data fields to the textbox, helpful in case of .net postbacks
        {
            var id = "",
                text = "";

            if (this.val() != "") {
                var val = this.val().split("#$#");
                id = val[0];
                text = val[1];
            }

            el.ddTextbox.attr("data-id", id);
            el.ddTextbox.attr("data-text", text);
            el.ddTextbox.val(text);
        }

        if (focused) {
            el.ddTextbox.focus();
        }

        // event handlers

        // autocomplete key press
        el.ddTextbox.keyup(function (e) {
            //return if up/down/return key
            if ((e.keyCode < 46 || e.keyCode > 90) && (e.keyCode != 8)) {
                e.preventDefault();
                return;
            }

            //delay for 1 second: wait for user to finish typing
            delay(function () {
                if (el.ddTextbox.val() == "") {
                    hideDropDown();
                    return;
                }

                // hide no record found message
                el.ddTableCaption.hide();

                el.ddTextbox.addClass("loading");

                if ($.isFunction(settings.data)) {
                    var data = settings.data.call(this, function (data) {
                        jsonParser(data);
                    });
                } else {
                    // default function
                }
            }, 1000);
        });

        // do not allow special characters
        el.ddTextbox.keypress(function (event) {
            var regex = new RegExp(settings.regex);
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });

        // textbox keypress events (return key, up and down arrow)
        el.ddTextbox.keydown(function (e) {

            var tbody = el.ddTable.find("tbody");
            var selected = tbody.find(".selected");

            if (e.keyCode == keys.ENTER) {
                e.preventDefault();
                select();
            }
            if (e.keyCode == keys.UP) {
                el.ddTable.find(".selected").removeClass("selected").find("td.choseStatus").text('false');
                if (selected.prev().length == 0) {
                    tbody.find("tr:last").addClass("selected").find("td.choseStatus").text('true');
                } else {
                    selected.prev().addClass("selected").find("td.choseStatus").text('true');
                }
            }
            if (e.keyCode == keys.DOWN) {
                tbody.find(".selected").removeClass("selected").find("td.choseStatus").text('false');
                if (selected.next().length == 0) {
                    tbody.find("tr:first").addClass("selected").find("td.choseStatus").text('true');
                } else {
                    el.ddTable.find(".selected").removeClass("selected").find("td.choseStatus").text('false');
                    selected.next().addClass("selected").find("td.choseStatus").text('true');
                }
            }
        });

        // row click event
        el.ddTable.delegate("tr", "mousedown", function () {
            el.ddTable.find(".selected").removeClass("selected").find("td.choseStatus").text('false');
            $(this).addClass("selected").find("td.choseStatus").text('true');
            select();
        });

        // textbox blur event
        el.ddTextbox.focusout(function () {
            hideDropDown();
            // clear if the text value is invalid 
            if ($(this).val() != $(this).data("text")) {

                var change = true;
                if ($(this).data("text") == "") {
                    change = false;
                }

                $(this).data("text", "");
                $(this).data("id", "");
                $(this).val("");
                orginalTextBox.val("");

                if (change) {
                    onChange();
                }
            }
        });

        function select() {

            // var selected = el.ddTable.find("tbody").find(".selected");
            // el.ddTextbox.data("id", selected.find('td').eq(0).text());
            // el.ddTextbox.data("text", selected.find('td').eq(1).text());
            // el.ddTextbox.val(selected.find('td').eq(1).text());
            // orginalTextBox.val(selected.find('td').eq(0).text() + '#$#' + selected.find('td').eq(1).text());
            var selected = $('#tautocompleteTable').tableToJSON({
                ignoreHiddenRows: false
            }).filter(function (item) {
                return item.choseStatus === 'true'
            });
            hideDropDown();
            onChange();
            if (callback) {
                callback(selected[0]);
            }
            el.ddTextbox.focus();
        }

        function onChange() {
            // onchange callback function
            if ($.isFunction(settings.onchange)) {
                settings.onchange.call(this);
            } else {
                // default function for onchange
            }
        }

        function hideDropDown() {
            el.ddTable.hide();
            el.ddTextbox.removeClass("inputfocus");
            el.ddDiv.removeClass("highlight");
            el.ddTableCaption.hide();
        }

        function showDropDown() {

            var cssTop = (el.ddTextbox.height() + 20) + "px 1px 0px 1px";
            var cssBottom = "1px 1px " + (el.ddTextbox.height() + 20) + "px 1px";

            // reset div top, left and margin
            el.ddDiv.css("top", "0px");
            el.ddDiv.css("left", "0px");
            el.ddTable.css("margin", cssTop);

            el.ddTextbox.addClass("inputfocus");
            el.ddDiv.addClass("highlight");
            el.ddTable.show();

            // adjust div top according to the visibility
            if (!isDivHeightVisible(el.ddDiv)) {
                el.ddDiv.css("top", -1 * (el.ddTable.height()) + "px");
                el.ddTable.css("margin", cssBottom);
                if (!isDivHeightVisible(el.ddDiv)) {
                    el.ddDiv.css("top", "0px");
                    el.ddTable.css("margin", cssTop);
                    $('html, body').animate({
                        scrollTop: (el.ddDiv.offset().top - 60)
                    }, 250);
                }
            }
            // adjust div left according to the visibility
            if (!isDivWidthVisible(el.ddDiv)) {
                el.ddDiv.css("left", "-" + (el.ddTable.width() - el.ddTextbox.width() - 20) + "px");
            }
        }


        function isShowColumn(key) {
            var result = true;
            settings.columns.forEach(function (item) {
                if (item.code === key) {
                    result = item.isShow;
                }
            });
            return result;
        }

        function isExistColumn(key) {
            var result = false;
            settings.columns.forEach(function (item) {
                if (item.code === key) {
                    result = true;
                }
            });
            return result;
        }

        function jsonParser(jsonData) {
            try {
                el.ddTextbox.removeClass("loading");

                // remove all rows from the table
                el.ddTable.find("tbody").find("tr").remove();

                var i = 0,
                    j = 0;
                var row = null,
                    cell = null;
                if (jsonData != null) {
                    for (i = 0; i < jsonData.length; i++) {

                        // display only 15 rows of data
                        if (i >= 15)
                            continue;

                        var obj = jsonData[i];
                        row = "";
                        j = 0;

                        settings.columns.forEach(function (column) {
                            cell = obj[column.code];
                            if (column.isShow) {
                                row = row + "<td>" + cell + "</td>";
                            } else {
                                row = row + "<td style='display:none;'>" + cell + "</td>";
                            }
                        })
                        // for (var key in obj) {
                        //     // return on column count
                        //         cell = obj[key];
                        //         if (key!=='choseStatus'&&!isExistColumn(key)) {
                        //             continue;
                        //         }
                        //         if (isShowColumn(key)) {
                        //             row = row + "<td>" + cell + "</td>";
                        //         } else {
                        //             row = row + "<td style='display:none;'>" + cell + "</td>";
                        //         }
                        // }
                        row = row + "<td class='choseStatus' style='display:none;'>false</td>";
                        // append row to the table
                        el.ddTable.append("<tr>" + row + "</tr>");
                    }
                }
                //debugger;
                // show no records exists
                if (i == 0)
                    el.ddTableCaption.show();

                // hide first column (ID row)
                // el.ddTable.find('td:nth-child(1)').hide();
                el.ddTable.find("tbody").find("tr:first").addClass('selected').find("td.choseStatus").text('true');
                showDropDown();
            } catch (e) {
                alert("Error: " + e);
            }
        }
        return tautocomplete;
    };
}(jQuery));

function isDivHeightVisible(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) &&
        (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isDivWidthVisible(elem) {
    var docViewLeft = $(window).scrollLeft();
    var docViewRight = docViewLeft + $(window).width();

    var elemLeft = $(elem).offset().left;
    var elemRight = elemLeft + $(elem).width();

    return ((elemRight >= docViewLeft) && (elemLeft <= docViewRight) &&
        (elemRight <= docViewRight) && (elemLeft >= docViewLeft));
}