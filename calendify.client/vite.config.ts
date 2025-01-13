<<<<<<< HEAD
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ''
=======
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
>>>>>>> origin/Mark
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = 'calendify.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
<<<<<<< HEAD
      'dotnet',
      ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
      { stdio: 'inherit' }
    ).status
  ) {
    throw new Error('Could not create certificate.');
=======
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" }
    ).status
  ) {
    throw new Error("Could not create certificate.");
>>>>>>> origin/Mark
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
<<<<<<< HEAD
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'https://localhost:7258';
=======
    ? env.ASPNETCORE_URLS.split(";")[0]
    : "https://localhost:7258";
>>>>>>> origin/Mark

// 🔥 Voeg hier de proxy toe voor EventAttendance
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
<<<<<<< HEAD
      '@': fileURLToPath(new URL('./src', import.meta.url)),
=======
      "@": fileURLToPath(new URL("./src", import.meta.url)),
>>>>>>> origin/Mark
    },
  },
  server: {
    proxy: {
<<<<<<< HEAD
      '/EventAttendance': {
        target: target, // Dit target wordt automatisch ingesteld op jouw backend URL
        secure: false,
        changeOrigin: true,
      },
      '^/pingauth': {
        target: 'https://localhost:5165/',
        secure: false,
      },
      '^/register': {
        target: 'https://localhost:5165/v2/',
        secure: false,
      },
      '^/login': {
        target: 'https://localhost:5165/',
        secure: false,
      },
      '^/logout': {
        target: 'https://localhost:5165/',
        secure: false,
      },
      '^/v2/settings': {
        target: 'https://localhost:5165/',
        secure: false,
      },
      '^/manage/2fa': {
        target: 'https://localhost:5165/',
=======
      "^/pingauth": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/register": {
        target: "https://localhost:5165/v2/",
        secure: false,
      },
      "^/login": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/logout": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/v2/settings": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/manage/2fa": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/Events/Events": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/Events": {
        target: "https://localhost:5165/",
>>>>>>> origin/Mark
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
