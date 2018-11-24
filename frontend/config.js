module.exports = {
    development: {
        ports: {
            frontend: process.env.FRONTEND_PORT | 3100,
            auth: process.env.AUTH_PORT | 3200
        }
    },
    production: {
        ports: {
            frontend: 30200,
            auth: 30100
        }
    }
}