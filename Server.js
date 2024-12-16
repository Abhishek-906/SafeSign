// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const { application, response } = require('express');
// console.log("hello")

// const PORT = process.env.PORT || 3500 ;

// const serveFile = async(filePath , contentType ,  response)=>{
//     try{
//        const  data = await fsPromises.readFile(filePath , !contentType.includes('image')?'utf8' : "");
//       response.writeHead( 200 , {'contentType': contentType})
//       response.end(data);
//     }catch(err){
//       console.log(err);
//     }
// }

// const server = http.createServer((req , res)=>{
//     console.log(req.url , req.method);



// //    const extension = req.url.extension()
//     const extension = path.extname(req.url);
//    let contentType;
   
//     switch (extension) {
//         case '.css':
//           contentType='text/css' ;
//           break;
//         case '.json':
//             contentType='application/json' ;
//           break;
//         case '.png':
//           contentType='image/png' ;
//           break;
//         case '.jpeg':
//             contentType='image/jpeg';
//           break;
//         case '.css':
//           contentType='text/css' ;
//           break;
//         case '.json':
//             contentType='application/json' ;
//           break;
//         case '.js':
//             contentType='text/javascript' ;
//           break;
//         default:
//             contentType='text/html' ;
//       }   
//         let filePath = 
//                    contentType === 'text/html' && req.url === '/'
//                    ? path.join(__dirname , 'views', 'index.html')
//                    : contentType === 'text/html' && req.url.slice(-1) === '/'
//                    ? path.join(__dirname, 'views', req.url, 'index.html')
//                    : contentType === 'text/html'
//                    ? path.join(__dirname, 'views', req.url)
//                    : path.join(__dirname, req.url);


//                    if(!extension && req.url.slice(-1)!=='/') filePath+='.html';
                   
//                    const fileExists = fs.existsSync(filePath);
                          
//                    if(fileExists){
//                             serveFile(filePath , contentType , res);
//                    }else{
//                     // console.log(path.parse(filePath))
//                     switch(path.parse(filePath).base){
//                       case 'old-page.html':
//                         res.writeHead(301 , {'Location': 
//                                 '/index.html'});
//                         res.end();
//                         break ;
//                       case 'www-page.html':
//                         res.writeHead(301 , {'Location': '/'});
//                         res.end();
//                         break;
//                         default:
//                           serveFile( path.join(__dirname , "views" , '404.html') , 'text/html' , res);
//                     }
//                    }

// })

// server.listen(PORT ,()=>console.log( `Server running on port  ${PORT}`))










// const express = require('express'); 
// const path = require('path');
// const {logger , logEvents} = require('./middleware/logEvent');
// const app = express();
// const cors = require('cors')

// const router = require('./routes/subdir')


// const PORT = process.env.PORT || 3500;

// app.use('/' ,express.static(path.join(__dirname, '/Public' ,'CSS' )));
// app.use('/subdir' , express.static(path.join(__dirname, '/Public' ,'CSS' )));
// // app.use((req , res , next)=>{
// //   logEvents(`${req.method}\t${req.header.origin}\t${req.url}` , 'rqLog.txt');
// //   console.log(`${req.method} ${req.path}`)
// //   next();
// // })
// app.use(express.json());

// app.use(logger);
// app.use(cors())

// app.use('/subdir' , require('./routes/subdir'))
// app.use('/'  , require('./routes/root'));
// app.use('/employees'  , require('./routes/api/employees'));



// app.all('*' , (req , res)=>{
//   res.status(404).sendFile(path.join(__dirname , 'views' , 'index.html'));
// })


// app.listen(PORT, () => console.log(`Server running at ${PORT} `));





const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger , logEvents} = require('./middleware/logEvent');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
// const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


//middleware for cookies 
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/Public')));
app.use('/subdir', express.static(path.join(__dirname, '/Public')));

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/register' , require('./routes/register'));
app.use('/auth' , require('./routes/auth'));
app.use('/refresh' , require('./routes/refresh'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



