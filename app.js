const fs=require('fs')
function onRequest(req,res){
    const url=req.url;
    const method=req.method
    if(url==='/'){
  
        let array = fs.readFileSync('message.txt')
        .toString('UTF8');
         console.log(array);
        res.write('<html>')
        res.write('<head><title>My nodejs Server</title></head>')
        res.write(`<h3>${array}</h3>`)
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
         res.end()
    }
    if(url==='/message' && method==='POST'){
        const body=[]
        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const message= parsedBody.split('=')[1]
            fs.writeFileSync('message.txt',message)
        })     
        res.statusCode=302
        res.setHeader('Location','/')
         res.end()
    }
}

module.exports=onRequest;