/// <reference path="is.d.ts" />

var validEmail = function (val:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
};

var foo = {bar: "bar"};
Is(foo.bar)
    .matching("length>2")
    .not.equalTo("bar2")
    .shorterThan(4)
    .longerThan(2)
    .then(()=> {
        console.log("end of the chain, all is well");
    })
    .catch(()=> {
        console.log("there's something really wrong here...");
    });


Is("john.doe@fakeemail.com")
    .matching(validEmail).then(()=> {
        console.log("this is a valid email");
    });

Is("john.doe.fakeemail.com")
    .matching(validEmail).then(()=> {
        console.log("this is a valid email");
    }).catch(()=> {
        console.log("nope, bad email");
    });

Is(1)
    .lessThan(4)
    .then(()=> {
        console.log("<4");
    })
    .matching(">0")
    .then(()=> {
        console.log(">0");
    })
    .matching("<1")
    .then(()=> {
        console.log("it is less than 4");
    }).catch(()=> {
        console.log("do nothing");
    });

Is("foo").then(()=> {
    console.log("it is not null");
}).catch(()=> {
    console.log("is  null");
});

Is("foo").matchingAny("length<4)","length>10").then(()=>{
    console.log("or works");

});

Is(undefined).
    then(()=> {
        console.log("it is not null");
    })
    .catch(()=> {
        console.log("is  null");
    });

Is("john.doe@fakeemail.com")
    .not.matchingAny(validEmail, "foo")
    .then(()=> {
        console.log("it is a valid email or it is 'foo'");
    })
    .catch(()=> {
        console.log("is  bad news");
    });

var validObject=function(obj){
  return (obj.foo&&obj.foo.length>0)&& (obj.bar&&obj.bar.length<4);
};

Is({foo:"foo",bar:"bar"}).matching(validObject).then(()=>{
    console.log("valid object");
})

Is({foo:"foo",bar:"bar"}).prop("foo").equalTo("foo").then(()=>{
    console.log("valid foo");
})

Is("aaa").a.not.numeric().then(()=>{
    console.log("a prop");
})
