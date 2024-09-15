import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useState, useRef } from "react";
import { Leva } from "leva";
import "./index.css"
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function App() {
  let audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  return (
    <KeyboardControls map={keyboardMap}>
   
        <audio className="audio-element" ref={audioRef} loop>
          <source src={"/background.mp3"} ></source>
        </audio>
        <button
        className={`speaker-button ${isMuted ? 'muted' : ''}`}
        onClick={isPlaying ? toggleMute : handlePlay}
      />
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
        style={{
          touchAction: "none",
        }}
      >
        <Leva hidden/>
        <color attach="background" args={["#10002b"]} />
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
