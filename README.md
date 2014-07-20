Is
==

A better way to write JavaScript conditional statements and still have pretty code.

This library was inspired by the Maybe Monad pattern and libraries like Jasmine.js and JQuery. It allows you to to write conditional statements without nested if statements or null checking. 

###Installation

Just include the minified script in your project. It's really tiny (1kb minified and zipped)
```
<script src="is.min.js"></script>
```
Or, if you're using TypeScript (and why aren't you using TyepScript?), include the definition file in your main class.
```
/// <reference path="is.d.ts" />
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

A better way to handle this is to write the code in such a way that when any single step fails, the chain is broken and none of the other steps are executed. A single _catch_ function can handle the failure. So using Is, the preceding code can be rewritten as:
  ```

  var foo="bar";
  new Is(foo)
    .isLongerThan(0).
    .equals("bar")
    .not().equals("bar2")
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
  new Is(foo)
  .isLongerThan(number) // checks the length of a string for minimum length 
  .isShorterThan(number) // checks the length of a string for maximum length
  .equals("bar") // checks for exact value
  .not() // inverts the next validation
  .equals("baz")
  
  new Is(1000)
  .isNumber() // returns true if the value is a number
  .isLessThan(10000) // checks for maximum value
  .isGreaterThan(0) // checks for minimum value
  
  new Is(100)
    .any("<101",">1000") // you can use a shorthand and check for any of these things to be true
    .is("<101", ">99") // or check that all validations are true
    
  var validEmail = function (val:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  };

  new Is("john.doe@fakeemail.com")
    .is(validEmail) //you can use a function as an argument which returns true of false
  
  new Is("john.doe@fakeemail.com")
    .is(validEmail)
    .then(()=>{
      consolde.log("valid email") //if the chain succeeds, you can run a callback using "then"
    });
    
  new Is("john.doefakeemail.com")
    .is(validEmail)
    .catch(()=>{
      consolde.log("bad email") //if the chain fails, you can run a callback using "catch"
    });
  
    
  
```
