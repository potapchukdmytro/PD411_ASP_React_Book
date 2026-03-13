import LoginPage from "./LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginPageByGoole = () => {
    return (
    <GoogleOAuthProvider clientId="223817011839-pe1cpgauh8f2955ugedg1me3ceo9e3e0.apps.googleusercontent.com">
        <LoginPage />
    </GoogleOAuthProvider>
)}

export default LoginPageByGoole;
