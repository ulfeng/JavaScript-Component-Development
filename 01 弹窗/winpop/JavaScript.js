// 组件结构设计
//alert("内置Alert控件");
//if (confirm("关闭内置Confirm控件？")) {
//    alert("True");
//}
//else {
//    alert("False");
//}

// 1.基本做法
// var obj = new Winpop(); // 创建一个Winpop的实例对象
// 覆盖alert控件
//window.alert = function (str) {
//    obj.alert.call(obj, str);
//};

// 覆盖 confirm 控件
//window.confirm = function (str, cb) {
//    obj.confirm.call(obj, str, cb);
//}

// 2.组件代码设计
// JavaScript 组件的基本结构
//(function (window, undefined) {
//    function JsClassName(cfg) {
//        var config = cfg || {};
//        this.get = function (n) {
//            return config[n];
//        }
//        this.set = function (n, v) {
//            config[n] = v;
//        }
//        this.init();
//    }
//    JsClassName.prototype = {
//        init: function () { },
//        otherMethod: function () { }
//    };
//    window.JsClassName = window.JsClassName || JsClassName;
//})(window);

// Winpop 组件的完整代码
(function (window, JQuery, undefined) {
    var HTMLS = {
        ov1: "<div id='J_WinpopMask'></div>" + "<div id='J_WinpopBox'>" + "<div></div>" + "<div></div>" + "</div>",
        alert: "<input type='button' value='确定'>",
        confirm: "<input type='button' value='取消'>" + "<input type='button' value='确定'>"
    }
    function Winpop() {
        var config = {};
        this.get = function (n) {
            return config[n];
        }

        this.set = function (n, v) {
            config[n] = v;
        }
        this.init();
    }

    Winpop.prototype = {
        init: function () {
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var body = JQuery("body"),
                ovl = JQuery("#J_WinpopBox");

            if (ovl.length === 0) {
                body.append(HTMLS.ov1);
            }

            this.set("ovl", JQuery("#J_WinpopBox"));
            this.set("mask", JQuery("#J_WinpopMask"));
        },

        bindEvent: function () {
            var _this = this,
                ovl = this.get("ovl"),
                mask = _this.get("mask");
            ovl.on("click", ".J_AltBtn", function () {
                _this.hide();
            });
            ovl.on("click", ".J_CfmTrue", function (e) {
                var cb = _this.get("confirmBack");
                _this.hide();
                cb && cb(true);
            });
            mask.on("click", function (e) {
                _this.hide();
            });
            JQuery(document).on("keyup", function (e) {
                var kc = e.keyCode,
                    cb = _this.get("confirmBack");
                if (kc == 27) {
                    _this.hide();
                } else if (kc === 13) {
                    _this.hide();
                    if (_this.get("type") === "confirm") {
                        cb && cb(true);
                    }
                }
            });
        },

        alert: function (str, btnstr) {
            var str = typeof str === "string" ? str : str.toString(),
                ovl = this.get("ovl");
            this.set("type", "alert");
            ovl.find(".J_WinpopMain").html(str);
            if (typeof btnstr == "undefined") {
                ovl.find(".J_WinpopBtns").html(HTMLS.alert);
            } else {
                ovl.find(".J_WinpopBtns").html(btnstr);
            }
            this.show();
        },
        confirm: function (str, callback) {
            var str = typeof str === "string" ? str : str.toString(),
                ovl = this.get("ovl");
            this.set("type", "confirm");
            ovl.find(".JWinpopMain").html(str);
            ovl.find(".J_WinpopBtns").html(HTMLS.confirm);
            this.set("confirmBack", (callback || function () { }));
            this.show();
        },

        show: function () {
            this.get("ovl").show();
            this.get("mask").show();
        },
        hide: function () {
            var ovl = this.get("ovl");
            ovl.find(".J_WinpopMain").html("");
            ovl.find(".J_WinpopBtns").html("");
            ovl.hide();
            this.get("mask").hide();
        },

        destory: function () {
            this.get("ov1").remove();
            this.get("mask").remove();
            delete window.alert();
            delete window.confirm;
        }
    };

    var obj = new Winpop();
    window.alert = function (str) {
        obj.alert.call(obj, str);
    };
    window.confirm = function (str, cb) {
        obj.confirm.call(obj, str, cb);
    };
})(window, jQuery);