import * as THREE from 'three'
import React, { forwardRef, useLayoutEffect, useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Preload, OrbitControls, Environment, useGLTF, Float, PivotControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'
import Loader from '../Loader';

// Auto-generated by: https://github.com/pmndrs/gltfjsx
const Spaceman = forwardRef(({ children, ...props }, ref) => {
  const { nodes, materials } = useGLTF('./spaceship/Astronaut-transformed.glb')
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      material.roughness = 0
    })
  })
  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref}
      {...props}
      geometry={nodes.Astronaut_mesh.geometry}
      material={materials.Astronaut_mat}
      material-envMapIntensity={0}
      dispose={null}>
      {children}
    </mesh>
  )
})

Spaceman.displayName = "spaceman";

// One-click copy/paste from the poimandres market: https://market.pmnd.rs/model/low-poly-spaceship
const Ship = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('./spaceship/spaceship.glb')
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      material.roughness = 0.2
    })
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials.Mat0} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_1.geometry} material={materials.Mat1} material-color="black" />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_2.geometry} material={materials.Mat2} material-envMapIntensity={0.2} material-color="black" />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_6.geometry} material={materials.Window} />
    </group>
  )
})
Ship.displayName = "spaceship";

function Cable({ start, end, v1 = new THREE.Vector3(), v2 = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(() => ref.current.setPoints(start.current.getWorldPosition(v1), end.current.getWorldPosition(v2)), [])
  return <QuadraticBezierLine ref={ref} lineWidth={3} color="#ff2060" />
}

export default function SpaceshipCanvas() {
  const spaceman = useRef()
  const ship = useRef()

  return (
    <Canvas camera={{ position: [0, 2, 3] }} className='w-[20px]'>
      <ambientLight intensity={0.2} />
      <directionalLight position={[-10, 0, -5]} intensity={5} color="#915eff" />
      <directionalLight position={[-1, -2, -5]} intensity={0.2} color="#0c8cbf" />
      <spotLight position={[5, 0, 5]} intensity={2.5} penumbra={1} angle={0.35} color="#915eff" />

      <Suspense fallback={<Loader />}>

        <Float scale={0.75} position={[0, -0.5, 0]} rotation={[0, 0.6, 0]}>
          <PivotControls anchor={[0, 0.7, 0.09]} depthTest={true} scale={0.5} lineWidth={2}>
            <Ship ref={ship} />
          </PivotControls>
        </Float>

        <Float position={[1, 0.1, -0.5]} rotation={[Math.PI / 3.5, 0, 0]} rotationIntensity={4} floatIntensity={6} speed={1.5}>
          <Spaceman scale={0.2}>
            <object3D position={[-0.6, 2, 0]} ref={spaceman} />
          </Spaceman>
        </Float>
        <Cable start={ship} end={spaceman} />
        {/* <Backdrop castShadow floor={2} position={[0, -0.5, -3]} scale={[50, 10, 4]}>
  <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
  </Backdrop> */}
        {/* <ContactShadows position={[0, -0.485, 0]} scale={5} blur={1.5} far={1} /> */}
        <Environment enableZoom={false} preset="city" />
        <OrbitControls makeDefault enableZoom={false} />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
