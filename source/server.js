const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8403;
const indexPath = path.join(__dirname, 'site', 'index.html')
const fs = require('fs');
const jsdom = require("jsdom");
const moment = require('moment');
const _ = require('lodash');
const axios = require('axios');

app.get('/', async function (req, res, next) {
    let index = fs.readFileSync(indexPath, "utf8");
    const node = new jsdom.JSDOM(index);

    return res.status(200).send(node.serialize());
});

app.use(express.static(path.join(__dirname, 'site')));

app.listen(port);

console.log(`Project information${_.padStart('', 50)}`)
console.log(``)
console.log(`┌────────────────────┬──────────────────────────────────────────────────┐`)
console.log(`│ Time               │ ${moment().toISOString()}${_.padStart('|', 26)}`)
console.log(`│ Hots               │ http://127.0.0.1:${port}${_.padStart('|', 29)}`)
console.log(`│ Edition            │ Community${_.padStart('|', 41)}`)
console.log(`└────────────────────┴──────────────────────────────────────────────────┘`)
console.log(``)
console.log(` Actions available${_.padStart('', 50)}`)
