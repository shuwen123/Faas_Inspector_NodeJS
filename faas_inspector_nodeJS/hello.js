exports.myHandler = function(event, context, callback){ 
    let hrst = process.hrtime();
    let name = event.name;
    const reg = require('./Register');
    const myReg = new reg();
    let res = myReg.profileVM();
    res['name'] = event.name;
    res['message'] = 'Hello ' + event.name + ' from Node JS Lambda!';
    let hred = process.hrtime(hrst);
    res['lambdaRuntime'] = hred[1] / 1000000;
    context.succeed(res);
}