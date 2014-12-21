var SmartAppBanner = function(setting){

  var options = {
      displayAfterClose: 15,
      displayAfterView: 90,
      name: 'Apple App',
      author: 'Apple Inc.',
      buttonText: 'View',
      price: 'Free'
    },
    appDefine = {
      ios: {
        meta: 'apple-itunes-app',
        iconRels: ['apple-touch-icon'],
        getStoreLink: function(appId) {
          return 'https://itunes.apple.com/app/id' + appId;
        },
        getStoreText: function(price) {
          return price + ' - In the App Store';
        }
      },
      android: {
        meta: 'google-play-app',
        iconRels: ['android-touch-icon', 'apple-touch-icon'],
        getStoreLink: function(appId) {
          return 'http://play.google.com/store/apps/details?id=' + appId;
        },
        getStoreText: function(price) {
          return price + ' - In the Google Play';
        }
      }
    };

  function extend(source, options){
    for(var prop in options) {
      if(source.hasOwnProperty(prop)) {
        source[prop] = options[prop];
      }
    }
    return source;
  }

  function setCookie(name, value, day){
    var expires = '';
    if(day != null) {
      var date = new Date();
      date.setDate(date.getDate() + day);
      expires = date.toUTCString();
    }
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/;';
  }

  function getCookie(name){
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
      var c = cookies[i],
        key = c.substr(0, c.indexOf('=')),
        value = c.substr(c.indexOf('=') + 1);
      if(key === name) {
        return value;
      }
    }

    return null;
  }

  function addClass(element, className){
    if(element.classList) {
      element.classList.add(className);
    } else {
      element.className += " "+className;
    }
  }

  function removeClass(element, className){
    if(element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp("(?:^|\\s)"+className+"(?!\\S)") , '' );
    }
  }

  if (getCookie('smartappbanner-closed') ||
    getCookie('smartappbanner-viewed')) {
      return;
  }

  options = extend(options, setting);

  // get app os
  var userAgent = navigator.userAgent,
    appSetting = {},
    mobileAgent = '';
  if(userAgent.match(/iP(ad|hone)/i) !== null &&
    Number(userAgent.substr(userAgent.indexOf('OS ') + 3, 3 ).replace('_', '.')) < 6
    ) {
    mobileAgent = 'ios';
  } else if (userAgent.match(/Android/i) !== null){
    mobileAgent = 'android';
  } else {
    return;
  }

  // get app id
  appSetting = appDefine[mobileAgent];
  var $meta = null,
    content = '',
    appId = '';
  $meta = document.querySelector('meta[name="' + appSetting.meta + '"]');
  if (!$meta) {
    return;
  }
  content = $meta.getAttribute('content');
  appId = content.substr(content.indexOf('=') + 1);
  if (!appId) {
    return;
  }

  //create smart banner
  var storeLink = appSetting.getStoreLink(appId),
    storeText = appSetting.getStoreText(options.price),
    iconPath = '';

  for(var i = 0; i < appSetting.iconRels.length; i++) {
    var $rel = document.querySelector('link[rel="' + appSetting.iconRels[i] + '"]');
    if($rel) {
      iconPath = $rel.getAttribute('href');
      break;
    }
  }

  var element = document.createElement('div');

    addClass(element, 'smartappbanner');
    element.innerHTML = '<a href="javascript:void(0);" class="smartappbanner-close">&times;</a>' +
                        '<span class="smartappbanner-icon" style="background-image: url('+iconPath+')"></span>' +
                        '<div class="smartappbanner-info">' +
                          '<p class="app-name">' + options.name + '</p>' +
                          '<p class="app-author">' + options.author + '</p>' +
                          '<p class="app-store">' + storeText + '</p>' +
                        '</div>' +
                        '<a href="' + storeLink + '" class="smartappbanner-view">' + options.buttonText + '</a>';

    document.body.insertBefore(element, document.body.firstElementChild);

    element.querySelector('.smartappbanner-close').addEventListener('click', function(){
      removeClass(element, 'show');
      setCookie('smartappbanner-closed', 'true', options.displayAfterClose);
    }, false);
    element.querySelector('.smartappbanner-view').addEventListener('click', function(){
      removeClass(element, 'show');
      setCookie('smartappbanner-viewed', 'true', options.displayAfterView);
    }, false);

    addClass(element, 'show');
}
