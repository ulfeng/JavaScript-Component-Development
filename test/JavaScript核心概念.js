// 1、对象
var foo = {
    x: 10,
    y: 20
};
// 两个明显的自身属性和一个隐含的prototype属性

// 原型链
// 原型对象也是简单的对象并且可以拥有它们自己的原型。
// 如果一个原型对象的原型是一个非null的引用，那么一次类推，这就叫原型链。
// 原型链是一个用来实现继承和共享属性的有限对象链

var a = {
    x: 10,
    calculate: function (z) {
        return this.x + this.y + z;
    }
}

var b = {
    y: 20,
    _proto_: a
}

var c = {
    y: 30,
    _proto_: a
}
// call the inherited method,原型链继承
b.calculate(30); // 60
c.calculate(40); // 80  

// 使用Object.create()函数
var b = Object.create(a, { y: { value: 20 } });
var c = Object.create(a, { y: { value: 30 } });

// 构造函数
// a constructor function
function Foo(y) {
    // which may create objects
    // by specified pattern: thery have after
    // creation own "y" property
    this.y = y;
}
Foo.prototype.x = 10;
Foo.prototype.calculate = function (z) {
    return this.x + this.y + z;
}

var b = new Foo(20);
var c = new Foo(30);

// call the inherited method
b.calculate(30); // 60
c.calculate(40); // 80

// 执行上下为堆栈

