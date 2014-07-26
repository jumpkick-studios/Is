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

var Is = function (value?:any):jumpkick.Is {
    return new jumpkick.Is(value);
};

module jumpkick {
    export class Is {

        constructor(public value?:any, private inverse?:boolean, private property?:any) {
            this.inverse = inverse || this.inverse;
        }

        public get not():Is {
            this.inverse = true;
            return this;
        }

        public get a():Is {
            return this;
        }

        public get and():Is {
            return this;
        }

        public isNot():Is {
            this.inverse = true;
            return this;
        }

        public isA():Is {
            return this;
        }

        public matching(...args):any {
            if (!this.value) {
                return new Is();
            }
            var yes:boolean = !this.inverse;
            for (var i = 0; i < args.length; i++) {
                var test:any = args[i];
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
                return new Is(this.value)
            } else {
                return new Is();
            }
        }

        private checkForLengthOrCompareNumber(test:string):Is {
            if (test.indexOf("<") > -1) {
                var testArray:string[] = test.split("<");
                if (testArray[0] == "")
                    return this.lessThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.shorterThan(parseInt(testArray[1]))
            }

            else if (test.indexOf(">") > -1) {
                var testArray:string[] = test.split(">");
                if (testArray[0] == "")
                    return this.greaterThan(parseInt(testArray[1]));
                if (testArray[0] == "length")
                    return this.longerThan(parseInt(testArray[1]))
            }
        }

        public matchingAny(...args):any {
            if (!this.value) {
                return new Is();
            }
            var matches:number = 0;

            for (var i = 0; i < args.length; i++) {
                var test:any = args[i];
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
        }

        public longerThan(val:number):Is {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().toString().length < val ? new Is(this.value) : new Is() : this.getPropertyOrValue().toString().length > val ? new Is(this.value) : new Is());
        }

        public shorterThan(val:number):Is {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().toString().length > val ? new Is(this.value) : new Is() : this.getPropertyOrValue().toString().length < val ? new Is(this.value) : new Is());
        }


        public equalTo(val:any):Is {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue() != val ? new Is(this.value) : new Is() : this.getPropertyOrValue() === val ? new Is(this.value) : new Is())
        }

        public numeric():Is {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? typeof this.getPropertyOrValue() != "number" ? new Is(this.value) : new Is() : typeof this.getPropertyOrValue() == "number" ? new Is(this.value) : new Is())
        }

        public lessThan(val:number):Is {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue() >= val ? new Is(this.value) : new Is() : this.getPropertyOrValue() < val ? new Is(this.value) : new Is())
        }

        public greaterThan(val:number):Is {
            if (!this.value) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue() <= val ? new Is(this.value) : new Is() : this.getPropertyOrValue() > val ? new Is(this.value) : new Is());
        }

        public contains(val:any) {
            if (!this.value) {
                return new Is();
            }
            if (!Array.isArray(this.getPropertyOrValue())) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().indexOf(val) == -1 ? new Is(this.value) : new Is() : this.getPropertyOrValue().indexOf(val) > -1 ? new Is(this.value) : new Is());
        }


        public emptyArray() {
            if (!this.value) {
                return new Is();
            }
            if (!Array.isArray(this.getPropertyOrValue())) {
                return new Is();
            }
            return (this.inverse ? this.getPropertyOrValue().length > 0 ? new Is(this.value) : new Is() : this.getPropertyOrValue().length == 0 ? new Is(this.value) : new Is());
        }

        private getPropertyOrValue():any {
            return (this.property ? this.value[this.property] : this.value);
        }

        public prop(prop) {
            if (!this.value) {
                return new Is();
            }
            if (!this.value[prop]) {
                return new Is();
            }
            else {
                return new Is(this.value, this.inverse, prop);
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

        public finally(func:any):Is {
            func();
            return new Is(this.value);
        }

    }
}


