import { locales } from "@/lib/translations";
import Home from "../page";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default Home;
