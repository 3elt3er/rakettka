import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const dataDir = resolve(__dirname, 'data');
const scheduleFile = resolve(dataDir, 'schedule.json');
const port = Number(process.env.PORT || 4174);
const adminToken = process.env.ADMIN_TOKEN || '';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const fallbackSchedule = {
  items: [
    {
      id: 'default-adult-monday',
      type: 'adultGroup',
      dayId: 'monday',
      time: '19:00',
      duration: 90,
      level: 'Средний',
      coach: 'Тренер клуба',
      price: '1500 ₽',
    },
    {
      id: 'default-child-tuesday',
      type: 'childGroup',
      dayId: 'tuesday',
      time: '17:00',
      duration: 60,
      level: 'Начальный',
      coach: 'Тренер клуба',
      price: '1000 ₽',
    },
    {
      id: 'default-tournament-thursday',
      type: 'tournament',
      dayId: 'thursday',
      time: '20:00',
      level: 'MAX 150',
    },
    {
      id: 'default-adult-saturday',
      type: 'adultGroup',
      dayId: 'saturday',
      time: '12:00',
      duration: 90,
      level: 'Любой уровень',
      coach: 'Тренер клуба',
      price: '1500 ₽',
    },
  ],
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

function isAuthorized(request) {
  if (!adminToken) {
    return true;
  }

  return request.headers['x-admin-token'] === adminToken;
}

async function readRequestJson(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
    const size = chunks.reduce((total, item) => total + item.length, 0);
    if (size > 1024 * 1024) {
      throw new Error('Payload is too large');
    }
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function normalizeSchedule(payload) {
  const items = Array.isArray(payload.items) ? payload.items : [];

  return {
    items: items.map((item) => ({
      id: String(item.id || `activity-${Date.now()}`),
      type: String(item.type || 'adultGroup'),
      dayId: String(item.dayId || 'monday'),
      time: String(item.time || '10:00'),
      duration: Number(item.duration) || 60,
      level: String(item.level || ''),
      coach: String(item.coach || ''),
      price: String(item.price || ''),
    })),
  };
}

async function readSchedule() {
  try {
    const rawSchedule = await readFile(scheduleFile, 'utf8');
    return normalizeSchedule(JSON.parse(rawSchedule));
  } catch {
    await mkdir(dataDir, { recursive: true });
    await writeFile(scheduleFile, JSON.stringify(fallbackSchedule, null, 2), 'utf8');
    return fallbackSchedule;
  }
}

async function writeSchedule(payload) {
  const schedule = normalizeSchedule(payload);
  await mkdir(dataDir, { recursive: true });
  await writeFile(scheduleFile, JSON.stringify(schedule, null, 2), 'utf8');
  return schedule;
}

async function handleScheduleApi(request, response) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === 'GET') {
    sendJson(response, 200, await readSchedule());
    return;
  }

  if (request.method === 'PUT') {
    if (!isAuthorized(request)) {
      sendJson(response, 401, { error: 'Unauthorized' });
      return;
    }

    const payload = await readRequestJson(request);
    sendJson(response, 200, await writeSchedule(payload));
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed' });
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const rawPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const resolvedPath = normalize(resolve(join(distDir, rawPath)));

  if (!resolvedPath.startsWith(distDir)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const fileStat = await stat(resolvedPath);
    if (!fileStat.isFile()) {
      throw new Error('Not a file');
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[extname(resolvedPath)] || 'application/octet-stream',
    });
    createReadStream(resolvedPath).pipe(response);
  } catch {
    const indexPath = join(distDir, 'index.html');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(indexPath).pipe(response);
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === '/api/schedule') {
      await handleScheduleApi(request, response);
      return;
    }

    await serveStatic(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message || 'Internal server error' });
  }
});

server.listen(port, () => {
  console.log(`Rakettka server is running on http://localhost:${port}`);
  console.log(adminToken ? 'Schedule admin API is protected by ADMIN_TOKEN.' : 'Schedule admin API is open locally.');
});
