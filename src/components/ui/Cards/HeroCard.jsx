import React, { useState } from "react";
import { Card, Button, Typography, Grid } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const HeroCard = ({
    image,
    title,
    description,
    meta = {},
    keywords = [],
    buttonText = "Comenzar",
    onClick,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [imgLoaded, setImgLoaded] = useState(false);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const Keywords = () =>
        keywords.length > 0 && (
            <motion.div variants={itemVariants}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: isMobile ? 14 : 0,
                    }}
                >
                    {keywords.map((kw, index) => (
                        <span
                            key={index}
                            style={{
                                fontSize: isMobile ? 11 : 12,
                                padding: isMobile ? "4px 8px" : "5px 10px",
                                borderRadius: 999,
                                background: "rgba(0,0,0,0.05)",
                                border: "1px solid rgba(0,0,0,0.08)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {kw}
                        </span>
                    ))}
                </div>
            </motion.div>
        );

    return (
        <Card
            hoverable
            style={{
                width: "100%",
                maxWidth: 1050,
                height: isMobile ? "auto" : 550,
                margin: "40px auto",
                borderRadius: 22,
                overflow: "hidden",
                border: "2px solid rgba(0,0,0,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                userSelect: "none",
            }}
            styles={{
                body: {
                    padding: 0,
                    height: "100%",
                },
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    height: "100%",
                }}
            >
                {/* IMAGE */}
                <div
                    style={{
                        width: isMobile ? "100%" : "50%",
                        height: isMobile ? 260 : "100%",
                        overflow: "hidden",
                        position: "relative",
                        background: "#eee",
                    }}
                >
                    <motion.img
                        src={image}
                        alt="hero"
                        onLoad={() => setImgLoaded(true)}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{
                            scale: imgLoaded ? 1 : 1.1,
                            opacity: imgLoaded ? 1 : 0,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
                        }}
                    />
                </div>

                {/* CONTENT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        width: isMobile ? "100%" : "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: isMobile ? "flex-start" : "space-between",
                        padding: isMobile ? 20 : 48,
                        background: "#fff",
                    }}
                >
                    <div>
                        {/* TITLE */}
                        <motion.div variants={itemVariants}>
                            <Title
                                level={isMobile ? 3 : 2}
                                style={{ marginBottom: 12 }}
                            >
                                {title}
                            </Title>
                        </motion.div>

                        {/* KEYWORDS (solo arriba en mobile) */}
                        {isMobile && <Keywords />}

                        {/* DESCRIPTION */}
                        <motion.div variants={itemVariants}>
                            <Paragraph
                                style={{
                                    fontSize: 16,
                                    color: "#555",
                                    lineHeight: 1.7,
                                    marginBottom: 20,
                                }}
                            >
                                {description}
                            </Paragraph>
                        </motion.div>

                        {/* META */}
                        <motion.div variants={itemVariants}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                    marginBottom: 18,
                                }}
                            >
                                {Object.entries(meta).map(([key, value]) => (
                                    <div
                                        key={key}
                                        style={{
                                            display: "flex",
                                            gap: 6,
                                            fontSize: 14,
                                        }}
                                    >
                                        <span style={{ fontWeight: 600 }}>
                                            {key}:
                                        </span>
                                        <span style={{ color: "#555" }}>
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* KEYWORDS (posición original en desktop) */}
                        {!isMobile && <Keywords />}
                    </div>

                    {/* CTA */}
                    <motion.div variants={itemVariants}>
                        <div style={{ marginTop: isMobile ? 20 : 30 }}>
                            <Button
                                type="primary"
                                size="large"
                                onClick={onClick}
                                style={{
                                    borderRadius: 10,
                                    height: 46,
                                    width: isMobile ? "100%" : "80%",
                                    fontSize: 16,
                                }}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <style>
                {`
                .ant-card:hover {
                    box-shadow: 0 18px 50px rgba(0,0,0,0.12);
                }
                `}
            </style>
        </Card>
    );
};

export default HeroCard;