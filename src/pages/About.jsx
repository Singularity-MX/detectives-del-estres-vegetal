import React from "react";
import { Layout } from "antd";
import Navbar from "../components/layout/Navbar";
import SingularityCard from "../components/ui/Cards/Singularity";

import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import hoja from "../assets/imgs/ndvi.png";

const About = () => {
    const items = [
        { key: "home", label: "Inicio" },
        { key: "information", label: "¿Cómo funciona?" },
        { key: "scaner", label: "Escáner" },
        { key: "about", label: "Sobre nosotros" },
    ];

    const handleNavigate = (key) => {
        console.log("navigate to:", key);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                position: "relative",
                background: "#fafafa",
                overflow: "hidden",
            }}
        >
            {/* 🔥 BACKGROUND TOPOGRÁFICO */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    overflow: "hidden",
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 1,
                    }}
                >
                    <defs>
                        <pattern
                            id="topographic-pattern"
                            width="180"
                            height="180"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M0 90 C40 30, 140 30, 180 90 C140 150, 40 150, 0 90"
                                fill="none"
                                stroke="#000"
                                strokeWidth="1"
                            />
                            <path
                                d="M0 60 C50 10, 130 10, 180 60 C130 110, 50 110, 0 60"
                                fill="none"
                                stroke="#000"
                                strokeWidth="0.8"
                                opacity="0.6"
                            />
                            <path
                                d="M0 120 C50 70, 130 70, 180 120 C130 170, 50 170, 0 120"
                                fill="none"
                                stroke="#000"
                                strokeWidth="0.8"
                                opacity="0.6"
                            />
                            <path
                                d="M0 30 C60 -10, 120 -10, 180 30"
                                fill="none"
                                stroke="#000"
                                strokeWidth="0.6"
                                opacity="0.4"
                            />
                            <path
                                d="M0 150 C60 110, 120 110, 180 150"
                                fill="none"
                                stroke="#000"
                                strokeWidth="0.6"
                                opacity="0.4"
                            />
                        </pattern>
                    </defs>

                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#topographic-pattern)"
                    />
                </svg>

                {/* 🔥 overlay tipo papel (suaviza contraste) */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(circle at center, rgba(255,255,255,0.85), rgba(250,250,250,1))",
                    }}
                />
            </div>

            {/* 🔥 CONTENIDO PRINCIPAL */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar
                    items={items}
                    onNavigate={handleNavigate}
                    initialSelectedKey="home"
                    logoIcon={
                        <img
                            src={logo}
                            alt="logo"
                            style={{ height: 40 }}
                        />
                    }
                    logoText={
                        <img
                            src={letras}
                            alt="text"
                            style={{ height: 20 }}
                        />
                    }
                />

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                    }}
                >
<SingularityCard
    website="https://singularity.com"
    email="singularity@example.com"
    instagram="https://instagram.com/singularity"
    facebook="https://facebook.com/singularity"
/>
                </div>
            </div>
        </Layout>
    );
};

export default About;