export const metadata = {
  title: "戦報DB",
  description: "Project神峯寺(仮)戦報DB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
