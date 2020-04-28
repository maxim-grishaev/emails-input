(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".emails-input_emails-input__xFLm2 {\n  border: 1px solid #c3c2cf;\n  border-radius: 4px;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  box-sizing: border-box;\n  padding: 5px;\n  color: #050038;\n  background: #fff;\n  font-family: 'Open Sans', Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n}\n\n.emails-input_item__2MpRH {\n  display: inline-block;\n  margin-right: 8px;\n}\n\n.emails-input_item-close__3GCuf {\n  margin-left: 8px;\n  cursor: pointer;\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z' fill='%23050038'/%3E%3C/svg%3E%0A\");\n}\n\n.emails-input_invalid-item__1M_in {\n  border-bottom: 1px dashed #f00000;\n  padding: 0;\n}\n\n.emails-input_valid-item__36BwW {\n  padding: 3px 10px;\n  border-radius: 100px;\n  background: rgba(102, 153, 255, 0.2);\n}\n\n.emails-input_input__3XZXQ {\n  display: inline-block;\n  min-width: 100px;\n  margin-left: 8px;\n}\n.emails-input_input__3XZXQ:focus {\n  outline: none;\n}\n.emails-input_input__3XZXQ:not(:focus)::after {\n  display: inline-block;\n  content: attr(data-placeholder);\n  color: gray;\n}\n";
  var styles = {"emails-input":"emails-input_emails-input__xFLm2","item":"emails-input_item__2MpRH","item-close":"emails-input_item-close__3GCuf","invalid-item":"emails-input_invalid-item__1M_in","valid-item":"emails-input_valid-item__36BwW","input":"emails-input_input__3XZXQ","emailsInput":"emails-input_emails-input__xFLm2","itemClose":"emails-input_item-close__3GCuf","invalidItem":"emails-input_invalid-item__1M_in","validItem":"emails-input_valid-item__36BwW"};
  styleInject(css_248z);

  var createItem = function (options) {
      var itemNode = document.createElement('span');
      itemNode.setAttribute('contenteditable', String(false));
      itemNode.className = [styles.item, options.isValid ? styles.validItem : styles.invalidItem].join(' ');
      itemNode.innerHTML = options.value;
      var cross = createCloseButton();
      itemNode.appendChild(cross);
      return itemNode;
  };
  var createFragment = function (items) {
      var fragment = document.createDocumentFragment();
      items.forEach(function (item) {
          fragment.appendChild(item);
      });
      return fragment;
  };
  var createInput = function (placeholder) {
      var span = document.createElement('span');
      span.dataset.placeholder = placeholder;
      span.className = styles.input;
      span.setAttribute('contenteditable', String(true));
      return span;
  };
  var createCloseButton = function () {
      var span = document.createElement('span');
      span.className = styles.itemClose;
      return span;
  };
  var createRoot = function () {
      var eiNode = document.createElement('div');
      eiNode.className = styles.emailsInput;
      return eiNode;
  };

  var createPubSub = function () {
      var listeners = [];
      var unsubscribe = function (onNotify) {
          listeners = listeners.filter(function (fn) { return fn !== onNotify; });
      };
      var subscribe = function (onNotify) {
          // ignore duplicates
          if (listeners.some(function (fn) { return fn === onNotify; })) {
              return function () { return unsubscribe(onNotify); };
          }
          listeners.push(onNotify);
          // return unsubscribe
          return function () { return unsubscribe(onNotify); };
      };
      return {
          get listeners() {
              return listeners;
          },
          subscribe: subscribe,
          unsubscribe: unsubscribe,
          publish: function () {
              listeners.forEach(function (fn) { return fn(); });
          },
      };
  };

  var SEPARATOR_RE = /(?:,|\s+)/;
  var splitByCommaOrSpaces = function (text) {
      return text
          .split(SEPARATOR_RE)
          .map(function (t) { return t.trim(); })
          .filter(Boolean);
  };
  var VALID_EMAIL_RE = /^[-_.+a-z\d]+@[-_.a-z\d]+\.[a-z\d]+$/i;
  var isValidEmail = function (value) { return VALID_EMAIL_RE.test(value); };
  var DEFAULT_PLACEHOLDER = 'add more people...';

  var isItem = function (item) {
      if (!item || !item.className) {
          return false;
      }
      return item.className.split(' ').some(function (cn) { return cn === styles.item; });
  };
  var getItemByCloseButton = function (close) { return close.parentElement; };
  var isCloseButton = function (node) {
      return node.className === styles.itemClose;
  };
  var getTextItemsByRoot = function (rootNode) {
      var children = rootNode.children;
      var length = children.length;
      var items = [];
      for (var i = 0; i < length; i++) {
          var child = children.item(i);
          if (isItem(child)) {
              var text = child.textContent;
              if (text) {
                  items.push(text);
              }
          }
      }
      return items;
  };

  var getClipboardText = function (evt) {
      var _a;
      var clipboardData = evt.clipboardData || ((_a = evt.originalEvent) === null || _a === void 0 ? void 0 : _a.clipboardData);
      if (clipboardData) {
          return clipboardData.getData('text/plain');
      }
      if (window.clipboardData) {
          return window.clipboardData.getData('Text');
      }
  };

  var KeyCode;
  (function (KeyCode) {
      KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
      KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
  })(KeyCode || (KeyCode = {}));
  var listenInput = function (input, onAdd) {
      var flushInputValue = function () {
          var text = input.textContent || '';
          if (text) {
              onAdd(text);
              input.innerHTML = '';
          }
      };
      input.addEventListener('blur', flushInputValue);
      input.addEventListener('keyup', function (evt) {
          switch (evt.keyCode) {
              case KeyCode.COMMA:
              case KeyCode.ENTER:
                  flushInputValue();
          }
      });
      input.addEventListener('paste', function (evt) {
          evt.preventDefault();
          flushInputValue();
          var clipboardText = getClipboardText(evt);
          if (clipboardText) {
              onAdd(clipboardText);
          }
      });
  };
  var listenRoot = function (rootNode, input, onRemove) {
      rootNode.addEventListener('click', function (evt) {
          var target = evt.target;
          if (!target) {
              return;
          }
          if (target === rootNode) {
              input.focus();
              return;
          }
          if (isCloseButton(target)) {
              var item = getItemByCloseButton(target);
              if (item) {
                  rootNode.removeChild(item);
                  onRemove();
              }
          }
      });
  };

  var createEmailsInput = function (container, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.placeholder, placeholder = _c === void 0 ? DEFAULT_PLACEHOLDER : _c, _d = _b.isValid, isValid = _d === void 0 ? isValidEmail : _d, _e = _b.normalizeText, normalizeText = _e === void 0 ? splitByCommaOrSpaces : _e;
      var EMPTY_CACHE = 'EMPTY_CACHE';
      var itemsCache = EMPTY_CACHE;
      var rootNode = createRoot();
      var input = createInput(placeholder);
      var pubSub = createPubSub();
      var addItems = function (text) {
          var itemsStrings = normalizeText(text);
          if (itemsStrings.length === 0) {
              return;
          }
          var emailItems = itemsStrings.map(function (value) { return createItem({ value: value, isValid: isValid(value) }); });
          rootNode.appendChild(createFragment(emailItems));
          rootNode.appendChild(input);
          itemsCache = EMPTY_CACHE;
          input.focus();
          pubSub.publish();
      };
      listenInput(input, addItems);
      listenRoot(rootNode, input, function () {
          itemsCache = EMPTY_CACHE;
          pubSub.publish();
      });
      rootNode.appendChild(input);
      container.appendChild(rootNode);
      return {
          subscribe: pubSub.subscribe,
          unsubscribe: pubSub.unsubscribe,
          addItems: addItems,
          isValid: isValid,
          getItems: function () {
              if (itemsCache === EMPTY_CACHE) {
                  itemsCache = getTextItemsByRoot(rootNode);
              }
              return itemsCache;
          },
      };
  };

  window.EmailsInput = createEmailsInput;

}());
