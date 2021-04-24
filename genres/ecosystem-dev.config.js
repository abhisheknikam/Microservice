module.exports = {
    apps: [
        {
            name: 'myapp',
            script: 'npm',
            // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
            args: 'run dev',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'testing',
                MONGODB_DBNAME: 'myappDB',
                API_PORT: 3000,
                APP_NAME: 'myapp'
            }
        }
    ]
};
