import React from "react";
import { Layout } from "antd";
import Navbar from "../components/layout/Navbar";
import HeroCard from "../components/ui/Cards/HeroCard";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import hoja from "../assets/imgs/ndvi.png";
import fondo from "../assets/map.svg";
import SvgComponent from "../assets/textura.jsx";

const Background = () => (
    <div
        style={{
            position: "fixed",
            inset: 0, // reemplaza top/left/width/height
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
        }}
    >
        <SvgComponent
            preserveAspectRatio="xMidYMid slice"
            style={{
                width: "100vw",
                height: "100dvh",
                opacity: 0.1,
            }}
        />
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const items = [
        { key: "home", label: "Inicio" },
        { key: "information", label: "¿Cómo funciona?" },
        { key: "scan", label: "Escáner" },
        { key: "about", label: "Sobre nosotros" },
    ];

    const handleNavigate = (key) => {
        //console.log("navigate to:", key);
        navigate(`/${key === "home" ? "" : key}`);
    };

    return (
        <Layout
            style={{
                minHeight: "100dvh",
                background: "#fafafa",
                overflow: "hidden",
            }}
        >
            <Background />

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar
                    items={items}
                    onNavigate={handleNavigate}
                    initialSelectedKey="home"
                    logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
                    logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
                />

                <main
    style={{
        height: "calc(100dvh - 64px)", // ajusta al alto real del Navbar
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 24px",
    }}
>
                    <HeroCard
                        image={hoja}
                        title="Detectives del estrés vegetal"
                        description="Convierte el color de las hojas en datos RGB para analizar el estado de salud vegetal."
                        meta={{
                            "📅 Fecha": "09 de mayo del 2026",
                            "⏰ Hora": "12:00 PM - 13:30 PM",
                            "📍 Lugar": "IMJU Parque Hidalgo",
                            "🧑‍🔬 Edad": "+12 años",
                            "👥 Cupo": "35 participantes",
                        }}
                        keywords={[
                            "RGB",
                            "NDVI",
                            "Salud vegetal",
                        ]}
                        buttonText="Comenzar"
                        onClick={() => navigate("/scan")}
                    />
                </main>
            </div>
        </Layout>
    );
};

export default Home;