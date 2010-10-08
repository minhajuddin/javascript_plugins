/*
linq.js -- a simple LINQ implementation for javascript
Author: Nate Kohari <nate@enkari.com>
Copyright (C) 2009 Enkari, Ltd.
Released under the Apache 2.0 license (http://www.opensource.org/licenses/apache2.0.php)
*/

Array.prototype.all = function(func) {
    var result = true;
    this.iterate(function(item) {
        if (!func(item)) {
            result = false;
            return false;
        }
    });
    return result;
};


Array.prototype.removeAt = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.indexOf = function(element) {
    for (var i = 0, length = this.length; i < length; i++)
        if (this[i] === element)
        return i;
    return -1;
};

Array.prototype.remove = function(element) {
    var index = this.indexOf(element);
    if (index < 0) return;
    this.removeAt(index);
};



Array.prototype.any = function(func) {
    var result = false;
    this.iterate(function(item) {
        if (func(item)) {
            result = true;
            return false;
        }
    });
    return result;
};

Array.prototype.count = function(func) {
    if (!func) return this.length;
    else return this.where(func).length;
};

Array.prototype.distinct = function(func) {
    var result = [];
    var hash = {};
    this.iterate(function(item) {
        if (!hash[item]) {
            result.push(item);
            hash[item] = true;
        }
    });
    return result;
};

Array.prototype.orderby = function(func) {
    var result = [].concat(this);
    result.sort(function(x, y) {
        return func.apply(x, [x]) - func.apply(y, [y]);
    });
    return result;
};

Array.prototype.orderbydescending = function(func) {
    var result = [].concat(this);
    result.sort(function(x, y) {
        return func.apply(y, [y]) - func.apply(x, [x]);
    });
    return result;
};

Array.prototype.select = function(func) {
    var result = [];
    this.iterate(function(item) {
        result.push(func(item));
    });
    return result;
};

Array.prototype.selectmany = function(func) {
    var result = [];
    this.iterate(function(item) {
        result.concat(func(item));
    });
    return result;
};

Array.prototype.where = function(func) {
    var result = [];
    this.iterate(function(item) {
        if (func(item)) result.push(item);
    });
    return result;
};

Array.prototype.iterate = function(func) {
    for (var idx = 0, len = this.length; idx < len; idx++) {
        if (func.apply(this, [this[idx]]) === false)
            break;
    }
};

Array.prototype.first = function(func) {
    var result = this.where(func);
    return result.length > 0 ? result[0] : null;
};

Array.prototype.include = function(obj) {
    var result = this.where(function(x) { return x === obj; });
    return result.length > 0;
};