const express = require('express');
const cluster = require('cluster');
const os = require('os');

const totalCPUs = os.availableParallelism();  //os.cpus().length;

if (cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });

}else{

    const app = express();
    const PORT = 8000;

    app.get('/',(req, res)=>{
        return res.json({msg:`hello from express ${process.pid} `});
    });

    app.listen(PORT,()=>{console.log(`server started at port: ${PORT}`)});
}