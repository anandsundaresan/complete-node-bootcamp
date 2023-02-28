const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
});

console.log("Hello from the top-level code");

/*
Hello from the top-level code // Top Level Code --> Can happen in any order
Timer 1 finished  // Top Level Code --> Can happen in any order
Immediate 1 finished  // Top Level Code --> Can happen in any order
I/O finished // Top Level Code in callback
---------------- // Top Level Code in callback
Process.nextTick // Part of the microtask queue, so executes before any phase in the tick
Immediate 2 finished 
Timer 2 finished // Timer 2 is expected to run first but event loop pauses in polling phase when there is nothing to run in callback which causes setImmediate to run first
// crypto module is always offloaded to thread pool. Since process.env.UV_THREAD_POOL_SIZE = 4 all
all 4 threads took almost same time to run
1329
1374
1394
1410
// process.env.UV_THREADPOOL_SIZE = 2 means that two threads will be running at the same time
// If we use crypto.pdkdf2Sync, it will be blocking event loop
1581
3090
4314
5470
Timer 3 finished
*/
