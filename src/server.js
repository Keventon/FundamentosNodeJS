import http from "node:http";

import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

//Query Parameters: Servem para modificar a resposta do backend (URL Stateful => Filtros, paginação, não-obrigatórios).
//Route Parameters: Identificação de recurso (geralmente utilizado para identificar um usuário).
//Request Body: Envio de informações de um formulário no corpo da requisição (NÃO FICA NA URL).

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});

server.listen(3333);
