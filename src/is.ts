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

var Is=function(value?:any):jumpkick.Is{
    return new jumpkick.Is(value);
};

module jumpkick {
    export class Is {
        private inverse:boolean = false;

        constructor(public value?:any, inverse?:boolean) {
            this.inverse = inverse || this.inverse;
        }

        public is(...args):any {
            if (!this.value) {
                return new Is();
            }
            var yes:boolean = !this.inverse;
            for (var i = 0; i < args.length; i++) {
                var test:any = args[i];
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
                }

                else if (test.indexOf(">") > -1) {
                    return this.checkForLengthOrCompareNumber(test);
                }
                else {
                    if (test) {
                        if (this.value != test) {
                            yes = this.inverse;
                        }
                    }
                }
            }

            if (yes) {
                return new Is(this.value)
            } else {
                return new Is();
            }
        }

        private checkForLengthOrCompareNumber(test:string):Is {
            if (test.indexOf("<") > -1) {
                var testArray:string[] = test.split("<");
                if (testArray[0] == "")
                    return this.isLessThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.isShorterThan(parseInt(testArray[1]))
            }

            else if (test.indexOf(">") > -1) {
                var testArray:string[] = test.split(">");
                if (testArray[0] == "")
                    return this.isGreaterThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.isLongerThan(parseInt(testArray[1]))
            }
        }

        public any(...args):any {
            if (!this.value) {
                return new Is();
            }
            var matches:number = 0;

            for (var i = 0; i < args.length; i++) {
                var test:any = args[i];
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
                }
                else {
                    if (test) {
                        if (this.value === test) {
                            matches++;
                        }
                    }
                }
            }

            if ((matches > 0 && !this.inverse) || (matches == 0 && this.inverse)) {
                return new Is(this.value)
            } else {
                return new Is();
            }
        }

        public isLongerThan(val:number) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value.toString().length < val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            } else {
                if (this.value.toString().length > val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            }
        }

        public isShorterThan(val:number) {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value.toString().length > val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            } else {
                if (this.value.toString().length < val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            }
        }

        public not():Is {
            if (!this.value) {
                return new Is();
            }
            return new Is(this.value, true)
        }

        public equals(val:any):Is {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value != val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            } else {
                if (this.value === val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            }
        }

        public isLessThan(val:number):Is {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value >= val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            } else {
                if (this.value < val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            }
        }

        public isNumber():Is {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                return typeof this.value == "number" ? new Is() : new Is(this.value);

            } else {
                return typeof this.value != "number" ? new Is() : new Is(this.value);
            }
        }

        public isGreaterThan(val:number):Is {
            if (!this.value) {
                return new Is();
            }
            if (this.inverse) {
                if (this.value <= val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            } else {
                if (this.value > val) {
                    return new Is(this.value)
                } else {
                    return new Is();
                }
            }
        }


        public then(func:any) {
            if (!this.value) {
                return new Is();
            }

            func();
            return new Is(this.value);
        }

        public catch(func:any):Is {
            if (!this.value) {
                func();
            }
            return new Is(this.value);
        }

        public finally(func:any):Is{
            func();
            return new Is(this.value);
        }
    }
}


