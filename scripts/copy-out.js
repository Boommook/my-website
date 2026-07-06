const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "out");
const target =
  process.env.DEPLOY_DIR ||
  path.join(__dirname, "..", "deploy", "~boommook", "out");

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory not found: ${src}`);
    console.error("Run next build first.");
    process.exit(1);
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
}

copyRecursive(source, target);
console.log(`Copied ${source} -> ${target}`);
