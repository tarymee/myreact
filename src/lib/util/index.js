import test from './test.js'


var getTime = function () {
    console.log(99999)
}


class People {

    constructor(chineseName, age) {
        // 实例属性
        this.chineseName = chineseName
        this.age = age
        this.hobby = '摄影'
    }

    // 实例属性也可以写 constructor 外面
    hobby = '摄影'

    // 原型方法
    introduce() {
        var a = this.chineseName + this.age + '岁'
        console.log(a)
        return a
    }

    // 静态方法 静态属性 不会被实例继承 而是直接通过类来调用 A.staticFun()
    // 相当于 A.staticFun = function () {console.log('我是静态方法')}
    static staticFun() {
        console.log('静态方法')
    }
    static staticVar = '静态属性'

    // 在类的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
    // hobby属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了
    get hobby() {
        return '工作'
    }
    set hobby(value) {
        console.log('setter: ' + value)
    }

}


// 由于类的方法都定义在prototype对象上面 所以类的新方法可以添加在prototype对象上面
// Object.assign方法可以很方便地一次向类添加多个方法
Object.assign(People.prototype, {
    introduce2() {
        var a = this.chineseName + '爱好是' + this.hobby
        console.log(a)
        return a
    }
})


var p1 = new People('tarymee', '18')
p1.introduce()
p1.introduce2()

// prop属性有对应的存值函数和取值函数 因此赋值和读取行为都被自定义了
p1.hobby = '玩' // setter: 玩
console.log(p1.hobby) // 工作

// Class 可以通过extends关键字实现继承 这比ES5通过修改原型链实现继承 要清晰和方便很多
// 子类必须在constructor方法中调用super方法 这是因为子类没有this对象 而是继承父类的 所以只有调用super之后 才可以使用this关键字 否则会报错
class People1 extends People {
    constructor(chineseName, age, sex) {
        super(chineseName, age)
        this.sex = sex
    }
    introduce() {
        var a = super.introduce() + '性别是' + this.sex
        console.log(a)
        return a
    }
}


export default {
    test,
    getTime
}