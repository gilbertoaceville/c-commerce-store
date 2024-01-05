import locale from "./locale/en.json";

export default function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="w-full py-4 flex justify-center">
      <p className="text-sm">&copy; {currentDate} {locale.footerText}</p>
    </footer>
  );
}
