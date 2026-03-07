'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// length of a side of the hexagon
const HEX_SIDE = 50;
// radius of the hexagon (center to vertex)
const HEX_R = HEX_SIDE / (2 * Math.sin(Math.PI / 3));

function createHexagonShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6; // flat-top
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createHexagonGeometry(radius: number, asEdges: boolean): THREE.BufferGeometry {
  const shape = createHexagonShape(radius);
  const pts = shape.getPoints(6);
  if (asEdges) {
    const vertices = pts.flatMap((p) => [p.x, p.y, 0]);
    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    ).setIndex([0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 0]);
  }
  const geom = new THREE.ShapeGeometry(shape);
  geom.rotateZ(-Math.PI / 2);
  return geom;
}

export default function FooterHexagonBG() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -100,
      100
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(-width / 2 + 80, -height / 2 + 70, 0);

    const hexColor = 0x00adb5;
    const hexColorAlt = 0xff5722;

    const cols = 4;
    const rows = 3;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = col * HEX_SIDE;
        const offsetY = -row * HEX_SIDE * 1.5 - (col % 2 === 0 ? 0 : HEX_SIDE * 1.5 / 2);

        const wireGeom = createHexagonGeometry(HEX_R - 2, true);
        const wire = new THREE.LineSegments(
          wireGeom,
          new THREE.LineBasicMaterial({
            color: col % 2 === 0 ? hexColor : hexColorAlt,
            transparent: true,
            opacity: 0.35 + Math.random() * 0.25,
          })
        );
        wire.position.set(offsetX, offsetY, 0);
        group.add(wire);

      }
    }

    scene.add(group);

    let raf = 0;
    const start = performance.now();

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - start) * 0.001;
      group.rotation.z = Math.sin(t * 0.3) * 0.08;
      group.position.y = -height / 2 + 70 + Math.sin(t * 0.5) * 4;
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      group.position.x = -w / 2 + 80;
      group.position.y = -h / 2 + 70;
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      group.clear();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    />
  );
}
