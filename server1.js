const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')

const getHtml = async () => {
    const html = await axios.get("https://www.gate.io/");
    const $ = cheerio.load(html.data);
    let a = $("td.mantine-Table-dataItem").text().substring(10,19)
    return a
};
const app = express();

const PORT = 5005;

app.get('/', (req, res) => {
    res.sendFile('index1.html', {root: __dirname });
});

app.get('/version', async (req, res) => {
    try {
        const myVersion = await getHtml();  // Wait for the promise to resolve
        console.log(myVersion);  // Now myVersion is a string, not a Promise
        res.json({ version: myVersion });
    } catch (error) {
        console.error(error);  // Log the error if something goes wrong
        res.status(500).json({ error: 'Failed to fetch version' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
