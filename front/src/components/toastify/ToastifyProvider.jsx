import { Bounce, ToastContainer } from "react-toastify";
import "./style.css";

const ToastifyProvider = ({theme}) => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme ? "dark" : "light"}
            transition={Bounce}
            icon={() => (<img width="32px" height="32px" src="https://media.istockphoto.com/id/464988959/photo/mallard-duck-on-white-background.jpg?s=612x612&w=0&k=20&c=S1jcDuyXuoCVUaTobTrZ5f6SlscukkyheqKDHAeflW8="/>)}
        />
    );
};

export default ToastifyProvider;
