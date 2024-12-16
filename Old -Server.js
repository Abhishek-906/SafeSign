// console.log(global);
// const ab  = require('os');
// console.log(ab.type());
// console.log(ab.version());
// console.log(ab.homedir());

// console.log(__filename);
// console.log(__dirname);




// const path = require('path');

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));



// <--
// const Math = require('./Math.js');
// // or
// const {add , sub , mul} = require('./Math.js');

// console.log(Math.add(2,3));
// console.log(mul(2,3));





// const op = require('./Math.js');

// console.log(op.add(5,6));
// console.log(op.sub(5,6));









//MAKING SERVER and Listen by Node js


// const logEvents = require('./logEvent.js');
// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();

// myEmitter.on('logs', (msg) => logEvents(msg));

// setTimeout(() => {
//     myEmitter.emit('logs', 'Logs dir is created');
// }, 2000);


// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const fsPromises = require('fs').promises;  // Import fsPromises
// const EventEmitter = require('events');
// class Emitter extends EventEmitter{};

// const myEmitter = new Emitter();
// myEmitter.on('log' , (msg , fileName)=>
//     logEvents(msg , fileName));
// const PORT = process.env.PORT || 3500;

// // const serverFile = async (filePath, contentType, response) => {
// //     try {
// //         // const encoding = contentType.includes('text') ? 'utf8' : null;
// //         const data = await fsPromises.readFile(filePath, 'utf8');
// //         response.writeHead(200, { 'Content-Type': contentType });
// //         response.end(data);
// //     } catch (err) {
// //         console.log(err);
// //         response.statusCode = 500;
// //         response.end('Server Error');
// //     }
// // };

// // also write as :
// const serverFile = async (filePath, contentType, response) => {
//     try {
//         // const encoding = contentType.includes('text') ? 'utf8' : null;
//        const rawData =  await fsPromises.readFile(filePath,
//         !contentType.includes('image')? 'utf8':''
//         );
//         const data = contentType === 'application/json' ? JSON.parse(rawData):rawData ;
//         response.writeHead( filePath.includes('404.html' ) ? 404 : 200 , { 'Content-Type': contentType });
//         response.end(
//             contentType === 'application/json' ? JSON.stringify(data):data 
//         );
//     } catch (err) {
//         console.log(err);
//         myEmitter.emit('log' , `${err.name}\t${err.message}`, 'errLog.txt');
//         response.statusCode = 500;
//         response.end('Server Error');
//     }
// };

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//   myEmitter.emit('log' , `${req.url}\t${req.mathod}`, 'reqLog.txt');
//     const extension = path.extname(req.url);

//     let contentType;

//     // Set content type based on file extension
//     switch (extension) {
//         case '.css':
//             contentType = "text/css";
//             break;
//         case '.js':
//             contentType = "text/javascript";
//             break;
//         case '.json':
//             contentType = "application/json";
//             break;
//         case '.jpeg':
//             contentType = 'image/jpeg';
//             break;
//         case '.png':
//             contentType = 'image/png';
//             break;
//         case '.txt':
//             contentType = 'text/plain';
//             break;
//         default:
//             contentType = "text/html";
//     }

//     // Set file path
//     let filePath = req.url === '/' && contentType === 'text/html'
//         ? path.join(__dirname, 'views', 'index.html')
//         : req.url.slice(-1) === '/' && contentType === 'text/html'
//             ? path.join(__dirname, 'views', req.url, 'index.html')
//             : contentType === 'text/html'
//                 ? path.join(__dirname, 'views', req.url)
//                 : path.join(__dirname, req.url);

//     // If there's no extension and it's not a directory, add .html
//     if (!extension && req.url.slice(-1) !== '/') {
//         filePath += '.html';
//     }

//     const fileExists = fs.existsSync(filePath);

//     if (fileExists) {
//         serverFile(filePath, contentType, res);
//     } else {
//         switch (path.parse(filePath).base) {
//             case 'old-page.html':
//                 res.writeHead(301, { 'Location': '/new-page.html' });
//                 res.end();
//                 break;
//             case 'www-page.html':
//                 res.writeHead(301, { 'Location': '/' });
//                 res.end();
//                 break;
//             default:
//                 serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
//         }
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// --------------------------------------------------------------------- 
