// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lilast = $(".last");
var favDialog = document.getElementById("favDialog");
var inputText = $(".input-text");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: "b",
  url: "https://bilibili.com"
}, {
  logo: "i",
  url: "https://www.iconfont.cn"
}, {
  logo: "j",
  url: "https://juejin.im"
}, {
  logo: "z",
  url: "https://www.zhihu.com"
}, {
  logo: "y",
  url: "https://www.yuque.com"
}, {
  logo: "c",
  url: "https://css-tricks.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("http://", "").replace("https://", "").replace("www.", "").replace(/\/.*/, "");
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n            <li>\n              <div class=\"site\">\n                <div class=\"logo\">".concat(simplifyUrl(node.url)[0], "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\"><svg class=\"icon\" ><use xlink:href=\"#icon-close\"></use></svg></class></div>\n                <div class=\"more\"title=\"\u4FEE\u6539\u7F51\u5740\"><svg class=\"icon\" ><use xlink:href=\"#icon-gengduo\"></use></svg></class></div>\n              </div>\n            </li>\n    ")).insertBefore($lilast);
    $li.on("click", function () {
      window.open(node.url, "_self");
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    $li.on("click", ".more", function (e) {
      e.stopPropagation();
      favDialog.showModal(); // 获取焦点？this.

      inputText.attr("value", hashMap[index].url).attr("onfocus", inputText.select());
      $(".cancelUrl").on("click", function () {
        window.location.reload();
      });
      $(".deleteUrl").on("click", function () {
        // $(".deleteUrl").unbind("click");
        hashMap.splice(index, 1);
        render();
        window.location.reload();
      });
      $(".confirmUrl").on("click", function () {
        var newUrl = inputText.val();
        hashMap[index].url = newUrl;
        render();
        window.location.reload();
      });
    });
  });
};

render();
$(".addSite").on("click", function () {
  var url = window.prompt("请输入想要添加的网址");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var str = JSON.stringify(hashMap);
  localStorage.setItem("x", str);
};

$(document).on("keypress", function (e) {
  var keyCode = e.keyCode;
  console.log(keyCode);

  if (keyCode === 13) {
    console.log(true);
    confirmUrl();
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.cebe5595.js.map