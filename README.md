Is
==

A better way to write JavaScript conditional statements and still have pretty code.

This library was inspired by the Maybe Monad pattern and libraries like Jasmine.js and JQuery. It allows you to write conditional statements without nested if statements or null checking. 

###Installation

Just include the minified script in your project. It's really tiny (1kb minified and zipped)
```
<script src="is.min.js"></script>
```
Or, if you're using TypeScript (and why aren't you using TyepScript?), include the definition file in your main class.
```
/// <reference path="is.d.ts" />
```
For use with Node.js.
```
var Is = require('Is');
```
###How Does It Work?
  Typically, a lot of checks go into working with variables, especially when the values are returned by ajax calls or user input. This results in a lot of nested if statements that check for values to be defined, but also to pass various validation checks. For instance, see this code:
  
  ```
  var foo="bar";
  if(foo){
    if(foo.length>0){
      if(foo == "bar2"){
         throw new Error("bad foo");
      }else if(foo!="bar"){
         throw new Error("bad foo"); 
      }
    }else{
      throw new Error("bad foo");
    }
  }else{
      throw new Error("bad foo");
  }
  ```

A better way to handle this is to write the code in such a way that when any single step fails, the chain is broken and none of the other steps are executed. A single `catch` function can handle the failure. So using Is, the preceding code can be rewritten as:
  ```

  var foo="bar";
  Is(foo)
    .longerThan(0)
    .equalTo("bar")
    .not.equalTo("bar2")
    .then(()=>{
      console.log("success")
    })
    .catch(()=>{
      throw new Error("bad foo");
    });
```

This allows the code to read almost like spoken words, which hopefully leads to more maintainable code.

There are several methods available for checking the input value. If a validation method is successful, Is returns an instance of Is with the value, otherwise it returns one with nothing in it, which stops the chain.

```  
  var foo="bar";
  Is(foo)
  .longerThan(number) // checks the length of a string for minimum length 
  .shorterThan(number) // checks the length of a string for maximum length
  .equalTo("bar") // checks for exact value
  .not // inverts the next validation
  .equalTo("baz")
  
  Is(1000)
  .numeric() // returns true if the value is a number
  .lessThan(10000) // checks for maximum value
  .greaterThan(0) // checks for minimum value
  
  Is(100)
    .any("<101",">1000") // you can use a shorthand and check for any of these things to be true
    .is("<101", ">99") // or check that all validations are true
    
  Is("foo")
      .is("length>1") // check for string length
      
  Is([1,2,3])
    .not.emptyArray() //check if array is empty
    .contains(2) //check if array has a specific value in it
    
    
  var validEmail = function (val:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  };

  Is("john.doe@fakeemail.com")
    .is(validEmail) //you can use a function as an argument which returns true of false
  
  Is("john.doe@fakeemail.com")
    .is(validEmail)
    .then(()=>{
      consolde.log("valid email") //if the chain succeeds, you can run a callback using "then"
    });
    
  Is("john.doefakeemail.com")
    .is(validEmail)
    .catch(()=>{
      consolde.log("bad email") //if the chain fails, you can run a callback using "catch"
    });
  
  Is("john.doefakeemail.com")
    .is(validEmail)
    .catch(()=>{
      //bad email
    }).finally(()=>{
      //using this method, you can run a callback using "finally" no matter what happens
    });
  
```
####Dealing with `or` statements
One of the matchers above is the `matchingAny` method. This checks to see if any of the strings, or shorthand matchers are true. But you can also use the `or` method.
```
    Is({foo:3,bar:"baz"})
      .prop("foo").lessThan(2) // this is false, but with the _or_ method immedatiately following it...
      .or.prop("bar").longerThan(1) //this is true, so the whole chain is valid 
      .then(()=> {
           //do something cool here
      });
```

####Checking for undefined variables
The best part of all this is that you no longer need to worry about undefined variable values at all. For instance, if you have a value like this:

```
var foo={bar:undefined};

 Is(foo.bar)
  .longerThan(3)
  .catch(()=>{
    console.log("no value") // this gets called no matter what the value of foo.bar is
  })
```

####Complex objects
You can even work with complex objects and work with their properties. So for instance, maybe working with form values:
```
 var validEmail = function (val:string) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val);
        };
        var complexObject={
            arr:[1,2,3],
            str: "foo",
            num: 10,
            email:"joe.smith@fakeemail.com"
        }
        Is(complexObject)
         .prop("arr").not.emptyArray()
         .and.prop("arr").contains(3) // prop looks for property of complexObject named "arr"
         .and.prop("str").longerThan(2) //must be called prior to each validation check
         .and.prop("str").shorterThan(4) //"and" makes code more readable
         .and.prop("str").equalTo("foo")
         .and.prop("num").numeric()
         .and.prop("email").matching(validEmail)
         .then(()=> {
                // all of these things are true -- submit form?
         }).catch(()=> {
                //at least one of these things are not true
         });
 ```
You can also instantiate the chain by either using the `new` command or by using the `Facade`

```
Is("foo")
 .longerThan(2)
 .then(()=>{
   // callback
 });
 
 new jumpkick.Is("foo")
 .longerThan(2)
 .then(()=>{
   // callback
 });
```
