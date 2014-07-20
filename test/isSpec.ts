/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/is.d.ts" />
describe("Is", function () {
    var Is = jumpkick.Is;

    it("should correctly check that string is shorter than 4 characters", function () {
        expect(new Is("foo").isShorterThan(4).value).not.toBeUndefined();
    });

    it("should correctly check that string is longer than 2 characters", function () {
        expect(new Is("foo").isLongerThan(2).value).not.toBeUndefined();
    });

    it("should return nothing when isLongerThan is false", function () {
        expect(new Is("foo").isLongerThan(3).value).toBeUndefined();
    });

    it("should return nothing when isShorterThan is false", function () {
        expect(new Is("foo").isShorterThan(3).value).toBeUndefined();
    });

    it("should return the value when equals is true", function () {
        expect(new Is("foo").equals("foo").value).not.toBeUndefined();
    });

    it("should return nothing when equals is false", function () {
        expect(new Is("foo").equals("").value).toBeUndefined();
    });

    it("should return the value when isNumber is true", function () {
        expect(new Is(1).isNumber().value).not.toBeUndefined();
    });

    it("should return nothing when isNumber is false", function () {
        expect(new Is("foo").isNumber().value).toBeUndefined();
    });

    it("should return the value when isLessThan is true", function () {
        expect(new Is(1).isLessThan(2).value).not.toBeUndefined();
    });

    it("should return nothing when isLessThan is false", function () {
        expect(new Is(1).isLessThan(0).value).toBeUndefined();
    });

    it("should return the value when isGreaterThan is true", function () {
        expect(new Is(2).isGreaterThan(1).value).not.toBeUndefined();
    });

    it("should return nothing when isGreaterThan is false", function () {
        expect(new Is(1).isGreaterThan(2).value).toBeUndefined();
    });

    it("should trigger 'then' if the chain is valid", function () {
        var count:number = 0;
        new Is("foo")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should not trigger 'then' if the chain is not valid", function () {
        var count:number = 0;
        new Is("foo")
            .isNumber()
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should trigger 'catch' if the chain is not valid", function () {
        var count:number = 0;
        new Is(null)
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 2;
            });
        expect(count).toBe(2);
    });

    it("should trigger 'then' if  any are true", function () {
        var count:number = 0;
        new Is("foo")
            .any("foo", "bar")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should trigger then if any shorthand length checks are true", function(){
        var count:number = 0;
        new Is("foo") .any("length<4)","length>10").then(()=>{
            count = 1;
        });
        expect(count).toBe(1)
    })

    it("should trigger then if any shorthand length checks are true", function(){
        var count:number = 0;
        new Is(1) .any("<4)",">10").then(()=>{
            count = 1;
        });
        expect(count).toBe(1)
    })

    it("should trigger finally even when it fails", function(){
        var count:number = 0;
        new Is(undefined).then(()=>{
            count = 1;
        }).finally(()=>{
            count=2
        });
        expect(count).toBe(2)
    })

    it("should trigger finally even when it succeeds", function(){
        var count:number = 0;
        new Is(1).then(()=>{
            count = 1;
        }).finally(()=>{
            count=2
        });
        expect(count).toBe(2)
    })
});


