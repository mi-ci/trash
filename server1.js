const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')

const getHtml = async () => {
    const html = await axios.get("https://www.gate.io/");
    const $ = cheerio.load(html.data);
    const a = $("td.mantine-Table-dataItem").text().substring(10,19)
    return a
};
const app = express();

const PORT = 5005;

app.get('/', (req, res) => {
    res.sendFile('index1.html', {root: __dirname });
});

app.get('/version', (req, res) => {
    const myVersion = getHtml()
    console.log(myVersion)
    res.json(myVersion);
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
