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

        private originalValue:any;
        private testingAny:boolean;

        constructor(public value?:any, private inverse?:boolean, private property?:any) {
            this.inverse = inverse || this.inverse;
            this.originalValue = value;
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

        public get or():Is {
            this.testingAny = true;
            return this;
        }

        private nothing():boolean {
            return (!this.value && !this.testingAny);
        }

        public matching(...args):any {
            if (this.nothing()) {
                return this;
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
                return this.getReturnedInstance(true);
            } else {
                return this.getReturnedInstance(false);
            }
        }

        private getReturnedInstance(valid:boolean):Is {
            if (!valid) {
                if (!this.testingAny)
                    this.value = null;
            } else {
                if (!this.value) {
                    this.value = this.originalValue;
                }
            }
            this.inverse = false;
            this.property = null;
            this.testingAny = false;
            return this;
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
            if (this.nothing()) {
                return this;
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

            return (matches > 0 && !this.inverse) || (matches == 0 && this.inverse) ? this.getReturnedInstance(true) : this.getReturnedInstance(false);
        }

        public longerThan(val:number):Is {
            if (this.nothing()) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue().toString().length < val ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue().toString().length > val ? this.getReturnedInstance(true) : this.getReturnedInstance(false));
        }

        public shorterThan(val:number):Is {
            if (this.nothing()) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue().toString().length > val ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue().toString().length < val ? this.getReturnedInstance(true) : this.getReturnedInstance(false));
        }


        public equalTo(val:any):Is {
            if (this.nothing()) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue() != val ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue() === val ? this.getReturnedInstance(true) : this.getReturnedInstance(false))
        }

        public numeric():Is {
            if (this.nothing()) {
                return this;
            }
            return (this.inverse ? typeof this.getPropertyOrValue() != "number" ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : typeof this.getPropertyOrValue() == "number" ? this.getReturnedInstance(true) : this.getReturnedInstance(false))
        }

        public lessThan(val:number):Is {
            if (this.nothing()) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue() >= val ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue() < val ? this.getReturnedInstance(true) : this.getReturnedInstance(false))
        }

        public greaterThan(val:number):Is {
            if (this.nothing()) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue() <= val ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue() > val ? this.getReturnedInstance(true) : this.getReturnedInstance(false));
        }

        public contains(val:any) {
            if (this.nothing()) {
                return this;
            }
            if (!Array.isArray(this.getPropertyOrValue())) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue().indexOf(val) == -1 ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue().indexOf(val) > -1 ? this.getReturnedInstance(true) : this.getReturnedInstance(false));
        }


        public emptyArray() {
            if (this.nothing()) {
                return this;
            }
            if (!Array.isArray(this.getPropertyOrValue())) {
                return this;
            }
            return (this.inverse ? this.getPropertyOrValue().length > 0 ? this.getReturnedInstance(true) : this.getReturnedInstance(false) : this.getPropertyOrValue().length == 0 ? this.getReturnedInstance(true) : this.getReturnedInstance(false));
        }

        private getPropertyOrValue():any {
            if (this.testingAny) {
                return (this.property ? this.originalValue[this.property] : this.originalValue);
            } else {
                return (this.property ? this.value[this.property] : this.value);
            }
        }

        public prop(prop) {
            if (this.nothing()) {
                return this.getReturnedInstance(false);
            }
            if (!(this.testingAny ? this.originalValue[prop] : this.value[prop])) {
                return this.getReturnedInstance(false);
            }
            else {
                this.property = prop;
                return this;
            }
        }

        public then(func:any) {
            if (!this.value) {
                return this;
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


