import test from './test.js'


var getTime = function () {
    console.log(99999)
}

// // http://es6.ruanyifeng.com/#docs/class
// class Person {

//     constructor(chineseName, age) {
//         // 实例属性
//         this.chineseName = chineseName
//         this.age = age
//         this.hobby = '摄影'
//     }

//     // 实例属性也可以写 constructor 外面
//     hobby = '摄影'

//     // 原型方法
//     introduce() {
//         var a = this.chineseName + this.age + '岁'
//         console.log(a)
//         return a
//     }

//     // 静态方法 静态属性 不会被实例继承 而是直接通过类来调用 A.staticFun()
//     // 相当于 A.staticFun = function () {console.log('我是静态方法')}
//     static staticFun() {
//         console.log('静态方法')
//     }
//     static staticVar = '静态属性'

//     // 在类的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
//     // hobby属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了
//     get hobby() {
//         return '工作'
//     }
//     set hobby(value) {
//         console.log('setter: ' + value)
//     }

// }


// // 由于类的方法都定义在prototype对象上面 所以类的新方法可以添加在prototype对象上面
// // Object.assign方法可以很方便地一次向类添加多个方法
// Object.assign(Person.prototype, {
//     introduce2() {
//         var a = this.chineseName + '爱好是' + this.hobby
//         console.log(a)
//         return a
//     }
// })


// var p1 = new Person('tarymee', '18')
// p1.introduce()
// p1.introduce2()
// console.log(p1.__proto__ === Person.prototype) // true 通过new出来的对象的__proto__指向它的构造函数的prototype
// // prop属性有对应的存值函数和取值函数 因此赋值和读取行为都被自定义了
// p1.hobby = '玩' // setter: 玩
// console.log(p1.hobby) // 工作




// // http://es6.ruanyifeng.com/#docs/class-extends
// // 可以通过extends关键字实现继承 这比ES5通过修改原型链实现继承 要清晰和方便很多
// // 子类必须在constructor方法中调用super方法 这是因为子类没有this对象 而是继承父类的 所以只有调用super之后 才可以使用this关键字 否则会报错
// class Programmer extends Person {
//     constructor(chineseName, age, sex) {
//         super(chineseName, age)
//         this.sex = sex
//     }
//     introduce() {
//         var a = super.introduce() + '性别是' + this.sex
//         console.log(a)
//         return a
//     }
// }

// var p2 = new Programmer('slimyth', '29', '男')
// p2.introduce()
// p2.introduce2()

// // 已知
// console.log(p2.__proto__ === Programmer.prototype) // true 通过new出来的对象的__proto__指向它的构造函数的prototype
// console.log(p1.__proto__ === Person.prototype) // true 通过new出来的对象的__proto__指向它的构造函数的prototype
// console.log(Programmer.__proto__ === Person) // true 继承函数的 __proto__ 指向 原函数
// console.log(Programmer.prototype.__proto__ === Person.prototype) // true 继承函数的prototype的 __proto__ 指向 原函数的prototype
// // 得出
// console.log(Programmer.__proto__.__proto__ === Person.__proto__) // true
// console.log(p2.__proto__.__proto__ === Programmer.prototype.__proto__) // true
// console.log(p2.__proto__.__proto__ === Person.prototype) // true  这就是原型链 一层一层查找
// console.log(p2.__proto__.__proto__.__proto__ === Person.prototype.__proto__) // true
// console.log(Person.prototype.__proto__ === Object.prototype) // true
// console.log(Object.prototype.__proto__ === null) // true







for (var x in Person) {
    console.log(Person[x])
}


// ES5写法
var Person = function () {
    this.salary = 50000
    this.hobby = '娱乐'
}
Person.prototype.say = function () {
    console.log('Person say')
}

// 经典的js寄生组合式继承
function Programmer() {
    Person.apply(this, arguments)
    this.salary = 1
    this.hobby = '工作'
    this.company = 'xxx'
}
function inherits(subClass, superClass) {
    function Inner() {}
    Inner.prototype = superClass.prototype

    subClass.prototype = new Inner()
    subClass.prototype.constructor = subClass
}
inherits(Programmer, Person)
Programmer.prototype.writeCode = function () {
    console.log('programmer writes code')
}


var p1 = new Person()
var p2 = new Programmer()

console.log(Person)
console.log(Programmer)
console.log(p1)
console.log(p2)

// 已知
console.log(Person.prototype.constructor === Person) // true 构造函数在原型上的构造器指向原函数
console.log(Programmer.prototype.constructor === Programmer) // true 构造函数的构造器指向原函数
console.log(Person.constructor === Function) // true 构造函数的构造器是Function
console.log(p1.constructor === Person)
console.log(Person.__proto__ === Function.prototype)
console.log(Person.__proto__ === Function.constructor.prototype)
console.log(p2.__proto__ === Programmer.prototype) // true 通过new出来的对象的__proto__指向它的构造函数的prototype
console.log(p1.__proto__ === Person.prototype) // true 通过new出来的对象的__proto__指向它的构造函数的prototype
console.log(Programmer.__proto__ === Person) // false 如果用 Class 的extend扩展就为true
console.log(Programmer.prototype.__proto__ === Person.prototype) // true 继承函数的prototype的 __proto__ 指向 原函数的prototype


// 得出
console.log(Programmer.__proto__.__proto__ === Person.__proto__) // false 如果用 Class 的extend扩展就为true
console.log(p2.__proto__.__proto__ === Programmer.prototype.__proto__) // true
console.log(p2.__proto__.__proto__ === Person.prototype) // true  这就是原型链 一层一层查找
console.log(p2.__proto__.__proto__.__proto__ === Person.prototype.__proto__) // true
console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__ === null) // true








export default {
    test,
    getTime
}