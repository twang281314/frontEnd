(function($) {
    var cellSize = 15,
        cellBlank = 1,
        showOddDaysOfWeek = true,
        fontSize = 12;
    var daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var defineCellColor = function(data) {
        var i, max = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].count > max) {
                max = data[i].count;
            }
        }
        if (max == 0) {
            return function() {
                return "#eeeeee";
            };
        }
        if (max > 99) {
            max = 99;
        }
        return function(count) {
            var percentage = Math.ceil(count * 100 / max);
            if (percentage == 0) {
                return "#eeeeee";
            } else if (1 <= percentage && percentage <= 24) {
                return "#d6e685";
            } else if (25 <= percentage && percentage <= 49) {
                return "#8cc665";
            } else if (50 <= percentage && percentage <= 74) {
                return "#44a340";
            } else if (75 <= percentage) {
                return "#1e6923";
            }
        };
    };

    var generateGraph = function(data) {
        var i, x, cellColor, dayNode, weekNode, weekNodes = [];
        cellColor = defineCellColor(data);
        for (i = 0; i < data.length; i++) {
            if (i % 7 == 0) {
                x =  (cellSize + cellBlank) * Math.round(i / 7);
                weekNode = $('<g></g>').attr('transform', 'translate(' + x + ', 0)');
                weekNodes.push(weekNode);
            }
            dayNode = $('<rect></rect>')
                .addClass('day')
                .attr('width', cellSize)
                .attr('height', cellSize)
                .attr('y', (cellSize + cellBlank) * (i % 7))
                .attr('fill', cellColor(data[i].count))
                .attr('data-count', data[i].count)
                .attr('data-content', data[i].count)
                .attr('data-date', data[i].date);
            weekNode.append(dayNode);
        }
        return weekNodes;
    };

    var generateScale = function(data) {
        var i, d, x, textNode, scales = [];
        for (i = 0; i < data.length; i += 7) {
            d = moment(new Date(data[i].date));
            if (i === 0) {
                if (d.date() > d.endOf('month').date() - 14) {
                    continue;
                }
            } else {
                if (!(d.date() <= 7 && i + 7 < data.length)) {
                    continue;
                }
            }
            x = (cellSize + cellBlank) * Math.round(i / 7);
            textNode = $('<text></text>')
                .attr('x', x)
                .attr('y', -5)
                .addClass('month')
                .text(months[d.month()]);
            scales.push(textNode);
        }
        for (i = 0; i < 7; i++) {
            textNode = $('<text></text>')
                .attr('text-anchor', 'middle')
                .addClass('wday')
                .attr('dx', -8)
                .attr('dy', (cellSize + cellBlank) * (i % 7 + 1) - 2)
                .text(daysOfWeek[i]);
            if (showOddDaysOfWeek && i % 2 == 0) {
                textNode.attr('style', 'display: none;');
            }
            scales.push(textNode);
        }
        return scales;
    };

    var mergeSvg = function(data) {
        var canvas, svg, columns, element = $('#activeness-graph');
        columns = Math.floor(data.length / 7) + (data.length % 7 === 0 ? 0 : 1);
        canvas = $('<g></g>')
            .attr('transform', 'translate(13, 16)')
            .append(generateGraph(data))
            .append(generateScale(data));
        svg = $('<svg></svg>')
            .attr('width', fontSize + 3 + cellSize * columns + cellBlank * (columns - 1))
            .attr('height', fontSize + 5 + cellSize * 7 + cellBlank * 6)
            .append(canvas);
        element.empty();
        element.append(svg[0].outerHTML);
    };
    //var gk = window.location.pathname.substr(7);

    $.get('data.json', function(result) {
        if (result.code === 0) {
            mergeSvg(result.data.daily_activeness);
        }
    });
})(window.jQuery);
