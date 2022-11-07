const fs = require('fs')

async function appendFile(filePath, content) {
  const data = await fs.readFileSync(filePath, 'utf8').split('\n')
  data.splice(3, 0, content)
  fs.writeFileSync(filePath, data.join('\n'), 'utf8')
}
async function replaceFile(filePath,sourceRegx,targetStr){
  try {
    const data = await fs.readFileSync(filePath)
    let str = data.toString();
    str = str.replace(sourceRegx,targetStr);
    await fs.writeFileSync(filePath, str);
  } catch (e) {
    console.log(e)
  }

}
fs.readdir('./output', async function(err,files){
  if(err){
    return err;
  }
  if(files.length !=0){
    files.forEach((item)=>{
      let path = './output/'+item;
      fs.stat(path,async function(err,status){
        if(err){
          return err;
        }
        let isFile = status.isFile();
        let isDir = status.isDirectory();
        if(isFile){
            await replaceFile(path,/SPDX\-License\-Identifier\:/g,"");
            await appendFile(path, "// SPDX-License-Identifier: MIT");
        }
        if(isDir){
          console.log("dir："+item);
        }
      });
    });
  }
});

