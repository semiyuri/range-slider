import styles from "./page.module.css";

import RangeSlider from "@/components/RangeSlider/RangeSlider";

export default function Home() {
  return (
    <main className={styles.main}>
      <RangeSlider min={0} max={1000} gap={100} step={10} />
    </main>
  );
}
