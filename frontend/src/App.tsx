import './App.css'
import {Route, Routes} from "react-router";
import Overview from "./pages/overview.tsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Overview />}/>
    </Routes>
  )
}

export default App
