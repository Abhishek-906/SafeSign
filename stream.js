

//Q Read the Lorem file using  readstream


// const fs = require('fs');
// const rs =  fs.createReadStream('./files/lorem.txt' , {encoding:'utf8'});
// rs.on('data' , (dataChunk)=>{
//     console.log(dataChunk);
// })




//Q Write content in lorem file using writestream



// const fs = require('fs');
// const ws = fs.createWriteStream('./files/lorem.txt');
// ws.write("this is new lorem");





// const fs = require('fs');
// const rs =  fs.createReadStream('./files/starter.txt' , {encoding:'utf8'});
// const ws = fs.createWriteStream('./files/lorem.txt');

// rs.on('data' , (dataChunk)=>{
//     ws.write(dataChunk);
//     console.log(dataChunk);
// })

// better way  => rs.pipe(ws); 



