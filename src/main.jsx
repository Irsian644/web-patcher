import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

// vite-react-ssg drives both client hydration and static prerendering.
export const createRoot = ViteReactSSG({ routes });
