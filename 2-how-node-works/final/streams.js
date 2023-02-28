const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", chunk => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});

  // Solution 1 // Entire file i memory
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Solution 2 // Uses streams of read and write
  //   const readStream = fs.createReadStream("./test-file.txt"); // Read stream, reads in chunks
  //   readStream.on("data", (chunk) => {
  //     res.write(chunk); // Write stream, writes in chunks
  //   });
  //   readStream.on("end", () => {
  //     res.end();
  //   });
  //   readStream.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });
  // Solution 3 // Use pipe function to avoid back preassure which happens when write stream
  // cannot cop up with rate at which data is read
  // const readStream = fs.createReadStream("./test-file.txt");
  //readStream.pipe(res); 
