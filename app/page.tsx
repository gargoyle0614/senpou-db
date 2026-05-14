async function getData() {
  const sheetId = "1wUcx2uD8I32p0kexu31yJ7x986ZfngU6VI26hvaWTqA";
  const url = `https://opensheet.elk.sh/${sheetId}/シート1`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  const json = await res.json();

  return Array.isArray(json) ? json : [];
}

export default async function Home() {
  const data: any[] = await getData();

  const uniqueEnemies = Array.from(
    new Map(
      data
        .filter((item) => item.敵名)
        .map((item) => [item.敵名, item])
    ).values()
  );

  return (
    <main style={{ padding: 20 }}>
      <h1>Project神峯寺(仮)戦報DB</h1>

      {uniqueEnemies.length === 0 && (
        <p>敵データが読み込めませんでした。</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {uniqueEnemies.map((enemy: any) => (
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
            }}
          >
            {enemy.敵名}
          </a>
        ))}
      </div>
    </main>
  );
}
