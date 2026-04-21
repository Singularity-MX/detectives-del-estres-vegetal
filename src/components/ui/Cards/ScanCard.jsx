import React, { useRef, useState } from "react";
import { Card, Button, Typography, Grid, Space, Segmented } from "antd";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const ScanCard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [rgb, setRgb] = useState({ r: "-", g: "-", b: "-" });
  const [points, setPoints] = useState([]);
  const [mode, setMode] = useState("single");

  /* =========================
     LOAD IMAGE
  ========================= */
  const handleFile = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setPoints([]);
    setRgb({ r: "-", g: "-", b: "-" });
  };

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  /* =========================
     CANVAS
  ========================= */
  const drawToCanvas = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);
  };

  /* =========================
     CLICK HANDLER
  ========================= */
  const getAveragePixel = (ctx, x, y, size = 11) => {
    const half = Math.floor(size / 2);

    let r = 0, g = 0, b = 0, count = 0;

    for (let dx = -half; dx <= half; dx++) {
      for (let dy = -half; dy <= half; dy++) {
        const px = x + dx;
        const py = y + dy;

        if (
          px >= 0 &&
          py >= 0 &&
          px < ctx.canvas.width &&
          py < ctx.canvas.height
        ) {
          const data = ctx.getImageData(px, py, 1, 1).data;
          r += data[0];
          g += data[1];
          b += data[2];
          count++;
        }
      }
    }

    return {
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count),
    };
  };

  const handleClick = (e) => {
    const imgEl = imgRef.current;
    const canvas = canvasRef.current;
    if (!imgEl || !canvas) return;

    const rect = imgEl.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const naturalRatio = imgEl.naturalWidth / imgEl.naturalHeight;
    const displayRatio = rect.width / rect.height;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (displayRatio > naturalRatio) {
      renderHeight = rect.height;
      renderWidth = renderHeight * naturalRatio;
      offsetX = (rect.width - renderWidth) / 2;
      offsetY = 0;
    } else {
      renderWidth = rect.width;
      renderHeight = renderWidth / naturalRatio;
      offsetX = 0;
      offsetY = (rect.height - renderHeight) / 2;
    }

    if (
      clickX < offsetX ||
      clickX > offsetX + renderWidth ||
      clickY < offsetY ||
      clickY > offsetY + renderHeight
    )
      return;

    const normX = (clickX - offsetX) / renderWidth;
    const normY = (clickY - offsetY) / renderHeight;

    const realX = Math.floor(normX * imgEl.naturalWidth);
    const realY = Math.floor(normY * imgEl.naturalHeight);

    const ctx = canvas.getContext("2d");
    const avg = getAveragePixel(ctx, realX, realY, 11);

    const imgX = offsetX + normX * renderWidth;
    const imgY = offsetY + normY * renderHeight;

    const newPoint = { imgX, imgY, ...avg };

    if (mode === "single") {
      setPoints([newPoint]);
      setRgb(avg);
    } else {
      const updated = [...points, newPoint];
      setPoints(updated);

      const sum = updated.reduce(
        (a, p) => ({
          r: a.r + p.r,
          g: a.g + p.g,
          b: a.b + p.b,
        }),
        { r: 0, g: 0, b: 0 }
      );

      setRgb({
        r: Math.round(sum.r / updated.length),
        g: Math.round(sum.g / updated.length),
        b: Math.round(sum.b / updated.length),
      });
    }
  };

  /* =========================
     INDEX
  ========================= */
  const computeIndex = () => {
    if (rgb.r === "-") return "-";
    return ((rgb.g - rgb.r) / (rgb.g + rgb.r)).toFixed(3);
  };

  /* =========================
     RESET
  ========================= */
  const handleReset = () => {
    setPoints([]);
    setRgb({ r: "-", g: "-", b: "-" });
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "40px auto",
        borderRadius: 22,
        overflow: "hidden",
        border: "2px solid rgba(0,0,0,0.08)",
      }}
      styles={{ body: { padding: 0 } }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* VISOR */}
        <div
          style={{
            width: isMobile ? "100%" : "60%",
            height: isMobile ? 300 : 550,
            background: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {!imageSrc ? (
            <Text style={{ color: "#999" }}>
              Carga una imagen para comenzar
            </Text>
          ) : (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={drawToCanvas}
                onClick={handleClick}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  cursor: "crosshair",
                }}
              />

              {points.map((p, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: p.imgX - 5,
                    top: p.imgY - 5,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "2px solid #000",
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* PANEL */}
        <div
          style={{
            width: isMobile ? "100%" : "40%",
            padding: isMobile ? 20 : 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minHeight: 550,
          }}
        >
          <Title level={3}>Explorador RGB</Title>

          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { label: "1 punto", value: "single" },
              { label: "Múltiples", value: "multi" },
            ]}
          />

          <Space wrap>
            <Button type="primary" onClick={() => fileInputRef.current.click()}>
              Subir
            </Button>

            <Button onClick={() => fileInputRef.current.click()}>
              Cámara
            </Button>

            <Button danger onClick={handleReset}>
              Limpiar
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={onInputChange}
            />
          </Space>

          {/* BLOQUE ESTABLE RGB + COLOR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderRadius: 12,
              background: "#f5f5f5",
              minHeight: 110,
            }}
          >
            <div>
              <Text strong>RGB</Text>
              <div>
                R: {rgb.r} <br />
                G: {rgb.g} <br />
                B: {rgb.b}
              </div>
            </div>

            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                background:
                  rgb.r === "-"
                    ? "#ccc"
                    : `rgb(${rgb.r},${rgb.g},${rgb.b})`,
              }}
            />
          </div>

          {/* INDEX */}
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              background: "#eaeaea",
            }}
          >
            <Text strong>Índice</Text>
            <div style={{ fontSize: 20 }}>{computeIndex()}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScanCard;