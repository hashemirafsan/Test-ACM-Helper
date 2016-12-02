const fetch = require('node-fetch');
var url = 'http://codeforces.com/api/user.info?handles=Ahmed_maruf';
fetch(url)
    .then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json);
    });
