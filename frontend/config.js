module.exports = {
    development: {
        ports: {
            frontend: process.env.FRONTEND_PORT || 3100,
            auth: process.env.AUTH_CFB_PORT || 3200,
            calls: process.env.CALLS_PORT || 3400
        }
    },
    production: {
        ports: {
            frontend: process.env.FRONTEND_PORT || 30200,
            auth: process.env.AUTH_CFB_PORT || 30100,
            calls: process.env.CALLS_PORT || 30120
        }
    }
}