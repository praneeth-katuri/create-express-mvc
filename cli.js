#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const projectName = process.argv[2] || 'my-express-app';
const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, 'template', 'server');

fs.copy(templatePath, targetPath)
  .then(() => {
    console.log(`✅ Project created at: ${targetPath}`);
  })
  .catch(err => {
    console.error('❌ Failed to create project:', err);
  });
