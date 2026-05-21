import React, { useState, useRef, useEffect, useCallback } from "react";

const deepClone = (data) => {
  const result = Object.getPrototypeOf(data) === Array.prototype ? [] : {};
  for (const key of data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (value && typeof value === "object") {
        result[key] = deepClone(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

const useInterval = (fn, delay) => {
  const savedFn = useRef(fn);
  useEffect(() => {
    savedFn.current = fn;
  }, [fn]);

  useEffect(() => {
    if (delay === null) return;
    const tick = () => savedFn.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const useDebounce = (fn, delay) => {
  const timer = useRef();
  return useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
};

const useThrottle = (fn, delay) => {
  const lastTime = useRef(0);
  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastTime.current > delay) {
        fn(...args);
        lastTime.current = now;
      }
    },
    [fn, delay],
  );
};



const Demo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 定时器
  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  const click = useThrottle(() => {
    console.log("useThrottle");
  }, 500);

  // 防抖
  const log = useDebounce((val) => {
    console.log("debounce", val);
  }, 300);

  return (
    <div>
      <h2>定时器: {count}</h2>
      <input
        onChange={(e) => {
          setText(e.target.value);
          log(e.target.value);
        }}
      />
      <button onClick={click}>节流按钮</button>
    </div>
  );
};
