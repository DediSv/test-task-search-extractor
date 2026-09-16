const express = require('express');

const app = express();
const PORT = 12345;

app.use(express.static(__dirname));

//app.get('/', function (req, res) {
//    res.send('Server is working');
//});

app.listen(PORT, function () {
    console.log(`Server is running on http://localhost: ${PORT}`);
    });