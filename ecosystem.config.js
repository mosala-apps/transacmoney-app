module.exports = {
  apps: [
    {
      name: 'transacmoney-admin',
      script: 'pnpm',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 4867,
      },
    },
  ],
};
