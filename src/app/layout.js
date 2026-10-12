import "./globals.css";

export const metadata = {
  title: "Cálculo de comisiones",
  description: "Aplicación MVC con Next.js y Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}