import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

const StarBackground = () => {
  const [init, setInit] = useState(false);

  // Khởi tạo tsParticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Tải preset Stars
      await loadStarsPreset(engine);
      setInit(true);
    });
  }, []);

  // Callback khi particles tải xong
  const particlesLoaded = async (container: unknown) => {
    console.log("Particles loaded:", container);
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        preset: "stars", // Sử dụng preset Stars
        // Tùy chỉnh thêm nếu cần
        background: {
          color: "#000000", // Màu nền đen
        },
        particles: {
          number: {
            value: 100, // Số lượng sao
            density: {
              enable: true,
              width: 1920,
              height: 1080
            },
          },
          opacity: {
            value: { min: 0.1, max: 0.8 }, // Độ mờ nhấp nháy
            animation: {
              enable: true,
              speed: 3,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default StarBackground;