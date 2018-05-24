// https://blog.csdn.net/leoleocs/article/details/50162065
// https://github.com/nodejs/node/blob/master/lib/events.js

// 观察者模式
/**
    import EventEmitter from './eventEmitter.js'
    var ee = new EventEmitter()
    ee.on('spring', function (data) {
        console.log('spring is comming', this, data)
    })

    ee.once('summer', function (data) {
        console.log('summer is comming once', this, data)
    })

    function autumnfun1(data) {
        console.log('autumn is comming 1', this, data)
    }
    function autumnfun2(data) {
        console.log('autumn is comming 2', this, data)
    }
    ee.on('autumn', autumnfun1)
    ee.on('autumn', autumnfun2)
    ee.off('autumn', autumnfun1)

    ee.on('winter', function (data) {
        console.log('winter is comming', this, data)
    })
    ee.off('winter')

    ee.emit('spring', 'data')
    ee.emit('spring')
    ee.emit('summer')
    ee.emit('summer')
    ee.emit('autumn')
    ee.emit('autumn')
    ee.emit('winter')
    ee.emit('winter')
 */
function EventEmitter() {
    this._events = {}
}

function onceWrapper(data) {
    if (!this.fired) {
        this.fired = true
        this.listener.call(this.target, data)
        this.target.off(this.type, this.wrapFn)
    }
}

function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target,
        type,
        listener
    }
    var wrapped = onceWrapper.bind(state)
    wrapped.listener = listener
    state.wrapFn = wrapped
    return wrapped
}

EventEmitter.prototype = {
    on: function (type, listener) {
        if (typeof listener !== 'function') {
            console.error('不是函数')
            return false
        }
        if (this._events[type] === undefined) {
            this._events[type] = []
        }
        this._events[type].push(listener)
        return this
    },
    once: function (type, listener) {
        if (typeof listener !== 'function') {
            console.error('不是函数')
            return false
        }
        if (this._events[type] === undefined) {
            this._events[type] = []
        }
        this.on(type, _onceWrap(this, type, listener))
        return this
    },
    // 不传listener表示清除该type下所有事件
    off: function (type, listener) {
        // console.log('remove ' + type + ' event')
        var events = this._events
        var evnetArr = events[type]

        if (!evnetArr) return this

        // 如果有listener 那么只清除该listener
        if (listener) {
            if (typeof listener !== 'function') {
                console.error('不是函数')
                return false
            }

            var newEvnetArr = []
            for (var i = 0, len = evnetArr.length; i < len; i++) {
                if (listener !== evnetArr[i]) {
                    newEvnetArr.push(evnetArr[i])
                }
            }

            if (!newEvnetArr.length) {
                delete events[type]
            } else {
                events[type] = newEvnetArr
            }
        } else {
            // 如果没有listener 那么清除所有
            delete events[type]
        }
        return this
    },
    emit: function (type, data) {
        var events = this._events
        var listeners = events[type]
        if (listeners && listeners.length) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].call(this, data)
            }
        }
        return this
    }
}

export default EventEmitter