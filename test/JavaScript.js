// MDN JavaScript 面向对象编程
// 我们来创建一个全局变量叫做 MYAPP
var MYAPP = MYAPP || {};
// 我们首先检查MYAPP是否已经被定义(是否在同一文件或在另一文件)
// 如果是的话，那么使用现有的MYAPP全局对象，否则，创建一个名为MYAPP的空对象用来封装方法，函数，变量和对象

// 子命名空间
MYAPP.event = {};
// 给普通方法和属性创建一个叫做MYAPP.commonMethod的容器
MYAPP.commonMethod = {
    regExForName: "",// 定义名字的正则验证
    regExForPhone: "", //定义电话的正则验证
    validateName: function (name) {
        // 对名字name做些操作，你可以通过使用"this.regExForname"
        // 访问regExForName变量
    },

    validatePhoneNo: function (phoneNo) {
        // 对电话号码进行操作
    }
}

// 对象和方法一起申明
MYAPP.event = {
    addListener: function (e1, type, fn) {
        // 代码
    },
    removeListener: function (e1, type, fn) {
        // 代码
    }
    // 其它属性和方法
}


// 标准内置对象
// JavaScript 有包括在其核心的几个对象，例如,Math,Object,Array和String对象。
// 使用Math对象的random()方法来获得一个随机数
console.log(Math.random());
// JavaScript 中的每个对象都是Object对象的实例且继承它所有的属性和方法


// 自定义对象
// 类
function Person() { }
// 或
var Person = function () { }

// 对象(类的实例)
// Person类和Person的实例(person1和person2)
function Person() { }
var person1 = new Person();
var person2 = new Person();

// 继承 
// 定义Person构造器
function Person(firstName) {
    this.firstName = firstName;
}

// 在Person.prototype中加入方法
Person.prototype.walk = function () {
    alert("I am walking!");
};
Person.prototype.sayHello = function () {
    alert("Hello, I'm" + this.firstName);
};

// 定义Student构造器
function Student(firstName, subject) {
    // 调用父类构造器，确保(使用Function#call)"this"在设置正确
    Person.call(this, firstName);

    // 初始化Student类特有属性
    this.subject = subject;
};
