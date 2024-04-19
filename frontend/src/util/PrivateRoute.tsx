import {Navigate} from "react-router";
import * as React from "react";


interface PrivateRouteProps {
    isAuthenticated: boolean,
    component?: React.ReactNode | null;
}

export default function PrivateRoute(routeProps: PrivateRouteProps)  {
    if (routeProps.isAuthenticated){
        return (
            routeProps.component
        );
    } else {
        return (
            <Navigate to="/login"/>
        )
    }
}