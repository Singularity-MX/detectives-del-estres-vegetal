import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import HeroCard from "../components/ui/Cards/HeroCard";
import Loader from "../components/layout/loader/Loader.jsx";

import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import hoja from "../assets/imgs/ndvi.png";
import SvgComponent from "../assets/textura.jsx";

/**
 * Background
 * Capa visual fija que renderiza un SVG decorativo en toda la viewport.
 * - No interactiva (pointerEvents: none)
 * - Se mantiene detrás del contenido (zIndex bajo)
 * - Escala responsivamente manteniendo proporción
 */
const Background = () => (
    <div
        style={{
            position: "fixed",
            inset: 0,
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

/**
 * Home
 * Página principal del flujo.
 *
 * Responsabilidades:
 * - Orquestar layout base (Navbar + contenido central)
 * - Gestionar estado de carga inicial
 * - Controlar navegación entre secciones
 * - Aplicar transiciones para mejorar percepción de carga
 */
const Home = () => {
    const navigate = useNavigate();

    /**
     * loading:
     * Estado efímero utilizado para controlar la transición inicial.
     * En escenarios reales, este estado debería depender de:
     * - carga de recursos (imágenes, datos)
     * - inicialización de servicios (ej. cámara, APIs)
     */
    const [loading, setLoading] = useState(true);

    /**
     * Simulación de carga inicial.
     * Se utiliza un timeout corto para evitar render abrupto del contenido.
     * Cleanup incluido para evitar fugas en desmontaje.
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    /**
     * Configuración de navegación del Navbar.
     * Las keys corresponden directamente a las rutas.
     */
    const items = [
        { key: "", label: "Inicio" },
        { key: "information", label: "¿Cómo funciona?" },
        { key: "scan", label: "Escáner" },
        { key: "about", label: "Sobre nosotros" },
    ];

    /**
     * Maneja la navegación programática desde el Navbar.
     */
    const handleNavigate = (key) => {
        navigate(`/${key}`);
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

            {/* Contenedor principal sobre el background */}
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
                    initialSelectedKey=""
                    logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
                    logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
                />

                {/* Área central: controla layout vertical descontando altura del header */}
                <main
                    style={{
                        height: "calc(100dvh - 64px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px 24px",
                    }}
                >
                    {loading ? (
                        /**
                         * Estado de carga:
                         * Fade-in simple para evitar aparición abrupta del loader.
                         */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Loader size={60} color="#000000" />
                        </motion.div>
                    ) : (
                        /**
                         * Contenido principal:
                         * Animación de entrada combinando fade + desplazamiento vertical.
                         * Mejora percepción de fluidez y evita "render en seco".
                         */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
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
                        </motion.div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

export default Home;