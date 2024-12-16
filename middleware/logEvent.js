
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const {v4 : uuid} = require('uuid')
const {format} = require('date-fns');

const logEvents = async(message)=>{
    const timedate = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`
    const id = `${uuid()}`
    const mess = `${timedate}\t${id}\t${message}}`
    console.log(mess)
    try{
        if(!fs.existsSync(path.join(__dirname, '../logs'))){
            await fsPromises.mkdir(path.join(__dirname,"../logs"));
        }
      await fsPromises.appendFile(path.join(__dirname,"../logs" , 'eventLog.txt') , mess  );
    }catch(err){
        console.log(err);
    }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
}

// const logger = (req , res , next)=>{
//     logEvents(`${req.method}\t${req.header.origin}\t${req.url}` , 'rqLog.txt');
//     console.log(` ${req.path} ${req.method} ${req.path} `)
//     next();
//   }

module.exports = { logger , logEvents} ;




