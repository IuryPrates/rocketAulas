const express = require('express'); // importa o expresses para o projeto (necessário ter instalado anteriormente)
const app = express(); // instancia o express dentro de app

const data = require("./data.json") // cria um "banco de dados" data e joga dentro dele o arquivo data.json
// Na prática real isso seria puxado de alguma aplicação ou banco de dados

app.get("/endpoint", function(req, res){ // cria o endpoint "./endpoint" 
    res.json(data) // ao acessar ele irá rodar a funçção de callback que trará res. Contendo as informações de data (arquivo criado acima)
})

app.get("/endpoint/:id", function(req, res){
    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    // se não existir o cliente passado como parâmetro
    if(!client)
        return res.status(401).json();
    
    // retorno do cliente encontrado
    res.json(client);
});

app.listen(3000, function(){ // inicia o servidor
    console.log("Running in port 3000")

    //console.log(data)
});