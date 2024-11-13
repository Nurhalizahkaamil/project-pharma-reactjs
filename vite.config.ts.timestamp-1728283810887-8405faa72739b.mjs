// vite.config.ts
import { defineConfig } from "file:///D:/KULIAH/Magang/pharma-project-reactjs/node_modules/vite/dist/node/index.js";
import react from "file:///D:/KULIAH/Magang/pharma-project-reactjs/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///D:/KULIAH/Magang/pharma-project-reactjs/node_modules/vite-tsconfig-paths/dist/index.mjs";
import checker from "file:///D:/KULIAH/Magang/pharma-project-reactjs/node_modules/vite-plugin-checker/dist/esm/main.js";
var vite_config_default = defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      }
    })
  ],
  preview: {
    port: 5e3
  },
  server: {
    host: "0.0.0.0",
    port: 3002
  },
  base: "/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxLVUxJQUhcXFxcTWFnYW5nXFxcXHBoYXJtYS1wcm9qZWN0LXJlYWN0anNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEtVTElBSFxcXFxNYWdhbmdcXFxccGhhcm1hLXByb2plY3QtcmVhY3Rqc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovS1VMSUFIL01hZ2FuZy9waGFybWEtcHJvamVjdC1yZWFjdGpzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgcmVhY3QoKSxcclxuICAgIGNoZWNrZXIoe1xyXG4gICAgICB0eXBlc2NyaXB0OiB0cnVlLFxyXG4gICAgICBlc2xpbnQ6IHtcclxuICAgICAgICBsaW50Q29tbWFuZDogJ2VzbGludCBcIi4vc3JjLyoqLyoue3RzLHRzeH1cIicsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHByZXZpZXc6IHtcclxuICAgIHBvcnQ6IDUwMDAsXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIHBvcnQ6IDMwMDIsXHJcbiAgfSxcclxuICBiYXNlOiAnL2ludmVudG9yeScsXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStTLFNBQVMsb0JBQW9CO0FBQzVVLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGFBQWE7QUFHcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFDUixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
