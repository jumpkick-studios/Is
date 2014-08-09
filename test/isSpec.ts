/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/is.d.ts" />
describe("Is", function () {

    it("should correctly check that string is shorter than 4 characters", function () {
        expect(Is("foo").shorterThan(4).value).not.toBeNull();
    });

    it("should correctly check that string is longer than 2 characters", function () {
        expect(Is("foo").longerThan(2).value).not.toBeNull();
    });

    it("should return nothing when longerThan is false", function () {
        expect(Is("foo").longerThan(3).value).toBeNull();
    });

    it("should return nothing when shorterThan is false", function () {
        expect(Is("foo").shorterThan(3).value).toBeNull();
    });

    it("should return the value when equalTo is true", function () {
        expect(Is("foo").equalTo("foo").value).not.toBeNull();
    });

    it("should return nothing when equalTo is false", function () {
        expect(Is("foo").equalTo("").value).toBeNull();
    });

    it("should return the value when numeric is true", function () {
        expect(Is(1).numeric().value).not.toBeNull();
    });

    it("should return nothing when numeric is false", function () {
        expect(Is("foo").numeric().value).toBeNull();
    });

    it("should return the value when lessThan is true", function () {
        expect(Is(1).lessThan(2).value).not.toBeNull();
    });

    it("should return nothing when lessThan is false", function () {
        expect(Is(1).lessThan(0).value).toBeNull();
    });

    it("should return the value when greaterThan is true", function () {
        expect(Is(2).greaterThan(1).value).not.toBeNull();
    });

    it("should return nothing when greaterThan is false", function () {
        expect(Is(1).greaterThan(2).value).toBeNull();
    });

    it("should trigger 'then' if the chain is valid", function () {
        var count:number = 0;
        Is("foo")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });


    it("should not trigger 'then' if the chain is not valid", function () {
        var count:number = 0;
        Is("foo")
            .numeric()
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should trigger 'catch' if the chain is not valid", function () {
        var count:number = 0;
        Is(null)
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 2;
            });
        expect(count).toBe(2);
    });


    it("should trigger 'then' if  all are true", function () {
        var count:number = 0;
        Is("foo")
            .matching("foo")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });


    it("should not trigger 'then' if  not all are true", function () {
        var count:number = 0;
        Is("foo")
            .matching("foo", "bar")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should not trigger 'then' if  not all are true", function () {
        var count:number = 0;
        Is("foo")
            .matching("foo", "length<3")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should trigger 'then' if  any are true", function () {
        var count:number = 0;
        Is("foo")
            .matchingAny("foo", "bar")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should trigger 'then' if  any are true for equalTo", function () {
        var count:number = 0;
        Is("foo")
            .matchingAny("foo")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should trigger 'then' if  any are not true for equalTo", function () {
        var count:number = 0;
        Is("foo")
            .matchingAny("foo2")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should trigger then if any shorthand length checks are true", function () {
        var count:number = 0;
        Is("foo").matchingAny("length<4)", "length>10").then(()=> {
            count = 1;
        });
        expect(count).toBe(1)
    })

    it("should trigger then if any shorthand length checks are true", function () {
        var count:number = 0;
        Is(1).matchingAny("<4)", ">10").then(()=> {
            count = 1;
        });
        expect(count).toBe(1)
    })

    it("should trigger finally even when it fails", function () {
        var count:number = 0;
        Is(undefined).then(()=> {
            count++;
        }).catch(()=> {
            count++;
        }).finally(()=> {
            count++;
        });
        expect(count).toBe(2)
    })

    it("should trigger finally even when it succeeds", function () {
        var count:number = 0;
        Is(1).then(()=> {
            count++;
        }).finally(()=> {
            count++;
        });
        expect(count).toBe(2)
    });


    it("should return true if an array has a value", function () {
        var count:number;
        Is([1, 2, 3])
            .contains(2)
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);
    });

    it("should return true if an array does not have a value", function () {
        var count:number;
        Is([1, 2, 3])
            .contains("foo")
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(0);
    });

    it("should return true if an array does not have a value and inverse is true", function () {
        var count:number;
        Is([1, 2, 3])
            .not.contains("foo")
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);
    });

    it("should return false if an array does  have a value and inverse is true", function () {
        var count:number;
        Is([1, 2, 3])
            .not.contains(2)
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(0);
    });

    it("should return true if an array is empty", function () {
        var count:number;
        Is([])
            .emptyArray()
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);
    });

    it("should return false if an array is empty and inverse is true", function () {
        var count:number;
        Is([])
            .not.emptyArray()
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(0);
    });

    it("should return false if an array is not empty", function () {
        var count:number;
        Is([1, 2, 3])
            .emptyArray()
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(0);
    });

    it("should return true if an array is not empty and inverse is true", function () {
        var count:number;
        Is([1, 2, 3])
            .not.emptyArray()
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);
    });

    it("should allow you to check a param of an object", function () {
        var count:number;
        Is({foo: "bar", bar: "baz"})
            .prop("foo")
            .equalTo("bar")
            .prop("bar")
            .longerThan(2)
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);

    });

    it("should allow you to check a param of an object if inverse is false", function () {
        var count:number;
        Is({foo: "bar"})
            .prop("foo")
            .not.equalTo("bar2")
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);
    });

    it("should allow you to check all types of object params", function () {
        var count:number;
        var validEmail = function (val:string) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val);
        };
        var complexObject = {
            arr: [1, 2, 3],
            str: "foo",
            num: 10,
            email: "joe.smith@fakeemail.com"
        };

        Is(complexObject)
            .and.prop("arr").not.emptyArray()
            .and.prop("arr").contains(3)
            .not.prop("arr").contains(7)
            .and.prop("str").longerThan(2)
            .and.prop("str").shorterThan(4)
            .and.prop("str").equalTo("foo")
            .and.prop("num").numeric()
            .and.prop("email").matching(validEmail)
            .then(()=> {
                count = 1;
            }).catch(()=> {
                count = 0;
            });
        expect(count).toBe(1);
    });

    it("should return true if any of the or validations are true", function () {
        var count = 0;
        Is(1)
            .greaterThan(4)
            .or.lessThan(2)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);

    });

    it("should return false if none of the or validations are true", function () {
        var count = 0;
        Is(5)
            .greaterThan(14)
            .or.lessThan(4)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should return true if any of the or validations are true for objects", function () {
        var count = 0;
        Is({foo:3})
            .prop("foo").greaterThan(15)
            .or.prop("foo").lessThan(4)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should return false if none of the or validations are true for objects", function () {
        var count = 0;
        Is({foo:3})
            .prop("foo").greaterThan(15)
            .or.prop("foo").lessThan(2)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should return true if any of the or validations are true for objects", function () {
        var count = 0;
        Is({foo:3,bar:"baz"})
            .prop("foo").greaterThan(15)
            .or.prop("foo").lessThan(2)
            .or.prop("bar").shorterThan(4)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should return false if none of the or validations are true for objects", function () {
        var count = 0;
        Is({foo:3,bar:"baz"})
            .prop("foo").greaterThan(15)
            .or.prop("foo").lessThan(2)
            .or.prop("bar").shorterThan(3)
            .or.prop("bar").longerThan(3)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should return true if any of the or validations are true for matchers", function () {
        var count = 0;
        Is({foo:3,bar:"baz"})
            .prop("foo").matchingAny(">4","<2")
            .or.prop("bar").matchingAny("length>2")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should return false if none of the or validations are true for matchers", function () {
        var count = 0;
        Is({foo:3,bar:"baz"})
            .prop("foo").matchingAny(">4","<2")
            .or.prop("bar").matchingAny("length>4")
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(0);
    });

    it("should return true if any of the or validations are true for matchers and the second one is false", function () {
        var count = 0;
        Is(3)
            .equalTo(3)
            .or.equalTo(4)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

    it("should return true if any of the or validations are true for matchers and the first one is false", function () {
        var count = 0;
        Is(3)
            .equalTo(4)
            .or.equalTo(3)
            .then(()=> {
                count = 1;
            });
        expect(count).toBe(1);
    });

});




