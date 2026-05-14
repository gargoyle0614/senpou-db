"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const sheetId =
        "1wucx2uD8I32pQkexu3lyJ7x986ZfngU6VI26hvaWTqA";

      const url = `https://opensheet.elk.sh/${sheetId}/シート1`;

      const res = await fetch(url);
      const json = await res.json();

      if (Array.isArray(json)) {
        const uniqueEnemies = Array.from(
          new Map(
            json
              .filter((item) => item.敵名)
              .map((item) => [item.敵名, item])
          ).values()
        );

        setData(uniqueEnemies);
      }
    }

    fetchData();
  }, []);

  const filtered = data.filter((item) =>
    item.敵名
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        padding: 20,
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: 30,
        }}
      >
        Project神峯寺(仮)戦報DB
      </h1>

      <input
        type="text"
        placeholder="敵名検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 14,
          fontSize: 18,
          borderRadius: 12,
          border: "1px solid #ccc",
          marginBottom: 30,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((enemy: any) => (
          <a
            key={enemy.敵名}
            href={`/enemy/${encodeURIComponent(enemy.敵名)}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 20,
              textDecoration: "none",
              color: "black",
              fontSize: 28,
              fontWeight: "bold",
              background: "#fff",
            }}
          >
            {enemy.敵名}
          </a>
        ))}
      </div>
    </main>
  );
}
