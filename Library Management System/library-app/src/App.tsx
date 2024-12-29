import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { User } from "./models/User";

function App() {
  
  const[displayLogin,setDisplayLogin]=useState<boolean>(true);
  const[loggedInUser,setLoggednInUser]=useState<User>();

  return (
   <div>
      <HomePage displayLogin={displayLogin}/>
   </div>
  )
}

export default App
