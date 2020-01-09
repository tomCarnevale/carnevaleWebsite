import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Tilt from 'react-tilt'

export default class Diorama extends React.Component {
    render() {
        return (
            <div className="diorama">

                <Tilt className="canvasTilt" options={{ max: 25 }}  >
                    <div className="Tilt-inner">
                        Some Text

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        <Canvas resize={{scroll: false}}>
                            <SpinnyBox />
                        </Canvas>
                    </div>
                </Tilt>
            </div>
        )
    }
}

function SpinnyBox() {
    const ref = useRef()
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
    return (
        <mesh
            ref={ref}
            position={[0, 0, 3]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}