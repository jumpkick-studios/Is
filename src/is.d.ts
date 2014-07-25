declare var Is: (value?: any) => jumpkick.Is;
declare module jumpkick {
    class Is {
        public value: any;
        private inverse;
        private property;
        constructor(value?: any, inverse?: boolean, property?: any);
        public is(...args: any[]): any;
        private checkForLengthOrCompareNumber(test);
        public any(...args: any[]): any;
        public isLongerThan(val: number): Is;
        public isShorterThan(val: number): Is;
        public not(): Is;
        public equals(val: any): Is;
        public isLessThan(val: number): Is;
        public isNumber(): Is;
        public isGreaterThan(val: number): Is;
        public contains(val: any): Is;
        public isEmptyArray(): Is;
        private getPropertyOrValue();
        public prop(prop: any): Is;
        public then(func: any): Is;
        public catch(func: any): Is;
        public finally(func: any): Is;
    }
}
