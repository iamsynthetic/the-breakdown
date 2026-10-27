// components/TileGrid/TileGrid.tsx
import styles from "./TileGrid.module.css";

type TileGridProps = {
  columns?: 3 | 4;
  children: React.ReactNode;
};

export default function TileGrid({ columns = 4, children }: TileGridProps) {
  return (
    <section
      className={styles.tileGrid}
      style={{ "--columns": columns } as React.CSSProperties}
    >
      {children}
    </section>
  );
}
