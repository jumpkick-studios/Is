var validEmail = function (val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
};
var foo = { bar: "bar" };
Is(foo.bar).matching("length>2").not.equalTo("bar2").shorterThan(4).longerThan(2).then(function () {
    console.log("end of the chain, all is well");
}).catch(function () {
    console.log("there's something really wrong here...");
});
Is("john.doe@fakeemail.com").matching(validEmail).then(function () {
    console.log("this is a valid email");
});
Is("john.doe.fakeemail.com").matching(validEmail).then(function () {
    console.log("this is a valid email");
}).catch(function () {
    console.log("nope, bad email");
});
Is(1).lessThan(4).then(function () {
    console.log("<4");
}).matching(">0").then(function () {
    console.log(">0");
}).matching("<1").then(function () {
    console.log("it is less than 4");
}).catch(function () {
    console.log("do nothing");
});
Is("foo").then(function () {
    console.log("it is not null");
}).catch(function () {
    console.log("is  null");
});
Is("foo").matchingAny("length<4)", "length>10").then(function () {
    console.log("or works");
});
Is(undefined).then(function () {
    console.log("it is not null");
}).catch(function () {
    console.log("is  null");
});
Is("john.doe@fakeemail.com").not.matchingAny(validEmail, "foo").then(function () {
    console.log("it is a valid email or it is 'foo'");
}).catch(function () {
    console.log("is  bad news");
});
var validObject = function (obj) {
    return (obj.foo && obj.foo.length > 0) && (obj.bar && obj.bar.length < 4);
};
Is({ foo: "foo", bar: "bar" }).matching(validObject).then(function () {
    console.log("valid object");
});
Is({ foo: "foo", bar: "bar" }).prop("foo").equalTo("foo").then(function () {
    console.log("valid foo");
});
Is("aaa").a.not.numeric().then(function () {
    console.log("a prop");
});
//# sourceMappingURL=main.js.map