;(function () {
    "use strict";

	// helper functions

	function eventPageX(event) {
		var pageX = event.pageX;

		if (typeof pageX == 'undefined') {
			var body = document.body;
			var docElem = document.documentElement;
			pageX = event.clientX + (docElem && docElem.scrollLeft || body && body.scrollLeft || 0) - (docElem && docElem.clientLeft || body && body.clientLeft || 0);
		}

		return pageX;
	}
    function elementStyleProperty(element, prop) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(element, "").getPropertyValue(prop);
        } else { // http://stackoverflow.com/questions/21797258/getcomputedstyle-like-javascript-function-for-ie8
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return element.currentStyle[prop]
        }
    }
	function numericProperty(prop) {
        return (typeof prop == 'undefined' || prop == '' || prop == null) ? 0 : parseInt(prop);
    }
	function eventTarget (event) {
		return event.target || event.srcElement;
	}

	// Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
	// Author: Jim Palmer (based on chunking idea from Dave Koelle)
	// http://www.overset.com/2008/09/01/javascript-natural-sort-algorithm-with-unicode-support/
	function naturalSort(a, b) {
		var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
			sre = /(^[ ]*|[ ]*$)/g,
			dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
			hre = /^0x[0-9a-f]+$/i,
			ore = /^0/,
			i = function (s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
			// convert all to strings strip whitespace
			x = i(a).replace(sre, '') || '',
			y = i(b).replace(sre, '') || '',
			// chunk/tokenize
			xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
			yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
			// numeric, hex or date detection
			xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
			yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
			oFxNcL, oFyNcL;
		// first try and sort Hex codes or Dates
		if (yD)
			if (xD < yD) return -1;
			else if (xD > yD) return 1;
		// natural sorting through split numeric strings and default strings
		for (var cLoc = 0, numS = Math.max(xN.length, yN.length) ; cLoc < numS; cLoc++) {
			// find floats not starting with '0', string or 0 if not defined (Clint Priest)
			oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
			oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
			// handle numeric vs string comparison - number < string - (Kyle Adams)
			if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
				// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
			else if (typeof oFxNcL !== typeof oFyNcL) {
				oFxNcL += '';
				oFyNcL += '';
			}
			if (oFxNcL < oFyNcL) return -1;
			if (oFxNcL > oFyNcL) return 1;
		}
		return 0;
	}
    function sort(cell, table) {		
        // store rows for sorting
        var sortRows = [];
        for (var i = 1; i < table.rows.length; i++) {
            sortRows.push(table.rows[i]);
        }

        // sort
        sortRows.sort(function (a, b) {
            var x = a.cells[cell.cellIndex].textContent,
                y = b.cells[cell.cellIndex].textContent;

            return naturalSort(x, y);
        });

        if (hasClass(cell, 'sort-down')) {
            cell.className = cell.className.replace(/ sort-down/, '');
            cell.className += ' sort-up';
        } else {
            cell.className = cell.className.replace(/ sort-up/, '');
            cell.className += ' sort-down';
        }

        // before we append should we reverse the new array or not?
        if (hasClass(cell, 'sort-down')) {
            sortRows.reverse();
        }

        for (i = 0; i < sortRows.length; i++) {
            // appendChild(x) moves x if already present somewhere else in the DOM
            table.tBodies[0].appendChild(sortRows[i]);
        }
    }
	// https://github.com/tristen/tablesort/blob/gh-pages/src/tablesort.js
	// line 280 - 282
	var hasClass = function (el, c) {
		return (' ' + el.className + ' ').indexOf(' ' + c + ' ') > -1;
	}
	
	// storage functions
	// load state and returns the array
	function loadState(key) {
		var state = localStorage.getItem(key);

		if (state != null) {
			try {
				state = JSON.parse(state);
			} catch (e) {
				state = new Array();
			}
		} else {
			state = new Array();
		}

		return state;
	}
	function findIndex(state, searchId) {
		//find element
		for (var i = 0; i < state.length; i++) {
			var id = state[i].id;
			if (id == searchId) {
				return i;
			}
		}
		return -1;
	}
	function saveState(key, table /* name, prop*/) {
		// ie in offline mode can't use localStorage,
		// use alternative storage like
		// https://github.com/andris9/simpleStorage
		// or many more alternatives on
		// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills
		if (!localStorage) {
            console.log('localStorage not supported or not usable (i.e. ie in offline mode).');
			return; 
		}
			
		var state = loadState(key),
			id = table.getAttribute('id'),
			element = {id: id},
			index = findIndex(state, id);
				
		for (var i = 2; i < arguments.length; i+=2) {
			element[arguments[i]] = arguments[i+1];
		}

		// place element
		if (index < 0) {
			state.push(element);
		} else {
			state.splice(index, 1, element);
		}

		localStorage.setItem(key, JSON.stringify(state));
	}
	function restoreState(key, table, name) {
		var nc = table.rows[0].cells.length,
			pm = new Array(nc);
		for (var i = 0; i < nc; i++) {
			pm[i] = i;
		}
	
		// ie in offline mode can't use localStorage,
		// use alternative storage like
		// https://github.com/andris9/simpleStorage
		// or many more alternatives on
		// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills
		if (!localStorage) {
            console.log('localStorage not supported or not usable (i.e. ie in offline mode).');
			return pm; 
		}

		var state = loadState(key),
			id = table.getAttribute('id'),
			index = findIndex(state, id);
		
		if (index >= 0) {
			var element = state[index],
				memory = element[name];
		
			//check length
			if (name == 'drag' || name == 'resize') {
				var length = memory.length,
					nc = table.rows[0].cells.length;
			
				if (nc == length) {
					if (name == 'drag') {
						for (var i = 0; i < length; i++) {
							var start = memory[i],
								end = i;
							pm.move(start, end);
							if (pm[i] != start) moveTableColumn(table, start, end);
						}
						pm = memory;
					} else if (name == 'resize') {
						for (var i = 0; i < nc; i++) {
							var cell = table.rows[0].cells[i];
							cell.style.maxWidth = cell.style.width = memory[i];
						}
					}
				}
			} else if (name == 'sort') {
				var cell = table.rows[0].cells[memory.index];
			
				cell.className += ' ' + memory.order;
						
				sort(cell, table);
			}
		}

		return pm;
	}
	
	// Dragging (drag'n'drop) columns of html tables.
	// https://github.com/irhc/mouse-handler
    function MouseHandler () {
		//this._mouseDownEvent
		//this._mouseStarted
		//this._mouseMoveDelegate
		//this._mouseUpDelegate
    }
    MouseHandler.prototype = (function () {
		// helper functions
		
		// Cross browser event data based on
		// jquery implementation
		function getEvent(event) {
			return event || window.event;
		}
		function eventWhich(event) {
			return event.which || event.button;
		}
		function eventPageY(event) {
			var pageY = event.pageY;

			if (typeof pageY == 'undefined') {
				var body = document.body;
				var docElem = document.documentElement;
				pageY = event.clientY + (docElem && docElem.scrollTop || body && body.scrollTop || 0) - (docElem && docElem.clientTop || body && body.clientTop || 0);
			}

			return pageY;
		}
		
		// prototype functions
		
        function _mouseDown(event) {
			// ie8 support
            event = getEvent(event);

            // we may have missed mouseup (out of window) - clean start, reset all
            (this._mouseStarted && this._mouseUp(event));

            // to compute the first (and the following) mouse move correctly
            this._mouseDownEvent = event;
			// the above line only works for ie>8,  because _mouseDownEvent is a reference to the event
			// so in ie8 you have two references (_mouseDownEvent and event) which points to the same object, the window.event
			// to overcome this, you need a copy of the event e.g.
			if (!event.which) { // detect ie8
				var copy = {};
				for (var attr in event) {
					copy[attr] = event[attr];
				}
				this._mouseDownEvent = copy;
			}

            // only left mouse button down is of interest
			// ie8 support
            if (eventWhich(event) !== 1) {
                return true;
            }

            // lets start and check distance first
            if (this.options.distance == 0) {
				this._mouseStarted = this._mousePrepareDrag(event) !== false;
				if (!this._mouseStarted) {
					// ie8 support
					
					(event.preventDefault ? event.preventDefault() : (event.returnValue=false));
					(event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true));
					
					return true;
                }
            } else {
				this._mousePrepareClick(event);
			}

            // to keep context
            var _this = this;
            this._mouseMoveDelegate = function (event) {
                return _this._mouseMove(event);
            };
            this._mouseUpDelegate = function (event) {
                return _this._mouseUp(event);
            };

            addEvent(document.body, 'mousemove', this._mouseMoveDelegate);
            addEvent(document.body, 'mouseup', this._mouseUpDelegate);

			// ie8 support
			(event.preventDefault ? event.preventDefault() : (event.returnValue=false));
			(event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true));

            return true;
		}
        function _mouseMove(event) {
			// ie8 support
            event = getEvent(event);

            // Iframe mouseup check - mouseup occurred in another document
            if (!eventWhich(event)) {
                return this._mouseUp(event);
            }

            // drag functionality
            if (this._mouseStarted) {
			
                this._mouseDrag(event);
                
				// ie8 support
				(event.preventDefault ? event.preventDefault() : (event.returnValue=false));
				(event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true));

                return false;
            }

            // check distance (no action circle)
            if (this._mouseDistanceMet(event, this._mouseDownEvent)) {
				// lets start
                this._mouseStarted = (this._mousePrepareDrag(this._mouseDownEvent, event) !== false);
				// and move or stop
                (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
            }

			// ie8 support
			(event.preventDefault ? event.preventDefault() : (event.returnValue=false));
			(event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true));
			
            return !this.mouseStarted;
		}
        function _mouseUp(event) {
			// ie8 support
            event = getEvent(event);
			
            removeEvent(document.body, 'mousemove', this._mouseMoveDelegate);
            removeEvent(document.body, 'mouseup', this._mouseUpDelegate);

            if (this._mouseStarted) {
                this._mouseStarted = false;

				this._mouseStopDrag(event);
            } else {
				this._mouseExecuteClick(event);
			}

			// ie8 support
			(event.preventDefault ? event.preventDefault() : (event.returnValue=false));
			(event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true));
				
            return false;
		}
        function _mouseDistanceMet(newEvent, lastEvent) {
			var x = Math.abs(eventPageX(lastEvent) - eventPageX(newEvent)),
				y = Math.abs(eventPageY(lastEvent) - eventPageY(newEvent));
			return (Math.sqrt(x*x + y*y)) >= this.options.distance;
		}

        // These are placeholder methods, to be overriden by extentions
        function _mousePrepareClick() {}
		function _mousePrepareDrag() {}
        function _mouseDrag(event) {}
        function _mouseExecuteClick() {}
		function _mouseStopDrag() {}
		
		return {
			constructor: MouseHandler,
			options: {
				distance: 0
			},
			_mouseDown: _mouseDown,
			_mouseMove: _mouseMove,
			_mouseUp: _mouseUp,
			_mouseDistanceMet: _mouseDistanceMet,
			_mousePrepareClick: _mousePrepareClick,
			_mousePrepareDrag: _mousePrepareDrag,
			_mouseDrag: _mouseDrag,
			_mouseExecuteClick: _mouseExecuteClick,
			_mouseStopDrag: _mouseStopDrag
		};
	})();
	
    // This simple and small javascript solution for dragging html tables
    // is roughly based on
    // http://akottr.github.io/dragtable/
    // and
    // http://www.danvk.org/wp/dragtable/
    function DragSortHandler(table, options) {

		//set default options
		this.options.distance = 10;
		this.options.restoreState = true;
		
        // set options
		var newOptions = {};
        for (var opt in this.options)
			newOptions[opt] = (typeof options[opt] == 'undefined') ?  this.options[opt] : options[opt];
		this.options = newOptions;
		
		// table
		this.table = table;
        // header row
        this.hr = table.rows[0];
		// number of columns
		this.nc = this.hr.cells.length;
        // number of rows
        this.nr = table.rows.length;

		this._init();
    }
    (function () {
		DragSortHandler.prototype = new MouseHandler();
		DragSortHandler.prototype.constructor = DragSortHandler;
		
		// helper functions
		
        function tridentDetection() {
            return (navigator.userAgent.indexOf("Trident") != -1) ? true : false;
        };
        function borderCollapseDetection(table) {
            return elementStyleProperty(table, 'border-collapse') == 'collapse' ? true : false;
        }
		function getTableColumn(table, pageX, defaultColumn) {
			var cells = table.rows[0].cells;
			for (var i = 0; i < cells.length; i++) {
				var tx = getOffsetRect(cells[i]).left;
				if (tx <= pageX && pageX <= tx + cells[i].offsetWidth) {
					return i;
				}
			}

			return (typeof defaultColumn == 'undefined' ? -1 : defaultColumn);
		}
		function copyStyles(el) {
			var cs = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle,
				css = '';
			for (var i = 0; i < cs.length; i++) {
				var style = cs[i];
				css += style + ': ' + cs.getPropertyValue(style) + ';';
			}
			return css;
		}

		// public functions
		
		DragSortHandler.prototype.refresh = function () {
			if (typeof this.cell != 'undefined')
				sort(this.cell, this.table);
		};

		// private functions
		
		DragSortHandler.prototype._init = function () {
            this.pm = new Array(this.nc);
			for (var i = 0; i < this.nc; i++) {
				this.pm[i] = i;
			}

			if (this.options.restoreState)
				this.pm = restoreState('table-drag', this.table, 'drag');
		};

		// the overriden placeholder methods
		
		DragSortHandler.prototype._mousePrepareDrag = function (event) {
			var trident = tridentDetection(),
				table = this.table,
				borderCollapse = borderCollapseDetection(table),
				tablePosition = getOffsetRect(table),
				row = table.rows[0],
				rowPosition = getOffsetRect(row),
				rowOffsetHeight = row.offsetHeight,
				tableClientLeft = trident ? (rowPosition.left - tablePosition.left) : table.clientLeft,
				tableClientTop = trident ? (rowPosition.top - tablePosition.top) : table.clientTop,
				backLeft = borderCollapse ? tablePosition.left : (tablePosition.left + tableClientLeft),
                backTop = borderCollapse ? tablePosition.top : (rowPosition.top),
                backWidth = borderCollapse ? table.offsetWidth : table.offsetWidth - 2 * tableClientLeft,
                backHeight = table.rows[0].offsetHeight,
				zIndex = numericProperty(table.style.zIndex),
                zIndex = zIndex ? zIndex + 1 : 1,
				initialColumn = eventTarget(event).parentNode.parentNode.cellIndex,
                backgroundColor = elementStyleProperty(table, 'background-color');

            // last column, initial column
            this.lc = this.ic = initialColumn;

            // overlay - back
            var back = document.createElement("div");
            back.style.position = 'absolute';
            back.style.left = backLeft + 'px';
            back.style.top = backTop + 'px';
            back.style.width = backWidth + 'px';
            back.style.height = backHeight + 'px';
            back.style.backgroundColor = backgroundColor;
            back.style.zIndex = zIndex;

            // DEBUGGING
			//back.style.opacity =  0.4;
            //back.style.backgroundColor = 'green';

            // overlay - front
            for (var i = 0; i < this.nc; i++) {
                var cell = row.cells[i],
                    cellPosition = getOffsetRect(cell),
                    offsetWidth = cell.offsetWidth,
                    offsetHeight = cell.offsetHeight,
                    clientWidth = cell.clientWidth,
                    clientHeight = cell.clientHeight,
                    clientLeft = cell.clientLeft,
                    clientTop = cell.clientTop,
                    clientRight = offsetWidth - clientWidth - clientLeft,
                    clientBottom = offsetHeight - clientHeight - clientTop,
                    paddingTop = numericProperty(elementStyleProperty(cell, 'padding-top')),
                    paddingBottom = numericProperty(elementStyleProperty(cell, 'padding-bottom')),
					temp = cell.getBoundingClientRect(),
                    computedCellHeight = temp.bottom - temp.top - clientTop - clientBottom - paddingTop - paddingBottom,
					borderLeftWidth = borderCollapse ? (clientRight + clientLeft) : clientLeft,
					borderTopWidth = borderCollapse ? (clientTop + clientBottom) : clientTop,
					borderRightWidth = borderCollapse ? (clientRight + clientLeft) : clientRight,
					borderBottomWidth = borderCollapse ? (clientTop + clientBottom) : clientBottom,
					elementBaseLeft = borderCollapse ? (cellPosition.left - backLeft - tableClientLeft) : cellPosition.left - backLeft,
                    elementBaseTop = borderCollapse ? (cellPosition.top - backTop - tableClientTop) : cellPosition.top - backTop,
                    elementBaseWidth = clientWidth + borderLeftWidth + borderRightWidth,
                    elementBaseHeight = rowOffsetHeight;

                var element = document.createElement("div");
                element.style.cssText = copyStyles(cell);
                element.style.position = 'absolute';
                element.style.left = 0;
                element.style.top = 0;
                element.style.height = computedCellHeight + 'px';
                element.style.borderLeftWidth = borderLeftWidth + 'px';
                element.style.borderTopWidth = borderTopWidth + 'px';
                element.style.borderRightWidth = borderRightWidth + 'px';
                element.style.borderBottomWidth = borderBottomWidth + 'px';
                element.innerHTML = cell.innerHTML;
                element.style.zIndex = zIndex + 3;

                if (i == initialColumn) element.style.left = elementBaseLeft + 'px';
                if (i == initialColumn) element.style.top = elementBaseTop + 'px';

                var elementBase = document.createElement("div");
                elementBase.style.position = 'absolute';
                elementBase.style.left = elementBaseLeft + 'px';
                elementBase.style.top = elementBaseTop + 'px';
                elementBase.style.height = elementBaseHeight + 'px';
                elementBase.style.width = elementBaseWidth + 'px';
                elementBase.style.backgroundColor = 'white';
                elementBase.style.zIndex = zIndex + 2;
				
                if (i == initialColumn) elementBase.style.zIndex = zIndex + 1;

                // DEBUGGING
                //element.style.top = 50 + 'px';
                //if (i == initialColumn) element.style.top = elementBaseTop + 75 + i*10 + 'px';
                //elementBase.style.backgroundColor = 'green';
                //elementBase.style.top = elementBaseTop + 75 + i*10 + 'px';

                // drag element
                if (i == initialColumn) this.de = element;
                if (i != initialColumn) elementBase.appendChild(element);
                back.appendChild(elementBase);
            }
            back.appendChild(this.de);
            document.body.appendChild(back);

            this.overlay = back;

            // replace current document cursor
            this.cur = document.body.style.cursor;
            document.body.style.cursor = 'move';

            return true;
		};
		DragSortHandler.prototype._mouseDrag = function (event) {
            var distance = eventPageX(event) - eventPageX(this._mouseDownEvent),
				table = this.table,
                lastColumn = this.lc,
                eventColumn = getTableColumn(table, eventPageX(event), lastColumn);

            this.de.style.left = numericProperty(this.de.style.left) + distance + 'px';

            if (eventColumn != lastColumn) { // bubble

                var trident = tridentDetection(),
                    borderCollapse = borderCollapseDetection(table),
                    borderSpacing = borderCollapse ? 0 : numericProperty(elementStyleProperty(table, 'border-spacing')),
                    direction = sign(eventColumn - lastColumn);

                for (var i = lastColumn; i != eventColumn; i += direction) {
                    var start = i,
                        end = start + direction,
                        shift = 0,
                        shift = (direction < 0 && start > this.ic) ? 1 : ((direction > 0 && start < this.ic) ? -1 : 0),
                        layerOne = this.overlay.childNodes[direction < 0 ? this.ic : (end + shift)],
                        layerTwo = this.overlay.childNodes[direction > 0 ? this.ic : (end + shift)],
						borderLeftWidth = numericProperty(elementStyleProperty(direction < 0 ? layerTwo.childNodes[0] : this.de, 'border-left-width')),
                        borderLeftWidth = borderCollapse ? borderLeftWidth : 0,
                        left = numericProperty(layerTwo.style.left),
                        width = numericProperty(layerOne.style.width);

                    layerOne.style.left = left + 'px';
                    layerTwo.style.left = left + width + borderSpacing - borderLeftWidth + 'px';

                    // shift
                    this.pm.move(start, end);
                    // set new column
                    this.lc = end;
                }
				
				if (this.options.restoreState)
					saveState('table-drag-sort-resize', this.table, 'drag', this.pm);
            }

			this._mouseDownEvent = event;
			if (!event.which) { // detect ie8
				var copy = {};
				for (var attr in event) {
					copy[attr] = event[attr];
				}
				this._mouseDownEvent = copy;
			}
		}
		DragSortHandler.prototype._mouseExecuteClick = function (event) {
			var index = 0,
				cell = eventTarget(event).parentNode.parentNode;
            for (var j = 0; j < this.nc; j++) {
				var c = this.hr.cells[j];
                if (c !== cell) {
					if (hasClass(c, 'sort-up') || hasClass(c, 'sort-down')) {
						c.className = c.className.replace(' sort-down', '')
												 .replace(' sort-up', '');
					}
                } else {
					index = j;
				}
            }

			this.cell = cell;
            sort(cell, this.table);
			
			if (this.options.restoreState)
				saveState('table-drag-sort-resize', this.table, 'sort', {index: index, order: ((hasClass(cell, 'sort-down')) ? 'sort-up' : 'sort-down')});
		}
		DragSortHandler.prototype._mouseStopDrag = function (event) {
            // remove overlay
            document.body.removeChild(this.overlay);

            // move column if neccessary
			var table = this.table,
				col = getTableColumn(table, eventPageX(event), this.lc);
            if (col != this.ic)
                moveTableColumn(table, this.ic, col);

            // restore mouse cursor
            document.body.style.cursor = this.cur;
		};
	})();
	
    function ResizeHandler(table, options) {

		//set default options
		this.options.minWidth = 30;
		this.options.restoreState = true;
		this.options.fixed = false;
		
        // set options
		var newOptions = {};
        for (var opt in this.options) {
			newOptions[opt] = (typeof options[opt] == 'undefined') ?  this.options[opt] : options[opt];
		}
		this.options = newOptions;
		
		// table
		this.table = table;
        // header row
        this.hr = table.rows[0];
		// number of columns
		this.nc = this.hr.cells.length;
        // number of rows
        this.nr = table.rows.length;

		this._init();
		
    }
    (function () {
		ResizeHandler.prototype = new MouseHandler();
		ResizeHandler.prototype.constructor = ResizeHandler;

		// private functions
		
		ResizeHandler.prototype._init = function () {
            for (var i = 0; i < this.nc; i++) {
                var cell = this.hr.cells[i],
					width = elementStyleProperty(cell, 'width'),
					width = width == 'auto'?(cell.clientWidth-numericProperty(elementStyleProperty(cell, 'paddingLeft'))-numericProperty(elementStyleProperty(cell, 'paddingRight')))+'px':width; // ie8 support
                cell.style.width = width;
            }
			
			if (this.options.restoreState)
				restoreState('table-drag-sort-resize', this.table, 'resize');
		};

		// the overriden placeholder methods
		
		ResizeHandler.prototype._mousePrepareDrag = function (event) {
			// initial column
            this.ic = eventTarget(event).parentNode.parentNode.cellIndex;
            var initialColumn = this.ic,
				fixed = this.options.fixed,
				cell = [],
				width = [];
			for (var i = 0; i < 2; i++) {
				cell[i] = this.hr.cells[initialColumn+(i?fixed:i)];
				width[i] = numericProperty(cell[i].style.width);
			}
		
            for (var i = 0; i < this.nr; i++) {
				for (var j = 0; j <= fixed; j++) {
					cell = this.table.rows[i].cells[initialColumn+j];
					cell.style.maxWidth = cell.style.width = width[j] + 'px';
				}
            }

            // replace current document cursor
            this.cur = document.body.style.cursor;
            document.body.style.cursor = 'col-resize';

            return true;
		};
		ResizeHandler.prototype._mouseDrag = function (event) {
            var dist = eventPageX(event) - eventPageX(this._mouseDownEvent),
                initialColumn = this.ic,
				fixed = this.options.fixed,
				cell = [],
				width = [];
			for (var i = 0; i < 2; i++) {
				cell[i] = this.hr.cells[initialColumn+(i?fixed:i)];
				width[i] = numericProperty(cell[i].style.width);
			}

            if (width[0] <= -dist || width[1] <= dist) {
                this._mouseStopDrag(event);
            } else {
                var newWidth = [width[0] + dist, width[1] - dist];
                if (newWidth[0] > this.options.minWidth && newWidth[1] > this.options.minWidth) {

                    for (var i = 0; i < this.nr; i++) {
						for (var j = 0; j <= fixed; j++) {
							cell = this.table.rows[i].cells[initialColumn+j];
							cell.style.maxWidth = cell.style.width = newWidth[j] + 'px';
						}
                    }

					this._mouseDownEvent = event;
					if (!event.which) { // detect ie8
						var copy = {};
						for (var attr in event) {
							copy[attr] = event[attr];
						}
						this._mouseDownEvent = copy;
					}
                }
            }
		}
		ResizeHandler.prototype._mouseStopDrag = function () {
			var temp = new Array(this.nc);
            for (var i = 0; i < this.nc; i++) {
                var cell = this.hr.cells[i];
                temp[i] = cell.style.width;
            }

			if (this.options.restoreState)
				saveState('table-drag-sort-resize', this.table, 'resize', temp);
		
            // restore mouse cursor
            document.body.style.cursor = this.cur;
		};
	})();

    function TableDragSortResize(table, options) {
		// check input
        if (table && table.tagName !== 'TABLE') {
			console.log('ERROR: DOM element/input is not a table!');
            return;
        }
		
        // check empty table
        if (!(table && table.rows && table.rows.length > 0)) {
			console.log('WARNING: Empty table.');
            return;
        }

		options = options || {};
        var dragSortHandler = new DragSortHandler(table, options);
		var resizeHandler = new ResizeHandler(table, options);
				
        // attach handlers to each cell of the header row.
        for (var i = 0; i < ((options.fixed)?(dragSortHandler.nc-1):dragSortHandler.nc); i++) {
            var cell = dragSortHandler.hr.cells[i];
            
			// check and set space for sort order image
            var paddingTop = numericProperty(elementStyleProperty(cell, 'padding-top'));
            cell.style.paddingTop=(paddingTop>6?paddingTop:6)+'px';
            cell.className += ' sort-header';
			
			// add default cursor
            cell.style.cursor = 'pointer';

            addEvent(cell, 'mousedown', function (event) {
                dragSortHandler._mouseDown(event);
			});
			
            cell.innerHTML = '<div class=\"resize-base\"><div class=\"resize-elem\"></div><div class=\"resize-text\">' + cell.innerHTML + '</div></div>';

            addEvent(cell.childNodes[0].childNodes[0], 'mousedown', function (event) {
                resizeHandler._mouseDown(event);
            });
        }
    }
	
    // export
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TableDragSortResize;
    } else {
        window.TableDragSortResize = TableDragSortResize;
    }

    // polyfills and public code snippets

    // http://ejohn.org/apps/jselect/event.html
    function addEvent(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function () {
                obj['e' + type + fn](window.event);
            };
            obj.attachEvent('on' + type, obj[type + fn]);
        } else
            obj.addEventListener(type, fn, false);
    }
    function removeEvent(obj, type, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else
            obj.removeEventListener(type, fn, false);
    }
	
   // http://javascript.info/tutorial/coordinates
    function getOffsetRect(elem) {
        // (1)
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        // (2)
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        // (3)
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        // (4)
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }

    // based on
    // https://groups.google.com/forum/#!msg/comp.lang.javascript/durZ17iSD0I/rnH2FqrvkooJ
    function moveTableColumn(table, start, end) {
        var row,
            i = table.rows.length;
        while (i--) {
            row = table.rows[i];
            var x = row.removeChild(row.cells[start]);
            row.insertBefore(x, row.cells[end]);
        }
    }

    // http://stackoverflow.com/questions/7624920/number-sign-in-javascript
    function sign(x) {
        return typeof x == 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
    }
	
    // http://stackoverflow.com/questions/2440700/reordering-arrays
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };
	
})();