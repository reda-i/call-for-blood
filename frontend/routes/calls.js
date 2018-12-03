/* eslint-disable dot-notation */
module.exports = function (app, request, ports) {
    app.post('/endpoints/call/send', (req, res) => {
        const options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.calls}${process.env.CALLS_ENDPOINT}`,
            body: req.body,
            headers: {
                'authorization': req.headers['authorization']
            },
            json: true
        }

        return request.post(options, (error, response, body) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(response.statusCode).send(body);
        })
    });
}
