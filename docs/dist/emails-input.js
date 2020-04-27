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

  var css_248z = ".emails-input_emails-input__xFLm2 {\n  border: 1px solid #c3c2cf;\n  border-radius: 4px;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  box-sizing: border-box;\n  padding: 5px;\n  color: #050038;\n  background: #fff;\n  font-family: 'Open Sans', Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n}\n\n.emails-input_item__2MpRH {\n  display: inline-block;\n  margin-right: 8px;\n}\n\n.emails-input_item-close__3GCuf {\n  margin-left: 8px;\n  cursor: pointer;\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z' fill='%23050038'/%3E%3C/svg%3E%0A\");\n}\n\n.emails-input_invalid-item__1M_in {\n  border-bottom: 1px dashed #f00000;\n  padding: 0;\n}\n\n.emails-input_valid-item__36BwW {\n  padding: 3px 10px;\n  border-radius: 100px;\n  background: rgba(102, 153, 255, 0.2);\n}\n\n.emails-input_input__3XZXQ {\n  display: inline-block;\n  min-width: 100px;\n  margin-left: 8px;\n}\n.emails-input_input__3XZXQ:focus {\n  outline: none;\n}\n.emails-input_input__3XZXQ:not(:focus)::after {\n  display: inline;\n  content: attr(data-placeholder);\n  color: gray;\n}\n";
  var styles = {"emails-input":"emails-input_emails-input__xFLm2","item":"emails-input_item__2MpRH","item-close":"emails-input_item-close__3GCuf","invalid-item":"emails-input_invalid-item__1M_in","valid-item":"emails-input_valid-item__36BwW","input":"emails-input_input__3XZXQ","emailsInput":"emails-input_emails-input__xFLm2","itemClose":"emails-input_item-close__3GCuf","invalidItem":"emails-input_invalid-item__1M_in","validItem":"emails-input_valid-item__36BwW"};
  styleInject(css_248z);

  var VALID_EMAIL_RE = /^[-_.+a-z\d]+@[-_.a-z\d]+\.[a-z\d]+$/i;
  var isValidEmail = function (value) { return VALID_EMAIL_RE.test(value); };

  var isItem = function (item) {
      if (!item || !item.className) {
          return false;
      }
      return item.className.split(' ').some(function (cn) { return cn === styles.item; });
  };
  var createItem = function (options) {
      var itemNode = document.createElement('span');
      itemNode.contentEditable = 'false';
      itemNode.className = [styles.item, options.isValid ? styles.validItem : styles.invalidItem].join(' ');
      itemNode.innerHTML = options.value;
      var cross = createCloseButton();
      itemNode.appendChild(cross);
      return itemNode;
  };
  var createEmailItem = function (value) {
      return createItem({
          value: value,
          isValid: isValidEmail(value),
      });
  };
  var normalizeText = function (text) {
      return text
          .split(',')
          .map(function (t) { return t.trim(); })
          .filter(Boolean);
  };
  var createFragment = function (text) {
      var emailItems = normalizeText(text).map(createEmailItem);
      var fragment = document.createDocumentFragment();
      emailItems.forEach(function (emailItem) {
          fragment.appendChild(emailItem);
      });
      return fragment;
  };
  var createInput = function (placeholder) {
      var span = document.createElement('span');
      span.dataset.placeholder = "  " + placeholder;
      span.className = styles.input;
      span.contentEditable = 'true';
      return span;
  };
  var getItemByCloseButton = function (close) { return close.parentElement; };
  var isCloseButton = function (node) {
      return node.className === styles.itemClose;
  };
  var createCloseButton = function () {
      var span = document.createElement('span');
      span.className = styles.itemClose;
      return span;
  };
  var createRoot = function () {
      var eiNode = document.createElement('div');
      eiNode.contentEditable = 'false';
      eiNode.className = styles.emailsInput;
      return eiNode;
  };
  var getItems = function (rootNode) {
      var children = rootNode.children;
      var length = children.length;
      var items = [];
      for (var i = 0; i < length; i++) {
          var child = children.item(i);
          if (isItem(child)) {
              items.push(child.textContent);
          }
      }
      return items;
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

  var KeyCode;
  (function (KeyCode) {
      KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
      KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
  })(KeyCode || (KeyCode = {}));
  var listenInput = function (input, onTrigger) {
      input.addEventListener('blur', function () {
          if (isValidEmail(input.textContent || '')) {
              onTrigger();
          }
      });
      input.addEventListener('keyup', function (evt) {
          switch (evt.keyCode) {
              case KeyCode.COMMA:
              case KeyCode.ENTER:
                  onTrigger();
          }
      });
  };
  var listenRoot = function (rootNode, input) {
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
              }
          }
      });
  };
  var createEmailsInput = function (container, options) {
      var rootNode = createRoot();
      var input = createInput(options.placeholder);
      var pubSub = createPubSub();
      var updateItems = function (text) {
          rootNode.appendChild(createFragment(text));
          rootNode.appendChild(input);
          input.focus();
          pubSub.publish();
      };
      listenInput(input, function () {
          var text = input.textContent || '';
          input.innerHTML = '';
          updateItems(text);
      });
      listenRoot(rootNode, input);
      rootNode.appendChild(input);
      container.appendChild(rootNode);
      return {
          subscribe: pubSub.subscribe,
          unsubscribe: pubSub.unsubscribe,
          addItem: updateItems,
          getItems: function () { return getItems(rootNode); },
      };
  };

  window.EmailsInput = createEmailsInput;

}());
