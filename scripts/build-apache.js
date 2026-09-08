const { execSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");

process.env.NEXT_PUBLIC_DEPLOY_TARGET = "limey";

const run = (command) => {
  execSync(command, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
};

run("npm run build");
run("node scripts/copy-out.js");
