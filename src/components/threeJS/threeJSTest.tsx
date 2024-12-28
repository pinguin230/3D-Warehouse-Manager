import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {useAppDispatch} from "../../hooks/redux.ts";
import {setContainer3DVisualizerState} from "../../store/redusers/popup/popup.store.ts";

const Container3DVisualizer = ({ initialContainer }) => {

  const [clipLevel, setClipLevel] = useState(100);
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const clipPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, -1, 0), 0));

  useEffect(() => {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(
        initialContainer.width * 1.5,
        initialContainer.height * 1.5,
        initialContainer.depth * 1.5
    );
    camera.lookAt(
        initialContainer.width / 2,
        initialContainer.height / 2,
        initialContainer.depth / 2
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(500, 500);
    renderer.localClippingEnabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;


    const clipPlane = clipPlaneRef.current;

    clipPlane.constant = initialContainer.height * (clipLevel / 100);


    const containerGeometry = new THREE.BoxGeometry(
        initialContainer.width,
        initialContainer.height,
        initialContainer.depth
    );
    containerGeometry.translate(
        initialContainer.width / 2,
        initialContainer.height / 2,
        initialContainer.depth / 2
    );
    const containerMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
    });
    const containerMesh = new THREE.Mesh(containerGeometry, containerMaterial);
    scene.add(containerMesh);


    initialContainer.contents.forEach((item) => {
      const itemGeometry = new THREE.BoxGeometry(
          item.width,
          item.height,
          item.depth
      );
      itemGeometry.translate(item.width / 2, item.height / 2, item.depth / 2);
      const itemMaterial = new THREE.MeshBasicMaterial({
        color: item.color || Math.random() * 0xffffff,
        side: THREE.DoubleSide,
        clippingPlanes: [clipPlane],
      });
      const itemMesh = new THREE.Mesh(itemGeometry, itemMaterial);
      itemMesh.position.set(item.x, item.y, item.z);
      scene.add(itemMesh);
    });


    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();


    return () => {
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [initialContainer]);


  const handleClipLevelChange = (e) => {
    const newClipLevel = Number(e.target.value);
    setClipLevel(newClipLevel);


    const clipPlane = clipPlaneRef.current;

    clipPlane.constant = initialContainer.height * (newClipLevel / 100);
  };


  const resetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (camera && controls) {
      camera.position.set(
          initialContainer.width * 1.5,
          initialContainer.height * 1.5,
          initialContainer.depth * 1.5
      );
      camera.lookAt(
          initialContainer.width / 2,
          initialContainer.height / 2,
          initialContainer.depth / 2
      );
      controls.update();
    }
  };

  console.log("main threeJSTEST")

  const dispatch = useAppDispatch();

  return (
      <>
        <button onClick={()=>dispatch(setContainer3DVisualizerState(false))}> Close Container3DVisualizerPopup </button>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div
              ref={mountRef}
              style={{
                width: '500px',
                height: '500px',
                border: '1px solid #ccc',
                marginBottom: '10px',
              }}
          />
          <div style={{marginBottom: '5px', fontWeight: 'bold'}}>
            Clip Level: {clipLevel}%
          </div>
          <input
              type="range"
              min="0"
              max="100"
              value={clipLevel}
              onChange={handleClipLevelChange}
              style={{width: '300px', marginBottom: '10px'}}
          />
          <button
              onClick={resetCamera}
              style={{padding: '5px 10px', cursor: 'pointer'}}
          >
            Reset Camera
          </button>
        </div>
      </>

  );
};

export default Container3DVisualizer;
