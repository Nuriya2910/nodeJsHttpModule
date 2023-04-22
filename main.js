const http = require('http');
const fs = require('fs');
const chunk = require('chunk');
const path = require('path');
const uuid = require('uuid')
const server = http.createServer((req, res) => {
    let body = []
    req.on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        let id = req.url.split("/")[1]
        if (req.url == '/' && req.method == 'GET') {

            let DATA = {
                status: 200,
                method: req.method,
                url: req.url,
                title: "All data",
                // DATA: JSON.parse(data)
            }
            fs.readFile(path.join(__dirname, 'data.json'), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    data = JSON.parse(data)
                    DATA.data = data
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    })
                    DATA = JSON.stringify(DATA)
                    res.end(DATA)
                }
            })


        }
        else if (req.url == '/' && req.method == 'POST') {
            let DATA = {
                status: 200,
                method: req.method,
                url: req.url,
                title: "DATA Added",
            }
            fs.readFile(path.join(__dirname, 'data.json'), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    data = JSON.parse(data)

                    let newUser = JSON.parse(body)
                    newUser.id = uuid.v4()
                    data.push(newUser);
                    fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            DATA.data = data
                            res.writeHead(200, {
                                "Content-Type": "application/json"
                            })
                            DATA = JSON.stringify(DATA)
                            res.end(DATA)
                        }
                    })
                }
            })
            // let newUser = JSON.parse(body)
            // console.log(data);
            // data.push(newUser)

            // data = JSON.stringify(data)
            // res.end(data)
        }
        else if (req.url.split("/")[0] == req.url.split("/")[0] && req.method == 'DELETE') {
            let DATA = {
                status: 200,
                method: req.method,
                url: req.url,
                title: "DATA Deleted",
            }
            fs.readFile(path.join(__dirname, 'data.json'), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    data = JSON.parse(data)
                    data = data.filter(item => item.id !== id)
                    fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            DATA.data = data
                            res.writeHead(200, {
                                "Content-Type": "application/json"
                            })
                            DATA = JSON.stringify(DATA)
                            res.end(DATA)
                        }
                    })
                    DATA.data = data
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    })
                    DATA = JSON.stringify(DATA)
                    res.end(DATA)
                }
            })

        }
        else if (req.url.split("/")[0] == req.url.split("/")[0] && req.method == 'PUT') {
            let DATA = {
                status: 200,
                method: req.method,
                url: req.url,
                title: "DATA UPDATE",
            }

            fs.readFile(path.join(__dirname, 'data.json'), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    data = JSON.parse(data)
                    let updateUser = JSON.parse(body)
                    updateUser.id = uuid.v4()
                    let index
                    data.forEach((item, i) => {
                        if (item.id == id) {
                            index = i;
                            
                        }
                    })
                    data.splice(index, 0, updateUser);
                    data = data.filter(item => item.id !== id)
                    fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            DATA.data = data
                            res.writeHead(200, {
                                "Content-Type": "application/json"
                            })
                            DATA = JSON.stringify(DATA)
                            res.end(DATA)
                        }
                    })
                    DATA.data = data
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    })
                    DATA = JSON.stringify(DATA)
                    res.end(DATA)
                }
            })


        }

    });

})

const PORT = 2007
server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
