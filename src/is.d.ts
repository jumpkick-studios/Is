declare var Is: (value?: any) => jumpkick.Is;
declare module jumpkick {
    class Is {
        public value: any;
        private inverse;
        private property;
        constructor(value?: any, inverse?: boolean, property?: any);
        public not : Is;
        public a : Is;
        public and : Is;
        public isNot(): Is;
        public isA(): Is;
        public or : Is;
        public matching(...args: any[]): any;
        private checkForLengthOrCompareNumber(test);
        public matchingAny(...args: any[]): any;
        public longerThan(val: number): Is;
        public shorterThan(val: number): Is;
        public equalTo(val: any): Is;
        public numeric(): Is;
        public lessThan(val: number): Is;
        public greaterThan(val: number): Is;
        public contains(val: any): Is;
        public emptyArray(): Is;
        private getPropertyOrValue();
        public prop(prop: any): Is;
        public then(func: any): Is;
        public catch(func: any): Is;
        public finally(func: any): Is;
    }
}
