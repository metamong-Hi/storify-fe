"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 씬 및 카메라 
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -3
    ;

    // 렌더러 및 캔버스 설정
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

     
    // 배경 및 조명 설정
    const ambientLight = new THREE.AmbientLight('white', 0.7);
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight('white', 0.5);
    const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
    directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.y = directionalLightOriginPosition.y;
    directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;
    const urls = [
      '/textures/px.png', '/textures/nx.png',
      '/textures/py.png', '/textures/ny.png',
      '/textures/pz.png', '/textures/nz.png'
    ];

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const cubeTexture = cubeTextureLoader.load(urls);

    scene.background = cubeTexture;
    //그림자
     directionalLight.shadow.mapSize.width = 2048;
     directionalLight.shadow.mapSize.height = 2048;
     // 그림자 범위
     directionalLight.shadow.camera.left = -100;
     directionalLight.shadow.camera.right = 100;
     directionalLight.shadow.camera.top = 100;
     directionalLight.shadow.camera.bottom = -100;
     directionalLight.shadow.camera.near = -100;
     directionalLight.shadow.camera.far = 100;
     scene.add(directionalLight);


    
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/models/house.glb', (glb) => {
        glb.scene.position.set(-15, -20, -3);
        glb.scene.scale.set(5,5,5);
        scene.add(glb.scene);
      });
      
  
    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 창 크기 변경에 대한 대응
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', onWindowResize);

 // 클린업 함수 - 1/13 수정함 (next 특성임)
 return () => {
  if (mountRef.current && renderer.domElement) {
    mountRef.current.removeChild(renderer.domElement);
  }
  window.removeEventListener('resize', onWindowResize);
};
  }, []);

  return (
    
    <div ref={mountRef}></div>
  )
};

export default ThreeScene;
