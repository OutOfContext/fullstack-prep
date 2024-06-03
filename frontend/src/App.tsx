import './App.css'
import {Navigate, Route, Routes} from "react-router";
import OrganizationsView from "./pages/organization/organizationsView.tsx";
import PrivateRoute from "./util/PrivateRoute.tsx";
import Login from "./pages/login.tsx";
import Logout from "./pages/logout.tsx";
import OrganizationsDetailView from "./pages/organization/organizationsDetailView.tsx";
import TeamsDetailView from "./pages/team/teamsDetailView.tsx";
import Register from "./pages/register.tsx";

function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/overview"
                   element={<PrivateRoute isAuthenticated={isAuthenticated} component={<OrganizationsView/>}/>}/>
            <Route path="/organizations/:orgaId" element={<PrivateRoute isAuthenticated={isAuthenticated}
                                                                        component={<OrganizationsDetailView/>}/>}/>
            <Route path="/organizations/:orgaId/teams/:teamId"
                   element={<PrivateRoute isAuthenticated={isAuthenticated} component={<TeamsDetailView/>}/>}/>
        </Routes>
    )
}

export default App
