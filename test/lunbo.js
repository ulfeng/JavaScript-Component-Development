// 获取class
function byClass(father, cName) {
    var arr = [];
    var c = father.getElementsByTagName("*");
    for (var i = 0; i < c.length; i++) {
        if (c[i].className == cName) {
            arr.push(c[i]);
        }
    }
    return arr;
}

function byCss(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
}

// 选项卡
function Tabs(father) {
    this.father = father;
    this.slide = byClass(this.father, "nav")[0].children;
    this.con = byClass(this.father, "content")[0].children;
    this.iNow = 0;
    this.init();
}
Tabs.prototype.init = function () {
    var that = this;
    for (var i = 0; i < this.slide.length; i++) {
        this.slide[i].index = i;
        this.slide[i].onclick = function () {
            that.change(this);
        }
    }
}
Tabs.prototype.change = function (obj) {
    for (var j = 0; i < this.slide.length; j++) {
        this.slide[j].className = "";
        this.con[j].style.display = "none";
    }
    if (obj) {
        this.iNow = obj.index;
    }
    this.slide[this.iNow].className = "active";
    this.con[this.iNow].style.display = "block";
}
Tabs.prototype.autoPlay = function () {
    var This = this;
    setInterval(function () {
        if (This.iNow == This.slide.length - 1) {
            This.iNow = 0;
        } else {
            This.iNow++;
        }
        This.change();
    },2000)
}