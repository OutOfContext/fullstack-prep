import './App.css'
import {Navigate, Route, Routes} from "react-router";
import Overview from "./pages/overview.tsx";
import PrivateRoute from "./util/PrivateRoute.tsx";
import Login from "./pages/login.tsx";
import Logout from "./pages/logout.tsx";

function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/overview" element={<PrivateRoute isAuthenticated={isAuthenticated} component={<Overview/>}/>}/>
        </Routes>
    )
}

export default App
