const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const host = "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function resolveTarget(urlPath) {
  const cleanPath = urlPath === "/" ? "/index.html" : urlPath;
  const target = path.normalize(path.join(rootDir, cleanPath));

  if (target.indexOf(rootDir) !== 0) {
    return null;
  }

  return target;
}

http
  .createServer((request, response) => {
    const target = resolveTarget(request.url.split("?")[0]);
    if (!target) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(target, (error, data) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500);
        response.end(error.code === "ENOENT" ? "Not found" : "Server error");
        return;
      }

      const extension = path.extname(target).toLowerCase();
      response.writeHead(200, {
        "Content-Type": mimeTypes[extension] || "application/octet-stream"
      });
      response.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Reports Globe available at http://${host}:${port}`);
  });
