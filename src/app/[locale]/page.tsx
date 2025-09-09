import Home from "../page";
import { languages } from "../i18n";

export const dynamicParams = false;

export function generateStaticParams() {
    return languages.map((locale) => ({ locale }));
}

export default Home;


