import React from 'react'
import { useState } from 'react'

// function Counter() {

//   const[count, setCount] = useState(0);

//   return (
//     <div>
//       <button onClick={()=> setCount(count+1)}>+1</button>
//       <p>{count}</p>
//       <button onClick={()=> setCount(count-1)}>-1</button>
//     </div>
//   )
// }


// function Counter() {

//   const[name, setName] = useState();

//   return (
//     <div>
//       <input type='text' onChange={(e)=> setName(e.target.value)} />
//       <h2>hello {name}</h2>
//     </div>
//   )
// }



// function Counter() {

//   const [show, setshow] = useState(true);

//   return (
//     <div>
//       <button onClick={()=> setshow(!show)}>Toggle</button>
//       {show && <p>Hello</p>}
//     </div>
//   )
// }


// function Counter() {

//   const[fruits,setFruits] = useState(["Banana","Apple","Mango"]);

//   const addFruit = ()=>{
//     setFruits([...fruits,"Grapes"]);
//   }

//   return (
//     <>
//       <button onClick={addFruit}>Add Fruit</button>
//       {fruits.map((fruit,index)=>(<p key={index}>{fruit}</p>))}
//     </>
//   )
// }


// function Counter() {

//   const[user,setUser] = useState({
//     name:"Sanjesh",
//     age:"32"
//   });

//   const changeName=()=>{
//     setUser({...user,name:"Kush"})
//   }

//   return (
//     <div>
//       <h2>{user.name}</h2>
//       <h4>{user.age}</h4>
//       <button onClick={changeName}>Change Name</button>
//     </div>
//   )
// }



// function Counter() {

//   const[user,setUser] = useState("");
//   const[password,setPassword] = useState("");

//   return (
//     <div>
//       <input type="text" onChange={(e)=>setUser(e.target.value)} />
//       <input type="password" onChange={(e)=>setPassword(e.target.value)} />
//       <p>{user}</p>
//       <p>{password}</p>
//     </div>
//   )
// }



function Counter() {

  const[task,setTask] = useState("");
  const[list,setList] = useState([]);

  const addTask = ()=>{
    setList([...list,task]);
    setTask("");
  }

  return (
    <div>
      <input type="text" value="" onChange={(e)=>setTask(e.target.value)} />
      <button onClick={addTask}>add</button>
      {list.map((item,index)=>(
        <p key={index}>{item}</p>
      ))}
    </div>
  )
}



export default Counter;
