/*!
* @your/father v1.0.6
*
* Copyright 2019, 小蝌蚪
*
*/
import extend from 'extend';
import _readOnlyError from '@babel/runtime/helpers/readOnlyError';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';

var getEvent = function getEvent(event) {
  event = event || window.event;

  if (!event) {
    return event;
  }

  if (!event.target) {
    event.target = event.srcElement;
  }

  if (!event.currentTarget) {
    event.currentTarget = event.srcElement;
  }

  return event;
};
var getEventListenerMethod = function getEventListenerMethod() {
  var addMethod = 'addEventListener',
      removeMethod = 'removeEventListener',
      prefix = '';

  if (!window.addEventListener) {
    addMethod = 'attachEvent';
    removeMethod = 'detachEvent';
    prefix = 'on';
  }

  return {
    addMethod: addMethod,
    removeMethod: removeMethod,
    prefix: prefix
  };
};
var getBoundingClientRect = function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  var width = rect.width || rect.right - rect.left;
  var heigth = rect.heigth || rect.bottom - rect.top;
  return extend({}, rect, {
    width: width,
    heigth: heigth
  });
};
var stringify = function stringify(obj) {
  var params = [];

  for (var key in obj) {
    params.push("".concat(key, "=").concat(obj[key]));
  }

  return params.join('&');
};
function getDomPath(element) {
  var useClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(element instanceof HTMLElement)) {
    console.warn('input is not a HTML element!');
    return '';
  }

  var domPath = [];
  var elem = element;

  while (elem) {
    var domDesc = getDomDesc(elem, useClass);

    if (!domDesc) {
      break;
    }

    domPath.unshift(domDesc);

    if (querySelector(domPath.join('>')) === element || domDesc.indexOf('body') >= 0) {
      break;
    }

    domPath.shift();
    var children = elem.parentNode.children;

    if (children.length > 1) {
      for (var i = 0; i < children.length; i++) {
        if (children[i] === elem) {
          domDesc += ":nth-child(".concat(i + 1, ")");
          break;
        }
      }
    }

    domPath.unshift(domDesc);

    if (querySelector(domPath.join('>')) === element) {
      break;
    }

    elem = elem.parentNode;
  }

  return domPath.join('>');
}
function getDomDesc(element) {
  var useClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var domDesc = [];

  if (!element || !element.tagName) {
    return '';
  }

  if (element.id) {
    return "#".concat(element.id);
  }

  domDesc.push(element.tagName.toLowerCase());

  if (useClass) {
    var className = element.className;

    if (className && typeof className === 'string') {
      var classes = className.split(/\s+/);
      domDesc.push(".".concat(classes.join('.')));
    }
  }

  if (element.name) {
    domDesc.push("[name=".concat(element.name, "]"));
  }

  return domDesc.join('');
}
function querySelector(queryString) {
  return document.getElementById(queryString) || document.getElementsByName(queryString)[0] || document.querySelector(queryString);
}

var DefaultOptions = {
  useClass: false,
  per: 0.01,
  events: ['click']
};

var Tracker =
/*#__PURE__*/
function () {
  function Tracker() {
    _classCallCheck(this, Tracker);

    this._isInstall = false;
    this._options = {};
  }

  _createClass(Tracker, [{
    key: "config",
    value: function config() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options = extend(true, {}, DefaultOptions, options);
      options.event = DefaultOptions.event;
      this._options = options;
      return this;
    }
  }, {
    key: "_captureEvents",
    value: function _captureEvents() {
      var self = this;
      var events = this._options.events;
      var eventMethodObj = getEventListenerMethod();

      for (var i = 0, j = events.length; i < j; i++) {
        var eventName = events[i];
        document.body[eventMethodObj.addMethod](eventMethodObj.prefix + eventName, function (event) {
          var eventFix = getEvent(event);

          if (!eventFix) {
            return;
          }

          self._handleEvent(eventFix);
        }, false);
      }
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(event) {
      var per = parseFloat(this._options.per);

      if (!this.hit(per)) {
        return;
      }

      var domPath = getDomPath(event.target, this._options.useClass);
      var rect = getBoundingClientRect(event.target);

      if (rect.width == 0 || rect.height == 0) {
        return;
      }

      var t = document.documentElement || document.body.parentNode;
      var scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
      var scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body).scrollTop;
      var pageX = event.pageX || event.clientX + scrollX;
      var pageY = event.pageY || event.clientY + scrollY;
      var data = {
        domPath: encodeURIComponent(domPath),
        trackingType: event.type,
        offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
        offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6)
      };
      this.send(data);
    }
  }, {
    key: "send",
    value: function send() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      console.log('data', data);
      var image = new Image(1, 1);

      image.onload = function () {
        image = (_readOnlyError("image"), null);
      };

      image.src = "/?".concat(stringify(data));
    }
  }, {
    key: "hit",
    value: function hit() {
      var per = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      return Math.random() < per;
    }
  }, {
    key: "install",
    value: function install() {
      if (this._isInstall) {
        return this;
      }

      this._captureEvents();

      this._isInstall = true;
      return this;
    }
  }]);

  return Tracker;
}();

var tracker = new Tracker();

export default tracker;
//# sourceMappingURL=index.js.map
