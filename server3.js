const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')

const getHtml = async () => {
    const html = await axios.get("https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=%EB%82%A0%EC%94%A8&tqi=iB2LHdqVbVGsshWX4oossssssQZ-422208&query=%EC%B2%9C%ED%98%B8%EB%8F%99+%EB%82%A0%EC%94%A8");
    // const html = await axios.get("https://www.binance.com/en/futures/BTCUSDT");
    const $ = cheerio.load(html.data);
    // let a = $("span.celsius:first").text()
    // let a = $("div.blind").first().prop('nextSibling').nodeValue.trim();
    let a = $("span.blind").eq(3).prop('nextSibling').nodeValue;
    // let a = $("title").text();
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
