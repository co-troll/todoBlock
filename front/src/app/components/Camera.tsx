import { OrthographicCamera, SoftShadows } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const Camera = ({ clickScreenY, moveScreenY, initPosition }: { clickScreenY: number, moveScreenY: number, initPosition: number }) => {
    const [position, setPosition] = useState(8);
    const [lastScreen, setLastScreen] = useState(clickScreenY);
    const { camera } = useThree(); 

    camera.rotation.set(THREE.MathUtils.degToRad(-26.5), THREE.MathUtils.degToRad(42), THREE.MathUtils.degToRad(18.5));
    useEffect(() => {
        lastScreen > moveScreenY ? setPosition(position - 0.25) : setPosition(position + 0.25);

        setLastScreen(moveScreenY);
    }, [moveScreenY])

    SoftShadows({});
   
    return (
        <OrthographicCamera
            makeDefault
            zoom={30}
            far={1000}
            position={[20, position, 20]}
        />
    );
}

export default Camera;