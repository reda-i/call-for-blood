module.exports = (app, request, ports) => {
    app.post('/endpoints/login', (req, res) => {
        const options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.auth}${process.env.LOGIN_ENDPOINT}`,
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
        const options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.auth}${process.env.SIGNUP_ENDPOINT}`,
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