import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

const Camera = () => {
    const [rotation, setRotation] = useState(0);
    
    return (
        <>
            <OrbitControls target={[0, 1, 0]} />
            <button onClick={() => {setRotation(rotation + 1)}}>회전</button>
        </>
    );
}

export default Camera;