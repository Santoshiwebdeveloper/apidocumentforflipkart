let os = require('os');
console.log(os.platform());//wt os u r using
console.log(os.arch());//wt bytes of os is using
console.log(`${os.cpus().length} core`);//no of cpus in sys
console.log(os.uptime());//this many sec the sys is up
console.log(os.freemem());//wt is the free memory, by using os package u can get the information
//of user system