;(function () {
    "use strict";

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
		function eventPageX(event) {
			var pageX = event.pageX;

			if (typeof pageX == 'undefined') {
				var body = document.body;
				var docElem = document.documentElement;
				pageX = event.clientX + (docElem && docElem.scrollLeft || body && body.scrollLeft || 0) - (docElem && docElem.clientLeft || body && body.clientLeft || 0);
			}

			return pageX;
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
    function DragHandler(table, options) {

		//set default options
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
		DragHandler.prototype = new MouseHandler();
		DragHandler.prototype.constructor = DragHandler;
		
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
		function getIndex(state, searchId) {
			//find element
			var index = state.findIndex(function (element, index, array) {
				var id = element.id;
				if (id != searchId) {
					return false;
				} else {
					return true;
				}
			});
			
			return index;
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
				index = getIndex(state, id);
				
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
				index = getIndex(state, id),
				nc = table.rows[0].cells.length,
				pm = new Array(nc);
			for (var i = 0; i < nc; i++) {
				pm[i] = i;
			}
		
			if (index >= 0) {
				var element = state[index],
					memory = element[name],
					length = memory.length,
					nc = table.rows[0].cells.length;
		
				//check length
				if (nc == length) {
                    for (var i = 0; i < length; i++) {
                        var start = memory[i],
                            end = i;
                        pm.move(start, end);
                        if (pm[i] != start) moveTableColumn(table, start, end);
                    }
					pm = memory;
				}
			}

			return pm;
		}

		// private functions
		
		DragHandler.prototype._init = function () {
            this.pm = new Array(this.nc);
			for (var i = 0; i < this.nc; i++) {
				this.pm[i] = i;
			}

			if (this.options.restoreState)
				this.pm = restoreState('table-drag', this.table, 'drag');
		};

		// the overriden placeholder methods
		
		DragHandler.prototype._mousePrepareDrag = function (event) {
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
				initialColumn = eventTarget(event).cellIndex,
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
		DragHandler.prototype._mouseDrag = function (event) {
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
					saveState('table-drag', this.table, 'drag', this.pm);
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
		DragHandler.prototype._mouseStopDrag = function (event) {
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

    function TableDrag(table, options) {
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

        var dragHandler = new DragHandler(table, options || {});
		
        // attach handlers to each cell of the header row.
        for (var i = 0; i < dragHandler.nc; i++) {
            var cell = dragHandler.hr.cells[i];
            
			// add move cursor
            cell.style.cursor = 'move';

            addEvent(cell, 'mousedown', function (event) {
                dragHandler._mouseDown(event);
            });
        }
    }
	
    // export
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TableDrag;
    } else {
        window.TableDrag = TableDrag;
    }

    // polyfills and public code snippets

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
	if (!Array.prototype.findIndex) {
		try {
			Object.defineProperty(Array.prototype, 'findIndex', {
				enumerable: false,
				configurable: true,
				writable: true,
				value: function (predicate) {
					if (this == null) {
						throw new TypeError('Array.prototype.find called on null or undefined');
					}
					if (typeof predicate !== 'function') {
						throw new TypeError('predicate must be a function');
					}
					var list = Object(this);
					var length = list.length >>> 0;
					var thisArg = arguments[1];
					var value;

					for (var i = 0; i < length; i++) {
						if (i in list) {
							value = list[i];
							if (predicate.call(thisArg, value, i, list)) {
								return i;
							}
						}
					}
					return -1;
				}
			});
		} catch (e) { // ie8 support
			Array.prototype.findIndex = function(predicate) {
					if (this == null) {
						throw new TypeError('Array.prototype.find called on null or undefined');
					}
					if (typeof predicate !== 'function') {
						throw new TypeError('predicate must be a function');
					}
					var list = Object(this);
					var length = list.length >>> 0;
					var thisArg = arguments[1];
					var value;

					for (var i = 0; i < length; i++) {
						if (i in list) {
							value = list[i];
							if (predicate.call(thisArg, value, i, list)) {
								return i;
							}
						}
					}
					return -1;
			}
		}
	}

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