Is
==

A better way to write JavaScript conditional statements and still have pretty code.

This library was inspired by the Maybe Monad pattern and libraries like Jasmine.js and JQuery. It allows you to to write conditional statements without nested if statements or null checking. 

###Examples
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

This allows the code to almost like spoken words, which hopefully leads to more maintainable code.
