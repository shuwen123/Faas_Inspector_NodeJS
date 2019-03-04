﻿# Faas Inspector Node JSThis is a Node JS version of the Faas Inspector framework to profile the cloud infrastructure which your code is running on, the example here will target AWS Lambda.### Getting StartedFirst of all, download the project as zip file or clone it from Git. Then put the Register.js file into the same folder of your other Node JS script for AWS Lambda.### Import the Module```const reg = require('./Register');```### AWS IO Example#### Input JSON```{	"Name": "Fred Smith"}```#### Creating an instance and getting the JSON```const myReg = new reg();let res = myReg.profileVM();```#### Output JSON```{  "cpuType": "Intel(R) Xeon(R) Processor @ 2.50GHz",  "vmuptime": 1551727835,  "uuid": "d241c618-78d8-48e2-9736-997dc1a931d4",  "newcontainer": 1,  "frameworkRuntime": 38.942128,  "name": "Fred Smith",  "message": "Hello Fred Smith from Node JS Lambda!",  "lambdaRuntime": 39.340805,  "cpuusr": "904",  "cpunice": "0",  "cpukrn": "585",  "cpuidle": "82428",  "cpuiowait": "226",  "cpuirq": "0",  "cpusoftirq": "7",  "cpusteal": "1594",}```| **Field** | **Description** || --------- | --------------- || cpuType | The CPU of the machine which your code is running on || vmuptime | This is the time at which the system booted, in seconds since the Unix epoch (January 1, 1970 )|| uuid | The unique ID we gave to the container/firecracker || newcontainer | 1 for new container/firecracker; otherwise, 0 || frameworkRuntime | The runtime/overhead of the framework || cpuusr | Normal processes executing in user mode || cpunice | Niced processes executing in user mode || cpukrn | Processes executing in kernel mode || cpuidle | Twiddling thumbs || cpuiowait | waiting for I/O to complete || cpuirq | Servicing interrupts || cpusoftirq | Servicing softirqs (Software interrupts) || cpusteal | The time a virtual CPU waits for a real CPU while the hypervisor is servicing another virtual processor |Other Version* [Java](https://github.com/wlloyduw/faas_inspector) - The Java version of Faas Inspector* [Python](https://github.com/shuwen123/FaaS_Inspector_Python) - The Python version of Faas Inspector