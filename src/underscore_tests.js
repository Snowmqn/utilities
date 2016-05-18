/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    var result = [];
    if(n === undefined) return array[0];
    for (let i=0;i<n && i<array.length;i++) result.push(array[i]);
    return result;
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var result = [];
    if(n === undefined) return array[array.length - 1];
    for (let i=array.length-1, count=0;i>=0&&count<n;i--, count++) {
      result.unshift(array[i]);
    }
    return result;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i=0;i<collection.length;i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (let i in collection) {
        iterator(collection[i], i, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (let i=0;i<array.length;i++) {
      if (array[i] === target) return i;
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    for (let i=collection.length-1;i>=0;i--) {
      if(!iterator(collection[i])) collection.splice(i,1);
    }
    return collection
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var result = [];
    for (let i=0;i<collection.length;i++) {
      if (!iterator(collection[i])) result.push(collection[i]);
    }
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = []
    var test = true;
    for (let i=0;i<array.length;i++) {
      test = true;
      for (let j=0;j<result.length;j++) {
        if (array[i] === result[j]) test = false;
      }
      if (test) result.push(array[i]);
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var result = array;
    for (let i=0;i<result.length;i++) result[i] = iterator(result[i]);
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var result = array;
    for (let i=0;i<result.length;i++) result[i] = result[i][propertyName];
    return result;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === 'string') {
      for (let i=0;i<list.length;i++) {
        list[i][methodName](args);
      }
    }
    else {
      for (let i=0;i<list.length;i++) {
        methodName.call(list[i]);
      }      
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue === undefined) var previousValue = 0;
    else var previousValue = initialValue;
    for (let i=0;i<collection.length;i++) {
      previousValue = iterator(previousValue, collection[i]);
    }
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var result = false
    for (let i in collection) {
      if (collection[i] === target) result = true;
    }
    return result;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var result = true
    if (collection.length === 0) return true;
    if (iterator) {
      for ( let i in collection) {
        if (!iterator(collection[i])) result = false;
      }
    }
    else {
      for (let i in collection) {
        if (!collection[i]) result = false;
      }
    }
    return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (collection.length === 0) return false;
    if (iterator) {
      for ( let i in collection) {
        if (iterator(collection[i])) return true;
      }
    }
    else {
      for (let i in collection) {
        if (collection[i]) return true;
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function() {
    for (let i=1;i<arguments.length;i++) {
     for (let j in arguments[i]) {
       arguments[0][j] = arguments[i][j];
     }
    }
    return arguments[0]
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function() {
    for (let i=1;i<arguments.length;i++) {
     for (let j in arguments[i]) {
       if (!(j in arguments[0])) {
        arguments[0][j] = arguments[i][j];
       }
     }
    }
    return arguments[0]
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var test = false;
    var computed = {};
    return function() {
      for (let i in computed) {
        if (arguments[0] === i) return computed[i]; 
      }
      var newArgument = func.apply(this, arguments);
      computed[arguments[0]] = newArgument;
      return newArgument;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.apply(arguments);
    args.shift();
    args.shift();
    setTimeout(function() {func.apply(null, args)}, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var tempArr = array;
    var temp = tempArr[0];
    tempArr[0] = tempArr[tempArr.length-1];
    tempArr[tempArr.length-1] = temp;
    return tempArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
