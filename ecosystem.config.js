module.exports = {
  apps: [{
    name: 'step-website',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Logging
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    
    // Process management
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    restart_delay: 4000,
    
    // Health check
    health_check_grace_period: 30000,
    health_check_timeout: 5000,
    
    // Advanced PM2 features
    min_uptime: '10s',
    max_restarts: 10,
    
    // Environment-specific settings
    node_args: '--max_old_space_size=1024'
  }],

  deploy: {
    production: {
      user: 'deployer',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/step-website.git',
      path: '/var/www/step-website',
      'pre-deploy': 'git reset --hard',
      'post-deploy': 'npm install && npm run build && npm run db:push && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'npm install pm2 -g'
    }
  }
};