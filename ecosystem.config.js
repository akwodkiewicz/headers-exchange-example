module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/main.js',
      exec_mode: 'cluster',
      instances: '2',
    },
  ],
};
