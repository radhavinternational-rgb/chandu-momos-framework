import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 4174);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.zip': 'application/zip',
  '.pdf': 'application/pdf'
};

const server = createServer((req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost');
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const relative = normalize(pathname).replace(/^[/\\]+/, '') || 'index.html';
  const target = join(root, relative);

  // Directory traversal prevention
  if (target !== root && !target.startsWith(root + sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  let stats;
  try {
    stats = statSync(target);
    if (!stats.isFile()) throw new Error('Not a file');
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
    return;
  }

  const ext = extname(target).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const fileName = relative.split(/[/\\]/).pop() || 'download';
  const isDownload = parsedUrl.searchParams.has('download');

  const baseHeaders = {
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*'
  };

  if (isDownload) {
    baseHeaders['Content-Disposition'] = `attachment; filename="${fileName}"`;
  }

  const range = (req.headers.range || '').match(/^bytes=(\d*)-(\d*)$/);
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : stats.size - 1;

    if (start > end || end >= stats.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` }).end();
      return;
    }

    res.writeHead(206, {
      ...baseHeaders,
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Content-Length': end - start + 1
    });

    if (req.method === 'HEAD') {
      res.end();
    } else {
      createReadStream(target, { start, end }).pipe(res);
    }
    return;
  }

  res.writeHead(200, {
    ...baseHeaders,
    'Content-Length': stats.size
  });

  if (req.method === 'HEAD') {
    res.end();
  } else {
    createReadStream(target).pipe(res);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\n🥟 Chandu Momos preview server running at:`);
  console.log(`   ➜ Local: http://localhost:${port}/\n`);
});
