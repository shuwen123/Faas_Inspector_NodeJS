class Register{
    profileVM(){
        let hrst = process.hrtime();
        let vmbt = getUpTime();
        let cpuType = getVmCpuStat();
        let resArr = stampContainer();
        let myUuid = resArr[0];
        let newContainer = resArr[1];
        let hred = process.hrtime(hrst);
        let res = {
            'cpuType' : cpuType,
            'vmuptime' : vmbt,
            'uuid' : myUuid,
            'newcontainer' : newContainer,
            'frameworkRuntime' : hred[1] / 1000000
        }
        return res;
    }
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

function stampContainer(){
    let fs = require('fs');
    let myUuid = ''
    let newContainer = 1
    if (fs.existsSync('/tmp/container-id')) {
        myUuid = fs.readFileSync('/tmp/container-id', { encoding : 'utf8' });
        newContainer = 0
    } else {
        let uuidv4 = require('uuid/v4');
        myUuid = uuidv4();
        fs.writeFileSync('/tmp/container-id', myUuid);
    }
    return [myUuid, newContainer];
}
module.exports = Register;