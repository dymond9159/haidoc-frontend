// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "haidoc-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 5050",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5050,
      },
      autorestart: true,
      watch: false,
      max_memory_restart: "1024M", // Restart if memory exceeds this
      error_file: "/var/log/pm2/nextjs-error.log",
      out_file: "/var/log/pm2/nextjs-out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
}
