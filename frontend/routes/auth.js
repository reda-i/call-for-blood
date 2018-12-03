module.exports = (app, request, ports) => {
    app.post('/endpoints/login', (req, res) => {
        const host = process.env.NODE_ENV === 'production'
            ? process.env.AUTH_NAME
            : req.hostname;
        const options = {
            method: 'POST',
            uri: `${req.protocol}://${host}:${ports.auth}${process.env.LOGIN_ENDPOINT}`,
            body: req.body,
            json: true
        };

        return request.post(options, (error, response, body) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(response.statusCode).send(body);
        })
    });

    app.post('/endpoints/signup', (req, res) => {
        const host = process.env.NODE_ENV === 'production'
            ? process.env.AUTH_NAME
            : req.hostname;
        const options = {
            method: 'POST',
            uri: `${req.protocol}://${host}:${ports.auth}${process.env.SIGNUP_ENDPOINT}`,
            body: req.body,
            json: true
        };

        return request.post(options, (error, response, body) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(response.statusCode).send(body);
        });
    });
}