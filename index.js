const express = require('express');
const axios = require('axios');
const convert = require("xml-js");
const app = express();

app.use(express.json());
const port = 3000;

app.post('/bypass', (req, res) => {
    const { body } = req;
    const { url, dataType, method, data } = body;
    if (url) {
        axios[method](url, data)
            .then(({ data }) => {
                if (dataType?.toLowerCase() === "xml" || typeof data === "string") {
                    try {                        
                        data = JSON.parse(convert.xml2json(data, { compact: true, spaces: 2 }));
                    } catch(e) {
                        res.send(e, 500);
                    }
                }
                res.send(data);
            })
            .catch(err => {
                console.log('Error: ', err.message);
                res.send(err, 500);
            });
    } else {
        res.send({
            err: "No URL to Bypass"
        });
    }
});

app.get('*', function(_req, res){
    res.send('Not found!', 404);
});

app.post('*', function(_req, res){
    res.send('Not found!', 404);
});

app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});