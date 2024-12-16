const {format} = require('date-fns')
const {v4:uuidv4} = require('uuid')
const path = require('path');
const { existsSync } = require('fs');
const fsPromises = require('fs').promises;
const fs = require('fs');
const wr = fs.createWriteStream('./logs/eventLog.txt');
// const wr;
const func = async(message)=>{
    
        if(!existsSync('./logs/eventLog.txt')){
              fs.createWriteStream('./logs/eventLog.txt');
        }
    //  const path = path.join(__dirname , 'logs' , 'eventLog.txt');
     const date = format(new Date() , "dd-MM-yyyy");
     const uuid = uuidv4();
    const data = `${date} ${uuid} ${message} `;

    fs.writeFile(path.join(__dirname , 'logs' , 'eventLog.txt') , (data) , (err)=>{
        if(err){
             console.log('error h' , err)
        }else{
            console.log("done it")
        }
    })

    
}
 
module.exports= {func}