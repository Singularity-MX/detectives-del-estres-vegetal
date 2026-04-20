import React from "react";
import { Card, Button, Typography, Grid } from "antd";

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

    return (
        <Card
            hoverable
            style={{
                width: "100%",
                maxWidth: 1050,
                height: isMobile ? "auto" : 520,
                margin: "40px auto",
                borderRadius: 22,
                overflow: "hidden",
                border: "2px solid rgba(0,0,0,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
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
                <div
                    style={{
                        width: isMobile ? "100%" : "50%",
                        height: isMobile ? 260 : "100%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <img
                        src={image}
                        alt="hero"
                        className="hero-img"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
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

                <div
                    style={{
                        width: isMobile ? "100%" : "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: isMobile ? 20 : 48,
                        background: "#fff",
                    }}
                >
                    <div>
                        <Title
                            level={isMobile ? 3 : 2}
                            style={{
                                marginBottom: 12,
                                letterSpacing: -0.4,
                            }}
                        >
                            {title}
                        </Title>

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
                                        color: "#333",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: "#111",
                                            minWidth: 100,
                                        }}
                                    >
                                        {key}:
                                    </span>
                                    <span style={{ color: "#555" }}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {keywords.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 8,
                                }}
                            >
                                {keywords.map((kw, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontSize: 12,
                                            padding: "5px 10px",
                                            borderRadius: 999,
                                            background: "rgba(0,0,0,0.05)",
                                            color: "#333",
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            letterSpacing: 0.3,
                                        }}
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: 30 }}>
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
                </div>
            </div>

            <style>
                {`
                .hero-img:hover {
                    transform: scale(1.05);
                }

                .ant-card:hover {
                    
                    box-shadow: 0 18px 50px rgba(0,0,0,0.12);
                }
                `}
            </style>
        </Card>
    );
};

export default HeroCard;