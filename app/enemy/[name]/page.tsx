async function getData() {
  const sheetId = "1wUcx2uD8I32p0kexu31yJ7x986ZfngU6VI26hvaWTqA";
  const url = `https://opensheet.elk.sh/${sheetId}/シート1`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  return res.json();
}

export default async function EnemyPage({ params }: { params: { name: string } }) {
  const enemyName = decodeURIComponent(params.name);
  const data = await getData();

  const images = data.filter((item: any) => item.敵名 === enemyName);

  return (
    <main style={{ padding: 20 }}>
      <a href="/" style={{ display: "inline-block", marginBottom: 20 }}>
        ← 敵一覧へ戻る
      </a>

      <h1>{enemyName}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {images.map((item: any, index: number) => (
          <a key={index} href={item.画像URL} target="_blank">
            <img
              src={item.画像URL}
              alt={item.敵名}
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid #ddd",
              }}
            />
          </a>
        ))}
      </div>
    </main>
  );
}
