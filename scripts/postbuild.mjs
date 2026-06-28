// Post-build hardening: remove recon artifacts that should never be served.
// vite-react-ssg emits build manifests mid-build; we delete them from dist so
// they aren't publicly reachable (they leak the source-file graph and the
// builder's absolute local path, e.g. C:/Users/<name>/...).
import { rmSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const removed = [];

function remove(path) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    removed.push(path);
  }
}

// Vite build manifests (recon + local path disclosure).
remove("dist/.vite");

// Any stray source maps (belt-and-suspenders; build.sourcemap is false).
function stripMaps(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) stripMaps(p);
    else if (entry.endsWith(".map")) remove(p);
  }
}
stripMaps("dist");

console.log(
  removed.length
    ? `✓ postbuild: removed ${removed.length} artifact(s): ${removed.join(", ")}`
    : "✓ postbuild: nothing to remove"
);
