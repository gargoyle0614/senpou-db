async function getData() {
  const sheetId = "1wucx2uD8I32pQkexu3lyJ7x986ZfngU6VI26hvaWTqA";
  const url = `https://opensheet.elk.sh/${sheetId}/シート1`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  const json = await res.json();

  return Array.isArray(json) ? json : [];
}

function driveImageUrl(url: string) {
  const match = url.match(/\/d\/([^/]+)/);

  if (!match) return url;

  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
}

export default async function EnemyPage({
  params,
}: {
  params: { name: string };
}) {
  const enemyName = decodeURIComponent(params.name);
  const data: any[] = await getData();

  const images = data
  .filter((item) => item.敵名 === enemyName)
  .sort((a, b) => {
    const dateA = Date.parse(a.最終更新日 || "");
    const dateB = Date.parse(b.最終更新日 || "");

    return dateB - dateA;
  });

  return (
    <main
      style={{
        padding: 20,
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <a
        href="/"
        style={{
          display: "inline-block",
          marginBottom: 20,
          textDecoration: "none",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        ← 敵一覧へ戻る
      </a>

      <h1
        style={{
          fontSize: "42px",
          marginBottom: 30,
        }}
      >
        {enemyName}
      </h1>

      {images.length === 0 && (
        <p>画像がまだありません。</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {images.map((item, index) => (
          <a
            key={index}
            href={item.画像URL}
            target="_blank"
            style={{
              display: "block",
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "0.2s",
            }}
          >
            <img
              src={driveImageUrl(item.画像URL)}
              alt={item.敵名}
              referrerPolicy="no-referrer"
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </a>
        ))}
      </div>
    </main>
  );
}
