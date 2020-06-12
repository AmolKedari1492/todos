var globalVar = {
  flattenArr : []
};
function getType(a) {
    var type;
    if(a instanceof Object) {
        type = 'Object';
        if(a instanceof Array) {
            type = 'Array';
        }
    }
    return type;
}
function arrayFn(arr1, arr2) {
    return {
        first: function () {
            return arr1[0];
        },
        last: function () {
            return arr1[arr1.length - 1];
        },
        middle: function () {
            return arr1[(arr1.length - 1)/2];
        },
        lastIndexOf: function(elem) {
            var arrCopy = Object.assign([], arr1);
            if(arrCopy.reverse().indexOf(elem) > -1) {
                return arr1.length - arr1.indexOf(elem)
            }
        },
        allOccurances: function () {
            var resultArr = [];
            arr1.forEach(function (elem, i) {
                if(arr2[0] == elem) {
                    resultArr.push(i + 1);
                }
            });
            return resultArr;
        },
        range: function () { // not array fn
            var startIndex = 0, lastIndex, steps = 1, resultArr = [];
            if(arguments.length == 1) {
                lastIndex = arguments[0];
            }
            if(arguments.length == 2) {
                startIndex = arguments[0];
                lastIndex = arguments[1];
            }
            if(arguments.length == 3) {
                startIndex = arguments[0];
                lastIndex = arguments[1];
                steps = arguments[2];
            }
            for(var i = startIndex; i < lastIndex; i = i + steps) {
                resultArr.push(i);
            }
            return resultArr;
        },
        rest: function () {
            arr2.forEach(function (except) {
                var indexAt = arr1.indexOf(except);
                if(indexAt > -1) {
                    arr1.splice(indexAt, 1);
                }
            });
            return arr1;
        },
        unique: function () {
            var resultArr = [];
            arr1.forEach((function (elem1) {
                if(resultArr.indexOf(elem1) == -1) {
                    resultArr.push(elem1)
                }
            }));
            return resultArr;
        },
        compact: function () {
          var resultArr = [];
            arr1.forEach((function (elem1, index) {
                if(elem1) {
                  resultArr.push(elem1);
                }
            }));
            return resultArr;
        },
        flatten: function (isNew) {
            if(isNew) {
                globalVar.flattenArr = [];
            }
            arr1.forEach((function (elem1) {
                if(getType(elem1) == 'Array') {
                    arrayFn(elem1).flatten();
                } else {
                    globalVar.flattenArr.push(elem1);
                }
            }));
            return globalVar.flattenArr;
        },
        getAsObject: function () {
            var resultObj = {};
            for(var i = 0; i < arr1.length; i++) {
                resultObj[arr1[i]] = arr2[i];
            }
            return resultObj;
        },
        maths: function(type) {
          var types =  {
              add: '+',
              subtract: '-',
              multi: '*'
          };
            var result = types[type] == 'multi' ? 1 : 0;
            arr1.forEach((function (elem1) {
                if(types[type] == 'add') {
                    result += elem1;
                }
                if(types[type] == 'subtract') {
                    result -= elem1;
                }
                if(types[type] == 'multi') {
                    result *= elem1;
                }
            }));
            return result;
        },
        add : function() {
            var result = 0;
            arr1.forEach((function (elem1, index) {
                result += elem1;
            }));
            return result;

        },
        subtract : function() {
            var result = 0;
            arr1.forEach((function (elem1, index) {
                result += elem1;
            }));
            return result;

        },
        union: function () {
            return arr1.concat(arr2);
        },
        intersection: function () {
            var resultArr = [];
            arr1.forEach((function (elem1) {
                if(arr2.indexOf(elem1) > -1) {
                    resultArr.push(elem1);
                }
            }));
            return resultArr;
        },
        difference: function () {
            var resultArr = [];
            arr1.forEach((function (elem1) {
                if(!arr2.indexOf(elem1) > -1) {
                    resultArr.push(elem1);
                }
            }));
            return resultArr;
        },


    }
}
function objFn() {

}

function _() {
    var args1Type, args2Type;
    var args1 = arguments[0];
    var args2 = arguments[1];
    var method = arguments[2];
    var args1Type = getType(args1);
    var args2Type = getType(args2);
    if(args1Type == 'Array') {
      var arrayFnObj = arrayFn(args1, args2);
      var functions = {
        first: arrayFnObj.first(),
        last: arrayFnObj.last(),
        middle: arrayFnObj.middle(),
        lastIndexOf: arrayFnObj.lastIndexOf(),
        allOccurances: arrayFnObj.allOccurances(),
        range: arrayFnObj.range(),
        rest: arrayFnObj.rest(),
        unique: arrayFnObj.unique(),
        compact: arrayFnObj.compact(),
        flatten: arrayFnObj.flatten(),
        getAsObject: arrayFnObj.getAsObject(),
        maths: arrayFnObj.maths(),
        add: arrayFnObj.add(),
        subtract: arrayFnObj.subtract(),
        union: arrayFnObj.union(),
        intersection: arrayFnObj.intersection(),
        difference: arrayFnObj.difference()
      };
    }
    return functions;
}
