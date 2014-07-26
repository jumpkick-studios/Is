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
        function Is(value, inverse, property) {
            this.value = value;
            this.inverse = inverse;
            this.property = property;
            this.inverse = inverse || this.inverse;
        }
        Object.defineProperty(Is.prototype, "not", {
            get: function () {
                this.inverse = true;
                return this;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Is.prototype, "a", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Is.prototype, "and", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });

        Is.prototype.isNot = function () {
            this.inverse = true;
            return this;
        };

        Is.prototype.isA = function () {
            return this;
        };

        Is.prototype.matching = function () {
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
                    if (!isNaN(this.getPropertyOrValue())) {
                        yes = this.inverse;
                    }
                } else if (typeof test == 'function') {
                    if (!args[i](this.getPropertyOrValue())) {
                        yes = this.inverse;
                    }
                } else if (test.indexOf("<") > -1 || test.indexOf(">") > -1) {
                    return this.checkForLengthOrCompareNumber(test);
                } else {
                    if (test) {
                        yes = this.equalTo(test).value ? !this.inverse : this.inverse;
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
                    return this.lessThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.shorterThan(parseInt(testArray[1]));
            } else if (test.indexOf(">") > -1) {
                var testArray = test.split(">");
                if (testArray[0] == "")
                    return this.greaterThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.longerThan(parseInt(testArray[1]));
            }
        };

        Is.prototype.matchingAny = function () {
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
                    if (isNaN(this.getPropertyOrValue())) {
                        matches++;
                    }
                } else if (typeof test === 'function') {
                    if (args[i](this.getPropertyOrValue())) {
                        matches++;
                    }
                } else if (test.indexOf("<") > -1 || test.indexOf(">") > -1) {
                    if (this.checkForLengthOrCompareNumber(test).value) {
                        matches++;
                    }
                } else {
                    if (test) {
                        matches += this.equalTo(test).value ? 1 : 0;
                    }
                }
            }

            return (matches > 0 && !this.inverse) || (matches == 0 && this.inverse) ? new Is(this.value) : new Is();
        };

        Is.prototype.longerThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().toString().length < val ? new Is(this.value) : new Is() : this.getPropertyOrValue().toString().length > val ? new Is(this.value) : new Is());
        };

        Is.prototype.shorterThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().toString().length > val ? new Is(this.value) : new Is() : this.getPropertyOrValue().toString().length < val ? new Is(this.value) : new Is());
        };

        Is.prototype.equalTo = function (val) {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue() != val ? new Is(this.value) : new Is() : this.getPropertyOrValue() === val ? new Is(this.value) : new Is());
        };

        Is.prototype.numeric = function () {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? typeof this.getPropertyOrValue() != "number" ? new Is(this.value) : new Is() : typeof this.getPropertyOrValue() == "number" ? new Is(this.value) : new Is());
        };

        Is.prototype.lessThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue() >= val ? new Is(this.value) : new Is() : this.getPropertyOrValue() < val ? new Is(this.value) : new Is());
        };

        Is.prototype.greaterThan = function (val) {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue() <= val ? new Is(this.value) : new Is() : this.getPropertyOrValue() > val ? new Is(this.value) : new Is());
        };

        Is.prototype.contains = function (val) {
            if (!this.value) {
                return new Is();
            }
            if (!Array.isArray(this.getPropertyOrValue())) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().indexOf(val) == -1 ? new Is(this.value) : new Is() : this.getPropertyOrValue().indexOf(val) > -1 ? new Is(this.value) : new Is());
        };

        Is.prototype.emptyArray = function () {
            if (!this.value) {
                return new Is();
            }
            if (!Array.isArray(this.getPropertyOrValue())) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().length > 0 ? new Is(this.value) : new Is() : this.getPropertyOrValue().length == 0 ? new Is(this.value) : new Is());
        };

        Is.prototype.getPropertyOrValue = function () {
            return (this.property ? this.value[this.property] : this.value);
        };

        Is.prototype.prop = function (prop) {
            if (!this.value) {
                return new Is();
            }
            if (!this.value[prop]) {
                return new Is();
            } else {
                return new Is(this.value, this.inverse, prop);
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
