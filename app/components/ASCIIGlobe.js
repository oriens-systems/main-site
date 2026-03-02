"use client";

import { useRef, useEffect } from "react";

export default function ASCIIGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;
    let angle = 0;
    let texture = null;
    let charH = 12, charW = 7, cols = 0, rows = 0;

    const ctx = canvas.getContext("2d");

    function updateSize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
      charH = Math.max(8, Math.floor(canvas.height / 50));
      ctx.font = `${charH}px monospace`;
      charW = ctx.measureText("M").width;
      cols = Math.floor(canvas.width / charW);
      rows = Math.floor(canvas.height / charH);
    }

    fetch("/textures/earth.txt")
      .then((r) => r.text())
      .then((text) => {
        texture = text
          .split("\n")
          .filter((l) => l.length > 0)
          .map((l) => Array.from(l));
      });

    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(canvas);

    // Light direction (normalized): from right and slightly toward viewer
    const lx = 0.7071;
    const ly = 0.0;
    const lz = 0.7071;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (texture && texture.length > 0 && cols > 0 && rows > 0) {
        const tRows = texture.length;
        const tCols = texture[0].length;

        ctx.font = `${charH}px monospace`;
        ctx.textBaseline = "top";
        ctx.fillStyle = "#ffffff";

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const TWO_PI = Math.PI * 2;

        for (let cy = 0; cy < rows; cy++) {
          const sy = (2 * cy) / rows - 1;
          const ny = -sy; // flip: top of canvas = north pole
          const y2 = sy * sy;

          for (let cx = 0; cx < cols; cx++) {
            const sx = (2 * cx) / cols - 1;
            const r2 = sx * sx + y2;
            if (r2 >= 1) continue;

            const nz = Math.sqrt(1 - r2);
            const nx = sx;

            // Y-axis rotation by angle
            const rotX = nx * cosA + nz * sinA;
            const rotZ = -nx * sinA + nz * cosA;
            const rotY = ny;

            // Equirectangular texture UV
            let phi = -rotY * 0.5 + 0.5; // 0 = north pole, 1 = south pole
            let theta = Math.atan2(rotZ, rotX) / TWO_PI + 0.5;
            if (theta < 0) theta += 1;
            if (theta >= 1) theta -= 1;

            const tRow = Math.min(tRows - 1, Math.floor(phi * tRows));
            const tCol = Math.min(tCols - 1, Math.floor(theta * tCols));

            const ch = texture[tRow]?.[tCol] ?? ".";

            // Lambertian lighting in view space (right side always illuminated)
            const lum = Math.max(0, nx * lx + ny * ly + nz * lz);
            ctx.globalAlpha = 0.15 + lum * 0.85;
            ctx.fillText(ch, cx * charW, cy * charH);
          }
        }

        ctx.globalAlpha = 1;
      }

      angle += 0.003;
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
