"use client";

import React, { useCallback, useEffect, useState } from "react";

import styles from "./RangeSlider.module.css";

const enum Side {
  Left = "left",
  Right = "right",
}

interface Props {
  min: number;
  max: number;
  gap: number;
  step: number;
}

const RangeSlider = ({ min, max, gap, step }: Props) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const progressRef = React.useRef<HTMLDivElement>(null);

  const updateProgress = useCallback(
    (value: number, side: Side) => {
      if (progressRef.current) {
        const percent = (value / max) * 100;

        if (side === Side.Right) {
          progressRef.current.style.right = 100 - percent + "%";
        } else {
          progressRef.current.style.left = percent + "%";
        }
      }
    },
    [max],
  );

  useEffect(() => {
    updateProgress(minValue, Side.Left);
  }, [minValue, updateProgress]);

  useEffect(() => {
    updateProgress(maxValue, Side.Right);
  }, [maxValue, updateProgress]);

  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return setMinValue(min);
    }

    const value = parseInt(e.target.value);

    if (maxValue - value < gap) {
      setMinValue(maxValue - gap);
    } else {
      setMinValue(value);
    }
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return setMaxValue(max);
    }

    const value = parseInt(e.target.value);

    if (value - minValue < gap) {
      setMaxValue(minValue + gap);
    } else {
      setMaxValue(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        <div className={styles.inputField}>
          <span>Min</span>
          <input
            type="number"
            step={step}
            value={minValue}
            onChange={handleMinValueChange}
          />
        </div>

        <div className={styles.inputField}>
          <span>Max</span>
          <input
            type="number"
            step={step}
            value={maxValue}
            onChange={handleMaxValueChange}
          />
        </div>
      </div>

      <div className={styles.rangeInputContainer}>
        <div className={styles.progressContainer}>
          <div ref={progressRef} className={styles.progress}></div>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          step={step}
          onChange={handleMinValueChange}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          step={step}
          onChange={handleMaxValueChange}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
