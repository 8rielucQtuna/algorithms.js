/**
 * Copyright (C) 2014 Felipe Ribeiro
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/*
 * Iterative and recursive implementations of power set
 *
 * @author Joshua Curl <curljosh@msu.edu>
 */

'use strict';

/*
 * Iterative power set calculation
 */
var powerSetIterative = function (array) {

  if(array.length === 0) {
    return [];
  }

  var powerSet = [];
  var cache = [];

  for(var i = 0; i < array.length; i++) {
    cache[i] = true;
  }

  for(i = 0; i < Math.pow(2, array.length); i++) {

    powerSet.push([]);

    for(var j = 0; j < array.length; j++) {

      if(i % Math.pow(2, j) === 0) {
        cache[j] = !cache[j];
      }

      if(cache[j]) {
        powerSet[i].push(array[j]);
      }

    }
  }
  
  return powerSet;
};

/*
 * Recursive power set calculation
 */
var powerSetRecursive = function (array) {
  if(array.length === 0) {
    return [];
  }
  else if(array.length == 1) {
    return [ [], [ array[0] ] ];
  }
  else {
    var powerSet = [];
    var firstElem = array[0];

    array.splice(0, 1);

    powerSetRecursive(array).forEach(function(elem) {
       powerSet.push(elem);
       var withFirstElem = [ firstElem ];
       withFirstElem.push.apply(withFirstElem, elem);
       powerSet.push(withFirstElem);
    });

    return powerSet;
  }
};

// Use powerSetIterative as the default implementation
var powerSet = powerSetIterative;
powerSet.recursive = powerSetRecursive;
module.exports = powerSet;
