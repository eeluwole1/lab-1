import "./Footer.css";

export default function Footer({ brand = "Pixell River Financial" }) {
  const year = new Date().getFullYear();
  return <footer>&copy; {brand} {year}</footer>;
}
