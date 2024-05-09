const axios = require('axios')
const cheerio = require('cheerio')

const getHtml = async () => {
  try {
    const html = await axios.get("https://www.gate.io/");
    const $ = cheerio.load(html.data);
    console.log($("td.mantine-Table-dataItem").text().substring(10,19))
    // console.log(typeof($("td.mantine-Table-dataItem").text().substring(10,19)))
    // return $("td.mantine-Table-dataItem").text().substring(10,19)
  } catch (error) {
    return null;
  }
};

getHtml();
