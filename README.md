
# Aula básica sobre API's Restful

RESTFUL é a aplicação dos padrões REST

## Boas práticas

- Utilizar verbos HTTP para as requisições;
- Utilizar plural ou singular na criação dos endpoints? _NÃO_IMPORTA!_ use o mesmo padrão;
- Não deixar barra "/" no final do endpoint;
- Nunca deixe o cliente sem resposta;

## Verbos HTTP 

- GET: Receber dados de um Resource;
- POST: Enviar dados ou informações para serem processados por um Resource;
- PUT: Atualizar dados de um Resource;
- DELETE: Deletar um Resource;

## Status das respostas

- 1xx: informação
- 2xx: Sucesso
    - 200: Ok
    - 201: Created
    - 204: Não tem conteúdo PUT/POST/DELETE
- 3xx: Redirection
- 4xx: cliente error
    - 400: Bad request
    - 404: Not found
- 5xx: Server error
    - 500: Internal Server Error