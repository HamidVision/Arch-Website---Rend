#!/usr/bin/env node

/**
 * Preflight script for development environment
 * Runs before dev, test, and script commands
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Running preflight checks...');

// Check if required directories exist
const requiredDirs = [
  'src',
  'public',
  'src/components',
  'src/app',
  'public/brand',
  'public/icons/ui'
];

let allChecksPassed = true;

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Missing required directory: ${dir}`);
    allChecksPassed = false;
  }
});

// Check if required files exist
const requiredFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'public/brand/logo-loading.svg',
  'public/icons/ui/logo-header.svg'
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    allChecksPassed = false;
  }
});

if (allChecksPassed) {
  console.log('✅ Preflight checks passed');
  process.exit(0);
} else {
  console.error('❌ Preflight checks failed');
  process.exit(1);
}
