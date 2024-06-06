import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This will allow Vite to listen on all IP addresses, including the host
    port: 5173, // Optional, can specify the port if you want to change it
  },
});
