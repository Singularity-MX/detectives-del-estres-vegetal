import React from "react";
import { Card, Typography, Grid } from "antd";

const { Title, Paragraph, Link } = Typography;
const { useBreakpoint } = Grid;

const SingularityCard = ({
    website,
    email,
    instagram,
    facebook,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Card
            hoverable
            style={{
                width: "100%",
                maxWidth: 420,
                margin: "40px auto",
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                textAlign: "center",
            }}
            styles={{
                body: {
                    padding: isMobile ? 24 : 32,
                },
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                }}
            >
                {/* Header */}
                <div>
                    <Title
                        level={isMobile ? 3 : 2}
                        style={{
                            marginBottom: 8,
                            letterSpacing: -0.4,
                        }}
                    >
                        Singularity
                    </Title>

                    <Paragraph
                        style={{
                            fontSize: 15,
                            color: "#555",
                            lineHeight: 1.6,
                            margin: 0,
                        }}
                    >
                        Somos un colectivo de ciencia abierta
                    </Paragraph>
                </div>

                {/* Divider visual */}
                <div
                    style={{
                        width: "60%",
                        height: 1,
                        background: "rgba(0,0,0,0.08)",
                        margin: "8px auto",
                    }}
                />

                {/* Contacto */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        fontSize: 14,
                    }}
                >
                    {website && (
                        <Link href={website} target="_blank">
                            🌐 {website}
                        </Link>
                    )}

                    {email && (
                        <Link href={`mailto:${email}`}>
                            ✉️ {email}
                        </Link>
                    )}

                    {instagram && (
                        <Link href={instagram} target="_blank">
                            📸 Instagram
                        </Link>
                    )}

                    {facebook && (
                        <Link href={facebook} target="_blank">
                            👍 Facebook
                        </Link>
                    )}
                </div>
            </div>

            <style>
                {`
                .ant-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 18px 50px rgba(0,0,0,0.12);
                }
                `}
            </style>
        </Card>
    );
};

export default SingularityCard;