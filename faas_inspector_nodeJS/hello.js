exports.myHandler = function(event, context, callback){
    let name = event.name;
    const reg = require('./Register');
    const myReg = new reg();
    let res = myReg.profileVM();
    res['name'] = event.name;
    res['message'] = 'Hello ' + event.name + ' from Node JS Lambda!';
    context.succeed(res);
}