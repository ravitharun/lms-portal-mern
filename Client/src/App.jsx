import Dashboard from "./Components/Admin/Dashboar";
import Home from "./Components/Student/Home";

function App() {
let Role=localStorage.getItem("Role")
console.log("Role"+Role)
  return (
    <>
    {/* {Role=="Student"?<Home/>:<Dashboard/>} */}
    </>

  );
}

export default App;
