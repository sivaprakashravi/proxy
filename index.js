const express = require('express');
const axios = require('axios');
const convert = require("xml-js");
const app = express();

app.use(express.json());
const port = 3000;

app.post('/bypass', (req, res) => {
    const {body} = req;
    if (body?.url) {
        axios.get(body?.url)
            .then(data => {
                data = JSON.parse(convert.xml2json(data, {compact: true, spaces: 2}));
                res.send({data});
            })
            .catch(err => {
                console.log('Error: ', err.message);
                res.send({err});
            });
    } else {
        res.send({
            err: "No URL to Bypass"
        });
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});