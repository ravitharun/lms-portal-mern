import Dashboard from "./Components/Admin/Dashboard";
import Home from "./Components/Student/Home";

function App() {
  let Role = localStorage.getItem("Role");
  console.log("Role: " + Role);

  return (
    <>
     {Role === "Student" ? <Home /> 
 : Role === "Faculty" ? <Dashboard /> 
 : <p>Please login again</p>}

    </>
  );
}

export default App;
