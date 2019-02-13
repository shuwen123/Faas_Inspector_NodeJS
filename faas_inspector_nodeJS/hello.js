exports.myHandler = function(event, context, callback){
    let name = event.name;
    let vmbt = getUpTime();
    let cpuType = getVmCpuStat();
    let res = {
        'name' : name,
        'message' : "Hello " + name + ", welcome to node JS!",
        'cpuType' : cpuType,
        'vmuptime' : vmbt
    }
    context.succeed(res);
}

function getUpTime(){
    // uses child process like subprocess in python.
    // with spawnSync is Sync, without Sync is Async.
    const { spawnSync } = require('child_process');
    const { StringDecoder } = require('string_decoder');
    const decoder = new StringDecoder('utf8');
    // decoded from byte object into string already.
    const child = spawnSync('grep', ['btime', '/proc/stat'], { encoding : 'utf8' });
    let res = child.stdout;
    res = res.replace('btime ', '');
    res = res.trim();
    res = parseInt(res);
    return res;
}

function getVmCpuStat(){
    // uses child process like subprocess in python.
    // with execSync is Sync, without exec is Async.
    const { execSync } = require('child_process');
    const { StringDecoder } = require('string_decoder');
    const decoder = new StringDecoder('utf8');
    // decoded from byte object into string already.
    const child = execSync('grep \'model name\' /proc/cpuinfo | head -1', { encoding : 'utf8' });
    let res = child.replace('\n','');
    res = res.replace('\t','');
    res = res.replace('model name: ', '');
    return res;
}