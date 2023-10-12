import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./App.css";
import { gsap } from "gsap";

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();

  useImperativeHandle(
    ref,
    () => {
      // return our API
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );

  useEffect(() => {
    const pulseAnimation = gsap.to(el.current, {
      scale: 1.5,
      repeat: -1,
      yoyoEase: "power3",
      duration: 1,
      autoAlpha: 0.5,
      transformOrigin: "center center",
    });
  }, []);

  return (
    <svg ref={el} width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="MediumTurquoise" />
    </svg>
  );
});

function App() {
  const circleRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRef.current.moveTo(innerWidth / 2, innerHeight / 2);
    const onMove = ({ clientX, clientY }) => {
      const { x, y, width, height } = boxRef.current.getBoundingClientRect();
      if (
        clientX > x &&
        clientX < x + width &&
        clientY > y &&
        clientY < y + height
      ) {
        circleRef.current.moveTo(clientX, clientY);
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div>
      <Circle ref={circleRef} size={100} />
      <div className="box" ref={boxRef}>
        <div className="border-2 border-[#e1e1e1] w-[600px]  h-[600px] rounded-[16px] "></div>
      </div>
    </div>
  );
}

export default App;
