/// <reference path="is.d.ts" />
var validEmail = function (val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
};

var Is = jumpkick.Is;

var foo = { bar: "bar" };
new Is(foo.bar).is("length>2").not().equals("bar2").isShorterThan(4).isLongerThan(2).then(function () {
    console.log("end of the chain, all is well");
}).catch(function () {
    console.log("there's something really wrong here...");
});

new Is("john.doe@fakeemail.com").is(validEmail).then(function () {
    console.log("this is a valid email");
});

new Is("john.doe.fakeemail.com").is(validEmail).then(function () {
    console.log("this is a valid email");
}).catch(function () {
    console.log("nope, bad email");
});

new Is(1).isLessThan(4).then(function () {
    console.log("<4");
}).is(">0").then(function () {
    console.log(">0");
}).is("<1").then(function () {
    console.log("it is less than 4");
}).catch(function () {
    console.log("do nothing");
});

new Is("foo").then(function () {
    console.log("it is not null");
}).catch(function () {
    console.log("is  null");
});

new Is("foo").any("length<4)", "length>10").then(function () {
    console.log("or works");
});

new Is(undefined).then(function () {
    console.log("it is not null");
}).catch(function () {
    console.log("is  null");
});

new Is("john.doe@fakeemail.com").not().any(validEmail, "foo").then(function () {
    console.log("it is a valid email or it is 'foo'");
}).catch(function () {
    console.log("is  bad news");
});

var validObject = function (obj) {
    return (obj.foo && obj.foo.length > 0) && (obj.bar && obj.bar.length < 4);
};

new Is({ foo: "foo", bar: "bar" }).is(validObject).then(function () {
    console.log("valid object");
});
//# sourceMappingURL=main.js.map
