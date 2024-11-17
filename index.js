const express = require('express'); // importa o expresses para o projeto (necessário ter instalado anteriormente)
const app = express(); // instancia o express dentro de app
app.use(express.json());

const data = require("./data.json") // cria um "banco de dados" data e joga dentro dele o arquivo data.json
// Na prática real isso seria puxado de alguma aplicação ou banco de dados

app.get("/endpoint", function(req, res){ // cria o endpoint "./endpoint" 
    res.json(data) // ao acessar ele irá rodar a função de callback que trará res. Contendo as informações de data (arquivo criado acima)
})

// retorna apenas o cliente do id passado como parâmetro
app.get("/endpoint/:id", function(req, res){
    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    // se não existir o cliente passado como parâmetro
    if(!client)
        return res.status(401).json();
    
    // retorno do cliente encontrado
    res.json(client);
});

//post

app.post("/endpoint/:id", function(req, res){
    const { name, email} = req.body; // salva nas constantes 'name' e 'email' os parâmetros passados dentro do body (json da requisição)

    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    //validação de formato de nome e email
    if(!name || !email){
        return res.status(400).json({ error: "Nome/email são obrigatórios!!"})
    }
    
    const emailVerified = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailVerified.test(email)){
        return res.status(400).json({error: "Email inválido! "});
    }

    client.name = name;
    client.email = email;

    res.status(200).json(client);

});

// put -> fazer o upload de um parâmetro do cliente

app.put("/endpoint/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
    // se não existir o cliente passado como parâmetro
    if(!client) return res.status(401).json();

    const { name } = req.body;

    client.name = name;

    res.json(client);

})

app.listen(3000, function(){ // inicia o servidor
    console.log("Running in port 3000")

    //console.log(data)
});