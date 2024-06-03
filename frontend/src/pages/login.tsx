import "../assets/css/pages/login.css";
import Header from "../sections/header.tsx";
import Content from "../sections/content.tsx";
import Footer from "../sections/footer.tsx";
import {HeaderData} from "../types/types.tsx";
import LoginForm from "../components/content/loginForm.tsx";
import AlertProvider from "../util/AlertContext.tsx";

export default function Login() {
    const headerData: HeaderData = {
        title: "Login",
        navigation: {
            sections: [
                {
                    displayName: "Pages",
                    navItems: [
                        {
                            displayName: "Login",
                            targetPath: "/login"
                        },
                        {
                            displayName: "Register",
                            targetPath: "/register"
                        }
                    ]
                }
            ]
        }
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header data={headerData}/>
                <Content data={
                    <AlertProvider>
                        <LoginForm/>
                    </AlertProvider>
                }/>
                <Footer/>
            </div>
        </>
    )
}