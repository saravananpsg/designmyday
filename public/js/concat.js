// source: http://codepen.io/adventuresinmissions/pen/celjI
jQuery(document).ready(function($) {
  var formModal = $('.cd-user-modal');
  var formLogin = formModal.find('#cd-login');
  var formForgotPassword = formModal.find('#cd-reset-password');
  var formModalTab = $('.cd-switcher');
  var tabLogin = formModalTab.children('li').eq(0).children('a');
  var tabSignup = formModalTab.children('li').eq(1).children('a');
  var forgotPasswordLink = formLogin.find('.cd-form-bottom-message a');
  var backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a');
  var mainNav = $('.main-nav');

  var validPassRegex=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/;
  var validColor = "#66cc66";
  var invalidColor = "#ff6666";

  var formSignup = formModal.find('#cd-signup');
  var signupPasswordInput = formSignup.find('#password');
  var signupConfirmInput = formSignup.find('#confirm');
  var signupSubmitButton = formSignup.find('#signup-submit');
  var origSignupButtonBackground = signupSubmitButton.css('backgroundColor');
  signupSubmitButton.prop("disabled", true);
  signupSubmitButton.css('backgroundColor', '#ccc');

  var formResetPassword = $('#cd-reset-password-now');
  var forgotPasswordInput = formResetPassword.find('#password');
  var forgotConfirmInput = formResetPassword.find('#confirm');
  var forgotResetButton = formResetPassword.find('#pw-reset-button');
  var origResetButtonBackground = forgotResetButton.css('backgroundColor');
  forgotResetButton.prop("disabled", true);
  forgotResetButton.css('backgroundColor', '#ccc');

  //open modal
  mainNav.on('click', function(event){
    $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
  });

  //open sign-up form
  mainNav.on('click', '#signup', signup_selected);
  $('#lead-signup').on('click', signup_selected);
  //open login-form form
  mainNav.on('click', '#signin', login_selected);

  //close modal
  formModal.on('click', function(event){
    if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
      formModal.removeClass('is-visible');
    }
  });
  //close modal when clicking the esc keyboard button
  $(document).keyup(function(event){
    if(event.which=='27'){
      formModal.removeClass('is-visible');
    }
  });

  //switch from a tab to another
  formModalTab.on('click', function(event) {
    event.preventDefault();
    ( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
  });

  //hide or show password
  $('.hide-password').on('click', function(){
    var togglePass= $(this),
      passwordField = togglePass.prev('input');

    ( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
    ( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
    //focus and move cursor to the end of input field
    passwordField.putCursorAtEnd();
  });

  //show forgot-password form
  forgotPasswordLink.on('click', function(event){
    event.preventDefault();
    forgot_password_selected();
  });

  //back to login from the forgot-password form
  backToLoginLink.on('click', function(event){
    event.preventDefault();
    login_selected();
  });

  function login_selected(){
    mainNav.children('ul').removeClass('is-visible');
    formModal.addClass('is-visible');
    formLogin.addClass('is-selected');
    formSignup.removeClass('is-selected');
    formForgotPassword.removeClass('is-selected');
    tabLogin.addClass('selected');
    tabSignup.removeClass('selected');
  }

  function signup_selected(){
    mainNav.children('ul').removeClass('is-visible');
    formModal.addClass('is-visible');
    formLogin.removeClass('is-selected');
    formSignup.addClass('is-selected');
    formForgotPassword.removeClass('is-selected');
    tabLogin.removeClass('selected');
    tabSignup.addClass('selected');
  }

  function forgot_password_selected(){
   formLogin.removeClass('is-selected');
   formSignup.removeClass('is-selected');
   formForgotPassword.addClass('is-selected');
  }

  function validateSignupPassword() {
    if (!signupPasswordInput.val().match(validPassRegex)) {
      signupConfirmInput.css('backgroundColor', invalidColor);
      return false;
    } else {
      if (signupPasswordInput.val() === signupConfirmInput.val()) {
        signupConfirmInput.css('backgroundColor', validColor);
        return true;
      } else {
        signupConfirmInput.css('backgroundColor', invalidColor);
        return false;
      }
    }
  }

  function validateSignupEmail() {
    var validEmailRegex = /.+@.+/;
    if (formSignup.find('#email').val().match(validEmailRegex)) {
      return true;
    }
    return false;
  }

  function validateRegFields() {
    if (formSignup.find('#username').val() &&
      formSignup.find('#yearborn').val() &&
      formSignup.find('#f_elem_city').val() ) {
      return true;
    }
    return false;
  }

  function validateSignupForm() {
    var isValid = validateSignupPassword() && validateSignupEmail() && validateRegFields();
    if (isValid) {
      signupSubmitButton.prop("disabled", false);
      signupSubmitButton.css('backgroundColor', origSignupButtonBackground);
    } else {
      signupSubmitButton.prop("disabled", true);
      signupSubmitButton.css('backgroundColor', '#ccc');
    }
  }

  formSignup.keyup(function() {
    validateSignupForm();
  });

  formResetPassword.keyup(function() {
    if (!forgotPasswordInput.val().match(validPassRegex)) {
      forgotConfirmInput.css('backgroundColor', invalidColor);
      forgotResetButton.prop("disabled", true);
      forgotResetButton.css('backgroundColor', '#ccc');
    } else {
      if (forgotPasswordInput.val() === forgotConfirmInput.val()) {
        forgotConfirmInput.css('backgroundColor', validColor);
        forgotResetButton.prop("disabled", false);
        forgotResetButton.css('backgroundColor', origResetButtonBackground);
      } else {
        forgotConfirmInput.css('backgroundColor', invalidColor);
        forgotResetButton.prop("disabled", true);
        forgotResetButton.css('backgroundColor', '#ccc');
      }
    }
  });

  //REMOVE THIS - it's just to show error messages
  formLogin.find('input[type="submit"]').on('click', function(event){
    // event.preventDefault();
    // formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  });
  formSignup.find('input[type="submit"]').on('click', function(event){
    // event.preventDefault();
    // formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  });


  //IE9 placeholder fallback
  //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
  if(!Modernizr.input.placeholder){
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        }
    }).blur(function() {
      var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.val(input.attr('placeholder'));
        }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
        })
    });
  }

  $("#f_elem_city").autocomplete({
    source: function (request, response) {
     $.getJSON(
      "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
      function (data) {
       response(data);
      }
     );
    },
    minLength: 3,
    select: function (event, ui) {
      var selectedObj = ui.item;
      $("#f_elem_city").val(selectedObj.value);
      return false;
    },
    open: function () {
      $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
    },
    close: function () {
      $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
    }
  });
  $("#f_elem_city").autocomplete("option", "delay", 100);

});

//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
  return this.each(function() {
      // If this function exists...
      if (this.setSelectionRange) {
          // ... then use it (Doesn't work in IE)
          // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
          var len = $(this).val().length * 2;
          this.focus();
          this.setSelectionRange(len, len);
      } else {
        // ... otherwise replace the contents with itself
        // (Doesn't work in Google Chrome)
          $(this).val($(this).val());
      }
  });
};

/*!
 * Modernizr v2.7.1
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.7.1',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   daneden.me/2011/12/putting-up-with-androids-bullshit/
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _handleMultipleEvents(t,e,i,n){vjs.arr.forEach(i,function(i){t(e,i,n)})}function _logType(t,e){var i,n,s;i=Array.prototype.slice.call(e),n=function(){},s=window.console||{log:n,warn:n,error:n},t?i.unshift(t.toUpperCase()+":"):t="log",vjs.log.history.push(i),i.unshift("VIDEOJS:"),s[t].apply?s[t].apply(s,i):s[t](i.join(" "))}var Util=function($){function t(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function e(t){return(t[0]||t).nodeType}function i(){return{bindType:r.end,delegateType:r.end,handle:function t(e){return $(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}}}function n(){if(window.QUnit)return!1;var t=document.createElement("bootstrap");for(var e in a)if(void 0!==t.style[e])return{end:a[e]};return!1}function s(t){var e=this,i=!1;return $(this).one(l.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||l.triggerTransitionEnd(e)},t),this}function o(){r=n(),$.fn.emulateTransitionEnd=s,l.supportsTransitionEnd()&&($.event.special[l.TRANSITION_END]=i())}var r=!1,a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},l={TRANSITION_END:"bsTransitionEnd",getUID:function h(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},getSelectorFromElement:function c(t){var e=t.getAttribute("data-target");return e||(e=t.getAttribute("href")||"",e=/^#[a-z]/i.test(e)?e:null),e},reflow:function u(t){new Function("bs","return bs")(t.offsetHeight)},triggerTransitionEnd:function p(t){$(t).trigger(r.end)},supportsTransitionEnd:function d(){return Boolean(r)},typeCheckConfig:function v(i,n,s){for(var o in s)if(s.hasOwnProperty(o)){var r=s[o],a=n[o],l=void 0;if(l=a&&e(a)?"element":t(a),!new RegExp(r).test(l))throw new Error(i.toUpperCase()+": "+('Option "'+o+'" provided type "'+l+'" ')+('but expected type "'+r+'".'))}}};return o(),l}(jQuery),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Carousel=function($){var t="carousel",e="4.0.0-alpha",i="bs.carousel",n="."+i,s=".data-api",o=$.fn[t],r=600,a={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},l={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},h={NEXT:"next",PREVIOUS:"prev"},c={SLIDE:"slide"+n,SLID:"slid"+n,KEYDOWN:"keydown"+n,MOUSEENTER:"mouseenter"+n,MOUSELEAVE:"mouseleave"+n,LOAD_DATA_API:"load"+n+s,CLICK_DATA_API:"click"+n+s},u={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"right",LEFT:"left",ITEM:"carousel-item"},p={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".next, .prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},d=function(){function s(t,e){_classCallCheck(this,s),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this._config=this._getConfig(e),this._element=$(t)[0],this._indicatorsElement=$(this._element).find(p.INDICATORS)[0],this._addEventListeners()}return _createClass(s,[{key:"next",value:function o(){this._isSliding||this._slide(h.NEXT)}},{key:"nextWhenVisible",value:function d(){document.hidden||this.next()}},{key:"prev",value:function v(){this._isSliding||this._slide(h.PREVIOUS)}},{key:"pause",value:function f(t){t||(this._isPaused=!0),$(this._element).find(p.NEXT_PREV)[0]&&Util.supportsTransitionEnd()&&(Util.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null}},{key:"cycle",value:function g(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval($.proxy(document.visibilityState?this.nextWhenVisible:this.next,this),this._config.interval))}},{key:"to",value:function y(t){var e=this;this._activeElement=$(this._element).find(p.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||0>t)){if(this._isSliding)return void $(this._element).one(c.SLID,function(){return e.to(t)});if(i===t)return this.pause(),void this.cycle();var n=t>i?h.NEXT:h.PREVIOUS;this._slide(n,this._items[t])}}},{key:"dispose",value:function m(){$(this._element).off(n),$.removeData(this._element,i),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null}},{key:"_getConfig",value:function j(e){return e=$.extend({},a,e),Util.typeCheckConfig(t,e,l),e}},{key:"_addEventListeners",value:function b(){this._config.keyboard&&$(this._element).on(c.KEYDOWN,$.proxy(this._keydown,this)),"hover"!==this._config.pause||"ontouchstart"in document.documentElement||$(this._element).on(c.MOUSEENTER,$.proxy(this.pause,this)).on(c.MOUSELEAVE,$.proxy(this.cycle,this))}},{key:"_keydown",value:function C(t){if(t.preventDefault(),!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}}},{key:"_getItemIndex",value:function w(t){return this._items=$.makeArray($(t).parent().find(p.ITEM)),this._items.indexOf(t)}},{key:"_getItemByDirection",value:function T(t,e){var i=t===h.NEXT,n=t===h.PREVIOUS,s=this._getItemIndex(e),o=this._items.length-1,r=n&&0===s||i&&s===o;if(r&&!this._config.wrap)return e;var a=t===h.PREVIOUS?-1:1,l=(s+a)%this._items.length;return-1===l?this._items[this._items.length-1]:this._items[l]}},{key:"_triggerSlideEvent",value:function _(t,e){var i=$.Event(c.SLIDE,{relatedTarget:t,direction:e});return $(this._element).trigger(i),i}},{key:"_setActiveIndicatorElement",value:function S(t){if(this._indicatorsElement){$(this._indicatorsElement).find(p.ACTIVE).removeClass(u.ACTIVE);var e=this._indicatorsElement.children[this._getItemIndex(t)];e&&$(e).addClass(u.ACTIVE)}}},{key:"_slide",value:function k(t,e){var i=this,n=$(this._element).find(p.ACTIVE_ITEM)[0],s=e||n&&this._getItemByDirection(t,n),o=Boolean(this._interval),a=t===h.NEXT?u.LEFT:u.RIGHT;if(s&&$(s).hasClass(u.ACTIVE))return void(this._isSliding=!1);var l=this._triggerSlideEvent(s,a);if(!l.isDefaultPrevented()&&n&&s){this._isSliding=!0,o&&this.pause(),this._setActiveIndicatorElement(s);var d=$.Event(c.SLID,{relatedTarget:s,direction:a});Util.supportsTransitionEnd()&&$(this._element).hasClass(u.SLIDE)?($(s).addClass(t),Util.reflow(s),$(n).addClass(a),$(s).addClass(a),$(n).one(Util.TRANSITION_END,function(){$(s).removeClass(a).removeClass(t),$(s).addClass(u.ACTIVE),$(n).removeClass(u.ACTIVE).removeClass(t).removeClass(a),i._isSliding=!1,setTimeout(function(){return $(i._element).trigger(d)},0)}).emulateTransitionEnd(r)):($(n).removeClass(u.ACTIVE),$(s).addClass(u.ACTIVE),this._isSliding=!1,$(this._element).trigger(d)),o&&this.cycle()}}}],[{key:"_jQueryInterface",value:function x(t){return this.each(function(){var e=$(this).data(i),n=$.extend({},a,$(this).data());"object"==typeof t&&$.extend(n,t);var o="string"==typeof t?t:n.slide;if(e||(e=new s(this,n),$(this).data(i,e)),"number"==typeof t)e.to(t);else if("string"==typeof o){if(void 0===e[o])throw new Error('No method named "'+o+'"');e[o]()}else n.interval&&(e.pause(),e.cycle())})}},{key:"_dataApiClickHandler",value:function E(t){var e=Util.getSelectorFromElement(this);if(e){var n=$(e)[0];if(n&&$(n).hasClass(u.CAROUSEL)){var o=$.extend({},$(n).data(),$(this).data()),r=this.getAttribute("data-slide-to");r&&(o.interval=!1),s._jQueryInterface.call($(n),o),r&&$(n).data(i).to(r),t.preventDefault()}}}},{key:"VERSION",get:function P(){return e}},{key:"Default",get:function A(){return a}}]),s}();return $(document).on(c.CLICK_DATA_API,p.DATA_SLIDE,d._dataApiClickHandler),$(window).on(c.LOAD_DATA_API,function(){$(p.DATA_RIDE).each(function(){var t=$(this);d._jQueryInterface.call(t,t.data())})}),$.fn[t]=d._jQueryInterface,$.fn[t].Constructor=d,$.fn[t].noConflict=function(){return $.fn[t]=o,d._jQueryInterface},d}(jQuery),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Collapse=function($){var t="collapse",e="4.0.0-alpha",i="bs.collapse",n="."+i,s=".data-api",o=$.fn[t],r=600,a={toggle:!0,parent:""},l={toggle:"boolean",parent:"string"},h={SHOW:"show"+n,SHOWN:"shown"+n,HIDE:"hide"+n,HIDDEN:"hidden"+n,CLICK_DATA_API:"click"+n+s},c={IN:"in",COLLAPSE:"collapse",COLLAPSING:"collapsing",COLLAPSED:"collapsed"},u={WIDTH:"width",HEIGHT:"height"},p={ACTIVES:".panel > .in, .panel > .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},d=function(){function n(t,e){_classCallCheck(this,n),this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=$.makeArray($('[data-toggle="collapse"][href="#'+t.id+'"],'+('[data-toggle="collapse"][data-target="#'+t.id+'"]'))),this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}return _createClass(n,[{key:"toggle",value:function s(){$(this._element).hasClass(c.IN)?this.hide():this.show()}},{key:"show",value:function o(){var t=this;if(!this._isTransitioning&&!$(this._element).hasClass(c.IN)){var e=void 0,s=void 0;if(this._parent&&(e=$.makeArray($(p.ACTIVES)),e.length||(e=null)),!(e&&(s=$(e).data(i),s&&s._isTransitioning))){var o=$.Event(h.SHOW);if($(this._element).trigger(o),!o.isDefaultPrevented()){e&&(n._jQueryInterface.call($(e),"hide"),s||$(e).data(i,null));var a=this._getDimension();$(this._element).removeClass(c.COLLAPSE).addClass(c.COLLAPSING),this._element.style[a]=0,this._element.setAttribute("aria-expanded",!0),this._triggerArray.length&&$(this._triggerArray).removeClass(c.COLLAPSED).attr("aria-expanded",!0),this.setTransitioning(!0);var l=function v(){$(t._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).addClass(c.IN),t._element.style[a]="",t.setTransitioning(!1),$(t._element).trigger(h.SHOWN)};if(!Util.supportsTransitionEnd())return void l();var u=a[0].toUpperCase()+a.slice(1),d="scroll"+u;$(this._element).one(Util.TRANSITION_END,l).emulateTransitionEnd(r),this._element.style[a]=this._element[d]+"px"}}}}},{key:"hide",value:function d(){var t=this;if(!this._isTransitioning&&$(this._element).hasClass(c.IN)){var e=$.Event(h.HIDE);if($(this._element).trigger(e),!e.isDefaultPrevented()){var i=this._getDimension(),n=i===u.WIDTH?"offsetWidth":"offsetHeight";this._element.style[i]=this._element[n]+"px",Util.reflow(this._element),$(this._element).addClass(c.COLLAPSING).removeClass(c.COLLAPSE).removeClass(c.IN),this._element.setAttribute("aria-expanded",!1),this._triggerArray.length&&$(this._triggerArray).addClass(c.COLLAPSED).attr("aria-expanded",!1),this.setTransitioning(!0);var s=function o(){t.setTransitioning(!1),$(t._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).trigger(h.HIDDEN)};return this._element.style[i]=0,Util.supportsTransitionEnd()?void $(this._element).one(Util.TRANSITION_END,s).emulateTransitionEnd(r):void s()}}}},{key:"setTransitioning",value:function v(t){this._isTransitioning=t}},{key:"dispose",value:function f(){$.removeData(this._element,i),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null}},{key:"_getConfig",value:function g(e){return e=$.extend({},a,e),e.toggle=Boolean(e.toggle),Util.typeCheckConfig(t,e,l),e}},{key:"_getDimension",value:function y(){var t=$(this._element).hasClass(u.WIDTH);return t?u.WIDTH:u.HEIGHT}},{key:"_getParent",value:function m(){var t=this,e=$(this._config.parent)[0],i='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return $(e).find(i).each(function(e,i){t._addAriaAndCollapsedClass(n._getTargetFromElement(i),[i])}),e}},{key:"_addAriaAndCollapsedClass",value:function j(t,e){if(t){var i=$(t).hasClass(c.IN);t.setAttribute("aria-expanded",i),e.length&&$(e).toggleClass(c.COLLAPSED,!i).attr("aria-expanded",i)}}}],[{key:"_getTargetFromElement",value:function b(t){var e=Util.getSelectorFromElement(t);return e?$(e)[0]:null}},{key:"_jQueryInterface",value:function C(t){return this.each(function(){var e=$(this),s=e.data(i),o=$.extend({},a,e.data(),"object"==typeof t&&t);if(!s&&o.toggle&&/show|hide/.test(t)&&(o.toggle=!1),s||(s=new n(this,o),e.data(i,s)),"string"==typeof t){if(void 0===s[t])throw new Error('No method named "'+t+'"');s[t]()}})}},{key:"VERSION",get:function w(){return e}},{key:"Default",get:function T(){return a}}]),n}();return $(document).on(h.CLICK_DATA_API,p.DATA_TOGGLE,function(t){t.preventDefault();var e=d._getTargetFromElement(this),n=$(e).data(i),s=n?"toggle":$(this).data();d._jQueryInterface.call($(e),s)}),$.fn[t]=d._jQueryInterface,$.fn[t].Constructor=d,$.fn[t].noConflict=function(){return $.fn[t]=o,d._jQueryInterface},d}(jQuery),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Dropdown=function($){var t="dropdown",e="4.0.0-alpha",i="bs.dropdown",n="."+i,s=".data-api",o=$.fn[t],r={HIDE:"hide"+n,HIDDEN:"hidden"+n,SHOW:"show"+n,SHOWN:"shown"+n,CLICK:"click"+n,CLICK_DATA_API:"click"+n+s,KEYDOWN_DATA_API:"keydown"+n+s},a={BACKDROP:"dropdown-backdrop",DISABLED:"disabled",OPEN:"open"},l={BACKDROP:".dropdown-backdrop",DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:".dropdown form",ROLE_MENU:'[role="menu"]',ROLE_LISTBOX:'[role="listbox"]',NAVBAR_NAV:".navbar-nav",VISIBLE_ITEMS:'[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'},h=function(){function t(e){_classCallCheck(this,t),this._element=e,this._addEventListeners()}return _createClass(t,[{key:"toggle",value:function s(){if(this.disabled||$(this).hasClass(a.DISABLED))return!1;var e=t._getParentFromElement(this),i=$(e).hasClass(a.OPEN);if(t._clearMenus(),i)return!1;if("ontouchstart"in document.documentElement&&!$(e).closest(l.NAVBAR_NAV).length){var n=document.createElement("div");n.className=a.BACKDROP,$(n).insertBefore(this),$(n).on("click",t._clearMenus)}var s={relatedTarget:this},o=$.Event(r.SHOW,s);return $(e).trigger(o),o.isDefaultPrevented()?!1:(this.focus(),this.setAttribute("aria-expanded","true"),$(e).toggleClass(a.OPEN),$(e).trigger($.Event(r.SHOWN,s)),!1)}},{key:"dispose",value:function o(){$.removeData(this._element,i),$(this._element).off(n),this._element=null}},{key:"_addEventListeners",value:function h(){$(this._element).on(r.CLICK,this.toggle)}}],[{key:"_jQueryInterface",value:function c(e){return this.each(function(){var n=$(this).data(i);if(n||$(this).data(i,n=new t(this)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e].call(this)}})}},{key:"_clearMenus",value:function u(e){if(!e||3!==e.which){var i=$(l.BACKDROP)[0];i&&i.parentNode.removeChild(i);for(var n=$.makeArray($(l.DATA_TOGGLE)),s=0;s<n.length;s++){var o=t._getParentFromElement(n[s]),h={relatedTarget:n[s]};if($(o).hasClass(a.OPEN)&&!(e&&"click"===e.type&&/input|textarea/i.test(e.target.tagName)&&$.contains(o,e.target))){var c=$.Event(r.HIDE,h);$(o).trigger(c),c.isDefaultPrevented()||(n[s].setAttribute("aria-expanded","false"),$(o).removeClass(a.OPEN).trigger($.Event(r.HIDDEN,h)))}}}}},{key:"_getParentFromElement",value:function p(t){var e=void 0,i=Util.getSelectorFromElement(t);return i&&(e=$(i)[0]),e||t.parentNode}},{key:"_dataApiKeydownHandler",value:function d(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!$(this).hasClass(a.DISABLED))){var i=t._getParentFromElement(this),n=$(i).hasClass(a.OPEN);if(!n&&27!==e.which||n&&27===e.which){if(27===e.which){var s=$(i).find(l.DATA_TOGGLE)[0];$(s).trigger("focus")}return void $(this).trigger("click")}var o=$.makeArray($(l.VISIBLE_ITEMS));if(o=o.filter(function(t){return t.offsetWidth||t.offsetHeight}),o.length){var r=o.indexOf(e.target);38===e.which&&r>0&&r--,40===e.which&&r<o.length-1&&r++,~r||(r=0),o[r].focus()}}}},{key:"VERSION",get:function v(){return e}}]),t}();return $(document).on(r.KEYDOWN_DATA_API,l.DATA_TOGGLE,h._dataApiKeydownHandler).on(r.KEYDOWN_DATA_API,l.ROLE_MENU,h._dataApiKeydownHandler).on(r.KEYDOWN_DATA_API,l.ROLE_LISTBOX,h._dataApiKeydownHandler).on(r.CLICK_DATA_API,h._clearMenus).on(r.CLICK_DATA_API,l.DATA_TOGGLE,h.prototype.toggle).on(r.CLICK_DATA_API,l.FORM_CHILD,function(t){t.stopPropagation()}),$.fn[t]=h._jQueryInterface,$.fn[t].Constructor=h,$.fn[t].noConflict=function(){return $.fn[t]=o,h._jQueryInterface},h}(jQuery),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Modal=function($){var t="modal",e="4.0.0-alpha",i="bs.modal",n="."+i,s=".data-api",o=$.fn[t],r=300,a=150,l={backdrop:!0,keyboard:!0,focus:!0,show:!0},h={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},c={HIDE:"hide"+n,HIDDEN:"hidden"+n,SHOW:"show"+n,SHOWN:"shown"+n,FOCUSIN:"focusin"+n,RESIZE:"resize"+n,CLICK_DISMISS:"click.dismiss"+n,KEYDOWN_DISMISS:"keydown.dismiss"+n,MOUSEUP_DISMISS:"mouseup.dismiss"+n,MOUSEDOWN_DISMISS:"mousedown.dismiss"+n,CLICK_DATA_API:"click"+n+s},u={SCROLLBAR_MEASURER:"modal-scrollbar-measure",BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",IN:"in"},p={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".navbar-fixed-top, .navbar-fixed-bottom, .is-fixed"},d=function(){function s(t,e){_classCallCheck(this,s),this._config=this._getConfig(e),this._element=t,this._dialog=$(t).find(p.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return _createClass(s,[{key:"toggle",value:function o(t){return this._isShown?this.hide():this.show(t)}},{key:"show",value:function d(t){var e=this,i=$.Event(c.SHOW,{relatedTarget:t});$(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),$(document.body).addClass(u.OPEN),this._setEscapeEvent(),this._setResizeEvent(),$(this._element).on(c.CLICK_DISMISS,p.DATA_DISMISS,$.proxy(this.hide,this)),$(this._dialog).on(c.MOUSEDOWN_DISMISS,function(){$(e._element).one(c.MOUSEUP_DISMISS,function(t){$(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)})}),this._showBackdrop($.proxy(this._showElement,this,t)))}},{key:"hide",value:function v(t){t&&t.preventDefault();var e=$.Event(c.HIDE);$(this._element).trigger(e),this._isShown&&!e.isDefaultPrevented()&&(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),$(document).off(c.FOCUSIN),$(this._element).removeClass(u.IN),$(this._element).off(c.CLICK_DISMISS),$(this._dialog).off(c.MOUSEDOWN_DISMISS),Util.supportsTransitionEnd()&&$(this._element).hasClass(u.FADE)?$(this._element).one(Util.TRANSITION_END,$.proxy(this._hideModal,this)).emulateTransitionEnd(r):this._hideModal())}},{key:"dispose",value:function f(){$.removeData(this._element,i),$(window).off(n),$(document).off(n),$(this._element).off(n),$(this._backdrop).off(n),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._originalBodyPadding=null,this._scrollbarWidth=null}},{key:"_getConfig",value:function g(e){return e=$.extend({},l,e),Util.typeCheckConfig(t,e,h),e}},{key:"_showElement",value:function y(t){var e=this,i=Util.supportsTransitionEnd()&&$(this._element).hasClass(u.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.scrollTop=0,i&&Util.reflow(this._element),$(this._element).addClass(u.IN),this._config.focus&&this._enforceFocus();var n=$.Event(c.SHOWN,{relatedTarget:t}),s=function o(){e._config.focus&&e._element.focus(),$(e._element).trigger(n)};i?$(this._dialog).one(Util.TRANSITION_END,s).emulateTransitionEnd(r):s()}},{key:"_enforceFocus",value:function m(){var t=this;$(document).off(c.FOCUSIN).on(c.FOCUSIN,function(e){t._element===e.target||$(t._element).has(e.target).length||t._element.focus()})}},{key:"_setEscapeEvent",value:function j(){var t=this;this._isShown&&this._config.keyboard?$(this._element).on(c.KEYDOWN_DISMISS,function(e){27===e.which&&t.hide()}):this._isShown||$(this._element).off(c.KEYDOWN_DISMISS)}},{key:"_setResizeEvent",value:function b(){this._isShown?$(window).on(c.RESIZE,$.proxy(this._handleUpdate,this)):$(window).off(c.RESIZE)}},{key:"_hideModal",value:function C(){var t=this;this._element.style.display="none",this._showBackdrop(function(){$(document.body).removeClass(u.OPEN),t._resetAdjustments(),t._resetScrollbar(),$(t._element).trigger(c.HIDDEN)})}},{key:"_removeBackdrop",value:function w(){this._backdrop&&($(this._backdrop).remove(),this._backdrop=null)}},{key:"_showBackdrop",value:function T(t){var e=this,i=$(this._element).hasClass(u.FADE)?u.FADE:"";if(this._isShown&&this._config.backdrop){var n=Util.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=u.BACKDROP,i&&$(this._backdrop).addClass(i),$(this._backdrop).appendTo(document.body),$(this._element).on(c.CLICK_DISMISS,function(t){return e._ignoreBackdropClick?void(e._ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"===e._config.backdrop?e._element.focus():e.hide()))}),n&&Util.reflow(this._backdrop),$(this._backdrop).addClass(u.IN),!t)return;if(!n)return void t();$(this._backdrop).one(Util.TRANSITION_END,t).emulateTransitionEnd(a)}else if(!this._isShown&&this._backdrop){$(this._backdrop).removeClass(u.IN);var s=function o(){e._removeBackdrop(),t&&t()};Util.supportsTransitionEnd()&&$(this._element).hasClass(u.FADE)?$(this._backdrop).one(Util.TRANSITION_END,s).emulateTransitionEnd(a):s()}else t&&t()}},{key:"_handleUpdate",value:function _(){this._adjustDialog()}},{key:"_adjustDialog",value:function S(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px~")}},{key:"_resetAdjustments",value:function k(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}},{key:"_checkScrollbar",value:function x(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this._isBodyOverflowing=document.body.clientWidth<t,this._scrollbarWidth=this._getScrollbarWidth()}},{key:"_setScrollbar",value:function E(){var t=parseInt($(p.FIXED_CONTENT).css("padding-right")||0,10);this._originalBodyPadding=document.body.style.paddingRight||"",this._isBodyOverflowing&&(document.body.style.paddingRight=t+this._scrollbarWidth+"px")}},{key:"_resetScrollbar",value:function P(){document.body.style.paddingRight=this._originalBodyPadding}},{key:"_getScrollbarWidth",value:function A(){var t=document.createElement("div");t.className=u.SCROLLBAR_MEASURER,document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}}],[{key:"_jQueryInterface",value:function I(t,e){return this.each(function(){var n=$(this).data(i),o=$.extend({},s.Default,$(this).data(),"object"==typeof t&&t);if(n||(n=new s(this,o),$(this).data(i,n)),"string"==typeof t){if(void 0===n[t])throw new Error('No method named "'+t+'"');n[t](e)}else o.show&&n.show(e)})}},{key:"VERSION",get:function M(){return e}},{key:"Default",get:function L(){return l}}]),s}();return $(document).on(c.CLICK_DATA_API,p.DATA_TOGGLE,function(t){var e=this,n=void 0,s=Util.getSelectorFromElement(this);s&&(n=$(s)[0]);var o=$(n).data(i)?"toggle":$.extend({},$(n).data(),$(this).data());"A"===this.tagName&&t.preventDefault();var r=$(n).one(c.SHOW,function(t){t.isDefaultPrevented()||r.one(c.HIDDEN,function(){$(e).is(":visible")&&e.focus()})});d._jQueryInterface.call($(n),o,this)}),$.fn[t]=d._jQueryInterface,$.fn[t].Constructor=d,$.fn[t].noConflict=function(){return $.fn[t]=o,d._jQueryInterface},d}(jQuery);!function(){function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in i)e.push(i[n]);for(var s=0,o=e.length;o>s;s++)e[s][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=s.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},s=window.Waypoint,o=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,s.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||s.isTouch)&&(e.didScroll=!0,s.requestAnimationFrame(t))})},e.prototype.handleResize=function(){s.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],s=n.newScroll>n.oldScroll,o=s?n.forward:n.backward;for(var r in this.waypoints[i]){var a=this.waypoints[i][r],l=n.oldScroll<a.triggerPoint,h=n.newScroll>=a.triggerPoint,c=l&&h,u=!l&&!h;(c||u)&&(a.queueTrigger(o),t[a.group.id]=a.group)}}for(var p in t)t[p].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?s.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?s.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,s=t.length;s>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t=this.element==this.element.window,e=t?void 0:this.adapter.offset(),i={},n;this.handleScroll(),n={horizontal:{contextOffset:t?0:e.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:e.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in n){var r=n[o];for(var a in this.waypoints[o]){var l=this.waypoints[o][a],h=l.options.offset,c=l.triggerPoint,u=0,p=null==c,d,v,f,g,y;l.element!==l.element.window&&(u=l.adapter.offset()[r.offsetProp]),"function"==typeof h?h=h.apply(l):"string"==typeof h&&(h=parseFloat(h),l.options.offset.indexOf("%")>-1&&(h=Math.ceil(r.contextDimension*h/100))),d=r.contextScroll-r.contextOffset,l.triggerPoint=u+d-h,v=c<r.oldScroll,f=l.triggerPoint>=r.oldScroll,g=v&&f,y=!v&&!f,!p&&g?(l.queueTrigger(r.backward),i[l.group.id]=l.group):!p&&y?(l.queueTrigger(r.forward),i[l.group.id]=l.group):p&&r.oldScroll>=l.triggerPoint&&(l.queueTrigger(r.forward),i[l.group.id]=l.group)}}return s.requestAnimationFrame(function(){for(var t in i)i[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){o&&o(),e.refreshAll()},s.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},s.Context=e}(),function(){function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},s=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],s="up"===i||"left"===i;n.sort(s?e:t);for(var o=0,r=n.length;r>o;o+=1){var a=n[o];(a.options.continuous||o===n.length-1)&&a.trigger([i]);
}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=s.Adapter.inArray(e,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=s.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=s.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},s.Group=i}(),function(){function t(t){this.$element=$(t)}var $=window.jQuery,e=window.Waypoint;$.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),$.each(["extend","inArray","isEmptyObject"],function(e,i){t[i]=$[i]}),e.adapters.push({name:"jquery",Adapter:t}),e.Adapter=t}(),function(){function t(t){return function(){var i=[],n=arguments[0];return t.isFunction(arguments[0])&&(n=t.extend({},arguments[1]),n.handler=arguments[0]),this.each(function(){var s=t.extend({},n,{element:this});"string"==typeof s.context&&(s.context=t(this).closest(s.context)[0]),i.push(new e(s))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}(),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function($){function t(t){var e={},i=/^jQuery\d+$/;return $.each(t.attributes,function(t,n){n.specified&&!i.test(n.name)&&(e[n.name]=n.value)}),e}function e(t,e){var i=this,s=$(i);if(i.value===s.attr("placeholder")&&s.hasClass(u.customClass))if(i.value="",s.removeClass(u.customClass),s.data("placeholder-password")){if(s=s.hide().nextAll('input[type="password"]:first').show().attr("id",s.removeAttr("id").data("placeholder-id")),t===!0)return s[0].value=e,e;s.focus()}else i==n()&&i.select()}function i(i){var n,s=this,o=$(s),r=s.id;if(i&&"blur"===i.type){if(o.hasClass(u.customClass))return;if("password"===s.type&&(n=o.prevAll('input[type="text"]:first'),n.length>0&&n.is(":visible")))return}if(""===s.value){if("password"===s.type){if(!o.data("placeholder-textinput")){try{n=o.clone().prop({type:"text"})}catch(a){n=$("<input>").attr($.extend(t(this),{type:"text"}))}n.removeAttr("name").data({"placeholder-enabled":!0,"placeholder-password":o,"placeholder-id":r}).bind("focus.placeholder",e),o.data({"placeholder-textinput":n,"placeholder-id":r}).before(n)}s.value="",o=o.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",o.data("placeholder-id")).show()}else{var l=o.data("placeholder-password");l&&(l[0].value="",o.attr("id",o.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))}o.addClass(u.customClass),o[0].value=o.attr("placeholder")}else o.removeClass(u.customClass)}function n(){try{return document.activeElement}catch(t){}}var s="[object OperaMini]"===Object.prototype.toString.call(window.operamini),o="placeholder"in document.createElement("input")&&!s,r="placeholder"in document.createElement("textarea")&&!s,a=$.valHooks,l=$.propHooks,h,c,u={};o&&r?(c=$.fn.placeholder=function(){return this},c.input=!0,c.textarea=!0):(c=$.fn.placeholder=function(t){var n={customClass:"placeholder"};return u=$.extend({},n,t),this.filter((o?"textarea":":input")+"[placeholder]").not("."+u.customClass).bind({"focus.placeholder":e,"blur.placeholder":i}).data("placeholder-enabled",!0).trigger("blur.placeholder")},c.input=o,c.textarea=r,h={get:function(t){var e=$(t),i=e.data("placeholder-password");return i?i[0].value:e.data("placeholder-enabled")&&e.hasClass(u.customClass)?"":t.value},set:function(t,s){var o=$(t),r,a;return""!==s&&(r=o.data("placeholder-textinput"),a=o.data("placeholder-password"),r?(e.call(r[0],!0,s)||(t.value=s),r[0].value=s):a&&(e.call(t,!0,s)||(a[0].value=s),t.value=s)),o.data("placeholder-enabled")?(""===s?(t.value=s,t!=n()&&i.call(t)):(o.hasClass(u.customClass)&&e.call(t),t.value=s),o):(t.value=s,o)}},o||(a.input=h,l.value=h),r||(a.textarea=h,l.value=h),$(function(){$(document).delegate("form","submit.placeholder",function(){var t=$("."+u.customClass,this).each(function(){e.call(this,!0,"")});setTimeout(function(){t.each(i)},10)})}),$(window).bind("beforeunload.placeholder",function(){$("."+u.customClass).each(function(){this.value=""})}))}),document.createElement("video"),document.createElement("audio"),document.createElement("track");var vjs=function(t,e,i){var n;if("string"==typeof t){if(0===t.indexOf("#")&&(t=t.slice(1)),vjs.players[t])return e&&vjs.log.warn('Player "'+t+'" is already initialised. Options will not be applied.'),i&&vjs.players[t].ready(i),vjs.players[t];n=vjs.el(t)}else n=t;if(!n||!n.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return n.player||new vjs.Player(n,e,i)},videojs=window.videojs=vjs;vjs.CDN_VERSION="4.12",vjs.ACCESS_PROTOCOL="https:"==document.location.protocol?"https://":"http://",vjs.VERSION="4.12.11",vjs.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,playbackRates:[],inactivityTimeout:2e3,children:{mediaLoader:{},posterImage:{},loadingSpinner:{},textTrackDisplay:{},bigPlayButton:{},controlBar:{},errorDisplay:{},textTrackSettings:{}},language:document.getElementsByTagName("html")[0].getAttribute("lang")||navigator.languages&&navigator.languages[0]||navigator.userLanguage||navigator.language||"en",languages:{},notSupportedMessage:"No compatible source was found for this video."},"GENERATED_CDN_VSN"!==vjs.CDN_VERSION&&(videojs.options.flash.swf=vjs.ACCESS_PROTOCOL+"vjs.zencdn.net/"+vjs.CDN_VERSION+"/video-js.swf"),vjs.addLanguage=function(t,e){return void 0!==vjs.options.languages[t]?vjs.options.languages[t]=vjs.util.mergeOptions(vjs.options.languages[t],e):vjs.options.languages[t]=e,vjs.options.languages},vjs.players={},"function"==typeof define&&define.amd?define("videojs",[],function(){return videojs}):"object"==typeof exports&&"object"==typeof module&&(module.exports=videojs),vjs.CoreObject=vjs.CoreObject=function(){},vjs.CoreObject.extend=function(t){var e,i;t=t||{},e=t.init||t.init||this.prototype.init||this.prototype.init||function(){},i=function(){e.apply(this,arguments)},i.prototype=vjs.obj.create(this.prototype),i.prototype.constructor=i,i.extend=vjs.CoreObject.extend,i.create=vjs.CoreObject.create;for(var n in t)t.hasOwnProperty(n)&&(i.prototype[n]=t[n]);return i},vjs.CoreObject.create=function(){var t=vjs.obj.create(this.prototype);return this.apply(t,arguments),t},vjs.on=function(t,e,i){if(vjs.obj.isArray(e))return _handleMultipleEvents(vjs.on,t,e,i);var n=vjs.getData(t);n.handlers||(n.handlers={}),n.handlers[e]||(n.handlers[e]=[]),i.guid||(i.guid=vjs.guid++),n.handlers[e].push(i),n.dispatcher||(n.disabled=!1,n.dispatcher=function(e){if(!n.disabled){e=vjs.fixEvent(e);var i=n.handlers[e.type];if(i)for(var s=i.slice(0),o=0,r=s.length;r>o&&!e.isImmediatePropagationStopped();o++)s[o].call(t,e)}}),1==n.handlers[e].length&&(t.addEventListener?t.addEventListener(e,n.dispatcher,!1):t.attachEvent&&t.attachEvent("on"+e,n.dispatcher))},vjs.off=function(t,e,i){if(vjs.hasData(t)){var n=vjs.getData(t);if(n.handlers){if(vjs.obj.isArray(e))return _handleMultipleEvents(vjs.off,t,e,i);var s=function(e){n.handlers[e]=[],vjs.cleanUpEvents(t,e)};if(e){var o=n.handlers[e];if(o){if(!i)return void s(e);if(i.guid)for(var r=0;r<o.length;r++)o[r].guid===i.guid&&o.splice(r--,1);vjs.cleanUpEvents(t,e)}}else for(var a in n.handlers)s(a)}}},vjs.cleanUpEvents=function(t,e){var i=vjs.getData(t);0===i.handlers[e].length&&(delete i.handlers[e],t.removeEventListener?t.removeEventListener(e,i.dispatcher,!1):t.detachEvent&&t.detachEvent("on"+e,i.dispatcher)),vjs.isEmpty(i.handlers)&&(delete i.handlers,delete i.dispatcher,delete i.disabled),vjs.isEmpty(i)&&vjs.removeData(t)},vjs.fixEvent=function(t){function e(){return!0}function i(){return!1}if(!t||!t.isPropagationStopped){var n=t||window.event;t={};for(var s in n)"layerX"!==s&&"layerY"!==s&&"keyLocation"!==s&&("returnValue"==s&&n.preventDefault||(t[s]=n[s]));if(t.target||(t.target=t.srcElement||document),t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement,t.preventDefault=function(){n.preventDefault&&n.preventDefault(),t.returnValue=!1,t.isDefaultPrevented=e,t.defaultPrevented=!0},t.isDefaultPrevented=i,t.defaultPrevented=!1,t.stopPropagation=function(){n.stopPropagation&&n.stopPropagation(),t.cancelBubble=!0,t.isPropagationStopped=e},t.isPropagationStopped=i,t.stopImmediatePropagation=function(){n.stopImmediatePropagation&&n.stopImmediatePropagation(),t.isImmediatePropagationStopped=e,t.stopPropagation()},t.isImmediatePropagationStopped=i,null!=t.clientX){var o=document.documentElement,r=document.body;t.pageX=t.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),t.pageY=t.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)}t.which=t.charCode||t.keyCode,null!=t.button&&(t.button=1&t.button?0:4&t.button?1:2&t.button?2:0)}return t},vjs.trigger=function(t,e){var i=vjs.hasData(t)?vjs.getData(t):{},n=t.parentNode||t.ownerDocument;if("string"==typeof e&&(e={type:e,target:t}),e=vjs.fixEvent(e),i.dispatcher&&i.dispatcher.call(t,e),n&&!e.isPropagationStopped()&&e.bubbles!==!1)vjs.trigger(n,e);else if(!n&&!e.defaultPrevented){var s=vjs.getData(e.target);e.target[e.type]&&(s.disabled=!0,"function"==typeof e.target[e.type]&&e.target[e.type](),s.disabled=!1)}return!e.defaultPrevented},vjs.one=function(t,e,i){if(vjs.obj.isArray(e))return _handleMultipleEvents(vjs.one,t,e,i);var n=function(){vjs.off(t,e,n),i.apply(this,arguments)};n.guid=i.guid=i.guid||vjs.guid++,vjs.on(t,e,n)};var hasOwnProp=Object.prototype.hasOwnProperty;vjs.createEl=function(t,e){var i;return t=t||"div",e=e||{},i=document.createElement(t),vjs.obj.each(e,function(t,e){-1!==t.indexOf("aria-")||"role"==t?i.setAttribute(t,e):i[t]=e}),i},vjs.capitalize=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},vjs.obj={},vjs.obj.create=Object.create||function(t){function e(){}return e.prototype=t,new e},vjs.obj.each=function(t,e,i){for(var n in t)hasOwnProp.call(t,n)&&e.call(i||this,n,t[n])},vjs.obj.merge=function(t,e){if(!e)return t;for(var i in e)hasOwnProp.call(e,i)&&(t[i]=e[i]);return t},vjs.obj.deepMerge=function(t,e){var i,n,s;t=vjs.obj.copy(t);for(i in e)hasOwnProp.call(e,i)&&(n=t[i],s=e[i],vjs.obj.isPlain(n)&&vjs.obj.isPlain(s)?t[i]=vjs.obj.deepMerge(n,s):t[i]=e[i]);return t},vjs.obj.copy=function(t){return vjs.obj.merge({},t)},vjs.obj.isPlain=function(t){return!!t&&"object"==typeof t&&"[object Object]"===t.toString()&&t.constructor===Object},vjs.obj.isArray=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},vjs.isNaN=function(t){return t!==t},vjs.bind=function(t,e,i){e.guid||(e.guid=vjs.guid++);var n=function(){return e.apply(t,arguments)};return n.guid=i?i+"_"+e.guid:e.guid,n},vjs.cache={},vjs.guid=1,vjs.expando="vdata"+(new Date).getTime(),vjs.getData=function(t){var e=t[vjs.expando];return e||(e=t[vjs.expando]=vjs.guid++),vjs.cache[e]||(vjs.cache[e]={}),vjs.cache[e]},vjs.hasData=function(t){var e=t[vjs.expando];return!(!e||vjs.isEmpty(vjs.cache[e]))},vjs.removeData=function(t){var e=t[vjs.expando];if(e){delete vjs.cache[e];try{delete t[vjs.expando]}catch(i){t.removeAttribute?t.removeAttribute(vjs.expando):t[vjs.expando]=null}}},vjs.isEmpty=function(t){for(var e in t)if(null!==t[e])return!1;return!0},vjs.hasClass=function(t,e){return-1!==(" "+t.className+" ").indexOf(" "+e+" ")},vjs.addClass=function(t,e){vjs.hasClass(t,e)||(t.className=""===t.className?e:t.className+" "+e)},vjs.removeClass=function(t,e){var i,n;if(vjs.hasClass(t,e)){for(i=t.className.split(" "),n=i.length-1;n>=0;n--)i[n]===e&&i.splice(n,1);t.className=i.join(" ")}},vjs.TEST_VID=vjs.createEl("video"),function(){var t=document.createElement("track");t.kind="captions",t.srclang="en",t.label="English",vjs.TEST_VID.appendChild(t)}(),vjs.USER_AGENT=navigator.userAgent,vjs.IS_IPHONE=/iPhone/i.test(vjs.USER_AGENT),vjs.IS_IPAD=/iPad/i.test(vjs.USER_AGENT),vjs.IS_IPOD=/iPod/i.test(vjs.USER_AGENT),vjs.IS_IOS=vjs.IS_IPHONE||vjs.IS_IPAD||vjs.IS_IPOD,vjs.IOS_VERSION=function(){var t=vjs.USER_AGENT.match(/OS (\d+)_/i);return t&&t[1]?t[1]:void 0}(),vjs.IS_ANDROID=/Android/i.test(vjs.USER_AGENT),vjs.ANDROID_VERSION=function(){var t=vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),e,i;return t?(e=t[1]&&parseFloat(t[1]),i=t[2]&&parseFloat(t[2]),e&&i?parseFloat(t[1]+"."+t[2]):e?e:null):null}(),vjs.IS_OLD_ANDROID=vjs.IS_ANDROID&&/webkit/i.test(vjs.USER_AGENT)&&vjs.ANDROID_VERSION<2.3,vjs.IS_FIREFOX=/Firefox/i.test(vjs.USER_AGENT),vjs.IS_CHROME=/Chrome/i.test(vjs.USER_AGENT),vjs.IS_IE8=/MSIE\s8\.0/.test(vjs.USER_AGENT),vjs.TOUCH_ENABLED=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),vjs.BACKGROUND_SIZE_SUPPORTED="backgroundSize"in vjs.TEST_VID.style,vjs.setElementAttributes=function(t,e){vjs.obj.each(e,function(e,i){null===i||"undefined"==typeof i||i===!1?t.removeAttribute(e):t.setAttribute(e,i===!0?"":i)})},vjs.getElementAttributes=function(t){var e,i,n,s,o;if(e={},i=",autoplay,controls,loop,muted,default,",t&&t.attributes&&t.attributes.length>0){n=t.attributes;for(var r=n.length-1;r>=0;r--)s=n[r].name,o=n[r].value,("boolean"==typeof t[s]||-1!==i.indexOf(","+s+","))&&(o=null!==o?!0:!1),e[s]=o}return e},vjs.getComputedDimension=function(t,e){var i="";return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,"").getPropertyValue(e):t.currentStyle&&(i=t["client"+e.substr(0,1).toUpperCase()+e.substr(1)]+"px"),i},vjs.insertFirst=function(t,e){e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)},vjs.browser={},vjs.el=function(t){return 0===t.indexOf("#")&&(t=t.slice(1)),document.getElementById(t)},vjs.formatTime=function(t,e){e=e||t;var i=Math.floor(t%60),n=Math.floor(t/60%60),s=Math.floor(t/3600),o=Math.floor(e/60%60),r=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(s=n=i="-"),s=s>0||r>0?s+":":"",n=((s||o>=10)&&10>n?"0"+n:n)+":",i=10>i?"0"+i:i,s+n+i},vjs.blockTextSelection=function(){document.body.focus(),document.onselectstart=function(){return!1}},vjs.unblockTextSelection=function(){document.onselectstart=function(){return!0}},vjs.trim=function(t){return(t+"").replace(/^\s+|\s+$/g,"")},vjs.round=function(t,e){return e||(e=0),Math.round(t*Math.pow(10,e))/Math.pow(10,e)},vjs.createTimeRange=function(t,e){return void 0===t&&void 0===e?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:1,start:function(){return t},end:function(){return e}}},vjs.setLocalStorage=function(t,e){try{var i=window.localStorage||!1;if(!i)return;i[t]=e}catch(n){22==n.code||1014==n.code?vjs.log("LocalStorage Full (VideoJS)",n):18==n.code?vjs.log("LocalStorage not allowed (VideoJS)",n):vjs.log("LocalStorage Error (VideoJS)",n)}},vjs.getAbsoluteURL=function(t){return t.match(/^https?:\/\//)||(t=vjs.createEl("div",{innerHTML:'<a href="'+t+'">x</a>'}).firstChild.href),t},vjs.parseUrl=function(t){var e,i,n,s,o;s=["protocol","hostname","port","pathname","search","hash","host"],i=vjs.createEl("a",{href:t}),n=""===i.host&&"file:"!==i.protocol,n&&(e=vjs.createEl("div"),e.innerHTML='<a href="'+t+'"></a>',i=e.firstChild,e.setAttribute("style","display:none; position:absolute;"),document.body.appendChild(e)),o={};for(var r=0;r<s.length;r++)o[s[r]]=i[s[r]];return"http:"===o.protocol&&(o.host=o.host.replace(/:80$/,"")),"https:"===o.protocol&&(o.host=o.host.replace(/:443$/,"")),n&&document.body.removeChild(e),o},vjs.log=function(){_logType(null,arguments)},vjs.log.history=[],vjs.log.error=function(){_logType("error",arguments)},vjs.log.warn=function(){_logType("warn",arguments)},vjs.findPosition=function(t){var e,i,n,s,o,r,a,l,h;return t.getBoundingClientRect&&t.parentNode&&(e=t.getBoundingClientRect()),e?(i=document.documentElement,n=document.body,s=i.clientLeft||n.clientLeft||0,o=window.pageXOffset||n.scrollLeft,r=e.left+o-s,a=i.clientTop||n.clientTop||0,l=window.pageYOffset||n.scrollTop,h=e.top+l-a,{left:vjs.round(r),top:vjs.round(h)}):{left:0,top:0}},vjs.arr={},vjs.arr.forEach=function(t,e,i){if(vjs.obj.isArray(t)&&e instanceof Function)for(var n=0,s=t.length;s>n;++n)e.call(i||vjs,t[n],n,t);return t},vjs.xhr=function(t,e){var i,n,s,o,r,a,l,h,c;"string"==typeof t&&(t={uri:t}),videojs.util.mergeOptions({method:"GET",timeout:45e3},t),e=e||function(){},h=function(){window.clearTimeout(l),e(null,n,n.response||n.responseText)},c=function(t){window.clearTimeout(l),t&&"string"!=typeof t||(t=new Error(t)),e(t,n)},i=window.XMLHttpRequest,"undefined"==typeof i&&(i=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(i){}throw new Error("This browser does not support XMLHttpRequest.")}),n=new i,n.uri=t.uri,s=vjs.parseUrl(t.uri),o=window.location,a=s.protocol+s.host!==o.protocol+o.host,!a||!window.XDomainRequest||"withCredentials"in n?(r="file:"==s.protocol||"file:"==o.protocol,n.onreadystatechange=function(){if(4===n.readyState){if(n.timedout)return c("timeout");200===n.status||r&&0===n.status?h():c()}},t.timeout&&(l=window.setTimeout(function(){4!==n.readyState&&(n.timedout=!0,n.abort())},t.timeout))):(n=new window.XDomainRequest,n.onload=h,n.onerror=c,n.onprogress=function(){},n.ontimeout=function(){});try{n.open(t.method||"GET",t.uri,!0)}catch(u){return c(u)}t.withCredentials&&(n.withCredentials=!0),t.responseType&&(n.responseType=t.responseType);try{n.send()}catch(u){return c(u)}return n},vjs.util={},vjs.util.mergeOptions=function(t,e){var i,n,s;t=vjs.obj.copy(t);for(i in e)e.hasOwnProperty(i)&&(n=t[i],s=e[i],vjs.obj.isPlain(n)&&vjs.obj.isPlain(s)?t[i]=vjs.util.mergeOptions(n,s):t[i]=e[i]);return t},vjs.EventEmitter=function(){},vjs.EventEmitter.prototype.allowedEvents_={},vjs.EventEmitter.prototype.on=function(t,e){var i=this.addEventListener;this.addEventListener=Function.prototype,vjs.on(this,t,e),this.addEventListener=i},vjs.EventEmitter.prototype.addEventListener=vjs.EventEmitter.prototype.on,vjs.EventEmitter.prototype.off=function(t,e){vjs.off(this,t,e)},vjs.EventEmitter.prototype.removeEventListener=vjs.EventEmitter.prototype.off,vjs.EventEmitter.prototype.one=function(t,e){vjs.one(this,t,e)},vjs.EventEmitter.prototype.trigger=function(t){var e=t.type||t;"string"==typeof t&&(t={type:e}),t=vjs.fixEvent(t),this.allowedEvents_[e]&&this["on"+e]&&this["on"+e](t),vjs.trigger(this,t)},vjs.EventEmitter.prototype.dispatchEvent=vjs.EventEmitter.prototype.trigger,vjs.Component=vjs.CoreObject.extend({init:function(t,e,i){this.player_=t,this.options_=vjs.obj.copy(this.options_),e=this.options(e),this.id_=e.id||e.el&&e.el.id,this.id_||(this.id_=(t.id&&t.id()||"no_player")+"_component_"+vjs.guid++),this.name_=e.name||null,this.el_=e.el||this.createEl(),this.children_=[],this.childIndex_={},this.childNameIndex_={},this.initChildren(),this.ready(i),e.reportTouchActivity!==!1&&this.enableTouchActivity()}}),vjs.Component.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),vjs.removeData(this.el_),this.el_=null},vjs.Component.prototype.player_=!0,vjs.Component.prototype.player=function(){return this.player_},vjs.Component.prototype.options_,vjs.Component.prototype.options=function(t){return void 0===t?this.options_:this.options_=vjs.util.mergeOptions(this.options_,t)},vjs.Component.prototype.el_,vjs.Component.prototype.createEl=function(t,e){return vjs.createEl(t,e)},vjs.Component.prototype.localize=function(t){var e=this.player_.language(),i=this.player_.languages();return i&&i[e]&&i[e][t]?i[e][t]:t},vjs.Component.prototype.el=function(){return this.el_},vjs.Component.prototype.contentEl_,vjs.Component.prototype.contentEl=function(){return this.contentEl_||this.el_},vjs.Component.prototype.id_,vjs.Component.prototype.id=function(){return this.id_},vjs.Component.prototype.name_,vjs.Component.prototype.name=function(){return this.name_},vjs.Component.prototype.children_,vjs.Component.prototype.children=function(){return this.children_},vjs.Component.prototype.childIndex_,vjs.Component.prototype.getChildById=function(t){return this.childIndex_[t]},vjs.Component.prototype.childNameIndex_,vjs.Component.prototype.getChild=function(t){return this.childNameIndex_[t]},vjs.Component.prototype.addChild=function(t,e){var i,n,s;return"string"==typeof t?(s=t,e=e||{},n=e.componentClass||vjs.capitalize(s),e.name=s,i=new window.videojs[n](this.player_||this,e)):i=t,this.children_.push(i),"function"==typeof i.id&&(this.childIndex_[i.id()]=i),s=s||i.name&&i.name(),s&&(this.childNameIndex_[s]=i),"function"==typeof i.el&&i.el()&&this.contentEl().appendChild(i.el()),i},vjs.Component.prototype.removeChild=function(t){if("string"==typeof t&&(t=this.getChild(t)),t&&this.children_){for(var e=!1,i=this.children_.length-1;i>=0;i--)if(this.children_[i]===t){e=!0,this.children_.splice(i,1);break}if(e){this.childIndex_[t.id()]=null,this.childNameIndex_[t.name()]=null;var n=t.el();n&&n.parentNode===this.contentEl()&&this.contentEl().removeChild(t.el())}}},vjs.Component.prototype.initChildren=function(){var t,e,i,n,s,o,r;if(t=this,e=t.options(),i=e.children)if(r=function(i,n){void 0!==e[i]&&(n=e[i]),n!==!1&&(t[i]=t.addChild(i,n))},vjs.obj.isArray(i))for(var a=0;a<i.length;a++)n=i[a],"string"==typeof n?(s=n,o={}):(s=n.name,o=n),r(s,o);else vjs.obj.each(i,r)},vjs.Component.prototype.buildCSSClass=function(){return""},vjs.Component.prototype.on=function(t,e,i){var n,s,o,r,a,l;return"string"==typeof t||vjs.obj.isArray(t)?vjs.on(this.el_,t,vjs.bind(this,e)):(n=t,s=e,o=vjs.bind(this,i),l=this,r=function(){l.off(n,s,o)},r.guid=o.guid,this.on("dispose",r),a=function(){l.off("dispose",r)},a.guid=o.guid,t.nodeName?(vjs.on(n,s,o),vjs.on(n,"dispose",a)):"function"==typeof t.on&&(n.on(s,o),n.on("dispose",a))),this},vjs.Component.prototype.off=function(t,e,i){var n,s,o,r,a;return!t||"string"==typeof t||vjs.obj.isArray(t)?vjs.off(this.el_,t,e):(n=t,o=e,r=vjs.bind(this,i),this.off("dispose",r),t.nodeName?(vjs.off(n,o,r),vjs.off(n,"dispose",r)):(n.off(o,r),n.off("dispose",r))),this},vjs.Component.prototype.one=function(t,e,i){var n,s,o,r,a;return"string"==typeof t||vjs.obj.isArray(t)?vjs.one(this.el_,t,vjs.bind(this,e)):(n=t,s=e,o=vjs.bind(this,i),r=this,a=function(){r.off(n,s,a),o.apply(this,arguments)},a.guid=o.guid,this.on(n,s,a)),this},vjs.Component.prototype.trigger=function(t){return vjs.trigger(this.el_,t),this},vjs.Component.prototype.isReady_,vjs.Component.prototype.isReadyOnInitFinish_=!0,vjs.Component.prototype.readyQueue_,vjs.Component.prototype.ready=function(t){return t&&(this.isReady_?t.call(this):(void 0===this.readyQueue_&&(this.readyQueue_=[]),this.readyQueue_.push(t))),this},vjs.Component.prototype.triggerReady=function(){this.isReady_=!0;var t=this.readyQueue_;if(t&&t.length>0){for(var e=0,i=t.length;i>e;e++)t[e].call(this);this.readyQueue_=[],this.trigger("ready")}},vjs.Component.prototype.hasClass=function(t){return vjs.hasClass(this.el_,t)},vjs.Component.prototype.addClass=function(t){return vjs.addClass(this.el_,t),this},vjs.Component.prototype.removeClass=function(t){return vjs.removeClass(this.el_,t),this},vjs.Component.prototype.show=function(){return this.removeClass("vjs-hidden"),this},vjs.Component.prototype.hide=function(){return this.addClass("vjs-hidden"),this},vjs.Component.prototype.lockShowing=function(){return this.addClass("vjs-lock-showing"),this},vjs.Component.prototype.unlockShowing=function(){return this.removeClass("vjs-lock-showing"),this},vjs.Component.prototype.disable=function(){this.hide(),this.show=function(){}},vjs.Component.prototype.width=function(t,e){return this.dimension("width",t,e)},vjs.Component.prototype.height=function(t,e){return this.dimension("height",t,e)},vjs.Component.prototype.dimensions=function(t,e){return this.width(t,!0).height(e)},vjs.Component.prototype.dimension=function(t,e,i){if(void 0!==e)return(null===e||vjs.isNaN(e))&&(e=0),-1!==(""+e).indexOf("%")||-1!==(""+e).indexOf("px")?this.el_.style[t]=e:"auto"===e?this.el_.style[t]="":this.el_.style[t]=e+"px",i||this.trigger("resize"),this;if(!this.el_)return 0;var n=this.el_.style[t],s=n.indexOf("px");return-1!==s?parseInt(n.slice(0,s),10):parseInt(this.el_["offset"+vjs.capitalize(t)],10)},vjs.Component.prototype.onResize,vjs.Component.prototype.emitTapEvents=function(){var t,e,i,n,s,o,r,a,l,h;t=0,e=null,l=10,h=200,this.on("touchstart",function(i){1===i.touches.length&&(e=vjs.obj.copy(i.touches[0]),t=(new Date).getTime(),n=!0)}),this.on("touchmove",function(t){t.touches.length>1?n=!1:e&&(o=t.touches[0].pageX-e.pageX,r=t.touches[0].pageY-e.pageY,a=Math.sqrt(o*o+r*r),a>l&&(n=!1))}),s=function(){n=!1},this.on("touchleave",s),this.on("touchcancel",s),this.on("touchend",function(s){e=null,n===!0&&(i=(new Date).getTime()-t,h>i&&(s.preventDefault(),this.trigger("tap")))})},vjs.Component.prototype.enableTouchActivity=function(){var t,e,i;this.player().reportUserActivity&&(t=vjs.bind(this.player(),this.player().reportUserActivity),this.on("touchstart",function(){t(),this.clearInterval(e),e=this.setInterval(t,250)}),i=function(i){t(),this.clearInterval(e)},this.on("touchmove",t),this.on("touchend",i),this.on("touchcancel",i))},vjs.Component.prototype.setTimeout=function(t,e){t=vjs.bind(this,t);var i=setTimeout(t,e),n=function(){this.clearTimeout(i)};return n.guid="vjs-timeout-"+i,this.on("dispose",n),i},vjs.Component.prototype.clearTimeout=function(t){clearTimeout(t);var e=function(){};return e.guid="vjs-timeout-"+t,this.off("dispose",e),t},vjs.Component.prototype.setInterval=function(t,e){t=vjs.bind(this,t);var i=setInterval(t,e),n=function(){this.clearInterval(i)};return n.guid="vjs-interval-"+i,this.on("dispose",n),i},vjs.Component.prototype.clearInterval=function(t){clearInterval(t);var e=function(){};return e.guid="vjs-interval-"+t,this.off("dispose",e),t},vjs.Button=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.emitTapEvents(),this.on("tap",this.onClick),this.on("click",this.onClick),this.on("focus",this.onFocus),this.on("blur",this.onBlur)}}),vjs.Button.prototype.createEl=function(t,e){var i;return e=vjs.obj.merge({className:this.buildCSSClass(),role:"button","aria-live":"polite",tabIndex:0},e),i=vjs.Component.prototype.createEl.call(this,t,e),e.innerHTML||(this.contentEl_=vjs.createEl("div",{className:"vjs-control-content"}),this.controlText_=vjs.createEl("span",{className:"vjs-control-text",innerHTML:this.localize(this.buttonText)||"Need Text"}),this.contentEl_.appendChild(this.controlText_),i.appendChild(this.contentEl_)),i},vjs.Button.prototype.buildCSSClass=function(){return"vjs-control "+vjs.Component.prototype.buildCSSClass.call(this)},vjs.Button.prototype.onClick=function(){},vjs.Button.prototype.onFocus=function(){vjs.on(document,"keydown",vjs.bind(this,this.onKeyPress))},vjs.Button.prototype.onKeyPress=function(t){(32==t.which||13==t.which)&&(t.preventDefault(),this.onClick())},vjs.Button.prototype.onBlur=function(){vjs.off(document,"keydown",vjs.bind(this,this.onKeyPress))},vjs.Slider=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.bar=this.getChild(this.options_.barName),this.handle=this.getChild(this.options_.handleName),this.on("mousedown",this.onMouseDown),this.on("touchstart",this.onMouseDown),this.on("focus",this.onFocus),this.on("blur",this.onBlur),this.on("click",this.onClick),this.on(t,"controlsvisible",this.update),this.on(t,this.playerEvent,this.update)}}),vjs.Slider.prototype.createEl=function(t,e){return e=e||{},e.className=e.className+" vjs-slider",e=vjs.obj.merge({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},e),vjs.Component.prototype.createEl.call(this,t,e)},vjs.Slider.prototype.onMouseDown=function(t){t.preventDefault(),vjs.blockTextSelection(),this.addClass("vjs-sliding"),this.on(document,"mousemove",this.onMouseMove),this.on(document,"mouseup",this.onMouseUp),this.on(document,"touchmove",this.onMouseMove),this.on(document,"touchend",this.onMouseUp),this.onMouseMove(t)},vjs.Slider.prototype.onMouseMove=function(){},vjs.Slider.prototype.onMouseUp=function(){vjs.unblockTextSelection(),this.removeClass("vjs-sliding"),this.off(document,"mousemove",this.onMouseMove),this.off(document,"mouseup",this.onMouseUp),this.off(document,"touchmove",this.onMouseMove),this.off(document,"touchend",this.onMouseUp),this.update()},vjs.Slider.prototype.update=function(){if(this.el_){var t,e=this.getPercent(),i=this.handle,n=this.bar;if(("number"!=typeof e||e!==e||0>e||e===1/0)&&(e=0),t=e,i){var s=this.el_,o=s.offsetWidth,r=i.el().offsetWidth,a=r?r/o:0,l=1-a,h=e*l;t=h+a/2,i.el().style.left=vjs.round(100*h,2)+"%"}n&&(n.el().style.width=vjs.round(100*t,2)+"%")}},vjs.Slider.prototype.calculateDistance=function(t){var e,i,n,s,o,r,a,l,h;if(e=this.el_,i=vjs.findPosition(e),o=r=e.offsetWidth,a=this.handle,this.options().vertical){if(s=i.top,h=t.changedTouches?t.changedTouches[0].pageY:t.pageY,a){var c=a.el().offsetHeight;s+=c/2,r-=c}return Math.max(0,Math.min(1,(s-h+r)/r))}if(n=i.left,l=t.changedTouches?t.changedTouches[0].pageX:t.pageX,a){var u=a.el().offsetWidth;n+=u/2,o-=u}return Math.max(0,Math.min(1,(l-n)/o))},vjs.Slider.prototype.onFocus=function(){this.on(document,"keydown",this.onKeyPress)},vjs.Slider.prototype.onKeyPress=function(t){37==t.which||40==t.which?(t.preventDefault(),this.stepBack()):(38==t.which||39==t.which)&&(t.preventDefault(),this.stepForward())},vjs.Slider.prototype.onBlur=function(){this.off(document,"keydown",this.onKeyPress)},vjs.Slider.prototype.onClick=function(t){t.stopImmediatePropagation(),t.preventDefault()},vjs.SliderHandle=vjs.Component.extend(),vjs.SliderHandle.prototype.defaultValue=0,vjs.SliderHandle.prototype.createEl=function(t,e){return e=e||{},e.className=e.className+" vjs-slider-handle",e=vjs.obj.merge({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},e),vjs.Component.prototype.createEl.call(this,"div",e)},vjs.Menu=vjs.Component.extend(),vjs.Menu.prototype.addItem=function(t){this.addChild(t),t.on("click",vjs.bind(this,function(){this.unlockShowing()}))},vjs.Menu.prototype.createEl=function(){var t=this.options().contentElType||"ul";this.contentEl_=vjs.createEl(t,{className:"vjs-menu-content"});var e=vjs.Component.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return e.appendChild(this.contentEl_),vjs.on(e,"click",function(t){t.preventDefault(),t.stopImmediatePropagation()}),e},vjs.MenuItem=vjs.Button.extend({init:function(t,e){vjs.Button.call(this,t,e),this.selected(e.selected)}}),vjs.MenuItem.prototype.createEl=function(t,e){return vjs.Button.prototype.createEl.call(this,"li",vjs.obj.merge({className:"vjs-menu-item",innerHTML:this.localize(this.options_.label)},e))},vjs.MenuItem.prototype.onClick=function(){this.selected(!0)},vjs.MenuItem.prototype.selected=function(t){t?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-selected",!0)):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-selected",!1))},vjs.MenuButton=vjs.Button.extend({init:function(t,e){vjs.Button.call(this,t,e),this.update(),this.on("keydown",this.onKeyPress),this.el_.setAttribute("aria-haspopup",!0),this.el_.setAttribute("role","button");
}}),vjs.MenuButton.prototype.update=function(){var t=this.createMenu();this.menu&&this.removeChild(this.menu),this.menu=t,this.addChild(t),this.items&&0===this.items.length?this.hide():this.items&&this.items.length>1&&this.show()},vjs.MenuButton.prototype.buttonPressed_=!1,vjs.MenuButton.prototype.createMenu=function(){var t=new vjs.Menu(this.player_);if(this.options().title&&t.contentEl().appendChild(vjs.createEl("li",{className:"vjs-menu-title",innerHTML:vjs.capitalize(this.options().title),tabindex:-1})),this.items=this.createItems(),this.items)for(var e=0;e<this.items.length;e++)t.addItem(this.items[e]);return t},vjs.MenuButton.prototype.createItems=function(){},vjs.MenuButton.prototype.buildCSSClass=function(){return this.className+" vjs-menu-button "+vjs.Button.prototype.buildCSSClass.call(this)},vjs.MenuButton.prototype.onFocus=function(){},vjs.MenuButton.prototype.onBlur=function(){},vjs.MenuButton.prototype.onClick=function(){this.one("mouseout",vjs.bind(this,function(){this.menu.unlockShowing(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},vjs.MenuButton.prototype.onKeyPress=function(t){32==t.which||13==t.which?(this.buttonPressed_?this.unpressButton():this.pressButton(),t.preventDefault()):27==t.which&&(this.buttonPressed_&&this.unpressButton(),t.preventDefault())},vjs.MenuButton.prototype.pressButton=function(){this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-pressed",!0),this.items&&this.items.length>0&&this.items[0].el().focus()},vjs.MenuButton.prototype.unpressButton=function(){this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-pressed",!1)},vjs.MediaError=function(t){"number"==typeof t?this.code=t:"string"==typeof t?this.message=t:"object"==typeof t&&vjs.obj.merge(this,t),this.message||(this.message=vjs.MediaError.defaultMessages[this.code]||"")},vjs.MediaError.prototype.code=0,vjs.MediaError.prototype.message="",vjs.MediaError.prototype.status=null,vjs.MediaError.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],vjs.MediaError.defaultMessages={1:"You aborted the video playback",2:"A network error caused the video download to fail part-way.",3:"The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",4:"The video could not be loaded, either because the server or network failed or because the format is not supported.",5:"The video is encrypted and we do not have the keys to decrypt it."};for(var errNum=0;errNum<vjs.MediaError.errorTypes.length;errNum++)vjs.MediaError[vjs.MediaError.errorTypes[errNum]]=errNum,vjs.MediaError.prototype[vjs.MediaError.errorTypes[errNum]]=errNum;if(function(){var t,e,i,n;for(vjs.browser.fullscreenAPI,t=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],e=t[0],n=0;n<t.length;n++)if(t[n][1]in document){i=t[n];break}if(i)for(vjs.browser.fullscreenAPI={},n=0;n<i.length;n++)vjs.browser.fullscreenAPI[e[n]]=i[n]}(),vjs.Player=vjs.Component.extend({init:function(t,e,i){this.tag=t,t.id=t.id||"vjs_video_"+vjs.guid++,this.tagAttributes=t&&vjs.getElementAttributes(t),e=vjs.obj.merge(this.getTagSettings(t),e),this.language_=e.language||vjs.options.language,this.languages_=e.languages||vjs.options.languages,this.cache_={},this.poster_=e.poster||"",this.controls_=!!e.controls,t.controls=!1,e.reportTouchActivity=!1,this.isAudio("audio"===this.tag.nodeName.toLowerCase()),vjs.Component.call(this,this,e,i),this.controls()?this.addClass("vjs-controls-enabled"):this.addClass("vjs-controls-disabled"),this.isAudio()&&this.addClass("vjs-audio"),vjs.players[this.id_]=this,e.plugins&&vjs.obj.each(e.plugins,function(t,e){this[t](e)},this),this.listenForUserActivity()}}),vjs.Player.prototype.language_,vjs.Player.prototype.language=function(t){return void 0===t?this.language_:(this.language_=t,this)},vjs.Player.prototype.languages_,vjs.Player.prototype.languages=function(){return this.languages_},vjs.Player.prototype.options_=vjs.options,vjs.Player.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),vjs.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech&&this.tech.dispose(),vjs.Component.prototype.dispose.call(this)},vjs.Player.prototype.getTagSettings=function(t){var e,i,n={sources:[],tracks:[]};if(e=vjs.getElementAttributes(t),i=e["data-setup"],null!==i&&vjs.obj.merge(e,vjs.JSON.parse(i||"{}")),vjs.obj.merge(n,e),t.hasChildNodes()){var s,o,r,a,l;for(s=t.childNodes,a=0,l=s.length;l>a;a++)o=s[a],r=o.nodeName.toLowerCase(),"source"===r?n.sources.push(vjs.getElementAttributes(o)):"track"===r&&n.tracks.push(vjs.getElementAttributes(o))}return n},vjs.Player.prototype.createEl=function(){var t=this.el_=vjs.Component.prototype.createEl.call(this,"div"),e=this.tag,i;return e.removeAttribute("width"),e.removeAttribute("height"),i=vjs.getElementAttributes(e),vjs.obj.each(i,function(e){"class"==e?t.className=i[e]:t.setAttribute(e,i[e])}),e.id+="_html5_api",e.className="vjs-tech",e.player=t.player=this,this.addClass("vjs-paused"),this.width(this.options_.width,!0),this.height(this.options_.height,!0),e.initNetworkState_=e.networkState,e.parentNode&&e.parentNode.insertBefore(t,e),vjs.insertFirst(e,t),this.el_=t,this.on("loadstart",this.onLoadStart),this.on("waiting",this.onWaiting),this.on(["canplay","canplaythrough","playing","ended"],this.onWaitEnd),this.on("seeking",this.onSeeking),this.on("seeked",this.onSeeked),this.on("ended",this.onEnded),this.on("play",this.onPlay),this.on("firstplay",this.onFirstPlay),this.on("pause",this.onPause),this.on("progress",this.onProgress),this.on("durationchange",this.onDurationChange),this.on("fullscreenchange",this.onFullscreenChange),t},vjs.Player.prototype.loadTech=function(t,e){this.tech&&this.unloadTech(),"Html5"!==t&&this.tag&&(vjs.Html5.disposeMediaElement(this.tag),this.tag=null),this.techName=t,this.isReady_=!1;var i=function(){this.player_.triggerReady()},n=vjs.obj.merge({source:e,parentEl:this.el_},this.options_[t.toLowerCase()]);e&&(this.currentType_=e.type,e.src==this.cache_.src&&this.cache_.currentTime>0&&(n.startTime=this.cache_.currentTime),this.cache_.src=e.src),this.tech=new window.videojs[t](this,n),this.tech.ready(i)},vjs.Player.prototype.unloadTech=function(){this.isReady_=!1,this.tech.dispose(),this.tech=!1},vjs.Player.prototype.onLoadStart=function(){this.removeClass("vjs-ended"),this.error(null),this.paused()?this.hasStarted(!1):this.trigger("firstplay")},vjs.Player.prototype.hasStarted_=!1,vjs.Player.prototype.hasStarted=function(t){return void 0!==t?(this.hasStarted_!==t&&(this.hasStarted_=t,t?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started")),this):this.hasStarted_},vjs.Player.prototype.onLoadedMetaData,vjs.Player.prototype.onLoadedData,vjs.Player.prototype.onLoadedAllData,vjs.Player.prototype.onPlay=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0)},vjs.Player.prototype.onWaiting=function(){this.addClass("vjs-waiting")},vjs.Player.prototype.onWaitEnd=function(){this.removeClass("vjs-waiting")},vjs.Player.prototype.onSeeking=function(){this.addClass("vjs-seeking")},vjs.Player.prototype.onSeeked=function(){this.removeClass("vjs-seeking")},vjs.Player.prototype.onFirstPlay=function(){this.options_.starttime&&this.currentTime(this.options_.starttime),this.addClass("vjs-has-started")},vjs.Player.prototype.onPause=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused")},vjs.Player.prototype.onTimeUpdate,vjs.Player.prototype.onProgress=function(){1==this.bufferedPercent()&&this.trigger("loadedalldata")},vjs.Player.prototype.onEnded=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause()},vjs.Player.prototype.onDurationChange=function(){var t=this.techGet("duration");t&&(0>t&&(t=1/0),this.duration(t),t===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"))},vjs.Player.prototype.onVolumeChange,vjs.Player.prototype.onFullscreenChange=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},vjs.Player.prototype.onError,vjs.Player.prototype.cache_,vjs.Player.prototype.getCache=function(){return this.cache_},vjs.Player.prototype.techCall=function(t,e){if(this.tech&&!this.tech.isReady_)this.tech.ready(function(){this[t](e)});else try{this.tech[t](e)}catch(i){throw vjs.log(i),i}},vjs.Player.prototype.techGet=function(t){if(this.tech&&this.tech.isReady_)try{return this.tech[t]()}catch(e){throw void 0===this.tech[t]?vjs.log("Video.js: "+t+" method not defined for "+this.techName+" playback technology.",e):"TypeError"==e.name?(vjs.log("Video.js: "+t+" unavailable on "+this.techName+" playback technology element.",e),this.tech.isReady_=!1):vjs.log(e),e}},vjs.Player.prototype.play=function(){return this.techCall("play"),this},vjs.Player.prototype.pause=function(){return this.techCall("pause"),this},vjs.Player.prototype.paused=function(){return this.techGet("paused")===!1?!1:!0},vjs.Player.prototype.currentTime=function(t){return void 0!==t?(this.techCall("setCurrentTime",t),this):this.cache_.currentTime=this.techGet("currentTime")||0},vjs.Player.prototype.duration=function(t){return void 0!==t?(this.cache_.duration=parseFloat(t),this):(void 0===this.cache_.duration&&this.onDurationChange(),this.cache_.duration||0)},vjs.Player.prototype.remainingTime=function(){return this.duration()-this.currentTime()},vjs.Player.prototype.buffered=function(){var t=this.techGet("buffered");return t&&t.length||(t=vjs.createTimeRange(0,0)),t},vjs.Player.prototype.bufferedPercent=function(){var t=this.duration(),e=this.buffered(),i=0,n,s;if(!t)return 0;for(var o=0;o<e.length;o++)n=e.start(o),s=e.end(o),s>t&&(s=t),i+=s-n;return i/t},vjs.Player.prototype.bufferedEnd=function(){var t=this.buffered(),e=this.duration(),i=t.end(t.length-1);return i>e&&(i=e),i},vjs.Player.prototype.volume=function(t){var e;return void 0!==t?(e=Math.max(0,Math.min(1,parseFloat(t))),this.cache_.volume=e,this.techCall("setVolume",e),vjs.setLocalStorage("volume",e),this):(e=parseFloat(this.techGet("volume")),isNaN(e)?1:e)},vjs.Player.prototype.muted=function(t){return void 0!==t?(this.techCall("setMuted",t),this):this.techGet("muted")||!1},vjs.Player.prototype.supportsFullScreen=function(){return this.techGet("supportsFullScreen")||!1},vjs.Player.prototype.isFullscreen_=!1,vjs.Player.prototype.isFullscreen=function(t){return void 0!==t?(this.isFullscreen_=!!t,this):this.isFullscreen_},vjs.Player.prototype.isFullScreen=function(t){return vjs.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'),this.isFullscreen(t)},vjs.Player.prototype.requestFullscreen=function(){var t=vjs.browser.fullscreenAPI;return this.isFullscreen(!0),t?(vjs.on(document,t.fullscreenchange,vjs.bind(this,function(e){this.isFullscreen(document[t.fullscreenElement]),this.isFullscreen()===!1&&vjs.off(document,t.fullscreenchange,arguments.callee),this.trigger("fullscreenchange")})),this.el_[t.requestFullscreen]()):this.tech.supportsFullScreen()?this.techCall("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange")),this},vjs.Player.prototype.requestFullScreen=function(){return vjs.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")'),this.requestFullscreen()},vjs.Player.prototype.exitFullscreen=function(){var t=vjs.browser.fullscreenAPI;return this.isFullscreen(!1),t?document[t.exitFullscreen]():this.tech.supportsFullScreen()?this.techCall("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange")),this},vjs.Player.prototype.cancelFullScreen=function(){return vjs.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()"),this.exitFullscreen()},vjs.Player.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=document.documentElement.style.overflow,vjs.on(document,"keydown",vjs.bind(this,this.fullWindowOnEscKey)),document.documentElement.style.overflow="hidden",vjs.addClass(document.body,"vjs-full-window"),this.trigger("enterFullWindow")},vjs.Player.prototype.fullWindowOnEscKey=function(t){27===t.keyCode&&(this.isFullscreen()===!0?this.exitFullscreen():this.exitFullWindow())},vjs.Player.prototype.exitFullWindow=function(){this.isFullWindow=!1,vjs.off(document,"keydown",this.fullWindowOnEscKey),document.documentElement.style.overflow=this.docOrigOverflow,vjs.removeClass(document.body,"vjs-full-window"),this.trigger("exitFullWindow")},vjs.Player.prototype.selectSource=function(t){for(var e=0,i=this.options_.techOrder;e<i.length;e++){var n=vjs.capitalize(i[e]),s=window.videojs[n];if(s){if(s.isSupported())for(var o=0,r=t;o<r.length;o++){var a=r[o];if(s.canPlaySource(a))return{source:a,tech:n}}}else vjs.log.error('The "'+n+'" tech is undefined. Skipped browser support check for that tech.')}return!1},vjs.Player.prototype.src=function(t){return void 0===t?this.techGet("src"):(vjs.obj.isArray(t)?this.sourceList_(t):"string"==typeof t?this.src({src:t}):t instanceof Object&&(t.type&&!window.videojs[this.techName].canPlaySource(t)?this.sourceList_([t]):(this.cache_.src=t.src,this.currentType_=t.type||"",this.ready(function(){window.videojs[this.techName].prototype.hasOwnProperty("setSource")?this.techCall("setSource",t):this.techCall("src",t.src),"auto"==this.options_.preload&&this.load(),this.options_.autoplay&&this.play()}))),this)},vjs.Player.prototype.sourceList_=function(t){var e=this.selectSource(t);e?e.tech===this.techName?this.src(e.source):this.loadTech(e.tech,e.source):(this.setTimeout(function(){this.error({code:4,message:this.localize(this.options().notSupportedMessage)})},0),this.triggerReady())},vjs.Player.prototype.load=function(){return this.techCall("load"),this},vjs.Player.prototype.currentSrc=function(){return this.techGet("currentSrc")||this.cache_.src||""},vjs.Player.prototype.currentType=function(){return this.currentType_||""},vjs.Player.prototype.preload=function(t){return void 0!==t?(this.techCall("setPreload",t),this.options_.preload=t,this):this.techGet("preload")},vjs.Player.prototype.autoplay=function(t){return void 0!==t?(this.techCall("setAutoplay",t),this.options_.autoplay=t,this):this.techGet("autoplay",t)},vjs.Player.prototype.loop=function(t){return void 0!==t?(this.techCall("setLoop",t),this.options_.loop=t,this):this.techGet("loop")},vjs.Player.prototype.poster_,vjs.Player.prototype.poster=function(t){return void 0===t?this.poster_:(t||(t=""),this.poster_=t,this.techCall("setPoster",t),this.trigger("posterchange"),this)},vjs.Player.prototype.controls_,vjs.Player.prototype.controls=function(t){return void 0!==t?(t=!!t,this.controls_!==t&&(this.controls_=t,t?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled")):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"))),this):this.controls_},vjs.Player.prototype.usingNativeControls_,vjs.Player.prototype.usingNativeControls=function(t){return void 0!==t?(t=!!t,this.usingNativeControls_!==t&&(this.usingNativeControls_=t,t?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))),this):this.usingNativeControls_},vjs.Player.prototype.error_=null,vjs.Player.prototype.error=function(t){return void 0===t?this.error_:null===t?(this.error_=t,this.removeClass("vjs-error"),this):(t instanceof vjs.MediaError?this.error_=t:this.error_=new vjs.MediaError(t),this.trigger("error"),this.addClass("vjs-error"),vjs.log.error("(CODE:"+this.error_.code+" "+vjs.MediaError.errorTypes[this.error_.code]+")",this.error_.message,this.error_),this)},vjs.Player.prototype.ended=function(){return this.techGet("ended")},vjs.Player.prototype.seeking=function(){return this.techGet("seeking")},vjs.Player.prototype.seekable=function(){return this.techGet("seekable")},vjs.Player.prototype.userActivity_=!0,vjs.Player.prototype.reportUserActivity=function(t){this.userActivity_=!0},vjs.Player.prototype.userActive_=!0,vjs.Player.prototype.userActive=function(t){return void 0!==t?(t=!!t,t!==this.userActive_&&(this.userActive_=t,t?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech&&this.tech.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive"))),this):this.userActive_},vjs.Player.prototype.listenForUserActivity=function(){var t,e,i,n,s,o,r,a,l;t=vjs.bind(this,this.reportUserActivity),e=function(e){(e.screenX!=a||e.screenY!=l)&&(a=e.screenX,l=e.screenY,t())},i=function(){t(),this.clearInterval(n),n=this.setInterval(t,250)},s=function(e){t(),this.clearInterval(n)},this.on("mousedown",i),this.on("mousemove",e),this.on("mouseup",s),this.on("keydown",t),this.on("keyup",t),o=this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(r);var t=this.options().inactivityTimeout;t>0&&(r=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},t))}},250)},vjs.Player.prototype.playbackRate=function(t){return void 0!==t?(this.techCall("setPlaybackRate",t),this):this.tech&&this.tech.featuresPlaybackRate?this.techGet("playbackRate"):1},vjs.Player.prototype.isAudio_=!1,vjs.Player.prototype.isAudio=function(t){return void 0!==t?(this.isAudio_=!!t,this):this.isAudio_},vjs.Player.prototype.networkState=function(){return this.techGet("networkState")},vjs.Player.prototype.readyState=function(){return this.techGet("readyState")},vjs.Player.prototype.textTracks=function(){return this.tech&&this.tech.textTracks()},vjs.Player.prototype.remoteTextTracks=function(){return this.tech&&this.tech.remoteTextTracks()},vjs.Player.prototype.addTextTrack=function(t,e,i){return this.tech&&this.tech.addTextTrack(t,e,i)},vjs.Player.prototype.addRemoteTextTrack=function(t){return this.tech&&this.tech.addRemoteTextTrack(t)},vjs.Player.prototype.removeRemoteTextTrack=function(t){this.tech&&this.tech.removeRemoteTextTrack(t)},vjs.ControlBar=vjs.Component.extend(),vjs.ControlBar.prototype.options_={loadEvent:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},liveDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{},playbackRateMenuButton:{},subtitlesButton:{},captionsButton:{},chaptersButton:{}}},vjs.ControlBar.prototype.createEl=function(){return vjs.createEl("div",{className:"vjs-control-bar"})},vjs.LiveDisplay=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e)}}),vjs.LiveDisplay.prototype.createEl=function(){var t=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-live-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE"),"aria-live":"off"}),t.appendChild(this.contentEl_),t},vjs.PlayToggle=vjs.Button.extend({init:function(t,e){vjs.Button.call(this,t,e),this.on(t,"play",this.onPlay),this.on(t,"pause",this.onPause)}}),vjs.PlayToggle.prototype.buttonText="Play",vjs.PlayToggle.prototype.buildCSSClass=function(){return"vjs-play-control "+vjs.Button.prototype.buildCSSClass.call(this)},vjs.PlayToggle.prototype.onClick=function(){this.player_.paused()?this.player_.play():this.player_.pause()},vjs.PlayToggle.prototype.onPlay=function(){this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.el_.children[0].children[0].innerHTML=this.localize("Pause")},vjs.PlayToggle.prototype.onPause=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.el_.children[0].children[0].innerHTML=this.localize("Play")},vjs.CurrentTimeDisplay=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.on(t,"timeupdate",this.updateContent)}}),vjs.CurrentTimeDisplay.prototype.createEl=function(){var t=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"}),t.appendChild(this.contentEl_),t},vjs.CurrentTimeDisplay.prototype.updateContent=function(){var t=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();this.contentEl_.innerHTML='<span class="vjs-control-text">'+this.localize("Current Time")+"</span> "+vjs.formatTime(t,this.player_.duration())},vjs.DurationDisplay=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.on(t,"timeupdate",this.updateContent),this.on(t,"loadedmetadata",this.updateContent)}}),vjs.DurationDisplay.prototype.createEl=function(){var t=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00","aria-live":"off"}),t.appendChild(this.contentEl_),t},vjs.DurationDisplay.prototype.updateContent=function(){var t=this.player_.duration();t&&(this.contentEl_.innerHTML='<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> "+vjs.formatTime(t))},vjs.TimeDivider=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e)}}),vjs.TimeDivider.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},vjs.RemainingTimeDisplay=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.on(t,"timeupdate",this.updateContent)}}),vjs.RemainingTimeDisplay.prototype.createEl=function(){var t=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});return this.contentEl_=vjs.createEl("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00","aria-live":"off"}),t.appendChild(this.contentEl_),t},vjs.RemainingTimeDisplay.prototype.updateContent=function(){this.player_.duration()&&(this.contentEl_.innerHTML='<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -"+vjs.formatTime(this.player_.remainingTime()))},vjs.FullscreenToggle=vjs.Button.extend({init:function(t,e){vjs.Button.call(this,t,e)}}),vjs.FullscreenToggle.prototype.buttonText="Fullscreen",vjs.FullscreenToggle.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+vjs.Button.prototype.buildCSSClass.call(this)},vjs.FullscreenToggle.prototype.onClick=function(){this.player_.isFullscreen()?(this.player_.exitFullscreen(),this.controlText_.innerHTML=this.localize("Fullscreen")):(this.player_.requestFullscreen(),this.controlText_.innerHTML=this.localize("Non-Fullscreen"))},vjs.ProgressControl=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e)}}),vjs.ProgressControl.prototype.options_={children:{seekBar:{}}},vjs.ProgressControl.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},vjs.SeekBar=vjs.Slider.extend({init:function(t,e){vjs.Slider.call(this,t,e),this.on(t,"timeupdate",this.updateARIAAttributes),t.ready(vjs.bind(this,this.updateARIAAttributes))}}),vjs.SeekBar.prototype.options_={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"},vjs.SeekBar.prototype.playerEvent="timeupdate",vjs.SeekBar.prototype.createEl=function(){return vjs.Slider.prototype.createEl.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})},vjs.SeekBar.prototype.updateARIAAttributes=function(){var t=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("aria-valuenow",vjs.round(100*this.getPercent(),2)),this.el_.setAttribute("aria-valuetext",vjs.formatTime(t,this.player_.duration()))},vjs.SeekBar.prototype.getPercent=function(){return this.player_.currentTime()/this.player_.duration()},vjs.SeekBar.prototype.onMouseDown=function(t){vjs.Slider.prototype.onMouseDown.call(this,t),this.player_.scrubbing=!0,this.player_.addClass("vjs-scrubbing"),this.videoWasPlaying=!this.player_.paused(),this.player_.pause()},vjs.SeekBar.prototype.onMouseMove=function(t){var e=this.calculateDistance(t)*this.player_.duration();e==this.player_.duration()&&(e-=.1),this.player_.currentTime(e)},vjs.SeekBar.prototype.onMouseUp=function(t){vjs.Slider.prototype.onMouseUp.call(this,t),this.player_.scrubbing=!1,this.player_.removeClass("vjs-scrubbing"),this.videoWasPlaying&&this.player_.play()},vjs.SeekBar.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},vjs.SeekBar.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},vjs.LoadProgressBar=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.on(t,"progress",this.update)}}),vjs.LoadProgressBar.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},vjs.LoadProgressBar.prototype.update=function(){var t,e,i,n,s=this.player_.buffered(),o=this.player_.duration(),r=this.player_.bufferedEnd(),a=this.el_.children,l=function(t,e){var i=t/e||0;return 100*i+"%"};for(this.el_.style.width=l(r,o),t=0;t<s.length;t++)e=s.start(t),i=s.end(t),n=a[t],n||(n=this.el_.appendChild(vjs.createEl())),n.style.left=l(e,r),n.style.width=l(i-e,r);for(t=a.length;t>s.length;t--)this.el_.removeChild(a[t-1])},vjs.PlayProgressBar=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e)}}),vjs.PlayProgressBar.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},vjs.SeekHandle=vjs.SliderHandle.extend({init:function(t,e){vjs.SliderHandle.call(this,t,e),this.on(t,"timeupdate",this.updateContent)}}),vjs.SeekHandle.prototype.defaultValue="00:00",vjs.SeekHandle.prototype.createEl=function(){return vjs.SliderHandle.prototype.createEl.call(this,"div",{className:"vjs-seek-handle","aria-live":"off"})},vjs.SeekHandle.prototype.updateContent=function(){var t=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.innerHTML='<span class="vjs-control-text">'+vjs.formatTime(t,this.player_.duration())+"</span>"},vjs.VolumeControl=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),t.tech&&t.tech.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),this.on(t,"loadstart",function(){t.tech.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")})}}),vjs.VolumeControl.prototype.options_={children:{volumeBar:{}}},vjs.VolumeControl.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control"})},vjs.VolumeBar=vjs.Slider.extend({init:function(t,e){vjs.Slider.call(this,t,e),this.on(t,"volumechange",this.updateARIAAttributes),t.ready(vjs.bind(this,this.updateARIAAttributes))}}),vjs.VolumeBar.prototype.updateARIAAttributes=function(){this.el_.setAttribute("aria-valuenow",vjs.round(100*this.player_.volume(),2)),this.el_.setAttribute("aria-valuetext",vjs.round(100*this.player_.volume(),2)+"%")},vjs.VolumeBar.prototype.options_={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"},vjs.VolumeBar.prototype.playerEvent="volumechange",vjs.VolumeBar.prototype.createEl=function(){return vjs.Slider.prototype.createEl.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})},vjs.VolumeBar.prototype.onMouseMove=function(t){this.player_.muted()&&this.player_.muted(!1),this.player_.volume(this.calculateDistance(t))},vjs.VolumeBar.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},vjs.VolumeBar.prototype.stepForward=function(){this.player_.volume(this.player_.volume()+.1)},vjs.VolumeBar.prototype.stepBack=function(){this.player_.volume(this.player_.volume()-.1)},vjs.VolumeLevel=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e)}}),vjs.VolumeLevel.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},vjs.VolumeHandle=vjs.SliderHandle.extend(),vjs.VolumeHandle.prototype.defaultValue="00:00",vjs.VolumeHandle.prototype.createEl=function(){return vjs.SliderHandle.prototype.createEl.call(this,"div",{className:"vjs-volume-handle"})},vjs.MuteToggle=vjs.Button.extend({init:function(t,e){vjs.Button.call(this,t,e),this.on(t,"volumechange",this.update),t.tech&&t.tech.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),this.on(t,"loadstart",function(){t.tech.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")})}}),vjs.MuteToggle.prototype.createEl=function(){return vjs.Button.prototype.createEl.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.localize("Mute")+"</span></div>"})},vjs.MuteToggle.prototype.onClick=function(){this.player_.muted(this.player_.muted()?!1:!0)},vjs.MuteToggle.prototype.update=function(){var t=this.player_.volume(),e=3;0===t||this.player_.muted()?e=0:.33>t?e=1:.67>t&&(e=2),this.player_.muted()?this.el_.children[0].children[0].innerHTML!=this.localize("Unmute")&&(this.el_.children[0].children[0].innerHTML=this.localize("Unmute")):this.el_.children[0].children[0].innerHTML!=this.localize("Mute")&&(this.el_.children[0].children[0].innerHTML=this.localize("Mute"));for(var i=0;4>i;i++)vjs.removeClass(this.el_,"vjs-vol-"+i);vjs.addClass(this.el_,"vjs-vol-"+e)},vjs.VolumeMenuButton=vjs.MenuButton.extend({init:function(t,e){vjs.MenuButton.call(this,t,e),this.on(t,"volumechange",this.volumeUpdate),t.tech&&t.tech.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),this.on(t,"loadstart",function(){t.tech.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),this.addClass("vjs-menu-button")}}),vjs.VolumeMenuButton.prototype.createMenu=function(){var t=new vjs.Menu(this.player_,{contentElType:"div"}),e=new vjs.VolumeBar(this.player_,this.options_.volumeBar);return e.on("focus",function(){t.lockShowing()}),e.on("blur",function(){t.unlockShowing()}),t.addChild(e),t},vjs.VolumeMenuButton.prototype.onClick=function(){vjs.MuteToggle.prototype.onClick.call(this),vjs.MenuButton.prototype.onClick.call(this)},vjs.VolumeMenuButton.prototype.createEl=function(){return vjs.Button.prototype.createEl.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.localize("Mute")+"</span></div>"
})},vjs.VolumeMenuButton.prototype.volumeUpdate=vjs.MuteToggle.prototype.update,vjs.PlaybackRateMenuButton=vjs.MenuButton.extend({init:function(t,e){vjs.MenuButton.call(this,t,e),this.updateVisibility(),this.updateLabel(),this.on(t,"loadstart",this.updateVisibility),this.on(t,"ratechange",this.updateLabel)}}),vjs.PlaybackRateMenuButton.prototype.buttonText="Playback Rate",vjs.PlaybackRateMenuButton.prototype.className="vjs-playback-rate",vjs.PlaybackRateMenuButton.prototype.createEl=function(){var t=vjs.MenuButton.prototype.createEl.call(this);return this.labelEl_=vjs.createEl("div",{className:"vjs-playback-rate-value",innerHTML:1}),t.appendChild(this.labelEl_),t},vjs.PlaybackRateMenuButton.prototype.createMenu=function(){var t=new vjs.Menu(this.player()),e=this.player().options().playbackRates;if(e)for(var i=e.length-1;i>=0;i--)t.addChild(new vjs.PlaybackRateMenuItem(this.player(),{rate:e[i]+"x"}));return t},vjs.PlaybackRateMenuButton.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},vjs.PlaybackRateMenuButton.prototype.onClick=function(){for(var t=this.player().playbackRate(),e=this.player().options().playbackRates,i=e[0],n=0;n<e.length;n++)if(e[n]>t){i=e[n];break}this.player().playbackRate(i)},vjs.PlaybackRateMenuButton.prototype.playbackRateSupported=function(){return this.player().tech&&this.player().tech.featuresPlaybackRate&&this.player().options().playbackRates&&this.player().options().playbackRates.length>0},vjs.PlaybackRateMenuButton.prototype.updateVisibility=function(){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},vjs.PlaybackRateMenuButton.prototype.updateLabel=function(){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},vjs.PlaybackRateMenuItem=vjs.MenuItem.extend({contentElType:"button",init:function(t,e){var i=this.label=e.rate,n=this.rate=parseFloat(i,10);e.label=i,e.selected=1===n,vjs.MenuItem.call(this,t,e),this.on(t,"ratechange",this.update)}}),vjs.PlaybackRateMenuItem.prototype.onClick=function(){vjs.MenuItem.prototype.onClick.call(this),this.player().playbackRate(this.rate)},vjs.PlaybackRateMenuItem.prototype.update=function(){this.selected(this.player().playbackRate()==this.rate)},vjs.PosterImage=vjs.Button.extend({init:function(t,e){vjs.Button.call(this,t,e),this.update(),t.on("posterchange",vjs.bind(this,this.update))}}),vjs.PosterImage.prototype.dispose=function(){this.player().off("posterchange",this.update),vjs.Button.prototype.dispose.call(this)},vjs.PosterImage.prototype.createEl=function(){var t=vjs.createEl("div",{className:"vjs-poster",tabIndex:-1});return vjs.BACKGROUND_SIZE_SUPPORTED||(this.fallbackImg_=vjs.createEl("img"),t.appendChild(this.fallbackImg_)),t},vjs.PosterImage.prototype.update=function(){var t=this.player().poster();this.setSrc(t),t?this.show():this.hide()},vjs.PosterImage.prototype.setSrc=function(t){var e;this.fallbackImg_?this.fallbackImg_.src=t:(e="",t&&(e='url("'+t+'")'),this.el_.style.backgroundImage=e)},vjs.PosterImage.prototype.onClick=function(){this.player_.play()},vjs.LoadingSpinner=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e)}}),vjs.LoadingSpinner.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner"})},vjs.BigPlayButton=vjs.Button.extend(),vjs.BigPlayButton.prototype.createEl=function(){return vjs.Button.prototype.createEl.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})},vjs.BigPlayButton.prototype.onClick=function(){this.player_.play()},vjs.ErrorDisplay=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.update(),this.on(t,"error",this.update)}}),vjs.ErrorDisplay.prototype.createEl=function(){var t=vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-error-display"});return this.contentEl_=vjs.createEl("div"),t.appendChild(this.contentEl_),t},vjs.ErrorDisplay.prototype.update=function(){this.player().error()&&(this.contentEl_.innerHTML=this.localize(this.player().error().message))},function(){var t;vjs.MediaTechController=vjs.Component.extend({init:function(t,e,i){e=e||{},e.reportTouchActivity=!1,vjs.Component.call(this,t,e,i),this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),this.initControlsListeners(),this.featuresNativeTextTracks||this.emulateTextTracks(),this.initTextTrackListeners()}}),vjs.MediaTechController.prototype.initControlsListeners=function(){var t,e;t=this.player(),e=function(){t.controls()&&!t.usingNativeControls()&&this.addControlsListeners()},this.ready(e),this.on(t,"controlsenabled",e),this.on(t,"controlsdisabled",this.removeControlsListeners),this.ready(function(){this.networkState&&this.networkState()>0&&this.player().trigger("loadstart")})},vjs.MediaTechController.prototype.addControlsListeners=function(){var t;this.on("mousedown",this.onClick),this.on("touchstart",function(e){t=this.player_.userActive()}),this.on("touchmove",function(e){t&&this.player().reportUserActivity()}),this.on("touchend",function(t){t.preventDefault()}),this.emitTapEvents(),this.on("tap",this.onTap)},vjs.MediaTechController.prototype.removeControlsListeners=function(){this.off("tap"),this.off("touchstart"),this.off("touchmove"),this.off("touchleave"),this.off("touchcancel"),this.off("touchend"),this.off("click"),this.off("mousedown")},vjs.MediaTechController.prototype.onClick=function(t){0===t.button&&this.player().controls()&&(this.player().paused()?this.player().play():this.player().pause())},vjs.MediaTechController.prototype.onTap=function(){this.player().userActive(!this.player().userActive())},vjs.MediaTechController.prototype.manualProgressOn=function(){this.manualProgress=!0,this.trackProgress()},vjs.MediaTechController.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress()},vjs.MediaTechController.prototype.trackProgress=function(){this.progressInterval=this.setInterval(function(){var t=this.player().bufferedPercent();this.bufferedPercent_!=t&&this.player().trigger("progress"),this.bufferedPercent_=t,1===t&&this.stopTrackingProgress()},500)},vjs.MediaTechController.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},vjs.MediaTechController.prototype.manualTimeUpdatesOn=function(){var t=this.player_;this.manualTimeUpdates=!0,this.on(t,"play",this.trackCurrentTime),this.on(t,"pause",this.stopTrackingCurrentTime),this.one("timeupdate",function(){this.featuresTimeupdateEvents=!0,this.manualTimeUpdatesOff()})},vjs.MediaTechController.prototype.manualTimeUpdatesOff=function(){var t=this.player_;this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off(t,"play",this.trackCurrentTime),this.off(t,"pause",this.stopTrackingCurrentTime)},vjs.MediaTechController.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.player().trigger("timeupdate")},250)},vjs.MediaTechController.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.player().trigger("timeupdate")},vjs.MediaTechController.prototype.dispose=function(){this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),vjs.Component.prototype.dispose.call(this)},vjs.MediaTechController.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.player().trigger("timeupdate")},vjs.MediaTechController.prototype.initTextTrackListeners=function(){var t=this.player_,e,i=function(){var e=t.getChild("textTrackDisplay"),i;e&&e.updateDisplay()};e=this.textTracks(),e&&(e.addEventListener("removetrack",i),e.addEventListener("addtrack",i),this.on("dispose",vjs.bind(this,function(){e.removeEventListener("removetrack",i),e.removeEventListener("addtrack",i)})))},vjs.MediaTechController.prototype.emulateTextTracks=function(){var t=this.player_,e,i,n;window.WebVTT||(n=document.createElement("script"),n.src=t.options()["vtt.js"]||"../node_modules/vtt.js/dist/vtt.js",t.el().appendChild(n),window.WebVTT=!0),i=this.textTracks(),i&&(e=function(){var e,i,n;for(n=t.getChild("textTrackDisplay"),n.updateDisplay(),e=0;e<this.length;e++)i=this[e],i.removeEventListener("cuechange",vjs.bind(n,n.updateDisplay)),"showing"===i.mode&&i.addEventListener("cuechange",vjs.bind(n,n.updateDisplay))},i.addEventListener("change",e),this.on("dispose",vjs.bind(this,function(){i.removeEventListener("change",e)})))},vjs.MediaTechController.prototype.textTracks_,vjs.MediaTechController.prototype.textTracks=function(){return this.player_.textTracks_=this.player_.textTracks_||new vjs.TextTrackList,this.player_.textTracks_},vjs.MediaTechController.prototype.remoteTextTracks=function(){return this.player_.remoteTextTracks_=this.player_.remoteTextTracks_||new vjs.TextTrackList,this.player_.remoteTextTracks_},t=function(t,e,i,n,s){var o=t.textTracks(),r;return s=s||{},s.kind=e,i&&(s.label=i),n&&(s.language=n),s.player=t.player_,r=new vjs.TextTrack(s),o.addTrack_(r),r},vjs.MediaTechController.prototype.addTextTrack=function(e,i,n){if(!e)throw new Error("TextTrack kind is required but was not provided");return t(this,e,i,n)},vjs.MediaTechController.prototype.addRemoteTextTrack=function(e){var i=t(this,e.kind,e.label,e.language,e);return this.remoteTextTracks().addTrack_(i),{track:i}},vjs.MediaTechController.prototype.removeRemoteTextTrack=function(t){this.textTracks().removeTrack_(t),this.remoteTextTracks().removeTrack_(t)},vjs.MediaTechController.prototype.setPoster=function(){},vjs.MediaTechController.prototype.featuresVolumeControl=!0,vjs.MediaTechController.prototype.featuresFullscreenResize=!1,vjs.MediaTechController.prototype.featuresPlaybackRate=!1,vjs.MediaTechController.prototype.featuresProgressEvents=!1,vjs.MediaTechController.prototype.featuresTimeupdateEvents=!1,vjs.MediaTechController.prototype.featuresNativeTextTracks=!1,vjs.MediaTechController.withSourceHandlers=function(t){t.registerSourceHandler=function(e,i){var n=t.sourceHandlers;n||(n=t.sourceHandlers=[]),void 0===i&&(i=n.length),n.splice(i,0,e)},t.selectSourceHandler=function(e){for(var i=t.sourceHandlers||[],n,s=0;s<i.length;s++)if(n=i[s].canHandleSource(e))return i[s];return null},t.canPlaySource=function(e){var i=t.selectSourceHandler(e);return i?i.canHandleSource(e):""},t.prototype.setSource=function(e){var i=t.selectSourceHandler(e);return i||(t.nativeSourceHandler?i=t.nativeSourceHandler:vjs.log.error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),this.currentSource_=e,this.sourceHandler_=i.handleSource(e,this),this.on("dispose",this.disposeSourceHandler),this},t.prototype.disposeSourceHandler=function(){this.sourceHandler_&&this.sourceHandler_.dispose&&this.sourceHandler_.dispose()}},vjs.media={}}(),vjs.Html5=vjs.MediaTechController.extend({init:function(t,e,i){var n,s,o,r,a,l;(e.nativeCaptions===!1||e.nativeTextTracks===!1)&&(this.featuresNativeTextTracks=!1),vjs.MediaTechController.call(this,t,e,i),this.setupTriggers();var h=e.source;if(h&&(this.el_.currentSrc!==h.src||t.tag&&3===t.tag.initNetworkState_)&&this.setSource(h),this.el_.hasChildNodes()){for(n=this.el_.childNodes,s=n.length,l=[];s--;)r=n[s],a=r.nodeName.toLowerCase(),"track"===a&&(this.featuresNativeTextTracks?this.remoteTextTracks().addTrack_(r.track):l.push(r));for(o=0;o<l.length;o++)this.el_.removeChild(l[o])}this.featuresNativeTextTracks&&this.on("loadstart",vjs.bind(this,this.hideCaptions)),vjs.TOUCH_ENABLED&&t.options().nativeControlsForTouch===!0&&this.useNativeControls(),t.ready(function(){this.src()&&this.tag&&this.options_.autoplay&&this.paused()&&(delete this.tag.poster,this.play())}),this.triggerReady()}}),vjs.Html5.prototype.dispose=function(){vjs.Html5.disposeMediaElement(this.el_),vjs.MediaTechController.prototype.dispose.call(this)},vjs.Html5.prototype.createEl=function(){var t=this.player_,e,i,n,s=t.tag,o,r,a;if(!s||this.movingMediaElementInDOM===!1){if(s?(a=s.cloneNode(!1),vjs.Html5.disposeMediaElement(s),s=a,t.tag=null):(s=vjs.createEl("video"),o=videojs.util.mergeOptions({},t.tagAttributes),vjs.TOUCH_ENABLED&&t.options().nativeControlsForTouch===!0||delete o.controls,vjs.setElementAttributes(s,vjs.obj.merge(o,{id:t.id()+"_html5_api","class":"vjs-tech"}))),s.player=t,t.options_.tracks)for(n=0;n<t.options_.tracks.length;n++)e=t.options_.tracks[n],i=document.createElement("track"),i.kind=e.kind,i.label=e.label,i.srclang=e.srclang,i.src=e.src,"default"in e&&i.setAttribute("default","default"),s.appendChild(i);vjs.insertFirst(s,t.el())}var l=["autoplay","preload","loop","muted"];for(n=l.length-1;n>=0;n--){var h=l[n],c={};"undefined"!=typeof t.options_[h]&&(c[h]=t.options_[h]),vjs.setElementAttributes(s,c)}return s},vjs.Html5.prototype.hideCaptions=function(){for(var t=this.el_.querySelectorAll("track"),e,i=t.length,n={captions:1,subtitles:1};i--;)e=t[i].track,e&&e.kind in n&&!t[i]["default"]&&(e.mode="disabled")},vjs.Html5.prototype.setupTriggers=function(){for(var t=vjs.Html5.Events.length-1;t>=0;t--)this.on(vjs.Html5.Events[t],this.eventHandler)},vjs.Html5.prototype.eventHandler=function(t){"error"==t.type&&this.error()?this.player().error(this.error().code):(t.bubbles=!1,this.player().trigger(t))},vjs.Html5.prototype.useNativeControls=function(){var t,e,i,n,s;t=this,e=this.player(),t.setControls(e.controls()),i=function(){t.setControls(!0)},n=function(){t.setControls(!1)},e.on("controlsenabled",i),e.on("controlsdisabled",n),s=function(){e.off("controlsenabled",i),e.off("controlsdisabled",n)},t.on("dispose",s),e.on("usingcustomcontrols",s),e.usingNativeControls(!0)},vjs.Html5.prototype.play=function(){this.el_.play()},vjs.Html5.prototype.pause=function(){this.el_.pause()},vjs.Html5.prototype.paused=function(){return this.el_.paused},vjs.Html5.prototype.currentTime=function(){return this.el_.currentTime},vjs.Html5.prototype.setCurrentTime=function(t){try{this.el_.currentTime=t}catch(e){vjs.log(e,"Video is not ready. (Video.js)")}},vjs.Html5.prototype.duration=function(){return this.el_.duration||0},vjs.Html5.prototype.buffered=function(){return this.el_.buffered},vjs.Html5.prototype.volume=function(){return this.el_.volume},vjs.Html5.prototype.setVolume=function(t){this.el_.volume=t},vjs.Html5.prototype.muted=function(){return this.el_.muted},vjs.Html5.prototype.setMuted=function(t){this.el_.muted=t},vjs.Html5.prototype.width=function(){return this.el_.offsetWidth},vjs.Html5.prototype.height=function(){return this.el_.offsetHeight},vjs.Html5.prototype.supportsFullScreen=function(){return"function"!=typeof this.el_.webkitEnterFullScreen||!/Android/.test(vjs.USER_AGENT)&&/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)?!1:!0},vjs.Html5.prototype.enterFullScreen=function(){var t=this.el_;"webkitDisplayingFullscreen"in t&&this.one("webkitbeginfullscreen",function(){this.player_.isFullscreen(!0),this.one("webkitendfullscreen",function(){this.player_.isFullscreen(!1),this.player_.trigger("fullscreenchange")}),this.player_.trigger("fullscreenchange")}),t.paused&&t.networkState<=t.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){t.pause(),t.webkitEnterFullScreen()},0)):t.webkitEnterFullScreen()},vjs.Html5.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},vjs.Html5.prototype.returnOriginalIfBlobURI_=function(t,e){var i=/^blob\:/i;return e&&t&&i.test(t)?e:t},vjs.Html5.prototype.src=function(t){var e=this.el_.src;return void 0===t?this.returnOriginalIfBlobURI_(e,this.source_):void this.setSrc(t)},vjs.Html5.prototype.setSrc=function(t){this.el_.src=t},vjs.Html5.prototype.load=function(){this.el_.load()},vjs.Html5.prototype.currentSrc=function(){var t=this.el_.currentSrc;return this.currentSource_?this.returnOriginalIfBlobURI_(t,this.currentSource_.src):t},vjs.Html5.prototype.poster=function(){return this.el_.poster},vjs.Html5.prototype.setPoster=function(t){this.el_.poster=t},vjs.Html5.prototype.preload=function(){return this.el_.preload},vjs.Html5.prototype.setPreload=function(t){this.el_.preload=t},vjs.Html5.prototype.autoplay=function(){return this.el_.autoplay},vjs.Html5.prototype.setAutoplay=function(t){this.el_.autoplay=t},vjs.Html5.prototype.controls=function(){return this.el_.controls},vjs.Html5.prototype.setControls=function(t){this.el_.controls=!!t},vjs.Html5.prototype.loop=function(){return this.el_.loop},vjs.Html5.prototype.setLoop=function(t){this.el_.loop=t},vjs.Html5.prototype.error=function(){return this.el_.error},vjs.Html5.prototype.seeking=function(){return this.el_.seeking},vjs.Html5.prototype.seekable=function(){return this.el_.seekable},vjs.Html5.prototype.ended=function(){return this.el_.ended},vjs.Html5.prototype.defaultMuted=function(){return this.el_.defaultMuted},vjs.Html5.prototype.playbackRate=function(){return this.el_.playbackRate},vjs.Html5.prototype.setPlaybackRate=function(t){this.el_.playbackRate=t},vjs.Html5.prototype.networkState=function(){return this.el_.networkState},vjs.Html5.prototype.readyState=function(){return this.el_.readyState},vjs.Html5.prototype.textTracks=function(){return this.featuresNativeTextTracks?this.el_.textTracks:vjs.MediaTechController.prototype.textTracks.call(this)},vjs.Html5.prototype.addTextTrack=function(t,e,i){return this.featuresNativeTextTracks?this.el_.addTextTrack(t,e,i):vjs.MediaTechController.prototype.addTextTrack.call(this,t,e,i)},vjs.Html5.prototype.addRemoteTextTrack=function(t){if(!this.featuresNativeTextTracks)return vjs.MediaTechController.prototype.addRemoteTextTrack.call(this,t);var e=document.createElement("track");return t=t||{},t.kind&&(e.kind=t.kind),t.label&&(e.label=t.label),(t.language||t.srclang)&&(e.srclang=t.language||t.srclang),t["default"]&&(e["default"]=t["default"]),t.id&&(e.id=t.id),t.src&&(e.src=t.src),this.el().appendChild(e),"metadata"===e.track.kind?e.track.mode="hidden":e.track.mode="disabled",e.onload=function(){var t=e.track;e.readyState>=2&&("metadata"===t.kind&&"hidden"!==t.mode?t.mode="hidden":"metadata"!==t.kind&&"disabled"!==t.mode&&(t.mode="disabled"),e.onload=null)},this.remoteTextTracks().addTrack_(e.track),e},vjs.Html5.prototype.removeRemoteTextTrack=function(t){if(!this.featuresNativeTextTracks)return vjs.MediaTechController.prototype.removeRemoteTextTrack.call(this,t);var e,i;for(this.remoteTextTracks().removeTrack_(t),e=this.el().querySelectorAll("track"),i=0;i<e.length;i++)if(e[i]===t||e[i].track===t){e[i].parentNode.removeChild(e[i]);break}},vjs.Html5.isSupported=function(){try{vjs.TEST_VID.volume=.5}catch(t){return!1}return!!vjs.TEST_VID.canPlayType},vjs.MediaTechController.withSourceHandlers(vjs.Html5),function(){var t=vjs.Html5.prototype.setSource,e=vjs.Html5.prototype.disposeSourceHandler;vjs.Html5.prototype.setSource=function(e){var i=t.call(this,e);return this.source_=e.src,i},vjs.Html5.prototype.disposeSourceHandler=function(){return this.source_=void 0,e.call(this)}}(),vjs.Html5.nativeSourceHandler={},vjs.Html5.nativeSourceHandler.canHandleSource=function(t){function e(t){try{return vjs.TEST_VID.canPlayType(t)}catch(e){return""}}var i,n;return t.type?e(t.type):t.src?(i=t.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i),n=i&&i[1],e("video/"+n)):""},vjs.Html5.nativeSourceHandler.handleSource=function(t,e){e.setSrc(t.src)},vjs.Html5.nativeSourceHandler.dispose=function(){},vjs.Html5.registerSourceHandler(vjs.Html5.nativeSourceHandler),vjs.Html5.canControlVolume=function(){var t=vjs.TEST_VID.volume;return vjs.TEST_VID.volume=t/2+.1,t!==vjs.TEST_VID.volume},vjs.Html5.canControlPlaybackRate=function(){var t=vjs.TEST_VID.playbackRate;return vjs.TEST_VID.playbackRate=t/2+.1,t!==vjs.TEST_VID.playbackRate},vjs.Html5.supportsNativeTextTracks=function(){var t;return t=!!vjs.TEST_VID.textTracks,t&&vjs.TEST_VID.textTracks.length>0&&(t="number"!=typeof vjs.TEST_VID.textTracks[0].mode),t&&vjs.IS_FIREFOX&&(t=!1),t},vjs.Html5.prototype.featuresVolumeControl=vjs.Html5.canControlVolume(),vjs.Html5.prototype.featuresPlaybackRate=vjs.Html5.canControlPlaybackRate(),vjs.Html5.prototype.movingMediaElementInDOM=!vjs.IS_IOS,vjs.Html5.prototype.featuresFullscreenResize=!0,vjs.Html5.prototype.featuresProgressEvents=!0,vjs.Html5.prototype.featuresNativeTextTracks=vjs.Html5.supportsNativeTextTracks(),function(){var t,e=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,i=/^video\/mp4/i;vjs.Html5.patchCanPlayType=function(){vjs.ANDROID_VERSION>=4&&(t||(t=vjs.TEST_VID.constructor.prototype.canPlayType),vjs.TEST_VID.constructor.prototype.canPlayType=function(i){return i&&e.test(i)?"maybe":t.call(this,i)}),vjs.IS_OLD_ANDROID&&(t||(t=vjs.TEST_VID.constructor.prototype.canPlayType),vjs.TEST_VID.constructor.prototype.canPlayType=function(e){return e&&i.test(e)?"maybe":t.call(this,e)})},vjs.Html5.unpatchCanPlayType=function(){var e=vjs.TEST_VID.constructor.prototype.canPlayType;return vjs.TEST_VID.constructor.prototype.canPlayType=t,t=null,e},vjs.Html5.patchCanPlayType()}(),vjs.Html5.Events="loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","),vjs.Html5.disposeMediaElement=function(t){if(t){for(t.player=null,t.parentNode&&t.parentNode.removeChild(t);t.hasChildNodes();)t.removeChild(t.firstChild);t.removeAttribute("src"),"function"==typeof t.load&&!function(){try{t.load()}catch(e){}}()}},vjs.Flash=vjs.MediaTechController.extend({init:function(t,e,i){vjs.MediaTechController.call(this,t,e,i);var n=e.source,s=t.id()+"_flash_api",o=t.options_,r=vjs.obj.merge({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:o.autoplay,preload:o.preload,loop:o.loop,muted:o.muted},e.flashVars),a=vjs.obj.merge({wmode:"opaque",bgcolor:"#000000"},e.params),l=vjs.obj.merge({id:s,name:s,"class":"vjs-tech"},e.attributes);n&&this.ready(function(){this.setSource(n)}),vjs.insertFirst(this.el_,e.parentEl),e.startTime&&this.ready(function(){this.load(),this.play(),this.currentTime(e.startTime)}),vjs.IS_FIREFOX&&this.ready(function(){this.on("mousemove",function(){this.player().trigger({type:"mousemove",bubbles:!1})})}),t.on("stageclick",t.reportUserActivity),this.el_=vjs.Flash.embed(e.swf,this.el_,r,a,l)}}),vjs.Flash.prototype.dispose=function(){vjs.MediaTechController.prototype.dispose.call(this)},vjs.Flash.prototype.play=function(){this.el_.vjs_play()},vjs.Flash.prototype.pause=function(){this.el_.vjs_pause()},vjs.Flash.prototype.src=function(t){return void 0===t?this.currentSrc():this.setSrc(t)},vjs.Flash.prototype.setSrc=function(t){if(t=vjs.getAbsoluteURL(t),this.el_.vjs_src(t),this.player_.autoplay()){var e=this;this.setTimeout(function(){e.play()},0)}},vjs.Flash.prototype.setCurrentTime=function(t){this.lastSeekTarget_=t,this.el_.vjs_setProperty("currentTime",t),vjs.MediaTechController.prototype.setCurrentTime.call(this)},vjs.Flash.prototype.currentTime=function(t){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},vjs.Flash.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.vjs_getProperty("currentSrc")},vjs.Flash.prototype.load=function(){this.el_.vjs_load()},vjs.Flash.prototype.poster=function(){this.el_.vjs_getProperty("poster")},vjs.Flash.prototype.setPoster=function(){},vjs.Flash.prototype.seekable=function(){var t=this.duration();return 0===t?vjs.createTimeRange():vjs.createTimeRange(0,this.duration())},vjs.Flash.prototype.buffered=function(){return this.el_.vjs_getProperty?vjs.createTimeRange(0,this.el_.vjs_getProperty("buffered")):vjs.createTimeRange()},vjs.Flash.prototype.duration=function(){return this.el_.vjs_getProperty?this.el_.vjs_getProperty("duration"):0},vjs.Flash.prototype.supportsFullScreen=function(){return!1},vjs.Flash.prototype.enterFullScreen=function(){return!1},function(){function t(t){var e=t.charAt(0).toUpperCase()+t.slice(1);i["set"+e]=function(e){return this.el_.vjs_setProperty(t,e)}}function e(t){i[t]=function(){return this.el_.vjs_getProperty(t)}}var i=vjs.Flash.prototype,n="rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),s="error,networkState,readyState,seeking,initialTime,startOffsetTime,paused,played,ended,videoTracks,audioTracks,videoWidth,videoHeight".split(","),o;for(o=0;o<n.length;o++)e(n[o]),t(n[o]);for(o=0;o<s.length;o++)e(s[o])}(),vjs.Flash.isSupported=function(){return vjs.Flash.version()[0]>=10},vjs.MediaTechController.withSourceHandlers(vjs.Flash),vjs.Flash.nativeSourceHandler={},vjs.Flash.nativeSourceHandler.canHandleSource=function(t){var e;return t.type?(e=t.type.replace(/;.*/,"").toLowerCase(),e in vjs.Flash.formats?"maybe":""):""},vjs.Flash.nativeSourceHandler.handleSource=function(t,e){e.setSrc(t.src)},vjs.Flash.nativeSourceHandler.dispose=function(){},vjs.Flash.registerSourceHandler(vjs.Flash.nativeSourceHandler),vjs.Flash.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},vjs.Flash.onReady=function(t){var e,i;e=vjs.el(t),i=e&&e.parentNode&&e.parentNode.player,i&&(e.player=i,vjs.Flash.checkReady(i.tech))},vjs.Flash.checkReady=function(t){t.el()&&(t.el().vjs_getProperty?t.triggerReady():this.setTimeout(function(){vjs.Flash.checkReady(t)},50))},vjs.Flash.onEvent=function(t,e){var i=vjs.el(t).player;i.trigger(e)},vjs.Flash.onError=function(t,e){var i=vjs.el(t).player,n="FLASH: "+e;"srcnotfound"==e?i.error({code:4,message:n}):i.error(n)},vjs.Flash.version=function(){var t="0,0,0";try{t=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(e){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(t=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(i){}}return t.split(",")},vjs.Flash.embed=function(t,e,i,n,s){var o=vjs.Flash.getEmbedCode(t,i,n,s),r=vjs.createEl("div",{innerHTML:o}).childNodes[0],a=e.parentNode;e.parentNode.replaceChild(r,e),r[vjs.expando]=e[vjs.expando];var l=a.childNodes[0];return setTimeout(function(){l.style.display="block"},1e3),r},vjs.Flash.getEmbedCode=function(t,e,i,n){var s='<object type="application/x-shockwave-flash" ',o="",r="",a="";return e&&vjs.obj.each(e,function(t,e){o+=t+"="+e+"&amp;"}),i=vjs.obj.merge({movie:t,flashvars:o,allowScriptAccess:"always",allowNetworking:"all"},i),vjs.obj.each(i,function(t,e){r+='<param name="'+t+'" value="'+e+'" />'}),n=vjs.obj.merge({data:t,width:"100%",height:"100%"},n),vjs.obj.each(n,function(t,e){a+=t+'="'+e+'" '}),s+a+">"+r+"</object>"},vjs.Flash.streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},vjs.Flash.streamFromParts=function(t,e){return t+"&"+e},vjs.Flash.streamToParts=function(t){var e={connection:"",stream:""};if(!t)return e;var i=t.indexOf("&"),n;return-1!==i?n=i+1:(i=n=t.lastIndexOf("/")+1,0===i&&(i=n=t.length)),e.connection=t.substring(0,i),e.stream=t.substring(n,t.length),e},vjs.Flash.isStreamingType=function(t){return t in vjs.Flash.streamingFormats},vjs.Flash.RTMP_RE=/^rtmp[set]?:\/\//i,vjs.Flash.isStreamingSrc=function(t){return vjs.Flash.RTMP_RE.test(t)},vjs.Flash.rtmpSourceHandler={},vjs.Flash.rtmpSourceHandler.canHandleSource=function(t){return vjs.Flash.isStreamingType(t.type)||vjs.Flash.isStreamingSrc(t.src)?"maybe":""},vjs.Flash.rtmpSourceHandler.handleSource=function(t,e){var i=vjs.Flash.streamToParts(t.src);e.setRtmpConnection(i.connection),e.setRtmpStream(i.stream)},vjs.Flash.registerSourceHandler(vjs.Flash.rtmpSourceHandler),vjs.MediaLoader=vjs.Component.extend({init:function(t,e,i){if(vjs.Component.call(this,t,e,i),t.options_.sources&&0!==t.options_.sources.length)t.src(t.options_.sources);else for(var n=0,s=t.options_.techOrder;n<s.length;n++){var o=vjs.capitalize(s[n]),r=window.videojs[o];if(r&&r.isSupported()){t.loadTech(o);break}}}}),vjs.TextTrackMode={disabled:"disabled",hidden:"hidden",showing:"showing"},vjs.TextTrackKind={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},function(){vjs.TextTrack=function(e){var n,s,o,r,a,l,h,c,u,p,d;if(e=e||{},!e.player)throw new Error("A player was not provided.");if(n=this,vjs.IS_IE8){n=document.createElement("custom");for(d in vjs.TextTrack.prototype)n[d]=vjs.TextTrack.prototype[d]}return n.player_=e.player,o=vjs.TextTrackMode[e.mode]||"disabled",r=vjs.TextTrackKind[e.kind]||"subtitles",a=e.label||"",l=e.language||e.srclang||"",s=e.id||"vjs_text_track_"+vjs.guid++,("metadata"===r||"chapters"===r)&&(o="hidden"),n.cues_=[],n.activeCues_=[],h=new vjs.TextTrackCueList(n.cues_),c=new vjs.TextTrackCueList(n.activeCues_),p=!1,u=vjs.bind(n,function(){this.activeCues,p&&(this.trigger("cuechange"),p=!1)}),"disabled"!==o&&n.player_.on("timeupdate",u),Object.defineProperty(n,"kind",{get:function(){return r},set:Function.prototype}),Object.defineProperty(n,"label",{get:function(){return a},set:Function.prototype}),Object.defineProperty(n,"language",{get:function(){return l},set:Function.prototype}),Object.defineProperty(n,"id",{get:function(){return s},set:Function.prototype}),Object.defineProperty(n,"mode",{get:function(){return o},set:function(t){vjs.TextTrackMode[t]&&(o=t,"showing"===o&&this.player_.on("timeupdate",u),this.trigger("modechange"))}}),Object.defineProperty(n,"cues",{get:function(){return this.loaded_?h:null},set:Function.prototype}),Object.defineProperty(n,"activeCues",{get:function(){var t,e,n,s,o;if(!this.loaded_)return null;if(0===this.cues.length)return c;for(s=this.player_.currentTime(),t=0,e=this.cues.length,n=[];e>t;t++)o=this.cues[t],o.startTime<=s&&o.endTime>=s?n.push(o):o.startTime===o.endTime&&o.startTime<=s&&o.startTime+.5>=s&&n.push(o);if(p=!1,n.length!==this.activeCues_.length)p=!0;else for(t=0;t<n.length;t++)-1===i.call(this.activeCues_,n[t])&&(p=!0);return this.activeCues_=n,c.setCues_(this.activeCues_),c},set:Function.prototype}),e.src?t(e.src,n):n.loaded_=!0,vjs.IS_IE8?n:void 0},vjs.TextTrack.prototype=vjs.obj.create(vjs.EventEmitter.prototype),vjs.TextTrack.prototype.constructor=vjs.TextTrack,vjs.TextTrack.prototype.allowedEvents_={cuechange:"cuechange"},vjs.TextTrack.prototype.addCue=function(t){var e=this.player_.textTracks(),i=0;if(e)for(;i<e.length;i++)e[i]!==this&&e[i].removeCue(t);this.cues_.push(t),this.cues.setCues_(this.cues_)},vjs.TextTrack.prototype.removeCue=function(t){for(var e=0,i=this.cues_.length,n,s=!1;i>e;e++)n=this.cues_[e],n===t&&(this.cues_.splice(e,1),s=!0);s&&this.cues.setCues_(this.cues_)};var t,e,i;t=function(t,i){vjs.xhr(t,vjs.bind(this,function(t,n,s){return t?vjs.log.error(t):(i.loaded_=!0,void e(s,i))}))},e=function(t,i){if("function"!=typeof window.WebVTT)return window.setTimeout(function(){e(t,i)},25);var n=new window.WebVTT.Parser(window,window.vttjs,window.WebVTT.StringDecoder());n.oncue=function(t){i.addCue(t)},n.onparsingerror=function(t){vjs.log.error(t)},n.parse(t),n.flush()},i=function(t,e){var i;if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),s=n.length>>>0;if(0===s)return-1;var o=+e||0;if(Math.abs(o)===1/0&&(o=0),o>=s)return-1;for(i=Math.max(o>=0?o:s-Math.abs(o),0);s>i;){if(i in n&&n[i]===t)return i;i++}return-1}}(),vjs.TextTrackList=function(t){var e=this,i,n=0;if(vjs.IS_IE8){e=document.createElement("custom");for(i in vjs.TextTrackList.prototype)e[i]=vjs.TextTrackList.prototype[i]}for(t=t||[],e.tracks_=[],Object.defineProperty(e,"length",{get:function(){return this.tracks_.length}});n<t.length;n++)e.addTrack_(t[n]);return vjs.IS_IE8?e:void 0},vjs.TextTrackList.prototype=vjs.obj.create(vjs.EventEmitter.prototype),vjs.TextTrackList.prototype.constructor=vjs.TextTrackList,vjs.TextTrackList.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"},function(){var t;for(t in vjs.TextTrackList.prototype.allowedEvents_)vjs.TextTrackList.prototype["on"+t]=null;
}(),vjs.TextTrackList.prototype.addTrack_=function(t){var e=this.tracks_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.tracks_[e]}}),t.addEventListener("modechange",vjs.bind(this,function(){this.trigger("change")})),this.tracks_.push(t),this.trigger({type:"addtrack",track:t})},vjs.TextTrackList.prototype.removeTrack_=function(t){for(var e=0,i=this.length,n=null,s;i>e;e++)if(s=this[e],s===t){this.tracks_.splice(e,1);break}this.trigger({type:"removetrack",track:t})},vjs.TextTrackList.prototype.getTrackById=function(t){for(var e=0,i=this.length,n=null,s;i>e;e++)if(s=this[e],s.id===t){n=s;break}return n},vjs.TextTrackCueList=function(t){var e=this,i;if(vjs.IS_IE8){e=document.createElement("custom");for(i in vjs.TextTrackCueList.prototype)e[i]=vjs.TextTrackCueList.prototype[i]}return vjs.TextTrackCueList.prototype.setCues_.call(e,t),Object.defineProperty(e,"length",{get:function(){return this.length_}}),vjs.IS_IE8?e:void 0},vjs.TextTrackCueList.prototype.setCues_=function(t){var e=this.length||0,i=0,n=t.length,s;if(this.cues_=t,this.length_=t.length,s=function(t){""+t in this||Object.defineProperty(this,""+t,{get:function(){return this.cues_[t]}})},n>e)for(i=e;n>i;i++)s.call(this,i)},vjs.TextTrackCueList.prototype.getCueById=function(t){for(var e=0,i=this.length,n=null,s;i>e;e++)if(s=this[e],s.id===t){n=s;break}return n},function(){vjs.TextTrackDisplay=vjs.Component.extend({init:function(t,e,i){vjs.Component.call(this,t,e,i),t.on("loadstart",vjs.bind(this,this.toggleDisplay)),t.ready(vjs.bind(this,function(){if(t.tech&&t.tech.featuresNativeTextTracks)return void this.hide();var e,i,n;for(t.on("fullscreenchange",vjs.bind(this,this.updateDisplay)),i=t.options_.tracks||[],e=0;e<i.length;e++)n=i[e],this.player_.addRemoteTextTrack(n)}))}}),vjs.TextTrackDisplay.prototype.toggleDisplay=function(){this.player_.tech&&this.player_.tech.featuresNativeTextTracks?this.hide():this.show()},vjs.TextTrackDisplay.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"})},vjs.TextTrackDisplay.prototype.clearDisplay=function(){"function"==typeof window.WebVTT&&window.WebVTT.processCues(window,[],this.el_)};var t=function(t,e){return"rgba("+parseInt(t[1]+t[1],16)+","+parseInt(t[2]+t[2],16)+","+parseInt(t[3]+t[3],16)+","+e+")"},e="#222",i="#ccc",n={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},s=function(t,e,i){try{t.style[e]=i}catch(n){}};vjs.TextTrackDisplay.prototype.updateDisplay=function(){var t=this.player_.textTracks(),e=0,i;if(this.clearDisplay(),t)for(;e<t.length;e++)i=t[e],"showing"===i.mode&&this.updateForTrack(i)},vjs.TextTrackDisplay.prototype.updateForTrack=function(o){if("function"==typeof window.WebVTT&&o.activeCues){for(var r=0,a,l,h=this.player_.textTrackSettings.getValues(),c,u=[];r<o.activeCues.length;r++)u.push(o.activeCues[r]);for(window.WebVTT.processCues(window,o.activeCues,this.el_),r=u.length;r--;)l=u[r].displayState,h.color&&(l.firstChild.style.color=h.color),h.textOpacity&&s(l.firstChild,"color",t(h.color||"#fff",h.textOpacity)),h.backgroundColor&&(l.firstChild.style.backgroundColor=h.backgroundColor),h.backgroundOpacity&&s(l.firstChild,"backgroundColor",t(h.backgroundColor||"#000",h.backgroundOpacity)),h.windowColor&&(h.windowOpacity?s(l,"backgroundColor",t(h.windowColor,h.windowOpacity)):l.style.backgroundColor=h.windowColor),h.edgeStyle&&("dropshadow"===h.edgeStyle?l.firstChild.style.textShadow="2px 2px 3px "+e+", 2px 2px 4px "+e+", 2px 2px 5px "+e:"raised"===h.edgeStyle?l.firstChild.style.textShadow="1px 1px "+e+", 2px 2px "+e+", 3px 3px "+e:"depressed"===h.edgeStyle?l.firstChild.style.textShadow="1px 1px "+i+", 0 1px "+i+", -1px -1px "+e+", 0 -1px "+e:"uniform"===h.edgeStyle&&(l.firstChild.style.textShadow="0 0 4px "+e+", 0 0 4px "+e+", 0 0 4px "+e+", 0 0 4px "+e)),h.fontPercent&&1!==h.fontPercent&&(c=window.parseFloat(l.style.fontSize),l.style.fontSize=c*h.fontPercent+"px",l.style.height="auto",l.style.top="auto",l.style.bottom="2px"),h.fontFamily&&"default"!==h.fontFamily&&("small-caps"===h.fontFamily?l.firstChild.style.fontVariant="small-caps":l.firstChild.style.fontFamily=n[h.fontFamily])}},vjs.TextTrackMenuItem=vjs.MenuItem.extend({init:function(t,e){var i=this.track=e.track,n=t.textTracks(),s,o;n&&(s=vjs.bind(this,function(){var t="showing"===this.track.mode,e,i,s;if(this instanceof vjs.OffTextTrackMenuItem)for(t=!0,i=0,s=n.length;s>i;i++)if(e=n[i],e.kind===this.track.kind&&"showing"===e.mode){t=!1;break}this.selected(t)}),n.addEventListener("change",s),t.on("dispose",function(){n.removeEventListener("change",s)})),e.label=i.label||i.language||"Unknown",e.selected=i["default"]||"showing"===i.mode,vjs.MenuItem.call(this,t,e),n&&void 0===n.onchange&&this.on(["tap","click"],function(){if("object"!=typeof window.Event)try{o=new window.Event("change")}catch(t){}o||(o=document.createEvent("Event"),o.initEvent("change",!0,!0)),n.dispatchEvent(o)})}}),vjs.TextTrackMenuItem.prototype.onClick=function(){var t=this.track.kind,e=this.player_.textTracks(),i,n,s=0;if(vjs.MenuItem.prototype.onClick.call(this),e)for(;s<e.length;s++)n=e[s],n.kind===t&&(n===this.track?n.mode="showing":n.mode="disabled")},vjs.OffTextTrackMenuItem=vjs.TextTrackMenuItem.extend({init:function(t,e){e.track={kind:e.kind,player:t,label:e.kind+" off","default":!1,mode:"disabled"},vjs.TextTrackMenuItem.call(this,t,e),this.selected(!0)}}),vjs.CaptionSettingsMenuItem=vjs.TextTrackMenuItem.extend({init:function(t,e){e.track={kind:e.kind,player:t,label:e.kind+" settings","default":!1,mode:"disabled"},vjs.TextTrackMenuItem.call(this,t,e),this.addClass("vjs-texttrack-settings")}}),vjs.CaptionSettingsMenuItem.prototype.onClick=function(){this.player().getChild("textTrackSettings").show()},vjs.TextTrackButton=vjs.MenuButton.extend({init:function(t,e){var i,n;vjs.MenuButton.call(this,t,e),i=this.player_.textTracks(),this.items.length<=1&&this.hide(),i&&(n=vjs.bind(this,this.update),i.addEventListener("removetrack",n),i.addEventListener("addtrack",n),this.player_.on("dispose",function(){i.removeEventListener("removetrack",n),i.removeEventListener("addtrack",n)}))}}),vjs.TextTrackButton.prototype.createItems=function(){var t=[],e,i;if(!(this instanceof vjs.CaptionsButton)||this.player().tech&&this.player().tech.featuresNativeTextTracks||t.push(new vjs.CaptionSettingsMenuItem(this.player_,{kind:this.kind_})),t.push(new vjs.OffTextTrackMenuItem(this.player_,{kind:this.kind_})),i=this.player_.textTracks(),!i)return t;for(var n=0;n<i.length;n++)e=i[n],e.kind===this.kind_&&t.push(new vjs.TextTrackMenuItem(this.player_,{track:e}));return t},vjs.CaptionsButton=vjs.TextTrackButton.extend({init:function(t,e,i){vjs.TextTrackButton.call(this,t,e,i),this.el_.setAttribute("aria-label","Captions Menu")}}),vjs.CaptionsButton.prototype.kind_="captions",vjs.CaptionsButton.prototype.buttonText="Captions",vjs.CaptionsButton.prototype.className="vjs-captions-button",vjs.CaptionsButton.prototype.update=function(){var t=2;vjs.TextTrackButton.prototype.update.call(this),this.player().tech&&this.player().tech.featuresNativeTextTracks&&(t=1),this.items&&this.items.length>t?this.show():this.hide()},vjs.SubtitlesButton=vjs.TextTrackButton.extend({init:function(t,e,i){vjs.TextTrackButton.call(this,t,e,i),this.el_.setAttribute("aria-label","Subtitles Menu")}}),vjs.SubtitlesButton.prototype.kind_="subtitles",vjs.SubtitlesButton.prototype.buttonText="Subtitles",vjs.SubtitlesButton.prototype.className="vjs-subtitles-button",vjs.ChaptersButton=vjs.TextTrackButton.extend({init:function(t,e,i){vjs.TextTrackButton.call(this,t,e,i),this.el_.setAttribute("aria-label","Chapters Menu")}}),vjs.ChaptersButton.prototype.kind_="chapters",vjs.ChaptersButton.prototype.buttonText="Chapters",vjs.ChaptersButton.prototype.className="vjs-chapters-button",vjs.ChaptersButton.prototype.createItems=function(){var t=[],e,i;if(i=this.player_.textTracks(),!i)return t;for(var n=0;n<i.length;n++)e=i[n],e.kind===this.kind_&&t.push(new vjs.TextTrackMenuItem(this.player_,{track:e}));return t},vjs.ChaptersButton.prototype.createMenu=function(){for(var t=this.player_.textTracks()||[],e=0,i=t.length,n,s,o=this.items=[];i>e;e++)if(n=t[e],n.kind==this.kind_){if(n.cues){s=n;break}n.mode="hidden",window.setTimeout(vjs.bind(this,function(){this.createMenu()}),100)}var r=this.menu;if(void 0===r&&(r=new vjs.Menu(this.player_),r.contentEl().appendChild(vjs.createEl("li",{className:"vjs-menu-title",innerHTML:vjs.capitalize(this.kind_),tabindex:-1}))),s){var a=s.cues,l,h;for(e=0,i=a.length;i>e;e++)l=a[e],h=new vjs.ChaptersTrackMenuItem(this.player_,{track:s,cue:l}),o.push(h),r.addChild(h);this.addChild(r)}return this.items.length>0&&this.show(),r},vjs.ChaptersTrackMenuItem=vjs.MenuItem.extend({init:function(t,e){var i=this.track=e.track,n=this.cue=e.cue,s=t.currentTime();e.label=n.text,e.selected=n.startTime<=s&&s<n.endTime,vjs.MenuItem.call(this,t,e),i.addEventListener("cuechange",vjs.bind(this,this.update))}}),vjs.ChaptersTrackMenuItem.prototype.onClick=function(){vjs.MenuItem.prototype.onClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},vjs.ChaptersTrackMenuItem.prototype.update=function(){var t=this.cue,e=this.player_.currentTime();this.selected(t.startTime<=e&&e<t.endTime)}}(),function(){function t(t){var e;return t.selectedOptions?e=t.selectedOptions[0]:t.options&&(e=t.options[t.options.selectedIndex]),e.value}function e(t,e){var i,n;if(e){for(i=0;i<t.options.length&&(n=t.options[i],n.value!==e);i++);t.selectedIndex=i}}function i(){return'<div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><div class="vjs-fg-color vjs-tracksetting"><label class="vjs-label">Foreground</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Opaque</option></select></span></div><div class="vjs-bg-color vjs-tracksetting"><label class="vjs-label">Background</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div><div class="window-color vjs-tracksetting"><label class="vjs-label">Window</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label">Font Size</label><select><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00" selected>100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label">Text Edge Style</label><select><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label">Font Family</label><select><option value="">Default</option><option value="monospaceSerif">Monospace Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div>'}vjs.TextTrackSettings=vjs.Component.extend({init:function(t,e){vjs.Component.call(this,t,e),this.hide(),vjs.on(this.el().querySelector(".vjs-done-button"),"click",vjs.bind(this,function(){this.saveSettings(),this.hide()})),vjs.on(this.el().querySelector(".vjs-default-button"),"click",vjs.bind(this,function(){this.el().querySelector(".vjs-fg-color > select").selectedIndex=0,this.el().querySelector(".vjs-bg-color > select").selectedIndex=0,this.el().querySelector(".window-color > select").selectedIndex=0,this.el().querySelector(".vjs-text-opacity > select").selectedIndex=0,this.el().querySelector(".vjs-bg-opacity > select").selectedIndex=0,this.el().querySelector(".vjs-window-opacity > select").selectedIndex=0,this.el().querySelector(".vjs-edge-style select").selectedIndex=0,this.el().querySelector(".vjs-font-family select").selectedIndex=0,this.el().querySelector(".vjs-font-percent select").selectedIndex=2,this.updateDisplay()})),vjs.on(this.el().querySelector(".vjs-fg-color > select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-bg-color > select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".window-color > select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-text-opacity > select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-bg-opacity > select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-window-opacity > select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-font-percent select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-edge-style select"),"change",vjs.bind(this,this.updateDisplay)),vjs.on(this.el().querySelector(".vjs-font-family select"),"change",vjs.bind(this,this.updateDisplay)),t.options().persistTextTrackSettings&&this.restoreSettings()}}),vjs.TextTrackSettings.prototype.createEl=function(){return vjs.Component.prototype.createEl.call(this,"div",{className:"vjs-caption-settings vjs-modal-overlay",innerHTML:i()})},vjs.TextTrackSettings.prototype.getValues=function(){var e,i,n,s,o,r,a,l,h,c,u,p;e=this.el(),o=t(e.querySelector(".vjs-edge-style select")),r=t(e.querySelector(".vjs-font-family select")),a=t(e.querySelector(".vjs-fg-color > select")),n=t(e.querySelector(".vjs-text-opacity > select")),l=t(e.querySelector(".vjs-bg-color > select")),i=t(e.querySelector(".vjs-bg-opacity > select")),h=t(e.querySelector(".window-color > select")),s=t(e.querySelector(".vjs-window-opacity > select")),p=window.parseFloat(t(e.querySelector(".vjs-font-percent > select"))),c={backgroundOpacity:i,textOpacity:n,windowOpacity:s,edgeStyle:o,fontFamily:r,color:a,backgroundColor:l,windowColor:h,fontPercent:p};for(u in c)(""===c[u]||"none"===c[u]||"fontPercent"===u&&1===c[u])&&delete c[u];return c},vjs.TextTrackSettings.prototype.setValues=function(t){var i=this.el(),n;e(i.querySelector(".vjs-edge-style select"),t.edgeStyle),e(i.querySelector(".vjs-font-family select"),t.fontFamily),e(i.querySelector(".vjs-fg-color > select"),t.color),e(i.querySelector(".vjs-text-opacity > select"),t.textOpacity),e(i.querySelector(".vjs-bg-color > select"),t.backgroundColor),e(i.querySelector(".vjs-bg-opacity > select"),t.backgroundOpacity),e(i.querySelector(".window-color > select"),t.windowColor),e(i.querySelector(".vjs-window-opacity > select"),t.windowOpacity),n=t.fontPercent,n&&(n=n.toFixed(2)),e(i.querySelector(".vjs-font-percent > select"),n)},vjs.TextTrackSettings.prototype.restoreSettings=function(){var t;try{t=JSON.parse(window.localStorage.getItem("vjs-text-track-settings"))}catch(e){}t&&this.setValues(t)},vjs.TextTrackSettings.prototype.saveSettings=function(){var t;if(this.player_.options().persistTextTrackSettings){t=this.getValues();try{vjs.isEmpty(t)?window.localStorage.removeItem("vjs-text-track-settings"):window.localStorage.setItem("vjs-text-track-settings",JSON.stringify(t))}catch(e){}}},vjs.TextTrackSettings.prototype.updateDisplay=function(){var t=this.player_.getChild("textTrackDisplay");t&&t.updateDisplay()}}(),vjs.JSON,"undefined"!=typeof window.JSON&&"function"==typeof window.JSON.parse)vjs.JSON=window.JSON;else{vjs.JSON={};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;vjs.JSON.parse=function(text,reviver){function walk(t,e){var i,n,s=t[e];if(s&&"object"==typeof s)for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(n=walk(s,i),void 0!==n?s[i]=n:delete s[i]);return reviver.call(t,e,s)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")}}vjs.autoSetup=function(){var t,e,i,n,s,o=document.getElementsByTagName("video"),r=document.getElementsByTagName("audio"),a=[];if(o&&o.length>0)for(n=0,s=o.length;s>n;n++)a.push(o[n]);if(r&&r.length>0)for(n=0,s=r.length;s>n;n++)a.push(r[n]);if(a&&a.length>0)for(n=0,s=a.length;s>n;n++){if(e=a[n],!e||!e.getAttribute){vjs.autoSetupTimeout(1);break}void 0===e.player&&(t=e.getAttribute("data-setup"),null!==t&&(i=videojs(e)))}else vjs.windowLoaded||vjs.autoSetupTimeout(1)},vjs.autoSetupTimeout=function(t){setTimeout(vjs.autoSetup,t)},"complete"===document.readyState?vjs.windowLoaded=!0:vjs.one(window,"load",function(){vjs.windowLoaded=!0}),vjs.autoSetupTimeout(1),vjs.plugin=function(t,e){vjs.Player.prototype[t]=e},function(t){var e=t.vttjs={},i=e.VTTCue,n=e.VTTRegion,s=t.VTTCue,o=t.VTTRegion;e.shim=function(){e.VTTCue=i,e.VTTRegion=n},e.restore=function(){e.VTTCue=s,e.VTTRegion=o}}(this),function(t,e){function i(t){if("string"!=typeof t)return!1;var e=a[t.toLowerCase()];return e?t.toLowerCase():!1}function n(t){if("string"!=typeof t)return!1;var e=l[t.toLowerCase()];return e?t.toLowerCase():!1}function s(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)t[n]=i[n]}return t}function o(t,e,o){var a=this,l=/MSIE\s8\.0/.test(navigator.userAgent),h={};l?a=document.createElement("custom"):h.enumerable=!0,a.hasBeenReset=!1;var c="",u=!1,p=t,d=e,v=o,f=null,g="",y=!0,m="auto",j="start",b=50,C="middle",w=50,T="middle";return Object.defineProperty(a,"id",s({},h,{get:function(){return c},set:function(t){c=""+t}})),Object.defineProperty(a,"pauseOnExit",s({},h,{get:function(){return u},set:function(t){u=!!t}})),Object.defineProperty(a,"startTime",s({},h,{get:function(){return p},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.");p=t,this.hasBeenReset=!0}})),Object.defineProperty(a,"endTime",s({},h,{get:function(){return d},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.");d=t,this.hasBeenReset=!0}})),Object.defineProperty(a,"text",s({},h,{get:function(){return v},set:function(t){v=""+t,this.hasBeenReset=!0}})),Object.defineProperty(a,"region",s({},h,{get:function(){return f},set:function(t){f=t,this.hasBeenReset=!0}})),Object.defineProperty(a,"vertical",s({},h,{get:function(){return g},set:function(t){var e=i(t);if(e===!1)throw new SyntaxError("An invalid or illegal string was specified.");g=e,this.hasBeenReset=!0}})),Object.defineProperty(a,"snapToLines",s({},h,{get:function(){return y},set:function(t){y=!!t,this.hasBeenReset=!0}})),Object.defineProperty(a,"line",s({},h,{get:function(){return m},set:function(t){if("number"!=typeof t&&t!==r)throw new SyntaxError("An invalid number or illegal string was specified.");m=t,this.hasBeenReset=!0}})),Object.defineProperty(a,"lineAlign",s({},h,{get:function(){return j},set:function(t){var e=n(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");j=e,this.hasBeenReset=!0}})),Object.defineProperty(a,"position",s({},h,{get:function(){return b},set:function(t){if(0>t||t>100)throw new Error("Position must be between 0 and 100.");b=t,this.hasBeenReset=!0}})),Object.defineProperty(a,"positionAlign",s({},h,{get:function(){return C},set:function(t){var e=n(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");C=e,this.hasBeenReset=!0}})),Object.defineProperty(a,"size",s({},h,{get:function(){return w},set:function(t){if(0>t||t>100)throw new Error("Size must be between 0 and 100.");w=t,this.hasBeenReset=!0}})),Object.defineProperty(a,"align",s({},h,{get:function(){return T},set:function(t){var e=n(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");T=e,this.hasBeenReset=!0}})),a.displayState=void 0,l?a:void 0}var r="auto",a={"":!0,lr:!0,rl:!0},l={start:!0,middle:!0,end:!0,left:!0,right:!0};o.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},t.VTTCue=t.VTTCue||o,e.VTTCue=o}(this,this.vttjs||{}),function(t,e){function i(t){if("string"!=typeof t)return!1;var e=o[t.toLowerCase()];return e?t.toLowerCase():!1}function n(t){return"number"==typeof t&&t>=0&&100>=t}function s(){var t=100,e=3,s=0,o=100,r=0,a=100,l="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return t},set:function(e){if(!n(e))throw new Error("Width must be between 0 and 100.");t=e}},lines:{enumerable:!0,get:function(){return e},set:function(t){if("number"!=typeof t)throw new TypeError("Lines must be set to a number.");e=t}},regionAnchorY:{enumerable:!0,get:function(){return o},set:function(t){if(!n(t))throw new Error("RegionAnchorX must be between 0 and 100.");o=t}},regionAnchorX:{enumerable:!0,get:function(){return s},set:function(t){if(!n(t))throw new Error("RegionAnchorY must be between 0 and 100.");s=t}},viewportAnchorY:{enumerable:!0,get:function(){return a},set:function(t){if(!n(t))throw new Error("ViewportAnchorY must be between 0 and 100.");a=t}},viewportAnchorX:{enumerable:!0,get:function(){return r},set:function(t){if(!n(t))throw new Error("ViewportAnchorX must be between 0 and 100.");r=t}},scroll:{enumerable:!0,get:function(){return l},set:function(t){var e=i(t);if(e===!1)throw new SyntaxError("An invalid or illegal string was specified.");l=e}}})}var o={"":!0,up:!0};t.VTTRegion=t.VTTRegion||s,e.VTTRegion=s}(this,this.vttjs||{}),function(t){function e(t,e){this.name="ParsingError",this.code=t.code,this.message=e||t.message}function i(t){function e(t,e,i,n){return 3600*(0|t)+60*(0|e)+(0|i)+(0|n)/1e3}var i=t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return i?i[3]?e(i[1],i[2],i[3].replace(":",""),i[4]):i[1]>59?e(i[1],i[2],0,i[4]):e(0,i[1],i[2],i[4]):null}function n(){this.values=v(null)}function s(t,e,i,n){var s=n?t.split(n):[t];for(var o in s)if("string"==typeof s[o]){var r=s[o].split(i);if(2===r.length){var a=r[0],l=r[1];e(a,l)}}}function o(t,o,r){function a(){var n=i(t);if(null===n)throw new e(e.Errors.BadTimeStamp,"Malformed timestamp: "+c);return t=t.replace(/^[^\sa-zA-Z-]+/,""),n}function l(t,e){var i=new n;s(t,function(t,e){switch(t){case"region":for(var n=r.length-1;n>=0;n--)if(r[n].id===e){i.set(t,r[n].region);break}break;case"vertical":i.alt(t,e,["rl","lr"]);break;case"line":var s=e.split(","),o=s[0];i.integer(t,o),i.percent(t,o)?i.set("snapToLines",!1):null,i.alt(t,o,["auto"]),2===s.length&&i.alt("lineAlign",s[1],["start","middle","end"]);break;case"position":s=e.split(","),i.percent(t,s[0]),2===s.length&&i.alt("positionAlign",s[1],["start","middle","end"]);break;case"size":i.percent(t,e);break;case"align":i.alt(t,e,["start","middle","end","left","right"])}},/:/,/\s/),e.region=i.get("region",null),e.vertical=i.get("vertical",""),e.line=i.get("line","auto"),e.lineAlign=i.get("lineAlign","start"),e.snapToLines=i.get("snapToLines",!0),e.size=i.get("size",100),e.align=i.get("align","middle"),e.position=i.get("position",{start:0,left:0,middle:50,end:100,right:100},e.align),e.positionAlign=i.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},e.align)}function h(){t=t.replace(/^\s+/,"")}var c=t;if(h(),o.startTime=a(),h(),"-->"!==t.substr(0,3))throw new e(e.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+c);t=t.substr(3),h(),o.endTime=a(),h(),l(t,o)}function r(t,e){function n(){function t(t){return e=e.substr(t.length),t}if(!e)return null;var i=e.match(/^([^<]*)(<[^>]+>?)?/);return t(i[1]?i[1]:i[2])}function s(t){return f[t]}function o(t){for(;v=t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)t=t.replace(v[0],s);return t}function r(t,e){return!m[e.localName]||m[e.localName]===t.localName}function a(e,i){var n=g[e];if(!n)return null;var s=t.document.createElement(n);s.localName=n;var o=y[e];return o&&i&&(s[o]=i.trim()),s}for(var l=t.document.createElement("div"),h=l,c,u=[];null!==(c=n());)if("<"!==c[0])h.appendChild(t.document.createTextNode(o(c)));else{if("/"===c[1]){u.length&&u[u.length-1]===c.substr(2).replace(">","")&&(u.pop(),h=h.parentNode);continue}var p=i(c.substr(1,c.length-2)),d;if(p){d=t.document.createProcessingInstruction("timestamp",p),h.appendChild(d);continue}var v=c.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!v)continue;if(d=a(v[1],v[3]),!d)continue;if(!r(h,d))continue;v[2]&&(d.className=v[2].substr(1).replace("."," ")),u.push(v[1]),h.appendChild(d),h=d}return l}function a(t){function e(t,e){for(var i=e.childNodes.length-1;i>=0;i--)t.push(e.childNodes[i])}function i(t){if(!t||!t.length)return null;var n=t.pop(),s=n.textContent||n.innerText;if(s){var o=s.match(/^.*(\n|\r)/);return o?(t.length=0,o[0]):s}return"ruby"===n.tagName?i(t):n.childNodes?(e(t,n),i(t)):void 0}var n=[],s="",o;if(!t||!t.childNodes)return"ltr";for(e(n,t);s=i(n);)for(var r=0;r<s.length;r++){o=s.charCodeAt(r);for(var a=0;a<j.length;a++)if(j[a]===o)return"rtl"}return"ltr"}function l(t){if("number"==typeof t.line&&(t.snapToLines||t.line>=0&&t.line<=100))return t.line;if(!t.track||!t.track.textTrackList||!t.track.textTrackList.mediaElement)return-1;for(var e=t.track,i=e.textTrackList,n=0,s=0;s<i.length&&i[s]!==e;s++)"showing"===i[s].mode&&n++;return-1*++n}function h(){}function c(t,e,i){var n=/MSIE\s8\.0/.test(navigator.userAgent),s="rgba(255, 255, 255, 1)",o="rgba(0, 0, 0, 0.8)";n&&(s="rgb(255, 255, 255)",o="rgb(0, 0, 0)"),h.call(this),this.cue=e,this.cueDiv=r(t,e.text);var l={color:s,backgroundColor:o,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};n||(l.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl",l.unicodeBidi="plaintext"),this.applyStyles(l,this.cueDiv),this.div=t.document.createElement("div"),l={textAlign:"middle"===e.align?"center":e.align,font:i.font,whiteSpace:"pre-line",position:"absolute"},n||(l.direction=a(this.cueDiv),l.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(l),this.div.appendChild(this.cueDiv);var c=0;switch(e.positionAlign){case"start":c=e.position;break;case"middle":c=e.position-e.size/2;break;case"end":c=e.position-e.size}""===e.vertical?this.applyStyles({left:this.formatStyle(c,"%"),width:this.formatStyle(e.size,"%")}):this.applyStyles({top:this.formatStyle(c,"%"),height:this.formatStyle(e.size,"%")}),this.move=function(t){this.applyStyles({top:this.formatStyle(t.top,"px"),bottom:this.formatStyle(t.bottom,"px"),left:this.formatStyle(t.left,"px"),right:this.formatStyle(t.right,"px"),height:this.formatStyle(t.height,"px"),width:this.formatStyle(t.width,"px")})}}function u(t){var e=/MSIE\s8\.0/.test(navigator.userAgent),i,n,s,o;if(t.div){n=t.div.offsetHeight,s=t.div.offsetWidth,o=t.div.offsetTop;var r=(r=t.div.childNodes)&&(r=r[0])&&r.getClientRects&&r.getClientRects();t=t.div.getBoundingClientRect(),i=r?Math.max(r[0]&&r[0].height||0,t.height/r.length):0}this.left=t.left,this.right=t.right,this.top=t.top||o,this.height=t.height||n,this.bottom=t.bottom||o+(t.height||n),this.width=t.width||s,this.lineHeight=void 0!==i?i:t.lineHeight,e&&!this.lineHeight&&(this.lineHeight=13)}function p(t,e,i,n){function s(t,e){for(var s,o=new u(t),r=1,a=0;a<e.length;a++){for(;t.overlapsOppositeAxis(i,e[a])||t.within(i)&&t.overlapsAny(n);)t.move(e[a]);if(t.within(i))return t;var l=t.intersectPercentage(i);r>l&&(s=new u(t),r=l),t=new u(o)}return s||o}var o=new u(e),r=e.cue,a=l(r),h=[];if(r.snapToLines){var c;switch(r.vertical){case"":h=["+y","-y"],c="height";break;case"rl":h=["+x","-x"],c="width";break;case"lr":h=["-x","+x"],c="width"}var p=o.lineHeight,d=p*Math.round(a),v=i[c]+p,f=h[0];Math.abs(d)>v&&(d=0>d?-1:1,d*=Math.ceil(v/p)*p),0>a&&(d+=""===r.vertical?i.height:i.width,h=h.reverse()),o.move(f,d)}else{var g=o.lineHeight/i.height*100;switch(r.lineAlign){case"middle":a-=g/2;break;case"end":a-=g}switch(r.vertical){case"":e.applyStyles({top:e.formatStyle(a,"%")});break;case"rl":e.applyStyles({left:e.formatStyle(a,"%")});break;case"lr":e.applyStyles({right:e.formatStyle(a,"%")})}h=["+y","-x","+x","-y"],o=new u(e)}var y=s(o,h);e.move(y.toCSSCompatValues(i))}function d(){}var v=Object.create||function(){function t(){}return function(e){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return t.prototype=e,new t}}();e.prototype=v(Error.prototype),e.prototype.constructor=e,e.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},n.prototype={set:function(t,e){this.get(t)||""===e||(this.values[t]=e)},get:function(t,e,i){return i?this.has(t)?this.values[t]:e[i]:this.has(t)?this.values[t]:e},has:function(t){return t in this.values},alt:function(t,e,i){for(var n=0;n<i.length;++n)if(e===i[n]){this.set(t,e);break}},integer:function(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))},percent:function(t,e){var i;return(i=e.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(e=parseFloat(e),e>=0&&100>=e)?(this.set(t,e),!0):!1}};var f={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},g={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},y={v:"title",lang:"lang"},m={rt:"ruby"},j=[1470,1472,1475,1478,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1520,1521,1522,1523,1524,1544,1547,1549,1563,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1645,1646,1647,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1765,1766,1774,1775,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1807,1808,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1969,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2036,2037,2042,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2074,2084,2088,2096,2097,2098,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2109,2110,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129,2130,2131,2132,2133,2134,2135,2136,2142,2208,2210,2211,2212,2213,2214,2215,2216,2217,2218,2219,2220,8207,64285,64287,64288,64289,64290,64291,64292,64293,64294,64295,64296,64298,64299,64300,64301,64302,64303,64304,64305,64306,64307,64308,64309,64310,64312,64313,64314,64315,64316,64318,64320,64321,64323,64324,64326,64327,64328,64329,64330,64331,64332,64333,64334,64335,64336,64337,64338,64339,64340,64341,64342,64343,64344,64345,64346,64347,64348,64349,64350,64351,64352,64353,64354,64355,64356,64357,64358,64359,64360,64361,64362,64363,64364,64365,64366,64367,64368,64369,64370,64371,64372,64373,64374,64375,64376,64377,64378,64379,64380,64381,64382,64383,64384,64385,64386,64387,64388,64389,64390,64391,64392,64393,64394,64395,64396,64397,64398,64399,64400,64401,64402,64403,64404,64405,64406,64407,64408,64409,64410,64411,64412,64413,64414,64415,64416,64417,64418,64419,64420,64421,64422,64423,64424,64425,64426,64427,64428,64429,64430,64431,64432,64433,64434,64435,64436,64437,64438,64439,64440,64441,64442,64443,64444,64445,64446,64447,64448,64449,64467,64468,64469,64470,64471,64472,64473,64474,64475,64476,64477,64478,64479,64480,64481,64482,64483,64484,64485,64486,64487,64488,64489,64490,64491,64492,64493,64494,64495,64496,64497,64498,64499,64500,64501,64502,64503,64504,64505,64506,64507,64508,64509,64510,64511,64512,64513,64514,64515,64516,64517,64518,64519,64520,64521,64522,64523,64524,64525,64526,64527,64528,64529,64530,64531,64532,64533,64534,64535,64536,64537,64538,64539,64540,64541,64542,64543,64544,64545,64546,64547,64548,64549,64550,64551,64552,64553,64554,64555,64556,64557,64558,64559,64560,64561,64562,64563,64564,64565,64566,64567,64568,64569,64570,64571,64572,64573,64574,64575,64576,64577,64578,64579,64580,64581,64582,64583,64584,64585,64586,64587,64588,64589,64590,64591,64592,64593,64594,64595,64596,64597,64598,64599,64600,64601,64602,64603,64604,64605,64606,64607,64608,64609,64610,64611,64612,64613,64614,64615,64616,64617,64618,64619,64620,64621,64622,64623,64624,64625,64626,64627,64628,64629,64630,64631,64632,64633,64634,64635,64636,64637,64638,64639,64640,64641,64642,64643,64644,64645,64646,64647,64648,64649,64650,64651,64652,64653,64654,64655,64656,64657,64658,64659,64660,64661,64662,64663,64664,64665,64666,64667,64668,64669,64670,64671,64672,64673,64674,64675,64676,64677,64678,64679,64680,64681,64682,64683,64684,64685,64686,64687,64688,64689,64690,64691,64692,64693,64694,64695,64696,64697,64698,64699,64700,64701,64702,64703,64704,64705,64706,64707,64708,64709,64710,64711,64712,64713,64714,64715,64716,64717,64718,64719,64720,64721,64722,64723,64724,64725,64726,64727,64728,64729,64730,64731,64732,64733,64734,64735,64736,64737,64738,64739,64740,64741,64742,64743,64744,64745,64746,64747,64748,64749,64750,64751,64752,64753,64754,64755,64756,64757,64758,64759,64760,64761,64762,64763,64764,64765,64766,64767,64768,64769,64770,64771,64772,64773,64774,64775,64776,64777,64778,64779,64780,64781,64782,64783,64784,64785,64786,64787,64788,64789,64790,64791,64792,64793,64794,64795,64796,64797,64798,64799,64800,64801,64802,64803,64804,64805,64806,64807,64808,64809,64810,64811,64812,64813,64814,64815,64816,64817,64818,64819,64820,64821,64822,64823,64824,64825,64826,64827,64828,64829,64848,64849,64850,64851,64852,64853,64854,64855,64856,64857,64858,64859,64860,64861,64862,64863,64864,64865,64866,64867,64868,64869,64870,64871,64872,64873,64874,64875,64876,64877,64878,64879,64880,64881,64882,64883,64884,64885,64886,64887,64888,64889,64890,64891,64892,64893,64894,64895,64896,64897,64898,64899,64900,64901,64902,64903,64904,64905,64906,64907,64908,64909,64910,64911,64914,64915,64916,64917,64918,64919,64920,64921,64922,64923,64924,64925,64926,64927,64928,64929,64930,64931,64932,64933,64934,64935,64936,64937,64938,64939,64940,64941,64942,64943,64944,64945,64946,64947,64948,64949,64950,64951,64952,64953,64954,64955,64956,64957,64958,64959,64960,64961,64962,64963,64964,64965,64966,64967,65008,65009,65010,65011,65012,65013,65014,65015,65016,65017,65018,65019,65020,65136,65137,65138,65139,65140,65142,65143,65144,65145,65146,65147,65148,65149,65150,65151,65152,65153,65154,65155,65156,65157,65158,65159,65160,65161,65162,65163,65164,65165,65166,65167,65168,65169,65170,65171,65172,65173,65174,65175,65176,65177,65178,65179,65180,65181,65182,65183,65184,65185,65186,65187,65188,65189,65190,65191,65192,65193,65194,65195,65196,65197,65198,65199,65200,65201,65202,65203,65204,65205,65206,65207,65208,65209,65210,65211,65212,65213,65214,65215,65216,65217,65218,65219,65220,65221,65222,65223,65224,65225,65226,65227,65228,65229,65230,65231,65232,65233,65234,65235,65236,65237,65238,65239,65240,65241,65242,65243,65244,65245,65246,65247,65248,65249,65250,65251,65252,65253,65254,65255,65256,65257,65258,65259,65260,65261,65262,65263,65264,65265,65266,65267,65268,65269,65270,65271,65272,65273,65274,65275,65276,67584,67585,67586,67587,67588,67589,67592,67594,67595,67596,67597,67598,67599,67600,67601,67602,67603,67604,67605,67606,67607,67608,67609,67610,67611,67612,67613,67614,67615,67616,67617,67618,67619,67620,67621,67622,67623,67624,67625,67626,67627,67628,67629,67630,67631,67632,67633,67634,67635,67636,67637,67639,67640,67644,67647,67648,67649,67650,67651,67652,67653,67654,67655,67656,67657,67658,67659,67660,67661,67662,67663,67664,67665,67666,67667,67668,67669,67671,67672,67673,67674,67675,67676,67677,67678,67679,67840,67841,67842,67843,67844,67845,67846,67847,67848,67849,67850,67851,67852,67853,67854,67855,67856,67857,67858,67859,67860,67861,67862,67863,67864,67865,67866,67867,67872,67873,67874,67875,67876,67877,67878,67879,67880,67881,67882,67883,67884,67885,67886,67887,67888,67889,67890,67891,67892,67893,67894,67895,67896,67897,67903,67968,67969,67970,67971,67972,67973,67974,67975,67976,67977,67978,67979,67980,67981,67982,67983,67984,67985,67986,67987,67988,67989,67990,67991,67992,67993,67994,67995,67996,67997,67998,67999,68e3,68001,68002,68003,68004,68005,68006,68007,68008,68009,68010,68011,68012,68013,68014,68015,68016,68017,68018,68019,68020,68021,68022,68023,68030,68031,68096,68112,68113,68114,68115,68117,68118,68119,68121,68122,68123,68124,68125,68126,68127,68128,68129,68130,68131,68132,68133,68134,68135,68136,68137,68138,68139,68140,68141,68142,68143,68144,68145,68146,68147,68160,68161,68162,68163,68164,68165,68166,68167,68176,68177,68178,68179,68180,68181,68182,68183,68184,68192,68193,68194,68195,68196,68197,68198,68199,68200,68201,68202,68203,68204,68205,68206,68207,68208,68209,68210,68211,68212,68213,68214,68215,68216,68217,68218,68219,68220,68221,68222,68223,68352,68353,68354,68355,68356,68357,68358,68359,68360,68361,68362,68363,68364,68365,68366,68367,68368,68369,68370,68371,68372,68373,68374,68375,68376,68377,68378,68379,68380,68381,68382,68383,68384,68385,68386,68387,68388,68389,68390,68391,68392,68393,68394,68395,68396,68397,68398,68399,68400,68401,68402,68403,68404,68405,68416,68417,68418,68419,68420,68421,68422,68423,68424,68425,68426,68427,68428,68429,68430,68431,68432,68433,68434,68435,68436,68437,68440,68441,68442,68443,68444,68445,68446,68447,68448,68449,68450,68451,68452,68453,68454,68455,68456,68457,68458,68459,68460,68461,68462,68463,68464,68465,68466,68472,68473,68474,68475,68476,68477,68478,68479,68608,68609,68610,68611,68612,68613,68614,68615,68616,68617,68618,68619,68620,68621,68622,68623,68624,68625,68626,68627,68628,68629,68630,68631,68632,68633,68634,68635,68636,68637,68638,68639,68640,68641,68642,68643,68644,68645,68646,68647,68648,68649,68650,68651,68652,68653,68654,68655,68656,68657,68658,68659,68660,68661,68662,68663,68664,68665,68666,68667,68668,68669,68670,68671,68672,68673,68674,68675,68676,68677,68678,68679,68680,126464,126465,126466,126467,126469,126470,126471,126472,126473,126474,126475,126476,126477,126478,126479,126480,126481,126482,126483,126484,126485,126486,126487,126488,126489,126490,126491,126492,126493,126494,126495,126497,126498,126500,126503,126505,126506,126507,126508,126509,126510,126511,126512,126513,126514,126516,126517,126518,126519,126521,126523,126530,126535,126537,126539,126541,126542,126543,126545,126546,126548,126551,126553,126555,126557,126559,126561,126562,126564,126567,126568,126569,126570,126572,126573,126574,126575,126576,126577,126578,126580,126581,126582,126583,126585,126586,126587,126588,126590,126592,126593,126594,126595,126596,126597,126598,126599,126600,126601,126603,126604,126605,126606,126607,126608,126609,126610,126611,126612,126613,126614,126615,126616,126617,126618,126619,126625,126626,126627,126629,126630,126631,126632,126633,126635,126636,126637,126638,126639,126640,126641,126642,126643,126644,126645,126646,126647,126648,126649,126650,126651,1114109];
h.prototype.applyStyles=function(t,e){e=e||this.div;for(var i in t)t.hasOwnProperty(i)&&(e.style[i]=t[i])},h.prototype.formatStyle=function(t,e){return 0===t?0:t+e},c.prototype=v(h.prototype),c.prototype.constructor=c,u.prototype.move=function(t,e){switch(e=void 0!==e?e:this.lineHeight,t){case"+x":this.left+=e,this.right+=e;break;case"-x":this.left-=e,this.right-=e;break;case"+y":this.top+=e,this.bottom+=e;break;case"-y":this.top-=e,this.bottom-=e}},u.prototype.overlaps=function(t){return this.left<t.right&&this.right>t.left&&this.top<t.bottom&&this.bottom>t.top},u.prototype.overlapsAny=function(t){for(var e=0;e<t.length;e++)if(this.overlaps(t[e]))return!0;return!1},u.prototype.within=function(t){return this.top>=t.top&&this.bottom<=t.bottom&&this.left>=t.left&&this.right<=t.right},u.prototype.overlapsOppositeAxis=function(t,e){switch(e){case"+x":return this.left<t.left;case"-x":return this.right>t.right;case"+y":return this.top<t.top;case"-y":return this.bottom>t.bottom}},u.prototype.intersectPercentage=function(t){var e=Math.max(0,Math.min(this.right,t.right)-Math.max(this.left,t.left)),i=Math.max(0,Math.min(this.bottom,t.bottom)-Math.max(this.top,t.top)),n=e*i;return n/(this.height*this.width)},u.prototype.toCSSCompatValues=function(t){return{top:this.top-t.top,bottom:t.bottom-this.bottom,left:this.left-t.left,right:t.right-this.right,height:this.height,width:this.width}},u.getSimpleBoxPosition=function(t){var e=t.div?t.div.offsetHeight:t.tagName?t.offsetHeight:0,i=t.div?t.div.offsetWidth:t.tagName?t.offsetWidth:0,n=t.div?t.div.offsetTop:t.tagName?t.offsetTop:0;t=t.div?t.div.getBoundingClientRect():t.tagName?t.getBoundingClientRect():t;var s={left:t.left,right:t.right,top:t.top||n,height:t.height||e,bottom:t.bottom||n+(t.height||e),width:t.width||i};return s},d.StringDecoder=function(){return{decode:function(t){if(!t)return"";if("string"!=typeof t)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(t))}}},d.convertCueToDOMTree=function(t,e){return t&&e?r(t,e):null};var b=.05,C="sans-serif",w="1.5%";d.processCues=function(t,e,i){function n(t){for(var e=0;e<t.length;e++)if(t[e].hasBeenReset||!t[e].displayState)return!0;return!1}if(!t||!e||!i)return null;for(;i.firstChild;)i.removeChild(i.firstChild);var s=t.document.createElement("div");if(s.style.position="absolute",s.style.left="0",s.style.right="0",s.style.top="0",s.style.bottom="0",s.style.margin=w,i.appendChild(s),n(e)){var o=[],r=u.getSimpleBoxPosition(s),a=Math.round(r.height*b*100)/100,l={font:a+"px "+C};!function(){for(var i,n,a=0;a<e.length;a++)n=e[a],i=new c(t,n,l),s.appendChild(i.div),p(t,i,r,o),n.displayState=i.div,o.push(u.getSimpleBoxPosition(i))}()}else for(var h=0;h<e.length;h++)s.appendChild(e[h].displayState)},d.Parser=function(t,e,i){i||(i=e,e={}),e||(e={}),this.window=t,this.vttjs=e,this.state="INITIAL",this.buffer="",this.decoder=i||new TextDecoder("utf8"),this.regionList=[]},d.Parser.prototype={reportOrThrowError:function(t){if(!(t instanceof e))throw t;this.onparsingerror&&this.onparsingerror(t)},parse:function(t){function i(){for(var t=l.buffer,e=0;e<t.length&&"\r"!==t[e]&&"\n"!==t[e];)++e;var i=t.substr(0,e);return"\r"===t[e]&&++e,"\n"===t[e]&&++e,l.buffer=t.substr(e),i}function r(t){var e=new n;if(s(t,function(t,i){switch(t){case"id":e.set(t,i);break;case"width":e.percent(t,i);break;case"lines":e.integer(t,i);break;case"regionanchor":case"viewportanchor":var s=i.split(",");if(2!==s.length)break;var o=new n;if(o.percent("x",s[0]),o.percent("y",s[1]),!o.has("x")||!o.has("y"))break;e.set(t+"X",o.get("x")),e.set(t+"Y",o.get("y"));break;case"scroll":e.alt(t,i,["up"])}},/=/,/\s/),e.has("id")){var i=new(l.vttjs.VTTRegion||l.window.VTTRegion);i.width=e.get("width",100),i.lines=e.get("lines",3),i.regionAnchorX=e.get("regionanchorX",0),i.regionAnchorY=e.get("regionanchorY",100),i.viewportAnchorX=e.get("viewportanchorX",0),i.viewportAnchorY=e.get("viewportanchorY",100),i.scroll=e.get("scroll",""),l.onregion&&l.onregion(i),l.regionList.push({id:e.get("id"),region:i})}}function a(t){s(t,function(t,e){switch(t){case"Region":r(e)}},/:/)}var l=this;t&&(l.buffer+=l.decoder.decode(t,{stream:!0}));try{var h;if("INITIAL"===l.state){if(!/\r\n|\n/.test(l.buffer))return this;h=i();var c=h.match(/^WEBVTT([ \t].*)?$/);if(!c||!c[0])throw new e(e.Errors.BadSignature);l.state="HEADER"}for(var u=!1;l.buffer;){if(!/\r\n|\n/.test(l.buffer))return this;switch(u?u=!1:h=i(),l.state){case"HEADER":/:/.test(h)?a(h):h||(l.state="ID");continue;case"NOTE":h||(l.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(h)){l.state="NOTE";break}if(!h)continue;if(l.cue=new(l.vttjs.VTTCue||l.window.VTTCue)(0,0,""),l.state="CUE",-1===h.indexOf("-->")){l.cue.id=h;continue}case"CUE":try{o(h,l.cue,l.regionList)}catch(p){l.reportOrThrowError(p),l.cue=null,l.state="BADCUE";continue}l.state="CUETEXT";continue;case"CUETEXT":var d=-1!==h.indexOf("-->");if(!h||d&&(u=!0)){l.oncue&&l.oncue(l.cue),l.cue=null,l.state="ID";continue}l.cue.text&&(l.cue.text+="\n"),l.cue.text+=h;continue;case"BADCUE":h||(l.state="ID");continue}}}catch(p){l.reportOrThrowError(p),"CUETEXT"===l.state&&l.cue&&l.oncue&&l.oncue(l.cue),l.cue=null,l.state="INITIAL"===l.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var t=this;try{if(t.buffer+=t.decoder.decode(),(t.cue||"HEADER"===t.state)&&(t.buffer+="\n\n",t.parse()),"INITIAL"===t.state)throw new e(e.Errors.BadSignature)}catch(i){t.reportOrThrowError(i)}return t.onflush&&t.onflush(),this}},t.WebVTT=d}(this,this.vttjs||{}),function($,t){var e={catchMethods:{methodreturn:[],count:0},init:function(t){var e,i,n;t.originalEvent.origin.match(/vimeo/g)&&"data"in t.originalEvent&&(n="string"===$.type(t.originalEvent.data)?$.parseJSON(t.originalEvent.data):t.originalEvent.data,n&&(e=this.setPlayerID(n),e.length&&(i=this.setVimeoAPIurl(e),n.hasOwnProperty("event")&&this.handleEvent(n,e,i),n.hasOwnProperty("method")&&this.handleMethod(n,e,i))))},setPlayerID:function(t){return $("iframe[src*="+t.player_id+"]")},setVimeoAPIurl:function(t){return"http"!==t.attr("src").substr(0,4)?"https:"+t.attr("src").split("?")[0]:t.attr("src").split("?")[0]},handleMethod:function(t,e,i){this.catchMethods.methodreturn.push(t.value)},handleEvent:function(t,e,i){switch(t.event.toLowerCase()){case"ready":for(var n in $._data(e[0],"events"))n.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/)&&e[0].contentWindow.postMessage(JSON.stringify({method:"addEventListener",value:n}),i);if(e.data("vimeoAPICall")){for(var s=e.data("vimeoAPICall"),o=0;o<s.length;o++)e[0].contentWindow.postMessage(JSON.stringify(s[o].message),s[o].api);e.removeData("vimeoAPICall")}e.data("vimeoReady",!0),e.triggerHandler("ready");break;case"seek":e.triggerHandler("seek",[t.data]);break;case"loadprogress":e.triggerHandler("loadProgress",[t.data]);break;case"playprogress":e.triggerHandler("playProgress",[t.data]);break;case"pause":e.triggerHandler("pause");break;case"finish":e.triggerHandler("finish");break;case"play":e.triggerHandler("play");break;case"cuechange":e.triggerHandler("cuechange")}}};jQuery(document).ready(function(){$("iframe[src*='vimeo.com']").each(function(t){var e=$(this).attr("src");if(null===e.match(/player_id/g)){var i=-1===e.indexOf("?")?"?":"&",n=$.param({api:1,player_id:"vvvvimeoVideo-"+t});$(this).attr("src",e+i+n)}})}),$(t).on("message",function(t){e.init(t)}),$.vimeo=function(i,n,s){var o={},r=e.catchMethods.methodreturn.length;if("string"==typeof n&&(o.method=n),void 0!==typeof s&&"function"!=typeof s&&(o.value=s),"iframe"===i.prop("tagName").toLowerCase()&&o.hasOwnProperty("method"))if(i.data("vimeoReady"))i[0].contentWindow.postMessage(JSON.stringify(o),e.setVimeoAPIurl(i));else{var a=i.data("vimeoAPICall")?i.data("vimeoAPICall"):[];a.push({message:o,api:e.setVimeoAPIurl(i)}),i.data("vimeoAPICall",a)}return"get"!==n.toString().substr(0,3)&&"paused"!==n.toString()||"function"!=typeof s||(!function(i,n,s){var o=t.setInterval(function(){e.catchMethods.methodreturn.length!=i&&(t.clearInterval(o),n(e.catchMethods.methodreturn[s]))},10)}(r,s,e.catchMethods.count),e.catchMethods.count++),i},$.fn.vimeo=function(t,e){return $.vimeo(this,t,e)}}(jQuery,window),function(){var t=this,e=t.Chart,i=function(t){var e=this;this.canvas=t.canvas,this.ctx=t;var i=function(t,e){return t["offset"+e]?t["offset"+e]:document.defaultView.getComputedStyle(t).getPropertyValue(e)},s=this.width=i(t.canvas,"Width"),o=this.height=i(t.canvas,"Height");t.canvas.width=s,t.canvas.height=o;var s=this.width=t.canvas.width,o=this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,n.retinaScale(this),this};i.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},i.types={};var n=i.helpers={},s=n.each=function(t,e,i){var n=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var s;for(s=0;s<t.length;s++)e.apply(i,[t[s],s].concat(n))}else for(var o in t)e.apply(i,[t[o],o].concat(n))},o=n.clone=function(t){var e={};return s(t,function(i,n){t.hasOwnProperty(n)&&(e[n]=i)}),e},r=n.extend=function(t){return s(Array.prototype.slice.call(arguments,1),function(e){s(e,function(i,n){e.hasOwnProperty(n)&&(t[n]=i)})}),t},a=n.merge=function(t,e){var i=Array.prototype.slice.call(arguments,0);return i.unshift({}),r.apply(null,i)},l=n.indexOf=function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},h=n.where=function(t,e){var i=[];return n.each(t,function(t){e(t)&&i.push(t)}),i},c=n.findNextWhere=function(t,e,i){i||(i=-1);for(var n=i+1;n<t.length;n++){var s=t[n];if(e(s))return s}},u=n.findPreviousWhere=function(t,e,i){i||(i=t.length);for(var n=i-1;n>=0;n--){var s=t[n];if(e(s))return s}},p=n.inherits=function(t){var e=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},n=function(){this.constructor=i};return n.prototype=e.prototype,i.prototype=new n,i.extend=p,t&&r(i.prototype,t),i.__super__=e.prototype,i},d=n.noop=function(){},v=n.uid=function(){var t=0;return function(){return"chart-"+t++}}(),f=n.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},g=n.amd="function"==typeof define&&define.amd,y=n.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},m=n.max=function(t){return Math.max.apply(Math,t)},j=n.min=function(t){return Math.min.apply(Math,t)},b=n.cap=function(t,e,i){if(y(e)){if(t>e)return e}else if(y(i)&&i>t)return i;return t},C=n.getDecimalPlaces=function(t){return t%1!==0&&y(t)?t.toString().split(".")[1].length:0},w=n.radians=function(t){return t*(Math.PI/180)},T=n.getAngleFromPoint=function(t,e){var i=e.x-t.x,n=e.y-t.y,s=Math.sqrt(i*i+n*n),o=2*Math.PI+Math.atan2(n,i);return 0>i&&0>n&&(o+=2*Math.PI),{angle:o,distance:s}},_=n.aliasPixel=function(t){return t%2===0?0:.5},S=n.splineCurve=function(t,e,i,n){var s=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)),o=Math.sqrt(Math.pow(i.x-e.x,2)+Math.pow(i.y-e.y,2)),r=n*s/(s+o),a=n*o/(s+o);return{inner:{x:e.x-r*(i.x-t.x),y:e.y-r*(i.y-t.y)},outer:{x:e.x+a*(i.x-t.x),y:e.y+a*(i.y-t.y)}}},k=n.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)},x=n.calculateScaleRange=function(t,e,i,n,s){var o=2,r=Math.floor(e/(1.5*i)),a=o>=r,l=m(t),h=j(t);l===h&&(l+=.5,h>=.5&&!n?h-=.5:l+=.5);for(var c=Math.abs(l-h),u=k(c),p=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),d=n?0:Math.floor(h/(1*Math.pow(10,u)))*Math.pow(10,u),v=p-d,f=Math.pow(10,u),g=Math.round(v/f);(g>r||r>2*g)&&!a;)if(g>r)f*=2,g=Math.round(v/f),g%1!==0&&(a=!0);else if(s&&u>=0){if(f/2%1!==0)break;f/=2,g=Math.round(v/f)}else f/=2,g=Math.round(v/f);return a&&(g=o,f=v/g),{steps:g,stepValue:f,min:d,max:d+g*f}},E=n.template=function(t,e){function i(t,e){var i=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):n[t]=n[t];return e?i(e):i}if(t instanceof Function)return t(e);var n={};return i(t,e)},P=n.generateLabels=function(t,e,i,n){var o=new Array(e);return labelTemplateString&&s(o,function(e,s){o[s]=E(t,{value:i+n*(s+1)})}),o},A=n.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:1==(t/=1)?1:(i||(i=.3),n<Math.abs(1)?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),-(n*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)))},easeOutElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:1==(t/=1)?1:(i||(i=.3),n<Math.abs(1)?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),n*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/i)+1)},easeInOutElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:2==(t/=.5)?1:(i||(i=1*(.3*1.5)),n<Math.abs(1)?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),1>t?-.5*(n*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)):n*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-A.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*A.easeInBounce(2*t):.5*A.easeOutBounce(2*t-1)+.5}},I=n.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),M=n.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),L=n.animationLoop=function(t,e,i,n,s,o){var r=0,a=A[i]||A.linear,l=function(){r++;var i=r/e,h=a(i);t.call(o,h,i,r),n.call(o,h,i),e>r?o.animationFrame=I(l):s.apply(o)};I(l)},F=n.getRelativePosition=function(t){var e,i,n=t.originalEvent||t,s=t.currentTarget||t.srcElement,o=s.getBoundingClientRect();return n.touches?(e=n.touches[0].clientX-o.left,i=n.touches[0].clientY-o.top):(e=n.clientX-o.left,i=n.clientY-o.top),{x:e,y:i}},D=n.addEvent=function(t,e,i){t.addEventListener?t.addEventListener(e,i):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i},R=n.removeEvent=function(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=d},O=n.bindEvents=function(t,e,i){t.events||(t.events={}),s(e,function(e){t.events[e]=function(){i.apply(t,arguments)},D(t.chart.canvas,e,t.events[e])})},N=n.unbindEvents=function(t,e){s(e,function(e,i){R(t.chart.canvas,i,e)})},B=n.getMaximumWidth=function(t){var e=t.parentNode;return e.clientWidth},H=n.getMaximumHeight=function(t){var e=t.parentNode;return e.clientHeight},W=n.getMaximumSize=n.getMaximumWidth,V=n.retinaScale=function(t){var e=t.ctx,i=t.canvas.width,n=t.canvas.height;window.devicePixelRatio&&(e.canvas.style.width=i+"px",e.canvas.style.height=n+"px",e.canvas.height=n*window.devicePixelRatio,e.canvas.width=i*window.devicePixelRatio,e.scale(window.devicePixelRatio,window.devicePixelRatio))},z=n.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},U=n.fontString=function(t,e,i){return e+" "+t+"px "+i},q=n.longestText=function(t,e,i){t.font=e;var n=0;return s(i,function(e){var i=t.measureText(e).width;n=i>n?i:n}),n},G=n.drawRoundedRectangle=function(t,e,i,n,s,o){t.beginPath(),t.moveTo(e+o,i),t.lineTo(e+n-o,i),t.quadraticCurveTo(e+n,i,e+n,i+o),t.lineTo(e+n,i+s-o),t.quadraticCurveTo(e+n,i+s,e+n-o,i+s),t.lineTo(e+o,i+s),t.quadraticCurveTo(e,i+s,e,i+s-o),t.lineTo(e,i+o),t.quadraticCurveTo(e,i,e+o,i),t.closePath()};i.instances={},i.Type=function(t,e,n){this.options=e,this.chart=n,this.id=v(),i.instances[this.id]=this,e.responsive&&this.resize(),this.initialize.call(this,t)},r(i.Type.prototype,{initialize:function(){return this},clear:function(){return z(this.chart),this},stop:function(){return M(this.animationFrame),this},resize:function(t){this.stop();var e=this.chart.canvas,i=B(this.chart.canvas),n=this.options.maintainAspectRatio?i/this.chart.aspectRatio:H(this.chart.canvas);return e.width=this.chart.width=i,e.height=this.chart.height=n,V(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:d,render:function(t){return t&&this.reflow(),this.options.animation&&!t?n.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return E(this.options.legendTemplate,this)},destroy:function(){this.clear(),N(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete i.instances[this.id]},showTooltip:function(t,e){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var e=!1;return t.length!==this.activeElements.length?e=!0:(s(t,function(t,i){t!==this.activeElements[i]&&(e=!0)},this),e)}.call(this,t);if(o||e){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var r,a,h=this.datasets.length-1;h>=0&&(r=this.datasets[h].points||this.datasets[h].bars||this.datasets[h].segments,a=l(r,t[0]),-1===a);h--);var c=[],u=[],p=function(t){var e=[],i,s=[],o=[],r,l,h,p;return n.each(this.datasets,function(t){i=t.points||t.bars||t.segments,i[a]&&i[a].hasValue()&&e.push(i[a])}),n.each(e,function(t){s.push(t.x),o.push(t.y),c.push(n.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),p=j(o),l=m(o),h=j(s),r=m(s),{x:h>this.chart.width/2?h:r,y:(p+l)/2}}.call(this,a);new i.MultiTooltip({x:p.x,y:p.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else s(t,function(t){var e=t.tooltipPosition();new i.Tooltip({x:Math.round(e.x),y:Math.round(e.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:E(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),i.Type.extend=function(t){var e=this,n=function(){return e.apply(this,arguments)};if(n.prototype=o(e.prototype),r(n.prototype,t),n.extend=i.Type.extend,t.name||e.prototype.name){var s=t.name||e.prototype.name,l=i.defaults[e.prototype.name]?o(i.defaults[e.prototype.name]):{};i.defaults[s]=r(l,t.defaults),i.types[s]=n,i.prototype[s]=function(t,e){var o=a(i.defaults.global,i.defaults[s],e||{});return new n(t,o,this)}}else f("Name not provided for this chart, so it hasn't been registered");return e},i.Element=function(t){r(this,t),this.initialize.apply(this,arguments),this.save()},r(i.Element.prototype,{initialize:function(){},restore:function(t){return t?s(t,function(t){this[t]=this._saved[t]},this):r(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return s(t,function(t,e){this._saved[e]=this[e],this[e]=t},this),this},transition:function(t,e){return s(t,function(t,i){this[i]=(t-this._saved[i])*e+this._saved[i]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return y(this.value)}}),i.Element.extend=p,i.Point=i.Element.extend({display:!0,inRange:function(t,e){var i=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(e-this.y,2)<Math.pow(i,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),i.Arc=i.Element.extend({inRange:function(t,e){var i=n.getAngleFromPoint(this,{x:t,y:e}),s=i.angle>=this.startAngle&&i.angle<=this.endAngle,o=i.distance>=this.innerRadius&&i.distance<=this.outerRadius;return s&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,e=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*e,y:this.y+Math.sin(t)*e}},draw:function(t){var e=t||1,i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),i.Rectangle=i.Element.extend({draw:function(){var t=this.ctx,e=this.width/2,i=this.x-e,n=this.x+e,s=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(i+=o,n-=o,s+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(i,this.base),t.lineTo(i,s),t.lineTo(n,s),t.lineTo(n,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,e){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&e>=this.y&&e<=this.base}}),i.Tooltip=i.Element.extend({draw:function(){var t=this.chart.ctx;t.font=U(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var e=this.caretPadding=2,i=t.measureText(this.text).width+2*this.xPadding,n=this.fontSize+2*this.yPadding,s=n+this.caretHeight+e;this.x+i/2>this.chart.width?this.xAlign="left":this.x-i/2<0&&(this.xAlign="right"),this.y-s<0&&(this.yAlign="below");var o=this.x-i/2,r=this.y-s;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-e),t.lineTo(this.x+this.caretHeight,this.y-(e+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(e+this.caretHeight)),t.closePath(),t.fill();break;case"below":r=this.y+e+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+e),t.lineTo(this.x+this.caretHeight,this.y+e+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+e+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-i+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}G(t,o,r,i,n,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+i/2,r+n/2)}}}),i.MultiTooltip=i.Element.extend({initialize:function(){this.font=U(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=U(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,e=q(this.ctx,this.font,this.labels)+this.fontSize+3,i=m([e,t]);this.width=i+2*this.xPadding;var n=this.height/2;this.y-n<0?this.y=n:this.y+n>this.chart.height&&(this.y=this.chart.height-n),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var e=this.y-this.height/2+this.yPadding,i=t-1;return 0===t?e+this.titleFontSize/2:e+(1.5*this.fontSize*i+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{G(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,n.each(this.labels,function(e,i){t.fillStyle=this.textColor,t.fillText(e,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(i+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(i+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[i].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(i+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),i.Scale=i.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=C(this.stepValue),e=0;e<=this.steps;e++)this.yLabels.push(E(this.templateString,{value:(this.min+e*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?q(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t=this.endPoint-this.startPoint,e;for(this.calculateYRange(t),this.buildYLabels(),this.calculateXLabelRotation();t>this.endPoint-this.startPoint;)t=this.endPoint-this.startPoint,e=this.yLabelWidth,this.calculateYRange(t),this.buildYLabels(),e<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t=this.ctx.measureText(this.xLabels[0]).width,e=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width,i,n;if(this.xScalePaddingRight=e/2+3,this.xScalePaddingLeft=t/2>this.yLabelWidth+10?t/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var s=q(this.ctx,this.font,this.xLabels),o,r;this.xLabelWidth=s;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)o=Math.cos(w(this.xLabelRotation)),i=o*t,n=o*e,i+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=i+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=o*s;this.xLabelRotation>0&&(this.endPoint-=Math.sin(w(this.xLabelRotation))*s+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:d,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var e=this.drawingArea()/(this.min-this.max);return this.endPoint-e*(t-this.min)},calculateX:function(t){var e=this.xLabelRotation>0,i=this.width-(this.xScalePaddingLeft+this.xScalePaddingRight),n=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=n*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=n/2),Math.round(s)},update:function(t){n.extend(this,t),this.fit()},draw:function(){var t=this.ctx,e=(this.endPoint-this.startPoint)/this.steps,i=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,s(this.yLabels,function(s,o){var r=this.endPoint-e*o,a=Math.round(r),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(s,i-10,r),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a+=n.aliasPixel(t.lineWidth),l&&(t.moveTo(i,a),t.lineTo(this.width,a),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(i-5,a),t.lineTo(i,a),t.stroke(),t.closePath()},this),s(this.xLabels,function(e,i){var n=this.calculateX(i)+_(this.lineWidth),s=this.calculateX(i-(this.offsetGridLines?.5:0))+_(this.lineWidth),o=this.xLabelRotation>0,r=this.showVerticalLines;0!==i||r||(r=!0),r&&t.beginPath(),i>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),r&&(t.moveTo(s,this.endPoint),t.lineTo(s,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(s,this.endPoint),t.lineTo(s,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(n,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*w(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(e,0,0),t.restore()},this))}}),i.RadialScale=i.Element.extend({initialize:function(){this.size=j([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2;
},calculateCenterOffset:function(t){var e=this.drawingArea/(this.max-this.min);return(t-this.min)*e},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=C(this.stepValue),e=0;e<=this.steps;e++)this.yLabels.push(E(this.templateString,{value:(this.min+e*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t=j([this.height/2-this.pointLabelFontSize-5,this.width/2]),e,i,n,s,o=this.width,r,a,l=0,h,c,u,p,d,v,f;for(this.ctx.font=U(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)e=this.getPointPosition(i,t),n=this.ctx.measureText(E(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=n/2,e.x+s>o&&(o=e.x+s,r=i),e.x-s<l&&(l=e.x-s,h=i)):i<this.valuesCount/2?e.x+n>o&&(o=e.x+n,r=i):i>this.valuesCount/2&&e.x-n<l&&(l=e.x-n,h=i);u=l,p=Math.ceil(o-this.width),a=this.getIndexAngle(r),c=this.getIndexAngle(h),d=p/Math.sin(a+Math.PI/2),v=u/Math.sin(c+Math.PI/2),d=y(d)?d:0,v=y(v)?v:0,this.drawingArea=t-(v+d)/2,this.setCenterPoint(v,d)},setCenterPoint:function(t,e){var i=this.width-e-this.drawingArea,n=t+this.drawingArea;this.xCenter=(n+i)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var e=2*Math.PI/this.valuesCount;return t*e-Math.PI/2},getPointPosition:function(t,e){var i=this.getIndexAngle(t);return{x:Math.cos(i)*e+this.xCenter,y:Math.sin(i)*e+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(s(this.yLabels,function(e,i){if(i>0){var n=i*(this.drawingArea/this.steps),s=this.yCenter-n,o;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var r=0;r<this.valuesCount;r++)o=this.getPointPosition(r,this.calculateCenterOffset(this.min+i*this.stepValue)),0===r?t.moveTo(o.x,o.y):t.lineTo(o.x,o.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=U(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var a=t.measureText(e).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-a/2-this.backdropPaddingX,s-this.fontSize/2-this.backdropPaddingY,a+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(e,this.xCenter,s)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var e=this.valuesCount-1;e>=0;e--){if(this.angleLineWidth>0){var i=this.getPointPosition(e,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(i.x,i.y),t.stroke(),t.closePath()}var n=this.getPointPosition(e,this.calculateCenterOffset(this.max)+5);t.font=U(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var o=this.labels.length,r=this.labels.length/2,a=r/2,l=a>e||e>o-a,h=e===a||e===o-a;0===e?t.textAlign="center":e===r?t.textAlign="center":r>e?t.textAlign="left":t.textAlign="right",h?t.textBaseline="middle":l?t.textBaseline="bottom":t.textBaseline="top",t.fillText(this.labels[e],n.x,n.y)}}}}}),n.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){s(i.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),g?define(function(){return i}):"object"==typeof module&&module.exports&&(module.exports=i),t.Chart=i,i.noConflict=function(){return t.Chart=e,i}}.call(this),function(){var t=this,e=t.Chart,i=e.helpers,n={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Bar",defaults:n,initialize:function(t){var n=this.options;this.ScaleClass=e.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,e,i){var s=this.calculateBaseWidth(),o=this.calculateX(i)-s/2,r=this.calculateBarWidth(t);return o+r*e+e*n.barDatasetSpacing+r/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*n.barValueSpacing},calculateBarWidth:function(t){var e=this.calculateBaseWidth()-(t-1)*n.barDatasetSpacing;return e/t}}),this.datasets=[],this.options.showTooltips&&i.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),i.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),this.BarClass=e.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),i.each(t.datasets,function(e,n){var s={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,bars:[]};this.datasets.push(s),i.each(e.data,function(i,n){s.bars.push(new this.BarClass({value:i,label:t.labels[n],datasetLabel:e.label,strokeColor:e.strokeColor,fillColor:e.fillColor,highlightFill:e.highlightFill||e.fillColor,highlightStroke:e.highlightStroke||e.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,e,n){i.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,n,e),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),i.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){i.each(this.datasets,function(e,n){i.each(e.bars,t,this,n)},this)},getBarsAtEvent:function(t){for(var e=[],n=i.getRelativePosition(t),s=function(t){e.push(t.bars[o])},o,r=0;r<this.datasets.length;r++)for(o=0;o<this.datasets[r].bars.length;o++)if(this.datasets[r].bars[o].inRange(n.x,n.y))return i.each(this.datasets,s),e;return e},buildScale:function(t){var e=this,n=function(){var t=[];return e.eachBars(function(e){t.push(e.value)}),t},s={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var e=i.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);i.extend(this,e)},xLabels:t,font:i.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&i.extend(s,{calculateYRange:i.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(s)},addData:function(t,e){i.each(t,function(t,i){this.datasets[i].bars.push(new this.BarClass({value:t,label:e,x:this.scale.calculateBarX(this.datasets.length,i,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[i].strokeColor,fillColor:this.datasets[i].fillColor}))},this),this.scale.addXLabel(e),this.update()},removeData:function(){this.scale.removeXLabel(),i.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){i.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=i.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var e=t||1;this.clear();var n=this.chart.ctx;this.scale.draw(e),i.each(this.datasets,function(t,n){i.each(t.bars,function(t,i){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,n,i),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},e).draw())},this)},this)}})}.call(this),function(){var t=this,e=t.Chart,i=e.helpers,n={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Doughnut",defaults:n,initialize:function(t){this.segments=[],this.outerRadius=(i.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=e.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&i.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];i.each(this.segments,function(t){t.restore(["fillColor"])}),i.each(e,function(t){t.fillColor=t.highlightColor}),this.showTooltip(e)}),this.calculateTotal(t),i.each(t,function(t,e){this.addData(t,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var e=[],n=i.getRelativePosition(t);return i.each(this.segments,function(t){t.inRange(n.x,n.y)&&e.push(t)},this),e},addData:function(t,e,i){var n=e||this.segments.length;this.segments.splice(n,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),i||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,i.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),i.each(this.activeElements,function(t){t.restore(["fillColor"])}),i.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var e=i.isNumber(t)?t:this.segments.length-1;this.segments.splice(e,1),this.reflow(),this.update()},reflow:function(){i.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(i.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,i.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var e=t?t:1;this.clear(),i.each(this.segments,function(t,i){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},e),t.endAngle=t.startAngle+t.circumference,t.draw(),0===i&&(t.startAngle=1.5*Math.PI),i<this.segments.length-1&&(this.segments[i+1].startAngle=t.endAngle)},this)}}),e.types.Doughnut.extend({name:"Pie",defaults:i.merge(n,{percentageInnerCutout:0})})}.call(this),function(){var t=this,e=t.Chart,i=e.helpers,n={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Line",defaults:n,initialize:function(t){this.PointClass=e.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&i.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),i.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),i.each(t.datasets,function(e){var n={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,pointColor:e.pointColor,pointStrokeColor:e.pointStrokeColor,points:[]};this.datasets.push(n),i.each(e.data,function(i,s){n.points.push(new this.PointClass({value:i,label:t.labels[s],datasetLabel:e.label,strokeColor:e.pointStrokeColor,fillColor:e.pointColor,highlightFill:e.pointHighlightFill||e.pointColor,highlightStroke:e.pointHighlightStroke||e.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,e){i.extend(t,{x:this.scale.calculateX(e),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),i.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){i.each(this.datasets,function(e){i.each(e.points,t,this)},this)},getPointsAtEvent:function(t){var e=[],n=i.getRelativePosition(t);return i.each(this.datasets,function(t){i.each(t.points,function(t){t.inRange(n.x,n.y)&&e.push(t)})},this),e},buildScale:function(t){var n=this,s=function(){var t=[];return n.eachPoints(function(e){t.push(e.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var e=i.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);i.extend(this,e)},xLabels:t,font:i.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&i.extend(o,{calculateYRange:i.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new e.Scale(o)},addData:function(t,e){i.each(t,function(t,i){this.datasets[i].points.push(new this.PointClass({value:t,label:e,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[i].pointStrokeColor,fillColor:this.datasets[i].pointColor}))},this),this.scale.addXLabel(e),this.update()},removeData:function(){this.scale.removeXLabel(),i.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=i.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var e=t||1;this.clear();var n=this.chart.ctx,s=function(t){return null!==t.value},o=function(t,e,n){return i.findNextWhere(e,s,n)||t},r=function(t,e,n){return i.findPreviousWhere(e,s,n)||t};this.scale.draw(e),i.each(this.datasets,function(t){var a=i.where(t.points,s);i.each(t.points,function(t,i){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(i)},e)},this),this.options.bezierCurve&&i.each(a,function(t,e){var n=e>0&&e<a.length-1?this.options.bezierCurveTension:0;t.controlPoints=i.splineCurve(r(t,a,e),t,o(t,a,e),n),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),n.lineWidth=this.options.datasetStrokeWidth,n.strokeStyle=t.strokeColor,n.beginPath(),i.each(a,function(t,e){if(0===e)n.moveTo(t.x,t.y);else if(this.options.bezierCurve){var i=r(t,a,e);n.bezierCurveTo(i.controlPoints.outer.x,i.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else n.lineTo(t.x,t.y)},this),n.stroke(),this.options.datasetFill&&a.length>0&&(n.lineTo(a[a.length-1].x,this.scale.endPoint),n.lineTo(a[0].x,this.scale.endPoint),n.fillStyle=t.fillColor,n.closePath(),n.fill()),i.each(a,function(t){t.draw()})},this)}})}.call(this),function(){var t=this,e=t.Chart,i=e.helpers,n={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"PolarArea",defaults:n,initialize:function(t){this.segments=[],this.SegmentArc=e.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new e.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),i.each(t,function(t,e){this.addData(t,e,!0)},this),this.options.showTooltips&&i.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];i.each(this.segments,function(t){t.restore(["fillColor"])}),i.each(e,function(t){t.fillColor=t.highlightColor}),this.showTooltip(e)}),this.render()},getSegmentsAtEvent:function(t){var e=[],n=i.getRelativePosition(t);return i.each(this.segments,function(t){t.inRange(n.x,n.y)&&e.push(t)},this),e},addData:function(t,e,i){var n=e||this.segments.length;this.segments.splice(n,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),i||(this.reflow(),this.update())},removeData:function(t){var e=i.isNumber(t)?t:this.segments.length-1;this.segments.splice(e,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,i.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var e=[];i.each(t,function(t){e.push(t.value)});var n=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:i.calculateScaleRange(e,i.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);i.extend(this.scale,n,{size:i.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),i.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){i.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),i.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),i.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var e=t||1;this.clear(),i.each(this.segments,function(t,i){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},e),t.endAngle=t.startAngle+t.circumference,0===i&&(t.startAngle=1.5*Math.PI),i<this.segments.length-1&&(this.segments[i+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){var t=this,e=t.Chart,i=e.helpers;e.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=e.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&i.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),i.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),i.each(t.datasets,function(e){var n={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,pointColor:e.pointColor,pointStrokeColor:e.pointStrokeColor,points:[]};this.datasets.push(n),i.each(e.data,function(i,s){var o;this.scale.animation||(o=this.scale.getPointPosition(s,this.scale.calculateCenterOffset(i))),n.points.push(new this.PointClass({value:i,label:t.labels[s],datasetLabel:e.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:e.pointStrokeColor,fillColor:e.pointColor,highlightFill:e.pointHighlightFill||e.pointColor,highlightStroke:e.pointHighlightStroke||e.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){i.each(this.datasets,function(e){i.each(e.points,t,this)},this)},getPointsAtEvent:function(t){var e=i.getRelativePosition(t),n=i.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},e),s=2*Math.PI/this.scale.valuesCount,o=Math.round((n.angle-1.5*Math.PI)/s),r=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),n.distance<=this.scale.drawingArea&&i.each(this.datasets,function(t){r.push(t.points[o])}),r},buildScale:function(t){this.scale=new e.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var e=function(){var e=[];return i.each(t,function(t){t.data?e=e.concat(t.data):i.each(t.points,function(t){e.push(t.value)})}),e}(),n=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:i.calculateScaleRange(e,i.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);i.extend(this.scale,n)},addData:function(t,e){this.scale.valuesCount++,i.each(t,function(t,i){var n=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[i].points.push(new this.PointClass({value:t,label:e,x:n.x,y:n.y,strokeColor:this.datasets[i].pointStrokeColor,fillColor:this.datasets[i].pointColor}))},this),this.scale.labels.push(e),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),i.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){i.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:i.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var e=t||1,n=this.chart.ctx;this.clear(),this.scale.draw(),i.each(this.datasets,function(t){i.each(t.points,function(t,i){t.hasValue()&&t.transition(this.scale.getPointPosition(i,this.scale.calculateCenterOffset(t.value)),e)},this),n.lineWidth=this.options.datasetStrokeWidth,n.strokeStyle=t.strokeColor,n.beginPath(),i.each(t.points,function(t,e){0===e?n.moveTo(t.x,t.y):n.lineTo(t.x,t.y)},this),n.closePath(),n.stroke(),n.fillStyle=t.fillColor,n.fill(),i.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this),function($){function t(){$(".wp-1").waypoint(function(){$(".wp-1").addClass("animated fadeInUp")},{offset:"75%"}),$(".wp-2").waypoint(function(){$(".wp-2").addClass("animated fadeInUp")},{offset:"75%"}),$(".wp-3").waypoint(function(){$(".wp-3").addClass("animated fadeInUp")},{offset:"75%"}),$(".wp-4").waypoint(function(){$(".wp-4").addClass("animated fadeIn")},{offset:"75%"}),$(".wp-5").waypoint(function(){$(".wp-5").addClass("animated fadeInRight")},{offset:"50%"}),$(".wp-6").waypoint(function(){$(".wp-6").addClass("animated fadeInLeft")},{offset:"50%"}),$(".wp-7").waypoint(function(){$(".wp-7").addClass("animated fadeInUp")},{offset:"60%"}),$(".wp-8").waypoint(function(){$(".wp-8").addClass("animated fadeInUp")},{offset:"60%"})}function e(){$("input, textarea").placeholder()}function i(){$("#collapsingMobileUser").on("show.bs.collapse",function(){$("#collapsingNavbar").removeClass("in"),$('[data-target="#collapsingNavbar"]').attr("aria-expanded","false")}),$("#collapsingNavbar").on("show.bs.collapse",function(){$("#collapsingMobileUser").removeClass("in"),$('[data-target="#collapsingMobileUser"]').attr("aria-expanded","false")}),$("#collapsingMobileUserInverse").on("show.bs.collapse",function(){$("#collapsingNavbarInverse").removeClass("in"),$('[data-target="#collapsingNavbarInverse"]').attr("aria-expanded","false")}),$("#collapsingNavbarInverse").on("show.bs.collapse",function(){$("#collapsingMobileUserInverse").removeClass("in"),$('[data-target="#collapsingMobileUserInverse"]').attr("aria-expanded","false")})}function n(){$(".nav-dropdown-search").on("show.bs.dropdown",function(){$(this).siblings().not(".navbar-nav .dropdown").addClass("sr-only")}),$(".nav-dropdown-search").on("shown.bs.dropdown",function(){$(".navbar-search-input").focus()}),$(".nav-dropdown-search").on("hide.bs.dropdown",function(){$(this).siblings().removeClass("sr-only")})}function s(){videojs("demo_video",{controlBar:{timeDivider:!1,fullscreenToggle:!1,playToggle:!1,remainingTimeDisplay:!1},height:"auto",width:"auto"}).ready(function(){function t(){var t=document.getElementById(e.id()).parentElement.offsetWidth;e.width(t).height(t*i)}var e=this,i=5/12;t(),window.onresize=t})}function o(){$(".scroll-top").on("click",function(){return $("html, body").animate({scrollTop:0},1e3),!1})}function r(){var t=[{value:324,color:"#5e98e3",highlight:"#424753",label:"Completed"},{value:34,color:"#59d0bd",highlight:"#424753",label:"In backlog"},{value:20,color:"#e8e9ec",highlight:"#424753",label:"Without ticket"}];window.onload=function(){var e=document.getElementById("chart-area");if(null==e)return!1;var i=e.getContext("2d");window.myDoughnut=new Chart(i).Doughnut(t,{responsive:!0,percentageInnerCutout:80})}}function a(){$("#videoModal").on("shown.bs.modal",function(){$("#vimeo-play").vimeo("play")}),$("#videoModal").on("hidden.bs.modal",function(){$("#vimeo-play").vimeo("pause")}),$("#youtube-trigger").click(function(){var t=$(this).attr("data-video"),e=t+"?autoplay=1&html5=1&rel=0&showinfo=0";$("#youtubeModal").on("shown.bs.modal",function(){$("#youtube-play").attr("src",e)}),$("#youtubeModal").on("hidden.bs.modal",function(){$("#youtube-play").attr("src",t)})})}function l(){t(),e(),i(),n(),s(),o(),r(),a()}l()}(jQuery);
//# sourceMappingURL=./landio.min.js.map