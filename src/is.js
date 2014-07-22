/*
The MIT License (MIT)
Copyright (c) 2014 Jumpkick Studios LLC
Developed by Alex Bogartz
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var Is = function (value) {
    return new jumpkick.Is(value);
};

var jumpkick;
(function (jumpkick) {
    var Is = (function () {
        function Is(value, inverse) {
            this.value = value;
            this.inverse = false;
            this.inverse = inverse || this.inverse;
        }
        Is.prototype.is = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (!this.value) {
                return new Is();
            }
            var yes = !this.inverse;
            for (var i = 0; i < args.length; i++) {
                var test = args[i];
                if (test.toString() == "NaN") {
                    if (!isNaN(this.value)) {
                        yes = this.inverse;
                    }
                } else if (typeof test == 'function') {
                    if (!args[i](this.value)) {
                        yes = this.inverse;
                    }
                } else if (test.indexOf("<") > -1) {
                    return this.checkForLengthOrCompareNumber(test);
                } else if (test.indexOf(">") > -1) {
                    return this.checkForLengthOrCompareNumber(test);
                } else {
                    if (test) {
                        if (this.value != test) {
                            yes = this.inverse;
                        }
                    }
                }
            }

            if (yes) {
                return new Is(this.value);
            } else {
                return new Is();
            }
        };

        Is.prototype.checkForLengthOrCompareNumber = function (test) {
            if (test.indexOf("<") > -1) {
                var testArray = test.split("<");
                if (testArray[0] == "")
                    return this.isLessThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.isShorterThan(parseInt(testArray[1]));
            } else if (test.indexOf(">") > -1) {
                var testArray = test.split(">");
                if (testArray[0] == "")
                    return this.isGreaterThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.isLongerThan(parseInt(testArray[1]));
            }
        };

        Is.prototype.any = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (!this.value) {
                return new Is();
            }
            var matches = 0;

            for (var i = 0; i < args.length; i++) {
                var test = args[i];
                if (test.toString() == "NaN") {
                    if (isNaN(this.value)) {
                        matches++;
                    }
                } else if (typeof test === 'function') {
                    if (args[i](this.value)) {
                        matches++;
                    }
                } else if (test.indexOf("<") > -1) {
                    if (this.checkForLengthOrCompareNumber(test).value) {
                        matches++;
                    }
                } else if (test.indexOf(">") > -1) {
                    if (this.checkForLengthOrCompareNumber(test).value) {
                        matches++;
                    }
                } else {
                    if (test) {
                        if (this.value === test) {
                            matches++;
                        }
                    }
                }
            }

            if ((matches > 0 && !this.inverse) || (matches == 0 && this.inverse)) {
                return new Is(this.value);
            } else {
                return new Is();
            }
        };

        Is.prototype.isLongerThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value.toString().length < val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            } else {
                if (this.value.toString().length > val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            }
        };

        Is.prototype.isShorterThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value.toString().length > val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            } else {
                if (this.value.toString().length < val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            }
        };

        Is.prototype.not = function () {
            if (!this.value) {
                return new Is();
            }
            return new Is(this.value, true);
        };

        Is.prototype.equals = function (val) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value != val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            } else {
                if (this.value === val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            }
        };

        Is.prototype.isLessThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value >= val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            } else {
                if (this.value < val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            }
        };

        Is.prototype.isNumber = function () {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                return typeof this.value == "number" ? new Is() : new Is(this.value);
            } else {
                return typeof this.value != "number" ? new Is() : new Is(this.value);
            }
        };

        Is.prototype.isGreaterThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value <= val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            } else {
                if (this.value > val) {
                    return new Is(this.value);
                } else {
                    return new Is();
                }
            }
        };

        Is.prototype.then = function (func) {
            if (!this.value) {
                return new Is();
            }

            func();
            return new Is(this.value);
        };

        Is.prototype.catch = function (func) {
            if (!this.value) {
                func();
            }
            return new Is(this.value);
        };

        Is.prototype.finally = function (func) {
            func();
            return new Is(this.value);
        };
        return Is;
    })();
    jumpkick.Is = Is;
})(jumpkick || (jumpkick = {}));
//# sourceMappingURL=is.js.map
