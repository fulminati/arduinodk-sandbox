/*!
 * arduinodk-filter
 *
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

const fu = require('nodejs-fu')
    , cliz = require('cliz')
    , foreach = require('boor').foreach
    , http = require('http')
    , EOL = require('os')

module.exports = {

    /**
     * Create new server.
     */
    createServer: function () {
        let carier = {}
        let routes = {}
        let port = 9001
        let server = http.createServer((req, res) => {
            console.log(req.url)
            carier = { status: 404, contentType: 'text/html', body: '<h1>Page not found</h1>' }
            if (typeof routes[req.url] == 'function') { let cb = routes[req.url]; cb(); }
            res.writeHead(carier.status, {'Content-Type': carier.contentType});
            res.write(carier.body);
            res.end();
        });

        server.listen(port, (err) => {
            if (err) {
                return console.log('something bad happened', err)
            }

            console.log(`server is listening on ${port}`)
        })

        server.on = (route, cb) => { routes[route] = cb }

        server.send = (status, contentType, body) => {
            carier.status = status
            carier.contentType = contentType
            carier.body = body
        }

        return server
    },

    /**
     * Read file from local system.
     *
     * @param file
     * @returns {*}
     */
    readFile: function (file) {
        return fu.readFile(file)
    }
};
