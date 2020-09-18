function PubSub() { };

PubSub.prototype.subscribe = function (emitter, ev, callback) {
    var calls = emitter._callbacks || (emitter._callbacks = {});
    (emitter._callbacks[ev] || (emitter._callbacks[ev] = [])).push(callback);

    return this;
};

PubSub.prototype.publish = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    var ev = args.shift();

    var list, calls, i, l;

    if (!(calls = this._callbacks)) return this;
    if (!(list = this._callbacks[ev])) return this;

    for (i = 0, l = list.length; i < l; i++)
        list[i].apply(this, args);

    return this;
}
