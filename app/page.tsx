async function getData() {
  const sheetId = "1wUcx2uD8I32p0kexu31yJ7x986ZfngU6VI26hvaWTqA";
  const url = `https://opensheet.elk.sh/${sheetId}/シート1`;

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (!Array.isArray(json)) {
    return [];
  }

  return json;
}

export default async function EnemyPage({ params }: { params: { name: string } }) {
  const enemyName = params.name;
  const data: any[] = await getData();

  const images = data.filter((item) => item.敵名 === enemyName);

  return (
    <main style={{ padding: 20 }}>
      <a href="/">← 敵一覧へ戻る</a>
      <h1>{enemyName}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {images.map((item, index) => (
          <a key={index} href={item.画像URL} target="_blank">
            <img src={item.画像URL} alt={item.敵名} style={{ width: "100%", borderRadius: 12 }} />
          </a>
        ))}
      </div>
    </main>
  );
}
