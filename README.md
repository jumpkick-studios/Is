Is
==

A better way to write JavaScript conditional statements and still have pretty code.

This library was inspire by the Maybe Monad pattern. It allows you to to write conditional statements without nested if statements or null checking. 

**Example
  
  var foo="bar;
  if(foo){
    if(foo.length>0){
      if(foo != "bar2"){
         throw new Error("bad foo");
      }
    }else{
      throw new Error("bad foo");
    }
  }else{
      throw new Error("bad foo");
  }
  
Can be written as:

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
