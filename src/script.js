import "./style.css";
import Experience from "./Experience/Experience.js";

// Start ThreeJS
const experience = new Experience(document.querySelector("canvas.webgl"));

function checkMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Temporary measure ()
if (checkMobile() == true) {
  document.getElementById("desktop").remove()
} else {
  document.getElementById("mobile").remove()
}

/*!
 * skrollr core
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function (window, document, undefined) {
  "use strict";

  /*
   * Global api.
   */
  var skrollr = {
    get: function () {
      return _instance;
    },
    //Main entry point.
    init: function (options) {
      return _instance || new Skrollr(options);
    },
    VERSION: "0.6.30",
  };

  //Minify optimization.
  var hasProp = Object.prototype.hasOwnProperty;
  var Math = window.Math;
  var getStyle = window.getComputedStyle;

  //They will be filled when skrollr gets initialized.
  var documentElement;
  var body;

  var EVENT_TOUCHSTART = "touchstart";
  var EVENT_TOUCHMOVE = "touchmove";
  var EVENT_TOUCHCANCEL = "touchcancel";
  var EVENT_TOUCHEND = "touchend";

  var SKROLLABLE_CLASS = "skrollable";
  var SKROLLABLE_BEFORE_CLASS = SKROLLABLE_CLASS + "-before";
  var SKROLLABLE_BETWEEN_CLASS = SKROLLABLE_CLASS + "-between";
  var SKROLLABLE_AFTER_CLASS = SKROLLABLE_CLASS + "-after";

  var SKROLLR_CLASS = "skrollr";
  var NO_SKROLLR_CLASS = "no-" + SKROLLR_CLASS;
  var SKROLLR_DESKTOP_CLASS = SKROLLR_CLASS + "-desktop";
  var SKROLLR_MOBILE_CLASS = SKROLLR_CLASS + "-mobile";

  var DEFAULT_EASING = "linear";
  var DEFAULT_DURATION = 1000; //ms
  var DEFAULT_MOBILE_DECELERATION = 0.004; //pixel/ms²

  var DEFAULT_SKROLLRBODY = "skrollr-body";

  var DEFAULT_SMOOTH_SCROLLING_DURATION = 200; //ms

  var ANCHOR_START = "start";
  var ANCHOR_END = "end";
  var ANCHOR_CENTER = "center";
  var ANCHOR_BOTTOM = "bottom";

  //The property which will be added to the DOM element to hold the ID of the skrollable.
  var SKROLLABLE_ID_DOM_PROPERTY = "___skrollable_id";

  var rxTouchIgnoreTags = /^(?:input|textarea|button|select)$/i;

  var rxTrim = /^\s+|\s+$/g;

  //Find all data-attributes. data-[_constant]-[offset]-[anchor]-[anchor].
  var rxKeyframeAttribute =
    /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;

  var rxPropValue = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;

  //Easing function names follow the property in square brackets.
  var rxPropEasing = /^(@?[a-z\-]+)\[(\w+)\]$/;

  var rxCamelCase = /-([a-z0-9_])/g;
  var rxCamelCaseFn = function (str, letter) {
    return letter.toUpperCase();
  };

  //Numeric values with optional sign.
  var rxNumericValue = /[\-+]?[\d]*\.?[\d]+/g;

  //Used to replace occurences of {?} with a number.
  var rxInterpolateString = /\{\?\}/g;

  //Finds rgb(a) colors, which don't use the percentage notation.
  var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;

  //Finds all gradients.
  var rxGradient = /[a-z\-]+-gradient/g;

  //Vendor prefix. Will be set once skrollr gets initialized.
  var theCSSPrefix = "";
  var theDashedCSSPrefix = "";

  //Will be called once (when skrollr gets initialized).
  var detectCSSPrefix = function () {
    //Only relevant prefixes. May be extended.
    //Could be dangerous if there will ever be a CSS property which actually starts with "ms". Don't hope so.
    var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;

    //Detect prefix for current browser by finding the first property using a prefix.
    if (!getStyle) {
      return;
    }

    var style = getStyle(body, null);

    for (var k in style) {
      //We check the key and if the key is a number, we check the value as well, because safari's getComputedStyle returns some weird array-like thingy.
      theCSSPrefix =
        k.match(rxPrefixes) || (+k == k && style[k].match(rxPrefixes));

      if (theCSSPrefix) {
        break;
      }
    }

    //Did we even detect a prefix?
    if (!theCSSPrefix) {
      theCSSPrefix = theDashedCSSPrefix = "";

      return;
    }

    theCSSPrefix = theCSSPrefix[0];

    //We could have detected either a dashed prefix or this camelCaseish-inconsistent stuff.
    if (theCSSPrefix.slice(0, 1) === "-") {
      theDashedCSSPrefix = theCSSPrefix;

      //There's no logic behind these. Need a look up.
      theCSSPrefix = {
        "-webkit-": "webkit",
        "-moz-": "Moz",
        "-ms-": "ms",
        "-o-": "O",
      }[theCSSPrefix];
    } else {
      theDashedCSSPrefix = "-" + theCSSPrefix.toLowerCase() + "-";
    }
  };

  var polyfillRAF = function () {
    var requestAnimFrame =
      window.requestAnimationFrame ||
      window[theCSSPrefix.toLowerCase() + "RequestAnimationFrame"];

    var lastTime = _now();

    if (_isMobile || !requestAnimFrame) {
      requestAnimFrame = function (callback) {
        //How long did it take to render?
        var deltaTime = _now() - lastTime;
        var delay = Math.max(0, 1000 / 60 - deltaTime);

        return window.setTimeout(function () {
          lastTime = _now();
          callback();
        }, delay);
      };
    }

    return requestAnimFrame;
  };

  var polyfillCAF = function () {
    var cancelAnimFrame =
      window.cancelAnimationFrame ||
      window[theCSSPrefix.toLowerCase() + "CancelAnimationFrame"];

    if (_isMobile || !cancelAnimFrame) {
      cancelAnimFrame = function (timeout) {
        return window.clearTimeout(timeout);
      };
    }

    return cancelAnimFrame;
  };

  //Built-in easing functions.
  var easings = {
    begin: function () {
      return 0;
    },
    end: function () {
      return 1;
    },
    linear: function (p) {
      return p;
    },
    quadratic: function (p) {
      return p * p;
    },
    cubic: function (p) {
      return p * p * p;
    },
    swing: function (p) {
      return -Math.cos(p * Math.PI) / 2 + 0.5;
    },
    sqrt: function (p) {
      return Math.sqrt(p);
    },
    outCubic: function (p) {
      return Math.pow(p - 1, 3) + 1;
    },
    //see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this
    bounce: function (p) {
      var a;

      if (p <= 0.5083) {
        a = 3;
      } else if (p <= 0.8489) {
        a = 9;
      } else if (p <= 0.96208) {
        a = 27;
      } else if (p <= 0.99981) {
        a = 91;
      } else {
        return 1;
      }

      return 1 - Math.abs((3 * Math.cos(p * a * 1.028)) / a);
    },
  };

  /**
   * Constructor.
   */
  function Skrollr(options) {
    documentElement = document.documentElement;
    body = document.body;

    detectCSSPrefix();

    _instance = this;

    options = options || {};

    _constants = options.constants || {};

    //We allow defining custom easings or overwrite existing.
    if (options.easing) {
      for (var e in options.easing) {
        easings[e] = options.easing[e];
      }
    }

    _edgeStrategy = options.edgeStrategy || "set";

    _listeners = {
      //Function to be called right before rendering.
      beforerender: options.beforerender,

      //Function to be called right after finishing rendering.
      render: options.render,

      //Function to be called whenever an element with the `data-emit-events` attribute passes a keyframe.
      keyframe: options.keyframe,
    };

    //forceHeight is true by default
    _forceHeight = options.forceHeight !== false;

    if (_forceHeight) {
      _scale = options.scale || 1;
    }

    _mobileDeceleration =
      options.mobileDeceleration || DEFAULT_MOBILE_DECELERATION;

    _smoothScrollingEnabled = options.smoothScrolling !== false;
    _smoothScrollingDuration =
      options.smoothScrollingDuration || DEFAULT_SMOOTH_SCROLLING_DURATION;

    //Dummy object. Will be overwritten in the _render method when smooth scrolling is calculated.
    _smoothScrolling = {
      targetTop: _instance.getScrollTop(),
    };

    //A custom check function may be passed.
    _isMobile = (
      options.mobileCheck ||
      function () {
        return /Android|iPhone|iPad|iPod|BlackBerry/i.test(
          navigator.userAgent || navigator.vendor || window.opera
        );
      }
    )();

    if (_isMobile) {
      _skrollrBody = document.getElementById(
        options.skrollrBody || DEFAULT_SKROLLRBODY
      );

      //Detect 3d transform if there's a skrollr-body (only needed for #skrollr-body).
      if (_skrollrBody) {
        _detect3DTransforms();
      }

      _initMobile();
      _updateClass(
        documentElement,
        [SKROLLR_CLASS, SKROLLR_MOBILE_CLASS],
        [NO_SKROLLR_CLASS]
      );
    } else {
      _updateClass(
        documentElement,
        [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS],
        [NO_SKROLLR_CLASS]
      );
    }

    //Triggers parsing of elements and a first reflow.
    _instance.refresh();

    _addEvent(window, "resize orientationchange", function () {
      var width = documentElement.clientWidth;
      var height = documentElement.clientHeight;

      //Only reflow if the size actually changed (#271).
      if (height !== _lastViewportHeight || width !== _lastViewportWidth) {
        _lastViewportHeight = height;
        _lastViewportWidth = width;

        _requestReflow = true;
      }
    });

    var requestAnimFrame = polyfillRAF();

    //Let's go.
    (function animloop() {
      _render();
      _animFrame = requestAnimFrame(animloop);
    })();

    return _instance;
  }

  /**
   * (Re)parses some or all elements.
   */
  Skrollr.prototype.refresh = function (elements) {
    var elementIndex;
    var elementsLength;
    var ignoreID = false;

    //Completely reparse anything without argument.
    if (elements === undefined) {
      //Ignore that some elements may already have a skrollable ID.
      ignoreID = true;

      _skrollables = [];
      _skrollableIdCounter = 0;

      elements = document.getElementsByTagName("*");
    } else if (elements.length === undefined) {
      //We also accept a single element as parameter.
      elements = [elements];
    }

    elementIndex = 0;
    elementsLength = elements.length;

    for (; elementIndex < elementsLength; elementIndex++) {
      var el = elements[elementIndex];
      var anchorTarget = el;
      var keyFrames = [];

      //If this particular element should be smooth scrolled.
      var smoothScrollThis = _smoothScrollingEnabled;

      //The edge strategy for this particular element.
      var edgeStrategy = _edgeStrategy;

      //If this particular element should emit keyframe events.
      var emitEvents = false;

      //If we're reseting the counter, remove any old element ids that may be hanging around.
      if (ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
        delete el[SKROLLABLE_ID_DOM_PROPERTY];
      }

      if (!el.attributes) {
        continue;
      }

      //Iterate over all attributes and search for key frame attributes.
      var attributeIndex = 0;
      var attributesLength = el.attributes.length;

      for (; attributeIndex < attributesLength; attributeIndex++) {
        var attr = el.attributes[attributeIndex];

        if (attr.name === "data-anchor-target") {
          anchorTarget = document.querySelector(attr.value);

          if (anchorTarget === null) {
            throw 'Unable to find anchor target "' + attr.value + '"';
          }

          continue;
        }

        //Global smooth scrolling can be overridden by the element attribute.
        if (attr.name === "data-smooth-scrolling") {
          smoothScrollThis = attr.value !== "off";

          continue;
        }

        //Global edge strategy can be overridden by the element attribute.
        if (attr.name === "data-edge-strategy") {
          edgeStrategy = attr.value;

          continue;
        }

        //Is this element tagged with the `data-emit-events` attribute?
        if (attr.name === "data-emit-events") {
          emitEvents = true;

          continue;
        }

        var match = attr.name.match(rxKeyframeAttribute);

        if (match === null) {
          continue;
        }

        var kf = {
          props: attr.value,
          //Point back to the element as well.
          element: el,
          //The name of the event which this keyframe will fire, if emitEvents is
          eventType: attr.name.replace(rxCamelCase, rxCamelCaseFn),
        };

        keyFrames.push(kf);

        var constant = match[1];

        if (constant) {
          //Strip the underscore prefix.
          kf.constant = constant.substr(1);
        }

        //Get the key frame offset.
        var offset = match[2];

        //Is it a percentage offset?
        if (/p$/.test(offset)) {
          kf.isPercentage = true;
          kf.offset = (offset.slice(0, -1) | 0) / 100;
        } else {
          kf.offset = offset | 0;
        }

        var anchor1 = match[3];

        //If second anchor is not set, the first will be taken for both.
        var anchor2 = match[4] || anchor1;

        //"absolute" (or "classic") mode, where numbers mean absolute scroll offset.
        if (!anchor1 || anchor1 === ANCHOR_START || anchor1 === ANCHOR_END) {
          kf.mode = "absolute";

          //data-end needs to be calculated after all key frames are known.
          if (anchor1 === ANCHOR_END) {
            kf.isEnd = true;
          } else if (!kf.isPercentage) {
            //For data-start we can already set the key frame w/o calculations.
            //#59: "scale" options should only affect absolute mode.
            kf.offset = kf.offset * _scale;
          }
        }
        //"relative" mode, where numbers are relative to anchors.
        else {
          kf.mode = "relative";
          kf.anchors = [anchor1, anchor2];
        }
      }

      //Does this element have key frames?
      if (!keyFrames.length) {
        continue;
      }

      //Will hold the original style and class attributes before we controlled the element (see #80).
      var styleAttr, classAttr;

      var id;

      if (!ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
        //We already have this element under control. Grab the corresponding skrollable id.
        id = el[SKROLLABLE_ID_DOM_PROPERTY];
        styleAttr = _skrollables[id].styleAttr;
        classAttr = _skrollables[id].classAttr;
      } else {
        //It's an unknown element. Asign it a new skrollable id.
        id = el[SKROLLABLE_ID_DOM_PROPERTY] = _skrollableIdCounter++;
        styleAttr = el.style.cssText;
        classAttr = _getClass(el);
      }

      _skrollables[id] = {
        element: el,
        styleAttr: styleAttr,
        classAttr: classAttr,
        anchorTarget: anchorTarget,
        keyFrames: keyFrames,
        smoothScrolling: smoothScrollThis,
        edgeStrategy: edgeStrategy,
        emitEvents: emitEvents,
        lastFrameIndex: -1,
      };

      _updateClass(el, [SKROLLABLE_CLASS], []);
    }

    //Reflow for the first time.
    _reflow();

    //Now that we got all key frame numbers right, actually parse the properties.
    elementIndex = 0;
    elementsLength = elements.length;

    for (; elementIndex < elementsLength; elementIndex++) {
      var sk = _skrollables[elements[elementIndex][SKROLLABLE_ID_DOM_PROPERTY]];

      if (sk === undefined) {
        continue;
      }

      //Parse the property string to objects
      _parseProps(sk);

      //Fill key frames with missing properties from left and right
      _fillProps(sk);
    }

    return _instance;
  };

  /**
   * Transform "relative" mode to "absolute" mode.
   * That is, calculate anchor position and offset of element.
   */
  Skrollr.prototype.relativeToAbsolute = function (
    element,
    viewportAnchor,
    elementAnchor
  ) {
    var viewportHeight = documentElement.clientHeight;
    var box = element.getBoundingClientRect();
    var absolute = box.top;

    //#100: IE doesn't supply "height" with getBoundingClientRect.
    var boxHeight = box.bottom - box.top;

    if (viewportAnchor === ANCHOR_BOTTOM) {
      absolute -= viewportHeight;
    } else if (viewportAnchor === ANCHOR_CENTER) {
      absolute -= viewportHeight / 2;
    }

    if (elementAnchor === ANCHOR_BOTTOM) {
      absolute += boxHeight;
    } else if (elementAnchor === ANCHOR_CENTER) {
      absolute += boxHeight / 2;
    }

    //Compensate scrolling since getBoundingClientRect is relative to viewport.
    absolute += _instance.getScrollTop();

    return (absolute + 0.5) | 0;
  };

  /**
   * Animates scroll top to new position.
   */
  Skrollr.prototype.animateTo = function (top, options) {
    options = options || {};

    var now = _now();
    var scrollTop = _instance.getScrollTop();
    var duration =
      options.duration === undefined ? DEFAULT_DURATION : options.duration;

    //Setting this to a new value will automatically cause the current animation to stop, if any.
    _scrollAnimation = {
      startTop: scrollTop,
      topDiff: top - scrollTop,
      targetTop: top,
      duration: duration,
      startTime: now,
      endTime: now + duration,
      easing: easings[options.easing || DEFAULT_EASING],
      done: options.done,
    };

    //Don't queue the animation if there's nothing to animate.
    if (!_scrollAnimation.topDiff) {
      if (_scrollAnimation.done) {
        _scrollAnimation.done.call(_instance, false);
      }

      _scrollAnimation = undefined;
    }

    return _instance;
  };

  /**
   * Stops animateTo animation.
   */
  Skrollr.prototype.stopAnimateTo = function () {
    if (_scrollAnimation && _scrollAnimation.done) {
      _scrollAnimation.done.call(_instance, true);
    }

    _scrollAnimation = undefined;
  };

  /**
   * Returns if an animation caused by animateTo is currently running.
   */
  Skrollr.prototype.isAnimatingTo = function () {
    return !!_scrollAnimation;
  };

  Skrollr.prototype.isMobile = function () {
    return _isMobile;
  };

  Skrollr.prototype.setScrollTop = function (top, force) {
    _forceRender = force === true;

    if (_isMobile) {
      _mobileOffset = Math.min(Math.max(top, 0), _maxKeyFrame);
    } else {
      window.scrollTo(0, top);
    }

    return _instance;
  };

  Skrollr.prototype.getScrollTop = function () {
    if (_isMobile) {
      return _mobileOffset;
    } else {
      return (
        window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
      );
    }
  };

  Skrollr.prototype.getMaxScrollTop = function () {
    return _maxKeyFrame;
  };

  Skrollr.prototype.on = function (name, fn) {
    _listeners[name] = fn;

    return _instance;
  };

  Skrollr.prototype.off = function (name) {
    delete _listeners[name];

    return _instance;
  };

  Skrollr.prototype.destroy = function () {
    var cancelAnimFrame = polyfillCAF();
    cancelAnimFrame(_animFrame);
    _removeAllEvents();

    _updateClass(
      documentElement,
      [NO_SKROLLR_CLASS],
      [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS, SKROLLR_MOBILE_CLASS]
    );

    var skrollableIndex = 0;
    var skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      _reset(_skrollables[skrollableIndex].element);
    }

    documentElement.style.overflow = body.style.overflow = "";
    documentElement.style.height = body.style.height = "";

    if (_skrollrBody) {
      skrollr.setStyle(_skrollrBody, "transform", "none");
    }

    _instance = undefined;
    _skrollrBody = undefined;
    _listeners = undefined;
    _forceHeight = undefined;
    _maxKeyFrame = 0;
    _scale = 1;
    _constants = undefined;
    _mobileDeceleration = undefined;
    _direction = "down";
    _lastTop = -1;
    _lastViewportWidth = 0;
    _lastViewportHeight = 0;
    _requestReflow = false;
    _scrollAnimation = undefined;
    _smoothScrollingEnabled = undefined;
    _smoothScrollingDuration = undefined;
    _smoothScrolling = undefined;
    _forceRender = undefined;
    _skrollableIdCounter = 0;
    _edgeStrategy = undefined;
    _isMobile = false;
    _mobileOffset = 0;
    _translateZ = undefined;
  };

  /*
          Private methods.
      */

  var _initMobile = function () {
    var initialElement;
    var initialTouchY;
    var initialTouchX;
    var currentElement;
    var currentTouchY;
    var currentTouchX;
    var lastTouchY;
    var deltaY;

    var initialTouchTime;
    var currentTouchTime;
    var lastTouchTime;
    var deltaTime;

    _addEvent(
      documentElement,
      [
        EVENT_TOUCHSTART,
        EVENT_TOUCHMOVE,
        EVENT_TOUCHCANCEL,
        EVENT_TOUCHEND,
      ].join(" "),
      function (e) {
        var touch = e.changedTouches[0];

        currentElement = e.target;

        //We don't want text nodes.
        while (currentElement.nodeType === 3) {
          currentElement = currentElement.parentNode;
        }

        currentTouchY = touch.clientY;
        currentTouchX = touch.clientX;
        currentTouchTime = e.timeStamp;

        if (!rxTouchIgnoreTags.test(currentElement.tagName)) {
          e.preventDefault();
        }

        switch (e.type) {
          case EVENT_TOUCHSTART:
            //The last element we tapped on.
            if (initialElement) {
              initialElement.blur();
            }

            _instance.stopAnimateTo();

            initialElement = currentElement;

            initialTouchY = lastTouchY = currentTouchY;
            initialTouchX = currentTouchX;
            initialTouchTime = currentTouchTime;

            break;
          case EVENT_TOUCHMOVE:
            //Prevent default event on touchIgnore elements in case they don't have focus yet.
            if (
              rxTouchIgnoreTags.test(currentElement.tagName) &&
              document.activeElement !== currentElement
            ) {
              e.preventDefault();
            }

            deltaY = currentTouchY - lastTouchY;
            deltaTime = currentTouchTime - lastTouchTime;

            _instance.setScrollTop(_mobileOffset - deltaY, true);

            lastTouchY = currentTouchY;
            lastTouchTime = currentTouchTime;
            break;
          default:
          case EVENT_TOUCHCANCEL:
          case EVENT_TOUCHEND:
            var distanceY = initialTouchY - currentTouchY;
            var distanceX = initialTouchX - currentTouchX;
            var distance2 = distanceX * distanceX + distanceY * distanceY;

            //Check if it was more like a tap (moved less than 7px).
            if (distance2 < 49) {
              if (!rxTouchIgnoreTags.test(initialElement.tagName)) {
                initialElement.focus();

                //It was a tap, click the element.
                var clickEvent = document.createEvent("MouseEvents");
                clickEvent.initMouseEvent(
                  "click",
                  true,
                  true,
                  e.view,
                  1,
                  touch.screenX,
                  touch.screenY,
                  touch.clientX,
                  touch.clientY,
                  e.ctrlKey,
                  e.altKey,
                  e.shiftKey,
                  e.metaKey,
                  0,
                  null
                );
                initialElement.dispatchEvent(clickEvent);
              }

              return;
            }

            initialElement = undefined;

            var speed = deltaY / deltaTime;

            //Cap speed at 3 pixel/ms.
            speed = Math.max(Math.min(speed, 3), -3);

            var duration = Math.abs(speed / _mobileDeceleration);
            var targetOffset =
              speed * duration +
              0.5 * _mobileDeceleration * duration * duration;
            var targetTop = _instance.getScrollTop() - targetOffset;

            //Relative duration change for when scrolling above bounds.
            var targetRatio = 0;

            //Change duration proportionally when scrolling would leave bounds.
            if (targetTop > _maxKeyFrame) {
              targetRatio = (_maxKeyFrame - targetTop) / targetOffset;

              targetTop = _maxKeyFrame;
            } else if (targetTop < 0) {
              targetRatio = -targetTop / targetOffset;

              targetTop = 0;
            }

            duration = duration * (1 - targetRatio);

            _instance.animateTo((targetTop + 0.5) | 0, {
              easing: "outCubic",
              duration: duration,
            });
            break;
        }
      }
    );

    //Just in case there has already been some native scrolling, reset it.
    window.scrollTo(0, 0);
    documentElement.style.overflow = body.style.overflow = "hidden";
  };

  /**
   * Updates key frames which depend on others / need to be updated on resize.
   * That is "end" in "absolute" mode and all key frames in "relative" mode.
   * Also handles constants, because they may change on resize.
   */
  var _updateDependentKeyFrames = function () {
    var viewportHeight = documentElement.clientHeight;
    var processedConstants = _processConstants();
    var skrollable;
    var element;
    var anchorTarget;
    var keyFrames;
    var keyFrameIndex;
    var keyFramesLength;
    var kf;
    var skrollableIndex;
    var skrollablesLength;
    var offset;
    var constantValue;

    //First process all relative-mode elements and find the max key frame.
    skrollableIndex = 0;
    skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      skrollable = _skrollables[skrollableIndex];
      element = skrollable.element;
      anchorTarget = skrollable.anchorTarget;
      keyFrames = skrollable.keyFrames;

      keyFrameIndex = 0;
      keyFramesLength = keyFrames.length;

      for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
        kf = keyFrames[keyFrameIndex];

        offset = kf.offset;
        constantValue = processedConstants[kf.constant] || 0;

        kf.frame = offset;

        if (kf.isPercentage) {
          //Convert the offset to percentage of the viewport height.
          offset = offset * viewportHeight;

          //Absolute + percentage mode.
          kf.frame = offset;
        }

        if (kf.mode === "relative") {
          _reset(element);

          kf.frame =
            _instance.relativeToAbsolute(
              anchorTarget,
              kf.anchors[0],
              kf.anchors[1]
            ) - offset;

          _reset(element, true);
        }

        kf.frame += constantValue;

        //Only search for max key frame when forceHeight is enabled.
        if (_forceHeight) {
          //Find the max key frame, but don't use one of the data-end ones for comparison.
          if (!kf.isEnd && kf.frame > _maxKeyFrame) {
            _maxKeyFrame = kf.frame;
          }
        }
      }
    }

    //#133: The document can be larger than the maxKeyFrame we found.
    _maxKeyFrame = Math.max(_maxKeyFrame, _getDocumentHeight());

    //Now process all data-end keyframes.
    skrollableIndex = 0;
    skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      skrollable = _skrollables[skrollableIndex];
      keyFrames = skrollable.keyFrames;

      keyFrameIndex = 0;
      keyFramesLength = keyFrames.length;

      for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
        kf = keyFrames[keyFrameIndex];

        constantValue = processedConstants[kf.constant] || 0;

        if (kf.isEnd) {
          kf.frame = _maxKeyFrame - kf.offset + constantValue;
        }
      }

      skrollable.keyFrames.sort(_keyFrameComparator);
    }
  };

  /**
   * Calculates and sets the style properties for the element at the given frame.
   * @param fakeFrame The frame to render at when smooth scrolling is enabled.
   * @param actualFrame The actual frame we are at.
   */
  var _calcSteps = function (fakeFrame, actualFrame) {
    //Iterate over all skrollables.
    var skrollableIndex = 0;
    var skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      var skrollable = _skrollables[skrollableIndex];
      var element = skrollable.element;
      var frame = skrollable.smoothScrolling ? fakeFrame : actualFrame;
      var frames = skrollable.keyFrames;
      var framesLength = frames.length;
      var firstFrame = frames[0];
      var lastFrame = frames[frames.length - 1];
      var beforeFirst = frame < firstFrame.frame;
      var afterLast = frame > lastFrame.frame;
      var firstOrLastFrame = beforeFirst ? firstFrame : lastFrame;
      var emitEvents = skrollable.emitEvents;
      var lastFrameIndex = skrollable.lastFrameIndex;
      var key;
      var value;

      //If we are before/after the first/last frame, set the styles according to the given edge strategy.
      if (beforeFirst || afterLast) {
        //Check if we already handled this edge case last time.
        //Note: using setScrollTop it's possible that we jumped from one edge to the other.
        if (
          (beforeFirst && skrollable.edge === -1) ||
          (afterLast && skrollable.edge === 1)
        ) {
          continue;
        }

        //Add the skrollr-before or -after class.
        if (beforeFirst) {
          _updateClass(
            element,
            [SKROLLABLE_BEFORE_CLASS],
            [SKROLLABLE_AFTER_CLASS, SKROLLABLE_BETWEEN_CLASS]
          );

          //This handles the special case where we exit the first keyframe.
          if (emitEvents && lastFrameIndex > -1) {
            _emitEvent(element, firstFrame.eventType, _direction);
            skrollable.lastFrameIndex = -1;
          }
        } else {
          _updateClass(
            element,
            [SKROLLABLE_AFTER_CLASS],
            [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_BETWEEN_CLASS]
          );

          //This handles the special case where we exit the last keyframe.
          if (emitEvents && lastFrameIndex < framesLength) {
            _emitEvent(element, lastFrame.eventType, _direction);
            skrollable.lastFrameIndex = framesLength;
          }
        }

        //Remember that we handled the edge case (before/after the first/last keyframe).
        skrollable.edge = beforeFirst ? -1 : 1;

        switch (skrollable.edgeStrategy) {
          case "reset":
            _reset(element);
            continue;
          case "ease":
            //Handle this case like it would be exactly at first/last keyframe and just pass it on.
            frame = firstOrLastFrame.frame;
            break;
          default:
          case "set":
            var props = firstOrLastFrame.props;

            for (key in props) {
              if (hasProp.call(props, key)) {
                value = _interpolateString(props[key].value);

                //Set style or attribute.
                if (key.indexOf("@") === 0) {
                  element.setAttribute(key.substr(1), value);
                } else {
                  skrollr.setStyle(element, key, value);
                }
              }
            }

            continue;
        }
      } else {
        //Did we handle an edge last time?
        if (skrollable.edge !== 0) {
          _updateClass(
            element,
            [SKROLLABLE_CLASS, SKROLLABLE_BETWEEN_CLASS],
            [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_AFTER_CLASS]
          );
          skrollable.edge = 0;
        }
      }

      //Find out between which two key frames we are right now.
      var keyFrameIndex = 0;

      for (; keyFrameIndex < framesLength - 1; keyFrameIndex++) {
        if (
          frame >= frames[keyFrameIndex].frame &&
          frame <= frames[keyFrameIndex + 1].frame
        ) {
          var left = frames[keyFrameIndex];
          var right = frames[keyFrameIndex + 1];

          for (key in left.props) {
            if (hasProp.call(left.props, key)) {
              var progress = (frame - left.frame) / (right.frame - left.frame);

              //Transform the current progress using the given easing function.
              progress = left.props[key].easing(progress);

              //Interpolate between the two values
              value = _calcInterpolation(
                left.props[key].value,
                right.props[key].value,
                progress
              );

              value = _interpolateString(value);

              //Set style or attribute.
              if (key.indexOf("@") === 0) {
                element.setAttribute(key.substr(1), value);
              } else {
                skrollr.setStyle(element, key, value);
              }
            }
          }

          //Are events enabled on this element?
          //This code handles the usual cases of scrolling through different keyframes.
          //The special cases of before first and after last keyframe are handled above.
          if (emitEvents) {
            //Did we pass a new keyframe?
            if (lastFrameIndex !== keyFrameIndex) {
              if (_direction === "down") {
                _emitEvent(element, left.eventType, _direction);
              } else {
                _emitEvent(element, right.eventType, _direction);
              }

              skrollable.lastFrameIndex = keyFrameIndex;
            }
          }

          break;
        }
      }
    }
  };

  /**
   * Renders all elements.
   */
  var _render = function () {
    if (_requestReflow) {
      _requestReflow = false;
      _reflow();
    }

    //We may render something else than the actual scrollbar position.
    var renderTop = _instance.getScrollTop();

    //If there's an animation, which ends in current render call, call the callback after rendering.
    var afterAnimationCallback;
    var now = _now();
    var progress;

    //Before actually rendering handle the scroll animation, if any.
    if (_scrollAnimation) {
      //It's over
      if (now >= _scrollAnimation.endTime) {
        renderTop = _scrollAnimation.targetTop;
        afterAnimationCallback = _scrollAnimation.done;
        _scrollAnimation = undefined;
      } else {
        //Map the current progress to the new progress using given easing function.
        progress = _scrollAnimation.easing(
          (now - _scrollAnimation.startTime) / _scrollAnimation.duration
        );

        renderTop =
          (_scrollAnimation.startTop + progress * _scrollAnimation.topDiff) | 0;
      }

      _instance.setScrollTop(renderTop, true);
    }
    //Smooth scrolling only if there's no animation running and if we're not forcing the rendering.
    else if (!_forceRender) {
      var smoothScrollingDiff = _smoothScrolling.targetTop - renderTop;

      //The user scrolled, start new smooth scrolling.
      if (smoothScrollingDiff) {
        _smoothScrolling = {
          startTop: _lastTop,
          topDiff: renderTop - _lastTop,
          targetTop: renderTop,
          startTime: _lastRenderCall,
          endTime: _lastRenderCall + _smoothScrollingDuration,
        };
      }

      //Interpolate the internal scroll position (not the actual scrollbar).
      if (now <= _smoothScrolling.endTime) {
        //Map the current progress to the new progress using easing function.
        progress = easings.sqrt(
          (now - _smoothScrolling.startTime) / _smoothScrollingDuration
        );

        renderTop =
          (_smoothScrolling.startTop + progress * _smoothScrolling.topDiff) | 0;
      }
    }

    //Did the scroll position even change?
    if (_forceRender || _lastTop !== renderTop) {
      //Remember in which direction are we scrolling?
      _direction =
        renderTop > _lastTop
          ? "down"
          : renderTop < _lastTop
          ? "up"
          : _direction;

      _forceRender = false;

      var listenerParams = {
        curTop: renderTop,
        lastTop: _lastTop,
        maxTop: _maxKeyFrame,
        direction: _direction,
      };

      //Tell the listener we are about to render.
      var continueRendering =
        _listeners.beforerender &&
        _listeners.beforerender.call(_instance, listenerParams);

      //The beforerender listener function is able the cancel rendering.
      if (continueRendering !== false) {
        //Now actually interpolate all the styles.
        _calcSteps(renderTop, _instance.getScrollTop());

        //That's were we actually "scroll" on mobile.
        if (_isMobile && _skrollrBody) {
          //Set the transform ("scroll it").
          skrollr.setStyle(
            _skrollrBody,
            "transform",
            "translate(0, " + -_mobileOffset + "px) " + _translateZ
          );
        }

        //Remember when we last rendered.
        _lastTop = renderTop;

        if (_listeners.render) {
          _listeners.render.call(_instance, listenerParams);
        }
      }

      if (afterAnimationCallback) {
        afterAnimationCallback.call(_instance, false);
      }
    }

    _lastRenderCall = now;
  };

  /**
   * Parses the properties for each key frame of the given skrollable.
   */
  var _parseProps = function (skrollable) {
    //Iterate over all key frames
    var keyFrameIndex = 0;
    var keyFramesLength = skrollable.keyFrames.length;

    for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
      var frame = skrollable.keyFrames[keyFrameIndex];
      var easing;
      var value;
      var prop;
      var props = {};

      var match;

      while ((match = rxPropValue.exec(frame.props)) !== null) {
        prop = match[1];
        value = match[2];

        easing = prop.match(rxPropEasing);

        //Is there an easing specified for this prop?
        if (easing !== null) {
          prop = easing[1];
          easing = easing[2];
        } else {
          easing = DEFAULT_EASING;
        }

        //Exclamation point at first position forces the value to be taken literal.
        value = value.indexOf("!") ? _parseProp(value) : [value.slice(1)];

        //Save the prop for this key frame with his value and easing function
        props[prop] = {
          value: value,
          easing: easings[easing],
        };
      }

      frame.props = props;
    }
  };

  /**
   * Parses a value extracting numeric values and generating a format string
   * for later interpolation of the new values in old string.
   *
   * @param val The CSS value to be parsed.
   * @return Something like ["rgba(?%,?%, ?%,?)", 100, 50, 0, .7]
   * where the first element is the format string later used
   * and all following elements are the numeric value.
   */
  var _parseProp = function (val) {
    var numbers = [];

    //One special case, where floats don't work.
    //We replace all occurences of rgba colors
    //which don't use percentage notation with the percentage notation.
    rxRGBAIntegerColor.lastIndex = 0;
    val = val.replace(rxRGBAIntegerColor, function (rgba) {
      return rgba.replace(rxNumericValue, function (n) {
        return (n / 255) * 100 + "%";
      });
    });

    //Handle prefixing of "gradient" values.
    //For now only the prefixed value will be set. Unprefixed isn't supported anyway.
    if (theDashedCSSPrefix) {
      rxGradient.lastIndex = 0;
      val = val.replace(rxGradient, function (s) {
        return theDashedCSSPrefix + s;
      });
    }

    //Now parse ANY number inside this string and create a format string.
    val = val.replace(rxNumericValue, function (n) {
      numbers.push(+n);
      return "{?}";
    });

    //Add the formatstring as first value.
    numbers.unshift(val);

    return numbers;
  };

  /**
   * Fills the key frames with missing left and right hand properties.
   * If key frame 1 has property X and key frame 2 is missing X,
   * but key frame 3 has X again, then we need to assign X to key frame 2 too.
   *
   * @param sk A skrollable.
   */
  var _fillProps = function (sk) {
    //Will collect the properties key frame by key frame
    var propList = {};
    var keyFrameIndex;
    var keyFramesLength;

    //Iterate over all key frames from left to right
    keyFrameIndex = 0;
    keyFramesLength = sk.keyFrames.length;

    for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
      _fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
    }

    //Now do the same from right to fill the last gaps

    propList = {};

    //Iterate over all key frames from right to left
    keyFrameIndex = sk.keyFrames.length - 1;

    for (; keyFrameIndex >= 0; keyFrameIndex--) {
      _fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
    }
  };

  var _fillPropForFrame = function (frame, propList) {
    var key;

    //For each key frame iterate over all right hand properties and assign them,
    //but only if the current key frame doesn't have the property by itself
    for (key in propList) {
      //The current frame misses this property, so assign it.
      if (!hasProp.call(frame.props, key)) {
        frame.props[key] = propList[key];
      }
    }

    //Iterate over all props of the current frame and collect them
    for (key in frame.props) {
      propList[key] = frame.props[key];
    }
  };

  /**
   * Calculates the new values for two given values array.
   */
  var _calcInterpolation = function (val1, val2, progress) {
    var valueIndex;
    var val1Length = val1.length;

    //They both need to have the same length
    if (val1Length !== val2.length) {
      throw (
        "Can't interpolate between \"" + val1[0] + '" and "' + val2[0] + '"'
      );
    }

    //Add the format string as first element.
    var interpolated = [val1[0]];

    valueIndex = 1;

    for (; valueIndex < val1Length; valueIndex++) {
      //That's the line where the two numbers are actually interpolated.
      interpolated[valueIndex] =
        val1[valueIndex] + (val2[valueIndex] - val1[valueIndex]) * progress;
    }

    return interpolated;
  };

  /**
   * Interpolates the numeric values into the format string.
   */
  var _interpolateString = function (val) {
    var valueIndex = 1;

    rxInterpolateString.lastIndex = 0;

    return val[0].replace(rxInterpolateString, function () {
      return val[valueIndex++];
    });
  };

  /**
   * Resets the class and style attribute to what it was before skrollr manipulated the element.
   * Also remembers the values it had before reseting, in order to undo the reset.
   */
  var _reset = function (elements, undo) {
    //We accept a single element or an array of elements.
    elements = [].concat(elements);

    var skrollable;
    var element;
    var elementsIndex = 0;
    var elementsLength = elements.length;

    for (; elementsIndex < elementsLength; elementsIndex++) {
      element = elements[elementsIndex];
      skrollable = _skrollables[element[SKROLLABLE_ID_DOM_PROPERTY]];

      //Couldn't find the skrollable for this DOM element.
      if (!skrollable) {
        continue;
      }

      if (undo) {
        //Reset class and style to the "dirty" (set by skrollr) values.
        element.style.cssText = skrollable.dirtyStyleAttr;
        _updateClass(element, skrollable.dirtyClassAttr);
      } else {
        //Remember the "dirty" (set by skrollr) class and style.
        skrollable.dirtyStyleAttr = element.style.cssText;
        skrollable.dirtyClassAttr = _getClass(element);

        //Reset class and style to what it originally was.
        element.style.cssText = skrollable.styleAttr;
        _updateClass(element, skrollable.classAttr);
      }
    }
  };

  /**
   * Detects support for 3d transforms by applying it to the skrollr-body.
   */
  var _detect3DTransforms = function () {
    _translateZ = "translateZ(0)";
    skrollr.setStyle(_skrollrBody, "transform", _translateZ);

    var computedStyle = getStyle(_skrollrBody);
    var computedTransform = computedStyle.getPropertyValue("transform");
    var computedTransformWithPrefix = computedStyle.getPropertyValue(
      theDashedCSSPrefix + "transform"
    );
    var has3D =
      (computedTransform && computedTransform !== "none") ||
      (computedTransformWithPrefix && computedTransformWithPrefix !== "none");

    if (!has3D) {
      _translateZ = "";
    }
  };

  /**
   * Set the CSS property on the given element. Sets prefixed properties as well.
   */
  skrollr.setStyle = function (el, prop, val) {
    var style = el.style;

    //Camel case.
    prop = prop.replace(rxCamelCase, rxCamelCaseFn).replace("-", "");

    //Make sure z-index gets a <integer>.
    //This is the only <integer> case we need to handle.
    if (prop === "zIndex") {
      if (isNaN(val)) {
        //If it's not a number, don't touch it.
        //It could for example be "auto" (#351).
        style[prop] = val;
      } else {
        //Floor the number.
        style[prop] = "" + (val | 0);
      }
    }
    //#64: "float" can't be set across browsers. Needs to use "cssFloat" for all except IE.
    else if (prop === "float") {
      style.styleFloat = style.cssFloat = val;
    } else {
      //Need try-catch for old IE.
      try {
        //Set prefixed property if there's a prefix.
        if (theCSSPrefix) {
          style[theCSSPrefix + prop.slice(0, 1).toUpperCase() + prop.slice(1)] =
            val;
        }

        //Set unprefixed.
        style[prop] = val;
      } catch (ignore) {}
    }
  };

  /**
   * Cross browser event handling.
   */
  var _addEvent = (skrollr.addEvent = function (element, names, callback) {
    var intermediate = function (e) {
      //Normalize IE event stuff.
      e = e || window.event;

      if (!e.target) {
        e.target = e.srcElement;
      }

      if (!e.preventDefault) {
        e.preventDefault = function () {
          e.returnValue = false;
          e.defaultPrevented = true;
        };
      }

      return callback.call(this, e);
    };

    names = names.split(" ");

    var name;
    var nameCounter = 0;
    var namesLength = names.length;

    for (; nameCounter < namesLength; nameCounter++) {
      name = names[nameCounter];

      if (element.addEventListener) {
        element.addEventListener(name, callback, false);
      } else {
        element.attachEvent("on" + name, intermediate);
      }

      //Remember the events to be able to flush them later.
      _registeredEvents.push({
        element: element,
        name: name,
        listener: callback,
      });
    }
  });

  var _removeEvent = (skrollr.removeEvent = function (
    element,
    names,
    callback
  ) {
    names = names.split(" ");

    var nameCounter = 0;
    var namesLength = names.length;

    for (; nameCounter < namesLength; nameCounter++) {
      if (element.removeEventListener) {
        element.removeEventListener(names[nameCounter], callback, false);
      } else {
        element.detachEvent("on" + names[nameCounter], callback);
      }
    }
  });

  var _removeAllEvents = function () {
    var eventData;
    var eventCounter = 0;
    var eventsLength = _registeredEvents.length;

    for (; eventCounter < eventsLength; eventCounter++) {
      eventData = _registeredEvents[eventCounter];

      _removeEvent(eventData.element, eventData.name, eventData.listener);
    }

    _registeredEvents = [];
  };

  var _emitEvent = function (element, name, direction) {
    if (_listeners.keyframe) {
      _listeners.keyframe.call(_instance, element, name, direction);
    }
  };

  var _reflow = function () {
    var pos = _instance.getScrollTop();

    //Will be recalculated by _updateDependentKeyFrames.
    _maxKeyFrame = 0;

    if (_forceHeight && !_isMobile) {
      //un-"force" the height to not mess with the calculations in _updateDependentKeyFrames (#216).
      body.style.height = "";
    }

    _updateDependentKeyFrames();

    if (_forceHeight && !_isMobile) {
      //"force" the height.
      body.style.height = _maxKeyFrame + documentElement.clientHeight + "px";
    }

    //The scroll offset may now be larger than needed (on desktop the browser/os prevents scrolling farther than the bottom).
    if (_isMobile) {
      _instance.setScrollTop(Math.min(_instance.getScrollTop(), _maxKeyFrame));
    } else {
      //Remember and reset the scroll pos (#217).
      _instance.setScrollTop(pos, true);
    }

    _forceRender = true;
  };

  /*
   * Returns a copy of the constants object where all functions and strings have been evaluated.
   */
  var _processConstants = function () {
    var viewportHeight = documentElement.clientHeight;
    var copy = {};
    var prop;
    var value;

    for (prop in _constants) {
      value = _constants[prop];

      if (typeof value === "function") {
        value = value.call(_instance);
      }
      //Percentage offset.
      else if (/p$/.test(value)) {
        value = (value.slice(0, -1) / 100) * viewportHeight;
      }

      copy[prop] = value;
    }

    return copy;
  };

  /*
   * Returns the height of the document.
   */
  var _getDocumentHeight = function () {
    var skrollrBodyHeight = 0;
    var bodyHeight;

    if (_skrollrBody) {
      skrollrBodyHeight = Math.max(
        _skrollrBody.offsetHeight,
        _skrollrBody.scrollHeight
      );
    }

    bodyHeight = Math.max(
      skrollrBodyHeight,
      body.scrollHeight,
      body.offsetHeight,
      documentElement.scrollHeight,
      documentElement.offsetHeight,
      documentElement.clientHeight
    );

    return bodyHeight - documentElement.clientHeight;
  };

  /**
   * Returns a string of space separated classnames for the current element.
   * Works with SVG as well.
   */
  var _getClass = function (element) {
    var prop = "className";

    //SVG support by using className.baseVal instead of just className.
    if (window.SVGElement && element instanceof window.SVGElement) {
      element = element[prop];
      prop = "baseVal";
    }

    return element[prop];
  };

  /**
   * Adds and removes a CSS classes.
   * Works with SVG as well.
   * add and remove are arrays of strings,
   * or if remove is ommited add is a string and overwrites all classes.
   */
  var _updateClass = function (element, add, remove) {
    var prop = "className";

    //SVG support by using className.baseVal instead of just className.
    if (window.SVGElement && element instanceof window.SVGElement) {
      element = element[prop];
      prop = "baseVal";
    }

    //When remove is ommited, we want to overwrite/set the classes.
    if (remove === undefined) {
      element[prop] = add;
      return;
    }

    //Cache current classes. We will work on a string before passing back to DOM.
    var val = element[prop];

    //All classes to be removed.
    var classRemoveIndex = 0;
    var removeLength = remove.length;

    for (; classRemoveIndex < removeLength; classRemoveIndex++) {
      val = _untrim(val).replace(_untrim(remove[classRemoveIndex]), " ");
    }

    val = _trim(val);

    //All classes to be added.
    var classAddIndex = 0;
    var addLength = add.length;

    for (; classAddIndex < addLength; classAddIndex++) {
      //Only add if el not already has class.
      if (_untrim(val).indexOf(_untrim(add[classAddIndex])) === -1) {
        val += " " + add[classAddIndex];
      }
    }

    element[prop] = _trim(val);
  };

  var _trim = function (a) {
    return a.replace(rxTrim, "");
  };

  /**
   * Adds a space before and after the string.
   */
  var _untrim = function (a) {
    return " " + a + " ";
  };

  var _now =
    Date.now ||
    function () {
      return +new Date();
    };

  var _keyFrameComparator = function (a, b) {
    return a.frame - b.frame;
  };

  /*
   * Private variables.
   */

  //Singleton
  var _instance;

  /*
          A list of all elements which should be animated associated with their the metadata.
          Exmaple skrollable with two key frames animating from 100px width to 20px:
  
          skrollable = {
              element: <the DOM element>,
              styleAttr: <style attribute of the element before skrollr>,
              classAttr: <class attribute of the element before skrollr>,
              keyFrames: [
                  {
                      frame: 100,
                      props: {
                          width: {
                              value: ['{?}px', 100],
                              easing: <reference to easing function>
                          }
                      },
                      mode: "absolute"
                  },
                  {
                      frame: 200,
                      props: {
                          width: {
                              value: ['{?}px', 20],
                              easing: <reference to easing function>
                          }
                      },
                      mode: "absolute"
                  }
              ]
          };
      */
  var _skrollables;

  var _skrollrBody;

  var _listeners;
  var _forceHeight;
  var _maxKeyFrame = 0;

  var _scale = 1;
  var _constants;

  var _mobileDeceleration;

  //Current direction (up/down).
  var _direction = "down";

  //The last top offset value. Needed to determine direction.
  var _lastTop = -1;

  //The last time we called the render method (doesn't mean we rendered!).
  var _lastRenderCall = _now();

  //For detecting if it actually resized (#271).
  var _lastViewportWidth = 0;
  var _lastViewportHeight = 0;

  var _requestReflow = false;

  //Will contain data about a running scrollbar animation, if any.
  var _scrollAnimation;

  var _smoothScrollingEnabled;

  var _smoothScrollingDuration;

  //Will contain settins for smooth scrolling if enabled.
  var _smoothScrolling;

  //Can be set by any operation/event to force rendering even if the scrollbar didn't move.
  var _forceRender;

  //Each skrollable gets an unique ID incremented for each skrollable.
  //The ID is the index in the _skrollables array.
  var _skrollableIdCounter = 0;

  var _edgeStrategy;

  //Mobile specific vars. Will be stripped by UglifyJS when not in use.
  var _isMobile = false;

  //The virtual scroll offset when using mobile scrolling.
  var _mobileOffset = 0;

  //If the browser supports 3d transforms, this will be filled with 'translateZ(0)' (empty string otherwise).
  var _translateZ;

  //Will contain data about registered events by skrollr.
  var _registeredEvents = [];

  //Animation frame id returned by RequestAnimationFrame (or timeout when RAF is not supported).
  var _animFrame;

  //Expose skrollr as either a global variable or a require.js module.
  if (typeof define === "function" && define.amd) {
    define([], function () {
      return skrollr;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = skrollr;
  } else {
    window.skrollr = skrollr;
  }
})(window, document);

/*!
 * sweetalert2 v11.7.5
 * Released under the MIT License.
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).Sweetalert2 =
        t());
})(this, function () {
  "use strict";
  var e = {
    awaitingPromise: new WeakMap(),
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  };
  const t = (e) => {
      const t = {};
      for (const n in e) t[e[n]] = "swal2-" + e[n];
      return t;
    },
    n = t([
      "container",
      "shown",
      "height-auto",
      "iosfix",
      "popup",
      "modal",
      "no-backdrop",
      "no-transition",
      "toast",
      "toast-shown",
      "show",
      "hide",
      "close",
      "title",
      "html-container",
      "actions",
      "confirm",
      "deny",
      "cancel",
      "default-outline",
      "footer",
      "icon",
      "icon-content",
      "image",
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "label",
      "textarea",
      "inputerror",
      "input-label",
      "validation-message",
      "progress-steps",
      "active-progress-step",
      "progress-step",
      "progress-step-line",
      "loader",
      "loading",
      "styled",
      "top",
      "top-start",
      "top-end",
      "top-left",
      "top-right",
      "center",
      "center-start",
      "center-end",
      "center-left",
      "center-right",
      "bottom",
      "bottom-start",
      "bottom-end",
      "bottom-left",
      "bottom-right",
      "grow-row",
      "grow-column",
      "grow-fullscreen",
      "rtl",
      "timer-progress-bar",
      "timer-progress-bar-container",
      "scrollbar-measure",
      "icon-success",
      "icon-warning",
      "icon-info",
      "icon-question",
      "icon-error",
    ]),
    o = t(["success", "warning", "info", "question", "error"]),
    i = "SweetAlert2:",
    s = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    r = (e) => {
      console.warn(`${i} ${"object" == typeof e ? e.join(" ") : e}`);
    },
    a = (e) => {
      console.error(`${i} ${e}`);
    },
    l = [],
    c = (e, t) => {
      var n;
      (n = `"${e}" is deprecated and will be removed in the next major release. Please use "${t}" instead.`),
        l.includes(n) || (l.push(n), r(n));
    },
    u = (e) => ("function" == typeof e ? e() : e),
    d = (e) => e && "function" == typeof e.toPromise,
    p = (e) => (d(e) ? e.toPromise() : Promise.resolve(e)),
    m = (e) => e && Promise.resolve(e) === e,
    g = () => document.body.querySelector(`.${n.container}`),
    h = (e) => {
      const t = g();
      return t ? t.querySelector(e) : null;
    },
    f = (e) => h(`.${e}`),
    b = () => f(n.popup),
    y = () => f(n.icon),
    w = () => f(n.title),
    v = () => f(n["html-container"]),
    C = () => f(n.image),
    A = () => f(n["progress-steps"]),
    k = () => f(n["validation-message"]),
    B = () => h(`.${n.actions} .${n.confirm}`),
    P = () => h(`.${n.actions} .${n.cancel}`),
    x = () => h(`.${n.actions} .${n.deny}`),
    E = () => h(`.${n.loader}`),
    $ = () => f(n.actions),
    T = () => f(n.footer),
    S = () => f(n["timer-progress-bar"]),
    L = () => f(n.close),
    O = () => {
      const e = Array.from(
          b().querySelectorAll(
            '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
          )
        ).sort((e, t) => {
          const n = parseInt(e.getAttribute("tabindex")),
            o = parseInt(t.getAttribute("tabindex"));
          return n > o ? 1 : n < o ? -1 : 0;
        }),
        t = Array.from(
          b().querySelectorAll(
            '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
          )
        ).filter((e) => "-1" !== e.getAttribute("tabindex"));
      return ((e) => {
        const t = [];
        for (let n = 0; n < e.length; n++)
          -1 === t.indexOf(e[n]) && t.push(e[n]);
        return t;
      })(e.concat(t)).filter((e) => J(e));
    },
    j = () =>
      D(document.body, n.shown) &&
      !D(document.body, n["toast-shown"]) &&
      !D(document.body, n["no-backdrop"]),
    M = () => b() && D(b(), n.toast),
    H = { previousBodyPadding: null },
    I = (e, t) => {
      if (((e.textContent = ""), t)) {
        const n = new DOMParser().parseFromString(t, "text/html");
        Array.from(n.querySelector("head").childNodes).forEach((t) => {
          e.appendChild(t);
        }),
          Array.from(n.querySelector("body").childNodes).forEach((t) => {
            t instanceof HTMLVideoElement || t instanceof HTMLAudioElement
              ? e.appendChild(t.cloneNode(!0))
              : e.appendChild(t);
          });
      }
    },
    D = (e, t) => {
      if (!t) return !1;
      const n = t.split(/\s+/);
      for (let t = 0; t < n.length; t++)
        if (!e.classList.contains(n[t])) return !1;
      return !0;
    },
    q = (e, t, i) => {
      if (
        (((e, t) => {
          Array.from(e.classList).forEach((i) => {
            Object.values(n).includes(i) ||
              Object.values(o).includes(i) ||
              Object.values(t.showClass).includes(i) ||
              e.classList.remove(i);
          });
        })(e, t),
        t.customClass && t.customClass[i])
      ) {
        if ("string" != typeof t.customClass[i] && !t.customClass[i].forEach)
          return void r(
            `Invalid type of customClass.${i}! Expected string or iterable object, got "${typeof t
              .customClass[i]}"`
          );
        R(e, t.customClass[i]);
      }
    },
    V = (e, t) => {
      if (!t) return null;
      switch (t) {
        case "select":
        case "textarea":
        case "file":
          return e.querySelector(`.${n.popup} > .${n[t]}`);
        case "checkbox":
          return e.querySelector(`.${n.popup} > .${n.checkbox} input`);
        case "radio":
          return (
            e.querySelector(`.${n.popup} > .${n.radio} input:checked`) ||
            e.querySelector(`.${n.popup} > .${n.radio} input:first-child`)
          );
        case "range":
          return e.querySelector(`.${n.popup} > .${n.range} input`);
        default:
          return e.querySelector(`.${n.popup} > .${n.input}`);
      }
    },
    N = (e) => {
      if ((e.focus(), "file" !== e.type)) {
        const t = e.value;
        (e.value = ""), (e.value = t);
      }
    },
    F = (e, t, n) => {
      e &&
        t &&
        ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
        t.forEach((t) => {
          Array.isArray(e)
            ? e.forEach((e) => {
                n ? e.classList.add(t) : e.classList.remove(t);
              })
            : n
            ? e.classList.add(t)
            : e.classList.remove(t);
        }));
    },
    R = (e, t) => {
      F(e, t, !0);
    },
    U = (e, t) => {
      F(e, t, !1);
    },
    _ = (e, t) => {
      const n = Array.from(e.children);
      for (let e = 0; e < n.length; e++) {
        const o = n[e];
        if (o instanceof HTMLElement && D(o, t)) return o;
      }
    },
    W = (e, t, n) => {
      n === `${parseInt(n)}` && (n = parseInt(n)),
        n || 0 === parseInt(n)
          ? (e.style[t] = "number" == typeof n ? `${n}px` : n)
          : e.style.removeProperty(t);
    },
    z = function (e) {
      let t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex";
      e.style.display = t;
    },
    K = (e) => {
      e.style.display = "none";
    },
    Y = (e, t, n, o) => {
      const i = e.querySelector(t);
      i && (i.style[n] = o);
    },
    Z = function (e, t) {
      t
        ? z(
            e,
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "flex"
          )
        : K(e);
    },
    J = (e) =>
      !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
    X = (e) => !!(e.scrollHeight > e.clientHeight),
    G = (e) => {
      const t = window.getComputedStyle(e),
        n = parseFloat(t.getPropertyValue("animation-duration") || "0"),
        o = parseFloat(t.getPropertyValue("transition-duration") || "0");
      return n > 0 || o > 0;
    },
    Q = function (e) {
      let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      const n = S();
      J(n) &&
        (t && ((n.style.transition = "none"), (n.style.width = "100%")),
        setTimeout(() => {
          (n.style.transition = `width ${e / 1e3}s linear`),
            (n.style.width = "0%");
        }, 10));
    },
    ee = {},
    te = (e) =>
      new Promise((t) => {
        if (!e) return t();
        const n = window.scrollX,
          o = window.scrollY;
        (ee.restoreFocusTimeout = setTimeout(() => {
          ee.previousActiveElement instanceof HTMLElement
            ? (ee.previousActiveElement.focus(),
              (ee.previousActiveElement = null))
            : document.body && document.body.focus(),
            t();
        }, 100)),
          window.scrollTo(n, o);
      }),
    ne = () => "undefined" == typeof window || "undefined" == typeof document,
    oe =
      `\n <div aria-labelledby="${n.title}" aria-describedby="${n["html-container"]}" class="${n.popup}" tabindex="-1">\n   <button type="button" class="${n.close}"></button>\n   <ul class="${n["progress-steps"]}"></ul>\n   <div class="${n.icon}"></div>\n   <img class="${n.image}" />\n   <h2 class="${n.title}" id="${n.title}"></h2>\n   <div class="${n["html-container"]}" id="${n["html-container"]}"></div>\n   <input class="${n.input}" />\n   <input type="file" class="${n.file}" />\n   <div class="${n.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${n.select}"></select>\n   <div class="${n.radio}"></div>\n   <label for="${n.checkbox}" class="${n.checkbox}">\n     <input type="checkbox" />\n     <span class="${n.label}"></span>\n   </label>\n   <textarea class="${n.textarea}"></textarea>\n   <div class="${n["validation-message"]}" id="${n["validation-message"]}"></div>\n   <div class="${n.actions}">\n     <div class="${n.loader}"></div>\n     <button type="button" class="${n.confirm}"></button>\n     <button type="button" class="${n.deny}"></button>\n     <button type="button" class="${n.cancel}"></button>\n   </div>\n   <div class="${n.footer}"></div>\n   <div class="${n["timer-progress-bar-container"]}">\n     <div class="${n["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(
        /(^|\n)\s*/g,
        ""
      ),
    ie = () => {
      ee.currentInstance.resetValidationMessage();
    },
    se = (e) => {
      const t = (() => {
        const e = g();
        return (
          !!e &&
          (e.remove(),
          U(
            [document.documentElement, document.body],
            [n["no-backdrop"], n["toast-shown"], n["has-column"]]
          ),
          !0)
        );
      })();
      if (ne()) return void a("SweetAlert2 requires document to initialize");
      const o = document.createElement("div");
      (o.className = n.container), t && R(o, n["no-transition"]), I(o, oe);
      const i =
        "string" == typeof (s = e.target) ? document.querySelector(s) : s;
      var s;
      i.appendChild(o),
        ((e) => {
          const t = b();
          t.setAttribute("role", e.toast ? "alert" : "dialog"),
            t.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
            e.toast || t.setAttribute("aria-modal", "true");
        })(e),
        ((e) => {
          "rtl" === window.getComputedStyle(e).direction && R(g(), n.rtl);
        })(i),
        (() => {
          const e = b(),
            t = _(e, n.input),
            o = _(e, n.file),
            i = e.querySelector(`.${n.range} input`),
            s = e.querySelector(`.${n.range} output`),
            r = _(e, n.select),
            a = e.querySelector(`.${n.checkbox} input`),
            l = _(e, n.textarea);
          (t.oninput = ie),
            (o.onchange = ie),
            (r.onchange = ie),
            (a.onchange = ie),
            (l.oninput = ie),
            (i.oninput = () => {
              ie(), (s.value = i.value);
            }),
            (i.onchange = () => {
              ie(), (s.value = i.value);
            });
        })();
    },
    re = (e, t) => {
      e instanceof HTMLElement
        ? t.appendChild(e)
        : "object" == typeof e
        ? ae(e, t)
        : e && I(t, e);
    },
    ae = (e, t) => {
      e.jquery ? le(t, e) : I(t, e.toString());
    },
    le = (e, t) => {
      if (((e.textContent = ""), 0 in t))
        for (let n = 0; n in t; n++) e.appendChild(t[n].cloneNode(!0));
      else e.appendChild(t.cloneNode(!0));
    },
    ce = (() => {
      if (ne()) return !1;
      const e = document.createElement("div"),
        t = {
          WebkitAnimation: "webkitAnimationEnd",
          animation: "animationend",
        };
      for (const n in t)
        if (Object.prototype.hasOwnProperty.call(t, n) && void 0 !== e.style[n])
          return t[n];
      return !1;
    })(),
    ue = (e, t) => {
      const o = $(),
        i = E();
      t.showConfirmButton || t.showDenyButton || t.showCancelButton
        ? z(o)
        : K(o),
        q(o, t, "actions"),
        (function (e, t, o) {
          const i = B(),
            s = x(),
            r = P();
          de(i, "confirm", o),
            de(s, "deny", o),
            de(r, "cancel", o),
            (function (e, t, o, i) {
              if (!i.buttonsStyling) return void U([e, t, o], n.styled);
              R([e, t, o], n.styled),
                i.confirmButtonColor &&
                  ((e.style.backgroundColor = i.confirmButtonColor),
                  R(e, n["default-outline"]));
              i.denyButtonColor &&
                ((t.style.backgroundColor = i.denyButtonColor),
                R(t, n["default-outline"]));
              i.cancelButtonColor &&
                ((o.style.backgroundColor = i.cancelButtonColor),
                R(o, n["default-outline"]));
            })(i, s, r, o),
            o.reverseButtons &&
              (o.toast
                ? (e.insertBefore(r, i), e.insertBefore(s, i))
                : (e.insertBefore(r, t),
                  e.insertBefore(s, t),
                  e.insertBefore(i, t)));
        })(o, i, t),
        I(i, t.loaderHtml),
        q(i, t, "loader");
    };
  function de(e, t, o) {
    Z(e, o[`show${s(t)}Button`], "inline-block"),
      I(e, o[`${t}ButtonText`]),
      e.setAttribute("aria-label", o[`${t}ButtonAriaLabel`]),
      (e.className = n[t]),
      q(e, o, `${t}Button`),
      R(e, o[`${t}ButtonClass`]);
  }
  const pe = (e, t) => {
    const o = g();
    o &&
      (!(function (e, t) {
        "string" == typeof t
          ? (e.style.background = t)
          : t || R([document.documentElement, document.body], n["no-backdrop"]);
      })(o, t.backdrop),
      (function (e, t) {
        t in n
          ? R(e, n[t])
          : (r('The "position" parameter is not valid, defaulting to "center"'),
            R(e, n.center));
      })(o, t.position),
      (function (e, t) {
        if (t && "string" == typeof t) {
          const o = `grow-${t}`;
          o in n && R(e, n[o]);
        }
      })(o, t.grow),
      q(o, t, "container"));
  };
  const me = [
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "textarea",
    ],
    ge = (e) => {
      if (!Ce[e.input])
        return void a(
          `Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${e.input}"`
        );
      const t = we(e.input),
        n = Ce[e.input](t, e);
      z(t),
        e.inputAutoFocus &&
          setTimeout(() => {
            N(n);
          });
    },
    he = (e, t) => {
      const n = V(b(), e);
      if (n) {
        ((e) => {
          for (let t = 0; t < e.attributes.length; t++) {
            const n = e.attributes[t].name;
            ["type", "value", "style"].includes(n) || e.removeAttribute(n);
          }
        })(n);
        for (const e in t) n.setAttribute(e, t[e]);
      }
    },
    fe = (e) => {
      const t = we(e.input);
      "object" == typeof e.customClass && R(t, e.customClass.input);
    },
    be = (e, t) => {
      (e.placeholder && !t.inputPlaceholder) ||
        (e.placeholder = t.inputPlaceholder);
    },
    ye = (e, t, o) => {
      if (o.inputLabel) {
        e.id = n.input;
        const i = document.createElement("label"),
          s = n["input-label"];
        i.setAttribute("for", e.id),
          (i.className = s),
          "object" == typeof o.customClass && R(i, o.customClass.inputLabel),
          (i.innerText = o.inputLabel),
          t.insertAdjacentElement("beforebegin", i);
      }
    },
    we = (e) => _(b(), n[e] || n.input),
    ve = (e, t) => {
      ["string", "number"].includes(typeof t)
        ? (e.value = `${t}`)
        : m(t) ||
          r(
            `Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`
          );
    },
    Ce = {};
  (Ce.text =
    Ce.email =
    Ce.password =
    Ce.number =
    Ce.tel =
    Ce.url =
      (e, t) => (
        ve(e, t.inputValue), ye(e, e, t), be(e, t), (e.type = t.input), e
      )),
    (Ce.file = (e, t) => (ye(e, e, t), be(e, t), e)),
    (Ce.range = (e, t) => {
      const n = e.querySelector("input"),
        o = e.querySelector("output");
      return (
        ve(n, t.inputValue),
        (n.type = t.input),
        ve(o, t.inputValue),
        ye(n, e, t),
        e
      );
    }),
    (Ce.select = (e, t) => {
      if (((e.textContent = ""), t.inputPlaceholder)) {
        const n = document.createElement("option");
        I(n, t.inputPlaceholder),
          (n.value = ""),
          (n.disabled = !0),
          (n.selected = !0),
          e.appendChild(n);
      }
      return ye(e, e, t), e;
    }),
    (Ce.radio = (e) => ((e.textContent = ""), e)),
    (Ce.checkbox = (e, t) => {
      const o = V(b(), "checkbox");
      (o.value = "1"), (o.id = n.checkbox), (o.checked = Boolean(t.inputValue));
      const i = e.querySelector("span");
      return I(i, t.inputPlaceholder), o;
    }),
    (Ce.textarea = (e, t) => {
      ve(e, t.inputValue), be(e, t), ye(e, e, t);
      return (
        setTimeout(() => {
          if ("MutationObserver" in window) {
            const t = parseInt(window.getComputedStyle(b()).width);
            new MutationObserver(() => {
              const n =
                e.offsetWidth +
                ((o = e),
                parseInt(window.getComputedStyle(o).marginLeft) +
                  parseInt(window.getComputedStyle(o).marginRight));
              var o;
              b().style.width = n > t ? `${n}px` : null;
            }).observe(e, { attributes: !0, attributeFilter: ["style"] });
          }
        }),
        e
      );
    });
  const Ae = (t, o) => {
      const i = v();
      q(i, o, "htmlContainer"),
        o.html
          ? (re(o.html, i), z(i, "block"))
          : o.text
          ? ((i.textContent = o.text), z(i, "block"))
          : K(i),
        ((t, o) => {
          const i = b(),
            s = e.innerParams.get(t),
            r = !s || o.input !== s.input;
          me.forEach((e) => {
            const t = _(i, n[e]);
            he(e, o.inputAttributes), (t.className = n[e]), r && K(t);
          }),
            o.input && (r && ge(o), fe(o));
        })(t, o);
    },
    ke = (e, t) => {
      for (const n in o) t.icon !== n && U(e, o[n]);
      R(e, o[t.icon]), xe(e, t), Be(), q(e, t, "icon");
    },
    Be = () => {
      const e = b(),
        t = window.getComputedStyle(e).getPropertyValue("background-color"),
        n = e.querySelectorAll(
          "[class^=swal2-success-circular-line], .swal2-success-fix"
        );
      for (let e = 0; e < n.length; e++) n[e].style.backgroundColor = t;
    },
    Pe = (e, t) => {
      let n,
        o = e.innerHTML;
      if (t.iconHtml) n = Ee(t.iconHtml);
      else if ("success" === t.icon)
        (n =
          '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n'),
          (o = o.replace(/ style=".*?"/g, ""));
      else if ("error" === t.icon)
        n =
          '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
      else {
        n = Ee({ question: "?", warning: "!", info: "i" }[t.icon]);
      }
      o.trim() !== n.trim() && I(e, n);
    },
    xe = (e, t) => {
      if (t.iconColor) {
        (e.style.color = t.iconColor), (e.style.borderColor = t.iconColor);
        for (const n of [
          ".swal2-success-line-tip",
          ".swal2-success-line-long",
          ".swal2-x-mark-line-left",
          ".swal2-x-mark-line-right",
        ])
          Y(e, n, "backgroundColor", t.iconColor);
        Y(e, ".swal2-success-ring", "borderColor", t.iconColor);
      }
    },
    Ee = (e) => `<div class="${n["icon-content"]}">${e}</div>`,
    $e = (e, t) => {
      (e.className = `${n.popup} ${J(e) ? t.showClass.popup : ""}`),
        t.toast
          ? (R([document.documentElement, document.body], n["toast-shown"]),
            R(e, n.toast))
          : R(e, n.modal),
        q(e, t, "popup"),
        "string" == typeof t.customClass && R(e, t.customClass),
        t.icon && R(e, n[`icon-${t.icon}`]);
    },
    Te = (e) => {
      const t = document.createElement("li");
      return R(t, n["progress-step"]), I(t, e), t;
    },
    Se = (e) => {
      const t = document.createElement("li");
      return (
        R(t, n["progress-step-line"]),
        e.progressStepsDistance && W(t, "width", e.progressStepsDistance),
        t
      );
    },
    Le = (t, i) => {
      ((e, t) => {
        const n = g(),
          o = b();
        t.toast
          ? (W(n, "width", t.width),
            (o.style.width = "100%"),
            o.insertBefore(E(), y()))
          : W(o, "width", t.width),
          W(o, "padding", t.padding),
          t.color && (o.style.color = t.color),
          t.background && (o.style.background = t.background),
          K(k()),
          $e(o, t);
      })(0, i),
        pe(0, i),
        ((e, t) => {
          const o = A();
          t.progressSteps && 0 !== t.progressSteps.length
            ? (z(o),
              (o.textContent = ""),
              t.currentProgressStep >= t.progressSteps.length &&
                r(
                  "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
                ),
              t.progressSteps.forEach((e, i) => {
                const s = Te(e);
                if (
                  (o.appendChild(s),
                  i === t.currentProgressStep &&
                    R(s, n["active-progress-step"]),
                  i !== t.progressSteps.length - 1)
                ) {
                  const e = Se(t);
                  o.appendChild(e);
                }
              }))
            : K(o);
        })(0, i),
        ((t, n) => {
          const i = e.innerParams.get(t),
            s = y();
          if (i && n.icon === i.icon) return Pe(s, n), void ke(s, n);
          if (n.icon || n.iconHtml) {
            if (n.icon && -1 === Object.keys(o).indexOf(n.icon))
              return (
                a(
                  `Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${n.icon}"`
                ),
                void K(s)
              );
            z(s), Pe(s, n), ke(s, n), R(s, n.showClass.icon);
          } else K(s);
        })(t, i),
        ((e, t) => {
          const o = C();
          t.imageUrl
            ? (z(o, ""),
              o.setAttribute("src", t.imageUrl),
              o.setAttribute("alt", t.imageAlt),
              W(o, "width", t.imageWidth),
              W(o, "height", t.imageHeight),
              (o.className = n.image),
              q(o, t, "image"))
            : K(o);
        })(0, i),
        ((e, t) => {
          const n = w();
          Z(n, t.title || t.titleText, "block"),
            t.title && re(t.title, n),
            t.titleText && (n.innerText = t.titleText),
            q(n, t, "title");
        })(0, i),
        ((e, t) => {
          const n = L();
          I(n, t.closeButtonHtml),
            q(n, t, "closeButton"),
            Z(n, t.showCloseButton),
            n.setAttribute("aria-label", t.closeButtonAriaLabel);
        })(0, i),
        Ae(t, i),
        ue(0, i),
        ((e, t) => {
          const n = T();
          Z(n, t.footer), t.footer && re(t.footer, n), q(n, t, "footer");
        })(0, i),
        "function" == typeof i.didRender && i.didRender(b());
    };
  function Oe() {
    const t = e.innerParams.get(this);
    if (!t) return;
    const o = e.domCache.get(this);
    K(o.loader),
      M() ? t.icon && z(y()) : je(o),
      U([o.popup, o.actions], n.loading),
      o.popup.removeAttribute("aria-busy"),
      o.popup.removeAttribute("data-loading"),
      (o.confirmButton.disabled = !1),
      (o.denyButton.disabled = !1),
      (o.cancelButton.disabled = !1);
  }
  const je = (e) => {
    const t = e.popup.getElementsByClassName(
      e.loader.getAttribute("data-button-to-replace")
    );
    t.length
      ? z(t[0], "inline-block")
      : J(B()) || J(x()) || J(P()) || K(e.actions);
  };
  const Me = () => B() && B().click(),
    He = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer",
    }),
    Ie = (e) => {
      e.keydownTarget &&
        e.keydownHandlerAdded &&
        (e.keydownTarget.removeEventListener("keydown", e.keydownHandler, {
          capture: e.keydownListenerCapture,
        }),
        (e.keydownHandlerAdded = !1));
    },
    De = (e, t) => {
      const n = O();
      if (n.length)
        return (
          (e += t) === n.length ? (e = 0) : -1 === e && (e = n.length - 1),
          void n[e].focus()
        );
      b().focus();
    },
    qe = ["ArrowRight", "ArrowDown"],
    Ve = ["ArrowLeft", "ArrowUp"],
    Ne = (t, n, o) => {
      const i = e.innerParams.get(t);
      i &&
        (n.isComposing ||
          229 === n.keyCode ||
          (i.stopKeydownPropagation && n.stopPropagation(),
          "Enter" === n.key
            ? Fe(t, n, i)
            : "Tab" === n.key
            ? Re(n)
            : [...qe, ...Ve].includes(n.key)
            ? Ue(n.key)
            : "Escape" === n.key && _e(n, i, o)));
    },
    Fe = (e, t, n) => {
      if (
        u(n.allowEnterKey) &&
        t.target &&
        e.getInput() &&
        t.target instanceof HTMLElement &&
        t.target.outerHTML === e.getInput().outerHTML
      ) {
        if (["textarea", "file"].includes(n.input)) return;
        Me(), t.preventDefault();
      }
    },
    Re = (e) => {
      const t = e.target,
        n = O();
      let o = -1;
      for (let e = 0; e < n.length; e++)
        if (t === n[e]) {
          o = e;
          break;
        }
      e.shiftKey ? De(o, -1) : De(o, 1),
        e.stopPropagation(),
        e.preventDefault();
    },
    Ue = (e) => {
      const t = [B(), x(), P()];
      if (
        document.activeElement instanceof HTMLElement &&
        !t.includes(document.activeElement)
      )
        return;
      const n = qe.includes(e)
        ? "nextElementSibling"
        : "previousElementSibling";
      let o = document.activeElement;
      for (let e = 0; e < $().children.length; e++) {
        if (((o = o[n]), !o)) return;
        if (o instanceof HTMLButtonElement && J(o)) break;
      }
      o instanceof HTMLButtonElement && o.focus();
    },
    _e = (e, t, n) => {
      u(t.allowEscapeKey) && (e.preventDefault(), n(He.esc));
    };
  var We = {
    swalPromiseResolve: new WeakMap(),
    swalPromiseReject: new WeakMap(),
  };
  const ze = () => {
      Array.from(document.body.children).forEach((e) => {
        e.hasAttribute("data-previous-aria-hidden")
          ? (e.setAttribute(
              "aria-hidden",
              e.getAttribute("data-previous-aria-hidden")
            ),
            e.removeAttribute("data-previous-aria-hidden"))
          : e.removeAttribute("aria-hidden");
      });
    },
    Ke = () => {
      const e = navigator.userAgent,
        t = !!e.match(/iPad/i) || !!e.match(/iPhone/i),
        n = !!e.match(/WebKit/i);
      if (t && n && !e.match(/CriOS/i)) {
        const e = 44;
        b().scrollHeight > window.innerHeight - e &&
          (g().style.paddingBottom = `${e}px`);
      }
    },
    Ye = () => {
      const e = g();
      let t;
      (e.ontouchstart = (e) => {
        t = Ze(e);
      }),
        (e.ontouchmove = (e) => {
          t && (e.preventDefault(), e.stopPropagation());
        });
    },
    Ze = (e) => {
      const t = e.target,
        n = g();
      return (
        !Je(e) &&
        !Xe(e) &&
        (t === n ||
          (!X(n) &&
            t instanceof HTMLElement &&
            "INPUT" !== t.tagName &&
            "TEXTAREA" !== t.tagName &&
            (!X(v()) || !v().contains(t))))
      );
    },
    Je = (e) =>
      e.touches && e.touches.length && "stylus" === e.touches[0].touchType,
    Xe = (e) => e.touches && e.touches.length > 1,
    Ge = () => {
      null === H.previousBodyPadding &&
        document.body.scrollHeight > window.innerHeight &&
        ((H.previousBodyPadding = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right")
        )),
        (document.body.style.paddingRight = `${
          H.previousBodyPadding +
          (() => {
            const e = document.createElement("div");
            (e.className = n["scrollbar-measure"]),
              document.body.appendChild(e);
            const t = e.getBoundingClientRect().width - e.clientWidth;
            return document.body.removeChild(e), t;
          })()
        }px`));
    };
  function Qe(e, t, o, i) {
    M() ? rt(e, i) : (te(o).then(() => rt(e, i)), Ie(ee));
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      ? (t.setAttribute("style", "display:none !important"),
        t.removeAttribute("class"),
        (t.innerHTML = ""))
      : t.remove(),
      j() &&
        (null !== H.previousBodyPadding &&
          ((document.body.style.paddingRight = `${H.previousBodyPadding}px`),
          (H.previousBodyPadding = null)),
        (() => {
          if (D(document.body, n.iosfix)) {
            const e = parseInt(document.body.style.top, 10);
            U(document.body, n.iosfix),
              (document.body.style.top = ""),
              (document.body.scrollTop = -1 * e);
          }
        })(),
        ze()),
      U(
        [document.documentElement, document.body],
        [n.shown, n["height-auto"], n["no-backdrop"], n["toast-shown"]]
      );
  }
  function et(e) {
    e = ot(e);
    const t = We.swalPromiseResolve.get(this),
      n = tt(this);
    this.isAwaitingPromise() ? e.isDismissed || (nt(this), t(e)) : n && t(e);
  }
  const tt = (t) => {
    const n = b();
    if (!n) return !1;
    const o = e.innerParams.get(t);
    if (!o || D(n, o.hideClass.popup)) return !1;
    U(n, o.showClass.popup), R(n, o.hideClass.popup);
    const i = g();
    return (
      U(i, o.showClass.backdrop), R(i, o.hideClass.backdrop), it(t, n, o), !0
    );
  };
  const nt = (t) => {
      t.isAwaitingPromise() &&
        (e.awaitingPromise.delete(t), e.innerParams.get(t) || t._destroy());
    },
    ot = (e) =>
      void 0 === e
        ? { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
        : Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, e),
    it = (e, t, n) => {
      const o = g(),
        i = ce && G(t);
      "function" == typeof n.willClose && n.willClose(t),
        i
          ? st(e, t, o, n.returnFocus, n.didClose)
          : Qe(e, o, n.returnFocus, n.didClose);
    },
    st = (e, t, n, o, i) => {
      (ee.swalCloseEventFinishedCallback = Qe.bind(null, e, n, o, i)),
        t.addEventListener(ce, function (e) {
          e.target === t &&
            (ee.swalCloseEventFinishedCallback(),
            delete ee.swalCloseEventFinishedCallback);
        });
    },
    rt = (e, t) => {
      setTimeout(() => {
        "function" == typeof t && t.bind(e.params)(), e._destroy();
      });
    };
  function at(t, n, o) {
    const i = e.domCache.get(t);
    n.forEach((e) => {
      i[e].disabled = o;
    });
  }
  function lt(e, t) {
    if (e)
      if ("radio" === e.type) {
        const n = e.parentNode.parentNode.querySelectorAll("input");
        for (let e = 0; e < n.length; e++) n[e].disabled = t;
      } else e.disabled = t;
  }
  const ct = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: !1,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
      customClass: {},
      target: "body",
      color: void 0,
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showDenyButton: !1,
      showCancelButton: !1,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      denyButtonText: "No",
      denyButtonAriaLabel: "",
      denyButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusDeny: !1,
      focusCancel: !1,
      returnFocus: !0,
      showCloseButton: !1,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      loaderHtml: "",
      showLoaderOnConfirm: !1,
      showLoaderOnDeny: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputLabel: "",
      inputValue: "",
      inputOptions: {},
      inputAutoFocus: !0,
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: !1,
      validationMessage: void 0,
      grow: !1,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: !0,
    },
    ut = [
      "allowEscapeKey",
      "allowOutsideClick",
      "background",
      "buttonsStyling",
      "cancelButtonAriaLabel",
      "cancelButtonColor",
      "cancelButtonText",
      "closeButtonAriaLabel",
      "closeButtonHtml",
      "color",
      "confirmButtonAriaLabel",
      "confirmButtonColor",
      "confirmButtonText",
      "currentProgressStep",
      "customClass",
      "denyButtonAriaLabel",
      "denyButtonColor",
      "denyButtonText",
      "didClose",
      "didDestroy",
      "footer",
      "hideClass",
      "html",
      "icon",
      "iconColor",
      "iconHtml",
      "imageAlt",
      "imageHeight",
      "imageUrl",
      "imageWidth",
      "preConfirm",
      "preDeny",
      "progressSteps",
      "returnFocus",
      "reverseButtons",
      "showCancelButton",
      "showCloseButton",
      "showConfirmButton",
      "showDenyButton",
      "text",
      "title",
      "titleText",
      "willClose",
    ],
    dt = {},
    pt = [
      "allowOutsideClick",
      "allowEnterKey",
      "backdrop",
      "focusConfirm",
      "focusDeny",
      "focusCancel",
      "returnFocus",
      "heightAuto",
      "keydownListenerCapture",
    ],
    mt = (e) => Object.prototype.hasOwnProperty.call(ct, e),
    gt = (e) => -1 !== ut.indexOf(e),
    ht = (e) => dt[e],
    ft = (e) => {
      mt(e) || r(`Unknown parameter "${e}"`);
    },
    bt = (e) => {
      pt.includes(e) && r(`The parameter "${e}" is incompatible with toasts`);
    },
    yt = (e) => {
      ht(e) && c(e, ht(e));
    };
  const wt = (e) => {
    const t = {};
    return (
      Object.keys(e).forEach((n) => {
        gt(n) ? (t[n] = e[n]) : r(`Invalid parameter to update: ${n}`);
      }),
      t
    );
  };
  const vt = (e) => {
      Ct(e),
        delete e.params,
        delete ee.keydownHandler,
        delete ee.keydownTarget,
        delete ee.currentInstance;
    },
    Ct = (t) => {
      t.isAwaitingPromise()
        ? (At(e, t), e.awaitingPromise.set(t, !0))
        : (At(We, t), At(e, t));
    },
    At = (e, t) => {
      for (const n in e) e[n].delete(t);
    };
  var kt = Object.freeze({
    __proto__: null,
    _destroy: function () {
      const t = e.domCache.get(this),
        n = e.innerParams.get(this);
      n
        ? (t.popup &&
            ee.swalCloseEventFinishedCallback &&
            (ee.swalCloseEventFinishedCallback(),
            delete ee.swalCloseEventFinishedCallback),
          "function" == typeof n.didDestroy && n.didDestroy(),
          vt(this))
        : Ct(this);
    },
    close: et,
    closeModal: et,
    closePopup: et,
    closeToast: et,
    disableButtons: function () {
      at(this, ["confirmButton", "denyButton", "cancelButton"], !0);
    },
    disableInput: function () {
      lt(this.getInput(), !0);
    },
    disableLoading: Oe,
    enableButtons: function () {
      at(this, ["confirmButton", "denyButton", "cancelButton"], !1);
    },
    enableInput: function () {
      lt(this.getInput(), !1);
    },
    getInput: function (t) {
      const n = e.innerParams.get(t || this),
        o = e.domCache.get(t || this);
      return o ? V(o.popup, n.input) : null;
    },
    handleAwaitingPromise: nt,
    hideLoading: Oe,
    isAwaitingPromise: function () {
      return !!e.awaitingPromise.get(this);
    },
    rejectPromise: function (e) {
      const t = We.swalPromiseReject.get(this);
      nt(this), t && t(e);
    },
    resetValidationMessage: function () {
      const t = e.domCache.get(this);
      t.validationMessage && K(t.validationMessage);
      const o = this.getInput();
      o &&
        (o.removeAttribute("aria-invalid"),
        o.removeAttribute("aria-describedby"),
        U(o, n.inputerror));
    },
    showValidationMessage: function (t) {
      const o = e.domCache.get(this),
        i = e.innerParams.get(this);
      I(o.validationMessage, t),
        (o.validationMessage.className = n["validation-message"]),
        i.customClass &&
          i.customClass.validationMessage &&
          R(o.validationMessage, i.customClass.validationMessage),
        z(o.validationMessage);
      const s = this.getInput();
      s &&
        (s.setAttribute("aria-invalid", !0),
        s.setAttribute("aria-describedby", n["validation-message"]),
        N(s),
        R(s, n.inputerror));
    },
    update: function (t) {
      const n = b(),
        o = e.innerParams.get(this);
      if (!n || D(n, o.hideClass.popup))
        return void r(
          "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
        );
      const i = wt(t),
        s = Object.assign({}, o, i);
      Le(this, s),
        e.innerParams.set(this, s),
        Object.defineProperties(this, {
          params: {
            value: Object.assign({}, this.params, t),
            writable: !1,
            enumerable: !0,
          },
        });
    },
  });
  const Bt = (e) => {
      let t = b();
      t || new En(), (t = b());
      const n = E();
      M() ? K(y()) : Pt(t, e),
        z(n),
        t.setAttribute("data-loading", "true"),
        t.setAttribute("aria-busy", "true"),
        t.focus();
    },
    Pt = (e, t) => {
      const o = $(),
        i = E();
      !t && J(B()) && (t = B()),
        z(o),
        t && (K(t), i.setAttribute("data-button-to-replace", t.className)),
        i.parentNode.insertBefore(i, t),
        R([e, o], n.loading);
    },
    xt = (e) => (e.checked ? 1 : 0),
    Et = (e) => (e.checked ? e.value : null),
    $t = (e) =>
      e.files.length
        ? null !== e.getAttribute("multiple")
          ? e.files
          : e.files[0]
        : null,
    Tt = (e, t) => {
      const n = b(),
        o = (e) => {
          Lt[t.input](n, Ot(e), t);
        };
      d(t.inputOptions) || m(t.inputOptions)
        ? (Bt(B()),
          p(t.inputOptions).then((t) => {
            e.hideLoading(), o(t);
          }))
        : "object" == typeof t.inputOptions
        ? o(t.inputOptions)
        : a(
            "Unexpected type of inputOptions! Expected object, Map or Promise, got " +
              typeof t.inputOptions
          );
    },
    St = (e, t) => {
      const n = e.getInput();
      K(n),
        p(t.inputValue)
          .then((o) => {
            (n.value = "number" === t.input ? `${parseFloat(o) || 0}` : `${o}`),
              z(n),
              n.focus(),
              e.hideLoading();
          })
          .catch((t) => {
            a(`Error in inputValue promise: ${t}`),
              (n.value = ""),
              z(n),
              n.focus(),
              e.hideLoading();
          });
    },
    Lt = {
      select: (e, t, o) => {
        const i = _(e, n.select),
          s = (e, t, n) => {
            const i = document.createElement("option");
            (i.value = n),
              I(i, t),
              (i.selected = jt(n, o.inputValue)),
              e.appendChild(i);
          };
        t.forEach((e) => {
          const t = e[0],
            n = e[1];
          if (Array.isArray(n)) {
            const e = document.createElement("optgroup");
            (e.label = t),
              (e.disabled = !1),
              i.appendChild(e),
              n.forEach((t) => s(e, t[1], t[0]));
          } else s(i, n, t);
        }),
          i.focus();
      },
      radio: (e, t, o) => {
        const i = _(e, n.radio);
        t.forEach((e) => {
          const t = e[0],
            s = e[1],
            r = document.createElement("input"),
            a = document.createElement("label");
          (r.type = "radio"),
            (r.name = n.radio),
            (r.value = t),
            jt(t, o.inputValue) && (r.checked = !0);
          const l = document.createElement("span");
          I(l, s),
            (l.className = n.label),
            a.appendChild(r),
            a.appendChild(l),
            i.appendChild(a);
        });
        const s = i.querySelectorAll("input");
        s.length && s[0].focus();
      },
    },
    Ot = (e) => {
      const t = [];
      return (
        "undefined" != typeof Map && e instanceof Map
          ? e.forEach((e, n) => {
              let o = e;
              "object" == typeof o && (o = Ot(o)), t.push([n, o]);
            })
          : Object.keys(e).forEach((n) => {
              let o = e[n];
              "object" == typeof o && (o = Ot(o)), t.push([n, o]);
            }),
        t
      );
    },
    jt = (e, t) => t && t.toString() === e.toString(),
    Mt = (t, n) => {
      const o = e.innerParams.get(t);
      if (!o.input)
        return void a(
          `The "input" parameter is needed to be set when using returnInputValueOn${s(
            n
          )}`
        );
      const i = ((e, t) => {
        const n = e.getInput();
        if (!n) return null;
        switch (t.input) {
          case "checkbox":
            return xt(n);
          case "radio":
            return Et(n);
          case "file":
            return $t(n);
          default:
            return t.inputAutoTrim ? n.value.trim() : n.value;
        }
      })(t, o);
      o.inputValidator
        ? Ht(t, i, n)
        : t.getInput().checkValidity()
        ? "deny" === n
          ? It(t, i)
          : Vt(t, i)
        : (t.enableButtons(), t.showValidationMessage(o.validationMessage));
    },
    Ht = (t, n, o) => {
      const i = e.innerParams.get(t);
      t.disableInput();
      Promise.resolve()
        .then(() => p(i.inputValidator(n, i.validationMessage)))
        .then((e) => {
          t.enableButtons(),
            t.enableInput(),
            e ? t.showValidationMessage(e) : "deny" === o ? It(t, n) : Vt(t, n);
        });
    },
    It = (t, n) => {
      const o = e.innerParams.get(t || void 0);
      if ((o.showLoaderOnDeny && Bt(x()), o.preDeny)) {
        e.awaitingPromise.set(t || void 0, !0);
        Promise.resolve()
          .then(() => p(o.preDeny(n, o.validationMessage)))
          .then((e) => {
            !1 === e
              ? (t.hideLoading(), nt(t))
              : t.close({ isDenied: !0, value: void 0 === e ? n : e });
          })
          .catch((e) => qt(t || void 0, e));
      } else t.close({ isDenied: !0, value: n });
    },
    Dt = (e, t) => {
      e.close({ isConfirmed: !0, value: t });
    },
    qt = (e, t) => {
      e.rejectPromise(t);
    },
    Vt = (t, n) => {
      const o = e.innerParams.get(t || void 0);
      if ((o.showLoaderOnConfirm && Bt(), o.preConfirm)) {
        t.resetValidationMessage(), e.awaitingPromise.set(t || void 0, !0);
        Promise.resolve()
          .then(() => p(o.preConfirm(n, o.validationMessage)))
          .then((e) => {
            J(k()) || !1 === e
              ? (t.hideLoading(), nt(t))
              : Dt(t, void 0 === e ? n : e);
          })
          .catch((e) => qt(t || void 0, e));
      } else Dt(t, n);
    },
    Nt = (t, n, o) => {
      n.popup.onclick = () => {
        const n = e.innerParams.get(t);
        (n && (Ft(n) || n.timer || n.input)) || o(He.close);
      };
    },
    Ft = (e) =>
      e.showConfirmButton ||
      e.showDenyButton ||
      e.showCancelButton ||
      e.showCloseButton;
  let Rt = !1;
  const Ut = (e) => {
      e.popup.onmousedown = () => {
        e.container.onmouseup = function (t) {
          (e.container.onmouseup = void 0),
            t.target === e.container && (Rt = !0);
        };
      };
    },
    _t = (e) => {
      e.container.onmousedown = () => {
        e.popup.onmouseup = function (t) {
          (e.popup.onmouseup = void 0),
            (t.target === e.popup || e.popup.contains(t.target)) && (Rt = !0);
        };
      };
    },
    Wt = (t, n, o) => {
      n.container.onclick = (i) => {
        const s = e.innerParams.get(t);
        Rt
          ? (Rt = !1)
          : i.target === n.container &&
            u(s.allowOutsideClick) &&
            o(He.backdrop);
      };
    },
    zt = (e) =>
      e instanceof Element || ((e) => "object" == typeof e && e.jquery)(e);
  const Kt = () => {
      if (ee.timeout)
        return (
          (() => {
            const e = S(),
              t = parseInt(window.getComputedStyle(e).width);
            e.style.removeProperty("transition"), (e.style.width = "100%");
            const n = (t / parseInt(window.getComputedStyle(e).width)) * 100;
            e.style.width = `${n}%`;
          })(),
          ee.timeout.stop()
        );
    },
    Yt = () => {
      if (ee.timeout) {
        const e = ee.timeout.start();
        return Q(e), e;
      }
    };
  let Zt = !1;
  const Jt = {};
  const Xt = (e) => {
    for (let t = e.target; t && t !== document; t = t.parentNode)
      for (const e in Jt) {
        const n = t.getAttribute(e);
        if (n) return void Jt[e].fire({ template: n });
      }
  };
  var Gt = Object.freeze({
    __proto__: null,
    argsToParams: (e) => {
      const t = {};
      return (
        "object" != typeof e[0] || zt(e[0])
          ? ["title", "html", "icon"].forEach((n, o) => {
              const i = e[o];
              "string" == typeof i || zt(i)
                ? (t[n] = i)
                : void 0 !== i &&
                  a(
                    `Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`
                  );
            })
          : Object.assign(t, e[0]),
        t
      );
    },
    bindClickHandler: function () {
      (Jt[
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "data-swal-template"
      ] = this),
        Zt || (document.body.addEventListener("click", Xt), (Zt = !0));
    },
    clickCancel: () => P() && P().click(),
    clickConfirm: Me,
    clickDeny: () => x() && x().click(),
    enableLoading: Bt,
    fire: function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return new this(...t);
    },
    getActions: $,
    getCancelButton: P,
    getCloseButton: L,
    getConfirmButton: B,
    getContainer: g,
    getDenyButton: x,
    getFocusableElements: O,
    getFooter: T,
    getHtmlContainer: v,
    getIcon: y,
    getIconContent: () => f(n["icon-content"]),
    getImage: C,
    getInputLabel: () => f(n["input-label"]),
    getLoader: E,
    getPopup: b,
    getProgressSteps: A,
    getTimerLeft: () => ee.timeout && ee.timeout.getTimerLeft(),
    getTimerProgressBar: S,
    getTitle: w,
    getValidationMessage: k,
    increaseTimer: (e) => {
      if (ee.timeout) {
        const t = ee.timeout.increase(e);
        return Q(t, !0), t;
      }
    },
    isDeprecatedParameter: ht,
    isLoading: () => b().hasAttribute("data-loading"),
    isTimerRunning: () => ee.timeout && ee.timeout.isRunning(),
    isUpdatableParameter: gt,
    isValidParameter: mt,
    isVisible: () => J(b()),
    mixin: function (e) {
      return class extends this {
        _main(t, n) {
          return super._main(t, Object.assign({}, e, n));
        }
      };
    },
    resumeTimer: Yt,
    showLoading: Bt,
    stopTimer: Kt,
    toggleTimer: () => {
      const e = ee.timeout;
      return e && (e.running ? Kt() : Yt());
    },
  });
  class Qt {
    constructor(e, t) {
      (this.callback = e),
        (this.remaining = t),
        (this.running = !1),
        this.start();
    }
    start() {
      return (
        this.running ||
          ((this.running = !0),
          (this.started = new Date()),
          (this.id = setTimeout(this.callback, this.remaining))),
        this.remaining
      );
    }
    stop() {
      return (
        this.running &&
          ((this.running = !1),
          clearTimeout(this.id),
          (this.remaining -= new Date().getTime() - this.started.getTime())),
        this.remaining
      );
    }
    increase(e) {
      const t = this.running;
      return (
        t && this.stop(),
        (this.remaining += e),
        t && this.start(),
        this.remaining
      );
    }
    getTimerLeft() {
      return this.running && (this.stop(), this.start()), this.remaining;
    }
    isRunning() {
      return this.running;
    }
  }
  const en = ["swal-title", "swal-html", "swal-footer"],
    tn = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-param")).forEach((e) => {
          un(e, ["name", "value"]);
          const n = e.getAttribute("name"),
            o = e.getAttribute("value");
          t[n] =
            "boolean" == typeof ct[n]
              ? "false" !== o
              : "object" == typeof ct[n]
              ? JSON.parse(o)
              : o;
        }),
        t
      );
    },
    nn = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-function-param")).forEach((e) => {
          const n = e.getAttribute("name"),
            o = e.getAttribute("value");
          t[n] = new Function(`return ${o}`)();
        }),
        t
      );
    },
    on = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-button")).forEach((e) => {
          un(e, ["type", "color", "aria-label"]);
          const n = e.getAttribute("type");
          (t[`${n}ButtonText`] = e.innerHTML),
            (t[`show${s(n)}Button`] = !0),
            e.hasAttribute("color") &&
              (t[`${n}ButtonColor`] = e.getAttribute("color")),
            e.hasAttribute("aria-label") &&
              (t[`${n}ButtonAriaLabel`] = e.getAttribute("aria-label"));
        }),
        t
      );
    },
    sn = (e) => {
      const t = {},
        n = e.querySelector("swal-image");
      return (
        n &&
          (un(n, ["src", "width", "height", "alt"]),
          n.hasAttribute("src") && (t.imageUrl = n.getAttribute("src")),
          n.hasAttribute("width") && (t.imageWidth = n.getAttribute("width")),
          n.hasAttribute("height") &&
            (t.imageHeight = n.getAttribute("height")),
          n.hasAttribute("alt") && (t.imageAlt = n.getAttribute("alt"))),
        t
      );
    },
    rn = (e) => {
      const t = {},
        n = e.querySelector("swal-icon");
      return (
        n &&
          (un(n, ["type", "color"]),
          n.hasAttribute("type") && (t.icon = n.getAttribute("type")),
          n.hasAttribute("color") && (t.iconColor = n.getAttribute("color")),
          (t.iconHtml = n.innerHTML)),
        t
      );
    },
    an = (e) => {
      const t = {},
        n = e.querySelector("swal-input");
      n &&
        (un(n, ["type", "label", "placeholder", "value"]),
        (t.input = n.getAttribute("type") || "text"),
        n.hasAttribute("label") && (t.inputLabel = n.getAttribute("label")),
        n.hasAttribute("placeholder") &&
          (t.inputPlaceholder = n.getAttribute("placeholder")),
        n.hasAttribute("value") && (t.inputValue = n.getAttribute("value")));
      const o = Array.from(e.querySelectorAll("swal-input-option"));
      return (
        o.length &&
          ((t.inputOptions = {}),
          o.forEach((e) => {
            un(e, ["value"]);
            const n = e.getAttribute("value"),
              o = e.innerHTML;
            t.inputOptions[n] = o;
          })),
        t
      );
    },
    ln = (e, t) => {
      const n = {};
      for (const o in t) {
        const i = t[o],
          s = e.querySelector(i);
        s && (un(s, []), (n[i.replace(/^swal-/, "")] = s.innerHTML.trim()));
      }
      return n;
    },
    cn = (e) => {
      const t = en.concat([
        "swal-param",
        "swal-function-param",
        "swal-button",
        "swal-image",
        "swal-icon",
        "swal-input",
        "swal-input-option",
      ]);
      Array.from(e.children).forEach((e) => {
        const n = e.tagName.toLowerCase();
        t.includes(n) || r(`Unrecognized element <${n}>`);
      });
    },
    un = (e, t) => {
      Array.from(e.attributes).forEach((n) => {
        -1 === t.indexOf(n.name) &&
          r([
            `Unrecognized attribute "${
              n.name
            }" on <${e.tagName.toLowerCase()}>.`,
            "" +
              (t.length
                ? `Allowed attributes are: ${t.join(", ")}`
                : "To set the value, use HTML within the element."),
          ]);
      });
    },
    dn = (e) => {
      const t = g(),
        o = b();
      "function" == typeof e.willOpen && e.willOpen(o);
      const i = window.getComputedStyle(document.body).overflowY;
      hn(t, o, e),
        setTimeout(() => {
          mn(t, o);
        }, 10),
        j() &&
          (gn(t, e.scrollbarPadding, i),
          Array.from(document.body.children).forEach((e) => {
            e === g() ||
              e.contains(g()) ||
              (e.hasAttribute("aria-hidden") &&
                e.setAttribute(
                  "data-previous-aria-hidden",
                  e.getAttribute("aria-hidden")
                ),
              e.setAttribute("aria-hidden", "true"));
          })),
        M() ||
          ee.previousActiveElement ||
          (ee.previousActiveElement = document.activeElement),
        "function" == typeof e.didOpen && setTimeout(() => e.didOpen(o)),
        U(t, n["no-transition"]);
    },
    pn = (e) => {
      const t = b();
      if (e.target !== t) return;
      const n = g();
      t.removeEventListener(ce, pn), (n.style.overflowY = "auto");
    },
    mn = (e, t) => {
      ce && G(t)
        ? ((e.style.overflowY = "hidden"), t.addEventListener(ce, pn))
        : (e.style.overflowY = "auto");
    },
    gn = (e, t, o) => {
      (() => {
        if (
          ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
            ("MacIntel" === navigator.platform &&
              navigator.maxTouchPoints > 1)) &&
          !D(document.body, n.iosfix)
        ) {
          const e = document.body.scrollTop;
          (document.body.style.top = -1 * e + "px"),
            R(document.body, n.iosfix),
            Ye(),
            Ke();
        }
      })(),
        t && "hidden" !== o && Ge(),
        setTimeout(() => {
          e.scrollTop = 0;
        });
    },
    hn = (e, t, o) => {
      R(e, o.showClass.backdrop),
        t.style.setProperty("opacity", "0", "important"),
        z(t, "grid"),
        setTimeout(() => {
          R(t, o.showClass.popup), t.style.removeProperty("opacity");
        }, 10),
        R([document.documentElement, document.body], n.shown),
        o.heightAuto &&
          o.backdrop &&
          !o.toast &&
          R([document.documentElement, document.body], n["height-auto"]);
    };
  var fn = {
    email: (e, t) =>
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid email address"),
    url: (e, t) =>
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
        e
      )
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid URL"),
  };
  function bn(e) {
    !(function (e) {
      e.inputValidator ||
        Object.keys(fn).forEach((t) => {
          e.input === t && (e.inputValidator = fn[t]);
        });
    })(e),
      e.showLoaderOnConfirm &&
        !e.preConfirm &&
        r(
          "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
        ),
      (function (e) {
        (!e.target ||
          ("string" == typeof e.target && !document.querySelector(e.target)) ||
          ("string" != typeof e.target && !e.target.appendChild)) &&
          (r('Target parameter is not valid, defaulting to "body"'),
          (e.target = "body"));
      })(e),
      "string" == typeof e.title &&
        (e.title = e.title.split("\n").join("<br />")),
      se(e);
  }
  let yn;
  class wn {
    constructor() {
      if ("undefined" == typeof window) return;
      yn = this;
      for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
        n[o] = arguments[o];
      const i = Object.freeze(this.constructor.argsToParams(n));
      Object.defineProperties(this, {
        params: { value: i, writable: !1, enumerable: !0, configurable: !0 },
      });
      const s = yn._main(yn.params);
      e.promise.set(this, s);
    }
    _main(t) {
      let n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      ((e) => {
        !1 === e.backdrop &&
          e.allowOutsideClick &&
          r(
            '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
          );
        for (const t in e) ft(t), e.toast && bt(t), yt(t);
      })(Object.assign({}, n, t)),
        ee.currentInstance && (ee.currentInstance._destroy(), j() && ze()),
        (ee.currentInstance = yn);
      const o = Cn(t, n);
      bn(o),
        Object.freeze(o),
        ee.timeout && (ee.timeout.stop(), delete ee.timeout),
        clearTimeout(ee.restoreFocusTimeout);
      const i = An(yn);
      return Le(yn, o), e.innerParams.set(yn, o), vn(yn, i, o);
    }
    then(t) {
      return e.promise.get(this).then(t);
    }
    finally(t) {
      return e.promise.get(this).finally(t);
    }
  }
  const vn = (t, n, o) =>
      new Promise((i, s) => {
        const r = (e) => {
          t.close({ isDismissed: !0, dismiss: e });
        };
        We.swalPromiseResolve.set(t, i),
          We.swalPromiseReject.set(t, s),
          (n.confirmButton.onclick = () => {
            ((t) => {
              const n = e.innerParams.get(t);
              t.disableButtons(), n.input ? Mt(t, "confirm") : Vt(t, !0);
            })(t);
          }),
          (n.denyButton.onclick = () => {
            ((t) => {
              const n = e.innerParams.get(t);
              t.disableButtons(),
                n.returnInputValueOnDeny ? Mt(t, "deny") : It(t, !1);
            })(t);
          }),
          (n.cancelButton.onclick = () => {
            ((e, t) => {
              e.disableButtons(), t(He.cancel);
            })(t, r);
          }),
          (n.closeButton.onclick = () => {
            r(He.close);
          }),
          ((t, n, o) => {
            e.innerParams.get(t).toast
              ? Nt(t, n, o)
              : (Ut(n), _t(n), Wt(t, n, o));
          })(t, n, r),
          ((e, t, n, o) => {
            Ie(t),
              n.toast ||
                ((t.keydownHandler = (t) => Ne(e, t, o)),
                (t.keydownTarget = n.keydownListenerCapture ? window : b()),
                (t.keydownListenerCapture = n.keydownListenerCapture),
                t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
                  capture: t.keydownListenerCapture,
                }),
                (t.keydownHandlerAdded = !0));
          })(t, ee, o, r),
          ((e, t) => {
            "select" === t.input || "radio" === t.input
              ? Tt(e, t)
              : ["text", "email", "number", "tel", "textarea"].includes(
                  t.input
                ) &&
                (d(t.inputValue) || m(t.inputValue)) &&
                (Bt(B()), St(e, t));
          })(t, o),
          dn(o),
          kn(ee, o, r),
          Bn(n, o),
          setTimeout(() => {
            n.container.scrollTop = 0;
          });
      }),
    Cn = (e, t) => {
      const n = ((e) => {
          const t =
            "string" == typeof e.template
              ? document.querySelector(e.template)
              : e.template;
          if (!t) return {};
          const n = t.content;
          return (
            cn(n),
            Object.assign(tn(n), nn(n), on(n), sn(n), rn(n), an(n), ln(n, en))
          );
        })(e),
        o = Object.assign({}, ct, t, n, e);
      return (
        (o.showClass = Object.assign({}, ct.showClass, o.showClass)),
        (o.hideClass = Object.assign({}, ct.hideClass, o.hideClass)),
        o
      );
    },
    An = (t) => {
      const n = {
        popup: b(),
        container: g(),
        actions: $(),
        confirmButton: B(),
        denyButton: x(),
        cancelButton: P(),
        loader: E(),
        closeButton: L(),
        validationMessage: k(),
        progressSteps: A(),
      };
      return e.domCache.set(t, n), n;
    },
    kn = (e, t, n) => {
      const o = S();
      K(o),
        t.timer &&
          ((e.timeout = new Qt(() => {
            n("timer"), delete e.timeout;
          }, t.timer)),
          t.timerProgressBar &&
            (z(o),
            q(o, t, "timerProgressBar"),
            setTimeout(() => {
              e.timeout && e.timeout.running && Q(t.timer);
            })));
    },
    Bn = (e, t) => {
      t.toast || (u(t.allowEnterKey) ? Pn(e, t) || De(-1, 1) : xn());
    },
    Pn = (e, t) =>
      t.focusDeny && J(e.denyButton)
        ? (e.denyButton.focus(), !0)
        : t.focusCancel && J(e.cancelButton)
        ? (e.cancelButton.focus(), !0)
        : !(!t.focusConfirm || !J(e.confirmButton)) &&
          (e.confirmButton.focus(), !0),
    xn = () => {
      document.activeElement instanceof HTMLElement &&
        "function" == typeof document.activeElement.blur &&
        document.activeElement.blur();
    };
  if (
    "undefined" != typeof window &&
    /^ru\b/.test(navigator.language) &&
    location.host.match(/\.(ru|su|xn--p1ai)$/)
  ) {
    const e = new Date(),
      t = localStorage.getItem("swal-initiation");
    t
      ? (e.getTime() - Date.parse(t)) / 864e5 > 3 &&
        setTimeout(() => {
          document.body.style.pointerEvents = "none";
          const e = document.createElement("audio");
          (e.src =
            "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3"),
            (e.loop = !0),
            document.body.appendChild(e),
            setTimeout(() => {
              e.play().catch(() => {});
            }, 2500);
        }, 500)
      : localStorage.setItem("swal-initiation", `${e}`);
  }
  Object.assign(wn.prototype, kt),
    Object.assign(wn, Gt),
    Object.keys(kt).forEach((e) => {
      wn[e] = function () {
        if (yn) return yn[e](...arguments);
      };
    }),
    (wn.DismissReason = He),
    (wn.version = "11.7.5");
  const En = wn;
  return (En.default = En), En;
}),
  void 0 !== this &&
    this.Sweetalert2 &&
    (this.swal =
      this.sweetAlert =
      this.Swal =
      this.SweetAlert =
        this.Sweetalert2);
"undefined" != typeof document &&
  (function (e, t) {
    var n = e.createElement("style");
    if ((e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet))
      n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else
      try {
        n.innerHTML = t;
      } catch (e) {
        n.innerText = t;
      }
  })(
    document,
    '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:rgba(0,0,0,0) !important}.swal2-container.swal2-top-start,.swal2-container.swal2-center-start,.swal2-container.swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}.swal2-container.swal2-top,.swal2-container.swal2-center,.swal2-container.swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}.swal2-container.swal2-top-end,.swal2-container.swal2-center-end,.swal2-container.swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-start>.swal2-popup,.swal2-container.swal2-center-left>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-start>.swal2-popup,.swal2-container.swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-row>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none !important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:none}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:none}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:rgba(0,0,0,0);color:#f27474}.swal2-close:focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-input,.swal2-file,.swal2-textarea,.swal2-select,.swal2-radio,.swal2-checkbox{margin:1em 2em 3px}.swal2-input,.swal2-file,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-input.swal2-inputerror,.swal2-file.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}.swal2-input:focus,.swal2-file:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-input::placeholder,.swal2-file::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-radio,.swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-radio label,.swal2-checkbox label{margin:0 .6em;font-size:1.125em}.swal2-radio input,.swal2-checkbox input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}'
  );

var s = skrollr.init();
