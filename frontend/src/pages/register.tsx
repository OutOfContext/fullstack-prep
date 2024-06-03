import Header from "../sections/header.tsx";
import Content from "../sections/content.tsx";
import Footer from "../sections/footer.tsx";
import {HeaderData} from "../types/types.tsx";
import RegisterForm from "../components/content/registerForm.tsx";

export default function Register(){
    const headerData: HeaderData = {
        title: "Register",
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
                            displayName:"Register",
                            targetPath: "/register"
                        }
                    ]
                }
            ]
        }
    }
    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header data={headerData}/>
                <Content data={<RegisterForm />}/>
                <Footer/>
            </div>
        </>
    )
}