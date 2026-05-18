import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'

const distDir = path.resolve('dist')
const port = Number(process.env.PORT || 10000)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function resolveRequestPath(requestUrl = '/') {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname)
  return pathname === '/' ? '/index.html' : pathname
}

const server = createServer((request, response) => {
  const requestPath = resolveRequestPath(request.url)
  const candidatePath = path.resolve(path.join(distDir, `.${requestPath}`))

  if (!candidatePath.startsWith(distDir)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Forbidden')
    return
  }

  const filePath = existsSync(candidatePath) && statSync(candidatePath).isFile()
    ? candidatePath
    : path.resolve(distDir, 'index.html')

  if (!existsSync(filePath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Build output not found.')
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'

  response.writeHead(200, { 'Content-Type': contentType })
  createReadStream(filePath).pipe(response)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving dist on port ${port}`)
})
