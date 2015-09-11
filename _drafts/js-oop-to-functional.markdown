---
layout: post
title: "JS OOP to Functional"
date: "2015-09-08"
---


{% highlight livescript %}

    _m = new WeakMap();

    _init    = (m) -> (if not _m.has m then _m.set m, new Map! else true) and _m.get m
    _refresh = (m) ->
        (__m = _init m) and (...a) ->
            (_r = m ...a) and (_a = JSON.stringify a) and (__m.set _a, _r) and _r
    _memo    = (m) ->
        _rm = (__m = _init m) and (...a) ->
            (_a = JSON.stringify a) and (if __m.has _a then __m.get _a else (
                (_r = m ...a) and (__m.set _a, _r) and _r
            ))
            (_a = JSON.stringify a) and (if __m.has _a then __m.get _a else (
                (_r = m ...a) and (__m.set _a, _r) and _r
            ))
        _rm.refresh = _refresh(m)
        _rm

    module.exports = _memo
    module.exports.refresh = _refresh

{% endhighlight %}

{% highlight js %}

    const Memos = new WeakMap();
    const initMemo = (method) => {
        if (!Memos.has(method)) {
            Memos.set(method, new Map());
        }
        return Memos.get(method);
    }, memoize = (method) => {

        const map = initMemo(method);
        let ret = (...args) => {
            let ret = null, _args = JSON.stringify(args);

            if (!map.has(_args)) {
                ret = method(...args);
                map.set(_args, ret);
            } else {
                ret = map.get(_args);
            }

            return ret;
        };
        ret.refresh = refresh(method);
        return ret;
    }, refresh = (method) => {
        const map = initMemo(method);
        return (...args) => {
            let ret = method(...args), _args = JSON.stringify(args);
            map.set(_args, ret);
            return ret;
        };
    };

    memoize.refresh = refresh;
    export default memoize;

{% endhighlight %}

{% highlight js %}
export default class Factory {
    static memos = new WeakMap();
    static memoize = (method) => (new Factory(method));

    constructor(method) {
        this.method = method;
        this.map    = this.init(method);

        let ret     = this.memoize.bind(this);
        ret.refresh = this.refresh.bind(this);

        return ret;
    }

    init(method = this.method) {
        if (!Factory.memos.has(method)) {
            Factory.memos.set(method, new Map());
        }
        return Factory.memos.get(method);;
    }

    memoize(...args) {
        let _args = JSON.stringify(args);

        if (!this.map.has(_args)) {
            return this.refresh(...args);
        } else {
            return this.map.get(_args);
        }
    }

    refresh(...args) {
        let ret = this.method(...args), _args = JSON.stringify(args);

        this.map.set(_args, ret);

        return ret;
    }
}
{% endhighlight %}
