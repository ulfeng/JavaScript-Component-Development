// 参考地址:https://github.com/maxzhang/oop/blob/master/README.md
// JavaScript面向对象编程，类声明、继承......
// 声明类
var MyCls = Klass.define({
    construtor: function (name) { // 构造函数
        this.name = name;
    },
    method1: function () {
        console.log('hello ' + this.name);
    },
    method2: function (x, y) {
        console.log(x + y);
    },
    method3: function (x, y) {
        console.log(x * y);
    }
});

new MyCls('max').method1(); // print 'hello world'

// 继承类
var SubCls1 = Klass.define(MyCls, {
    method1: function () { // 重写父类方法
        console.log('hi ' + this.name);
    },
    method4: function () { // 新方法

    }
});
new SubCls1('max').method1(); // print 'hi world'

// 调用父类方法
var SubCls2 = Klass.define(MyCls, {
    method1: function () {
        this.callParent(); // 调用父类方法
        console.log('hi ' + this.name);
    },
    method2: function () {
        this.callParent([++x, y]); // 传入参数集合
    },
    method2: function () {
        this.callParent(arguments); // 也可以直接传入arguments
    }
});

// 声明静态属性和方法
var SubCls3 = Klass.define(MyCls, {
    statics: { // 静态属性和方法
        prop1: 'static property',
        fn1: function () {
            console.log('this is a ' + SubCls3.prop1);
        }
    }
});

// 参考地址:https://github.com/yangmingkun187/JavaScript_oo
// 如何定义类：
// 1.构造函数法
function Dog() {
    this.name = "大毛";
}
Dog.prototype.makeSound = function () {
    alert("旺旺旺");
}
var dog1 = new Dog();
alert(dog1.name); // 大毛

// 2.Object.create()法
// "类"就是一个对象，不是函数
var Dog = {
    name: "大毛",
    makeSound: function () {
        alert("汪汪汪");
    }
}
// 用Object.create()生成实例，不需要用到new
var dog1 = Object.create(Dog);
alert(dog1.name); // 大毛
alert(dog1.makeSound()); // 汪汪汪

// 这种方法比"构造函数"简单，但不能实现私有属性和私有方法，实例之间也不能模拟数据，对
// 类的模拟不够全面

// 3.极简主义法
// 3.1 封装
var Dog = {
    createNew: function () { // 构造函数
        var dog = {};
        dog.name = "大毛";
        dog.makeSound = function () {
            alert("汪汪汪");
        }
        return dog;
    }
};
// 调用
var dog1 = Dog.createNew();
dog1.makeSound(); // 汪汪汪

// 3.2 继承
var Animal = {
    createNew: function () {
        var animal = {};
        animal.sleep = function () {
            alert("睡懒觉!");
        }
        return animal;
    }
};

// 在Cat的createNew()方法中，调用Animal的createNew()方法
var Cat = {
    createNew: function () {
        var cat = Animal.createNew();
        cat.name = "大毛";
        cat.makeSound = function () {
            alert("喵喵喵");
        }
        return cat;
    }
}

// 这样得到的Cat实例，就会同时继承Cat和Animal类
var cat1 = Cat.createNew();
cat1.sleep(); // 睡懒觉

// 3.3 私有属性和方法
var Cat = {
    createNew: function () {
        var cat = {};
        var sound = "喵喵喵";
        cat.makeSound = function () {
            alert(sound);
        }
        return cat;
    }
}
// 上例的内部变量sound,外部无法读取，只有通过Cat的公有方法来读取
var cat1 = Cat.createNew();
alert(cat1.sound); // undefined

// 有时候，我们需要所有实例对象，能够读写同一项内部数据。这个时候
// 只要把这个内部数据，封装在类对象的里面，createNew()方法的外面即可
var Cat = {
    sound: "喵喵",
    createNew: function () {
        var cat = {};
        cat.makeSound = function () { alert(Cat.sound); };
        cat.changeSound = function (x) { Cat.sound = x; };
        return cat;
    }
};

// 然后生成两个实例对象：
var cat1 = Cat.createNew();
var cat2 = Cat.createNew();
cat1.makeSound(); // 喵喵喵