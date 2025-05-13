#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const projectName = process.argv[2] || "my-express-app";
const targetPath = path.resolve(process.cwd(), projectName);
const templatePath = path.resolve(__dirname, "template", "server");

if (fs.existsSync(targetPath)) {
  console.error(`❌ Folder already exists at ${targetPath}`);
  process.exit(1);
}

fs.copy(templatePath, targetPath)
  .then(() => {
    console.log(`✅ Project created successfully at: ${targetPath}`);
    console.log(
      `📦 Installing dependencies (express, dotenv, cors, helmet, morgan)...`
    );

    // Automatically install essential packages inside the new project
    exec(
      "npm install express dotenv cors && npm install --save-dev nodemon",
      { cwd: targetPath },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Failed to install dependencies: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`⚠️ STDERR:\n${stderr}`);
        }

        console.log(stdout);
        console.log(`🚀 Setup complete! Next steps:`);
        console.log(`   cd ${projectName}`);
        console.log(
          "   do not forgot to update package.json(engine, urls, description, .. etc)"
        );
      }
    );
  })
  .catch((err) => {
    console.error("❌ Failed to create project:", err);
  });
