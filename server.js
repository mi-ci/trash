const http = require('http')
const axios = require('axios')
const cheerio = require('cheerio')

const getHtml = async () => {
  try {
    const html = await axios.get("https://www.gate.io/");
    const $ = cheerio.load(html.data);
    // console.log(typeof($("td.mantine-Table-dataItem").text()))
    const a =$("td.mantine-Table-dataItem").text().substring(10,19)
    return a
  } catch (error) {
    return null;
  }
};

const server = http.createServer((req,res)=>{
  if (req.url==='/') {
    a=getHtml()
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(a);
    res.end();
  }
})

server.listen(5004,()=>{
  console.log('5004에서 실행중')
})
