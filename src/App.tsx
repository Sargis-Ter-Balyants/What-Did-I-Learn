import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ROUTES, { ADMIN_ROUTES } from "./utils/routes";
import axiosInstance from "./utils/axios.interceptor";
import Login from "./components/Login/Login";
import { RiseLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import AsideHeader from "./components/AsideHeader/AsideHeader";
import IMAGES from "./utils/images";

interface RouteElement {
    path: string;
    element: React.ReactNode;
}

function App() {
    const { pathname } = useLocation();
    const [pending, setPending] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (pathname === "/dashboard/login") return;
        if (!pathname.startsWith("/dashboard")) return;

        setPending(true);

        async function fetchData() {
            const data = await axiosInstance.get(`/auth`);

            if (data) setPending(false);
        }
        fetchData();
    }, [pathname]);

    return (
        <main className="main">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {pathname === "/dashboard/login" ? (
                <Routes>
                    <Route
                        path={"dashboard/login"}
                        element={<Login />}
                    ></Route>
                </Routes>
            ) : pending ? (
                <div className="loader-container">
                    <RiseLoader
                        color="#d8d8d8"
                        size={10}
                    />
                </div>
            ) : pathname.startsWith("/dashboard") ? (
                <>
                    <AsideHeader
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                    />
                    <div className="wrapper">
                        <div
                            className="mobile-burger-menu"
                            onClick={() => setMenuOpen(true)}
                        >
                            <img
                                src={IMAGES.burgerMenu}
                                alt="Burger menu"
                            />
                        </div>
                        <div className="modal">
                            <Routes>
                                {ADMIN_ROUTES.map((route: RouteElement, index: number) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={route.element}
                                        ></Route>
                                    );
                                })}
                            </Routes>
                        </div>
                    </div>
                </>
            ) : (
                <Routes>
                    {ROUTES.map((route: RouteElement, index: number) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            ></Route>
                        );
                    })}
                </Routes>
            )}
        </main>
    );
}

export default App;
