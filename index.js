const express = require('express');
const app = express();

//Verbos HTTP
// GET: Recebe dados do resource
// POST: Enviar dados ou informações para serem processados por um Resource
// PUT: Atualizar os dados de um Resource
// DELETE: Deletar um Resource

// Resource -> endpoint

/* 
express

app.get()
app.post()
app.put()
app.delete()
*/

app.get("/endpoint", function(req, res){
    
})

app.listen(3000, function(){
    console.log("Running in port 3000")
});