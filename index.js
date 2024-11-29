const express = require('express'); // importa o expresses para o projeto (necessário ter instalado anteriormente)
const app = express(); // instancia o express dentro de app
app.use(express.json());
const fs = require('fs'); // persistir dados dentro do arquivo json

const data = require("./data.json") // cria um "banco de dados" data e joga dentro dele o arquivo data.json
// Na prática real isso seria puxado de alguma aplicação ou banco de dados

app.get("/users", function(req, res){ // cria o endpoint "./endpoint" 
    res.json(data) // ao acessar ele irá rodar a função de callback que trará res. Contendo as informações de data (arquivo criado acima)
})

// retorna apenas o cliente do id passado como parâmetro
app.get("/users/:id", function(req, res){
    const { id } = req.params

    //validação de id passado dentro do params
    if(isNaN(id)){
        return res.status(400).json({error: "ID inválido!"});
    }

    const client = data.find(cli => cli.id == id)

    // cliente não foi encontrado
    if (!client) {
        return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // se não existir o cliente passado como parâmetro
    if(!client)
        return res.status(401).json();
    
    // retorno do cliente encontrado
    res.json(client);
});

//post

// Atualizar dados name e email usando POST
app.post("/users/:id", function(req, res){
    const { name, email} = req.body; // salva nas constantes 'name' e 'email' os parâmetros passados dentro do body (json da requisição)

    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    if (!client) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

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

// put -> fazer o upload de um parâmetro do cliente usando PUT

app.put("/users/:id", function(req, res){
    const { name, email} = req.body; // salva nas constantes 'name' e 'email' os parâmetros passados dentro do body (json da requisição)
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID deve ser um número" });
    }

    const client = data.find(cli => cli.id == id)

    if (!client) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

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

})

// criar novo item para o arquivo json usando POST

app.post("/users", function(req, res){
    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({ error: "Parâmetros inválidos !"})
    }

    const newClient = { id: data.length + 1, name, email };
    data.push(newClient);

    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

    res.status(201).json(newClient);
})

app.listen(3000, function(){ // inicia o servidor
    console.log("Running in port 3000")

});