import "./App.css";
import BookListPage from "./pages/booksPage/BookListPage";
import AuthorListPage from "./pages/authorsPage/AuthorsListPage";
import AuthorsCreateForm from "./pages/authorsPage/AuthorsCreateForm";
import { Routes, Route } from "react-router";
import BookCreateForm from "./pages/booksPage/BookCreateForm";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import MainPage from "./pages/mainPage/MainPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import BookUpdateForm from "./pages/booksPage/BookUpdateForm";
import LoginPage from "./pages/auth/loginPage/LoginPage";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme/lightTheme";
import { darkTheme } from "./theme/darkTheme";
import RegisterPage from "./pages/auth/registerPage/RegisterPage";
import ToastifyProvider from "./components/toastify/ToastifyProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPageByGoole from "./pages/auth/loginPage";

function App() {
    const { isAuth, login, user } = useAuth();

    // auth
    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            login();
        }
    }, []);

    // theme
    const [isDark, setIsDark] = useState(true);

    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                {/* Маршрути */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DefaultLayout
                                setIsDark={setIsDark}
                                isDark={isDark}
                            />
                        }
                    >
                        <Route index element={<MainPage />} />

                        {/* books */}
                        <Route path="books">
                            <Route index element={<BookListPage />} />
                            {isAuth && user.role === "admin" && (
                                <>
                                    <Route
                                        path="create"
                                        element={<BookCreateForm />}
                                    />
                                    <Route
                                        path="update/:id"
                                        element={<BookUpdateForm />}
                                    />
                                </>
                            )}
                        </Route>

                        {/* authors */}

                        <Route path="authors">
                            <Route index element={<AuthorListPage />} />
                            <Route
                                path="create"
                                element={<AuthorsCreateForm />}
                            />
                        </Route>

                        {/* auth */}

                        {/* if(!isAuth){ retun <Route/> } */}

                        {!isAuth && (
                            <>
                                <Route path="login" element={<LoginPageByGoole />} />
                                <Route
                                    path="register"
                                    element={<RegisterPage />}
                                />
                            </>
                        )}

                        {/* Якщо вказано шлях якого не існує */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
                <ToastifyProvider theme={isDark} />
            </ThemeProvider>
            </>
    );
}

export default App;
