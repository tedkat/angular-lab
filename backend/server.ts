import { sleep } from "bun";

interface Thing {
  id: string;
  name: string;
  age: number;
  isAlive: boolean;
}

interface PaginatedItems<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

const THINGS: Thing[] = [
  { id: Bun.randomUUIDv7(), name: 'Thing 0', age: 20, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 1', age: 21, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 2', age: 22, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 3', age: 23, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 4', age: 24, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 5', age: 25, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 6', age: 26, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 7', age: 27, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 8', age: 28, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 9', age: 29, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 10', age: 20, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 11', age: 21, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 12', age: 22, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 13', age: 23, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 14', age: 24, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 15', age: 25, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 16', age: 26, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 17', age: 27, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 18', age: 28, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing 19', age: 29, isAlive: true },
  { id: Bun.randomUUIDv7(), name: 'Thing What', age: 100, isAlive: false },
];

function PaginatedThings(page = 1, pageSize = 10): PaginatedItems<Thing> {
  const offset = pageSize * (page - 1);
  const totalPages = Math.ceil(THINGS.length / pageSize);
  const paginatedItems = THINGS.slice(offset, pageSize * page);

  return {
    currentPage: page,
    pageSize: pageSize,
    totalPages: totalPages,
    totalItems: THINGS.length,
    items: paginatedItems,
  };
}

// proxy.ts
Bun.serve({
  port: 4000, // The port Angular will proxy TO
  routes: {
    // ( GET, DELETE or UPDATE ) The Thing!
    '/api/thing/:id': {
      GET: (req): Response => {
        const found = THINGS.find((thing) => thing.id === req.params.id);
        if (found) return Response.json(found);
        return new Response('Not Found', { status: 404 });
      },
      PUT: async (req): Promise<Response> => {
        let found = THINGS.findLastIndex((thing) => thing.id === req.params.id);
        if (found >= 0) {
          const put: Thing = await req.json() as Thing;
          THINGS[found] = { ...THINGS[found], ...put, id: req.params.id };
          return Response.json(THINGS[found]);
        }
        return new Response('Not Found', { status: 404 });
      },
      DELETE: async (req): Promise<Response> => {
        let found = THINGS.findLastIndex((thing) => thing.id === req.params.id);
        if (found >= 0) {
          THINGS.splice(found, 1);
          return new Response('', { status: 204 });
        }
        return new Response('Not Found', { status: 404 });
      },
    },
    // CREATE The Thing!
    '/api/thing': {
      POST: async (req): Promise<Response> => {
        const post: Thing = await req.json() as Thing;
        THINGS.push(post);
        return Response.json(post, { status: 201 });
      },
    },
    // Search or List all things
    '/api/things': {
      GET: async (req): Promise<Response> => {
        const url = new URL(req.url);
        // False Network jitter to show loading
        await sleep(3000);
        let searchName = url.searchParams.get('name');
        // IF something to search for  return it if found
        if (searchName != null) {
          let found = THINGS.filter(
            (thing) => thing.name.toLowerCase() === searchName.toLowerCase(),
          );
          if (found) return Response.json(found);
        } else {
          // Nothing searched so give them everything
          return Response.json(THINGS);
        }
        return new Response('Not Found', { status: 404 });
      },
    },
    '/api/paged/things': {
      GET: (req): Response => {
        const url = new URL(req.url);
        let page = url.searchParams.get('page') ?? 1;
        let pageSize = url.searchParams.get('pageSize') ?? 10;
        return Response.json(PaginatedThings(Number(page), Number(pageSize)), { status: 200 });
      },
    },
  },
  async fetch(request) {
    // Default 404 or serve static files
    console.log(`Nothing to do with ${request.url} ${await request.text()}`);
    return new Response('Not Found', { status: 404 });
  },
});
console.log('Bun proxy running on http://localhost:4000');
