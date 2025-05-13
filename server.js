// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const rewriteRules = {
  '/api/reports/initiatives': '/reportInitiatives/0',
  '/api/reports/packages': '/reportPackages/0',
  '/api/reports/epics': '/reportEpics/0',
  '/api/reports/gantt': '/reportGantt/0',
  '/api/reports/dependencies': '/reportDependencies/0',
  '/api/reports/capacity': '/reportCapacity/0',
  '/api/*': '/$1'
};

server.use(middlewares);

// Rewrite routes
server.use(jsonServer.rewriter(rewriteRules));

// Use router
server.use(router);

const port = 3000;
const host = '0.0.0.0';

server.listen(port, host, () => {
  console.log(`JSON Server está rodando em http://${host}:${port}`);
});
