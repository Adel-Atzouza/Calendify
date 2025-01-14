import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "calendify.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
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
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "https://localhost:7258";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
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
        secure: false,
      },
      "^/Events/Approve": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/EventAttendance": {
        target: "https://localhost:5165/",
        secure: false,
      },
      "^/EventAttendance/attendances": {
        target: "https://localhost:5165/",
        secure: false,
      },
      // ✅ Voeg deze toe voor /Recommendations
      "^/Recommendations": {
        target: "https://localhost:5165/",
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
