import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Store } from "./pages/store.jsx";
import { Contacto } from "./pages/contacto.jsx";
import { Perfil } from "./pages/perfil.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { Suscription } from "./pages/suscription.jsx";
import { SellView } from "./pages/sellview.jsx";
import { CategoryPage } from "./pages/store-type.jsx";
<<<<<<< HEAD
import { ProductView } from "./pages/productview.jsx";
=======
import { VideogameType } from "./pages/videogame-type.jsx";
import { Checkout } from "./pages/checkout.jsx";
>>>>>>> e49f5025ff300f48a61b2db3ba4c89db2af3257b

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
             
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Store />} path="/store" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<ProductView />} path="/product/" />
                        <Route element={<SellView />} path="/sell" />
                        <Route element={<Suscription />} path="/suscripcion" />
                        <Route element={<CategoryPage />} path="/store/:category"  />
                        <Route element={<Checkout />} path="/checkout" />
                        <Route element={<VideogameType />} path="/store/videogames/:type"  />
                        <Route element={<Checkout />} path="/checkout" />
                        <Route element={<VideogameType />} path="/store/videogames/:type"  />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
             
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
