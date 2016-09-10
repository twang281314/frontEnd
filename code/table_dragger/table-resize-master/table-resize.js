(function () {
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
	
    // This simple and small javascript solution for resizing html tables
    // is based on
    // http://bz.var.ru/comp/web/resizable.html
    function ResizeHandler(table, options) {

		//set default options
		this.options.minWidth = 30;
		this.options.restoreState = true;
		this.options.fixed = false;
		
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
		ResizeHandler.prototype = new MouseHandler();
		ResizeHandler.prototype.constructor = ResizeHandler;
		
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
				index = getIndex(state, id);
		
			if (index >= 0) {
				var element = state[index],
					memory = element[name],
					length = memory.length,
					nc = table.rows[0].cells.length;
		
				//check length
				if (nc == length) {
					for (var i = 0; i < nc; i++) {
						var cell = table.rows[0].cells[i];
						cell.style.maxWidth = cell.style.width = memory[i];
					}
				}
			}			
		}

		// private functions
		
		ResizeHandler.prototype._init = function () {
            for (var i = 0; i < this.nc; i++) {
                var cell = this.hr.cells[i],
					width = elementStyleProperty(cell, 'width'),
					width = width == 'auto'?(cell.clientWidth-numericProperty(elementStyleProperty(cell, 'paddingLeft'))-numericProperty(elementStyleProperty(cell, 'paddingRight')))+'px':width; // ie8 support
                cell.style.width = width;
            }
			
			if (this.options.restoreState)
				restoreState('table-resize', this.table, 'resize');
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
				saveState('table-resize', this.table, 'resize', temp);
		
            // restore mouse cursor
            document.body.style.cursor = this.cur;
		};
	})();

    function TableResize(table, options) {
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
        var resizeHandler = new ResizeHandler(table, options);
		
        // attach handlers to each cell of the header row.
		var length = resizeHandler.hr.cells.length;
        for (var i = 0; i < ((options.fixed)?(length-1):length); i++) {
            var cell = resizeHandler.hr.cells[i];
            cell.innerHTML = '<div class=\"resize-base\"><div class=\"resize-elem\"></div><div class=\"resize-text\">' + cell.innerHTML + '</div></div>';

            addEvent(cell.childNodes[0].childNodes[0], 'mousedown', function (event) {
                resizeHandler._mouseDown(event);
            });
        }
    }
	
    // export
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TableResize;
    } else {
        window.TableResize = TableResize;
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
	
})();