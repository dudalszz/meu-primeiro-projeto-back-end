const express = require('express') //inicio o express
const router = express.Router() //config da primeira parte da rota
//const { v4: uuidv4 } = require('uuid'); // plugin q gera ids sem precisar de um banco de dados
const cors = require('cors') //pacote do node que permite a liberação da api para ser consumido pelo front

const conectaBancoDeDados = require('./bancoDeDados') //ligação c o arquivo onde foi feita a estrutura de conexão ao banco de dados mongodb 
conectaBancoDeDados() //chamando a função que conecta c o banco

const Mulher = require('./mulherModel') //ligação c o arquivo mulherModel, q define a regra da criação e da conexão c o banco de dados em relação ao objeto mulher
const app = express() //iniciando o app
app.use(express.json()) //liberação de trafego de dados pela request
app.use(cors()) //chamando a função para liberar a api para ser usada a partir de um front 
const porta = 3333 //criação da porta 


//lista inicial de mulheres, essa lista é excluida qnd fazemos o model para o banco de dados e apagamos ela das response.json e o response.json alterado para receber a resposta das mulheres vindas do banco de dados
/*const mulheres = [
    {
        id: '1',
        nome: 'Simara Conceição',
        imagem: 'https://media.licdn.com/dms/image/v2/C4E03AQFAcqqo2WX_8A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1563116727332?e=1737590400&v=beta&t=SBeLoYk1N9dN4wOFmXX2TVUuXaoB9ZSw-H3GJ_Oy2cA',
        minibio: 'Desenvolvedora e instrutora'
    },
    {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'https://media.licdn.com/dms/image/v2/D4D03AQH94QQ7TrKasQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1686007268307?e=1737590400&v=beta&t=hbmhs946MauSz743yIrREbR0U5pd2yht2B2IRsdzniI', 
        minibio: 'Fundadora da PrograMaria'
    },

    {
        id: '3',
        nome: 'Nina Silva',
        imagem: 'https://media.licdn.com/dms/image/v2/C5603AQFuuejw9URzWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1616715071546?e=1737590400&v=beta&t=JPBVLL_-GSEDLpaglZ1vYStjzLBN91aQRgmU9Y3QIeI', 
        minibio: 'Hacker antirracista'
    }
]*/



//GET (dps de apagar a lista inicial, começamos a transformar os verbos https em funções async)
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request,response) {
    const novaMulher = new Mulher ({
        //id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
        //envolvendo a tentativa de criação de nova mulher c try e catch
        try {
            const mullherCriada = await novaMulher.save()
            response.status(201).json(mullherCriada)
        } catch(erro) {
            console.log(erro)
        }
    //mulheres.push(novaMulher)

}

//PATCH 
async function corrigeMulher(request, response) {
    /*function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }
    }*/
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        //condicionais atualizadas após a comunicação c o banco de dados que encontra a mulher pelo id para ela ser alterada
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem) {
            mulherEncontrada.nome = request.body.imagem
        }
        if (request.body.minibio) {
            mulherEncontrada.nome = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.nome = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save() 
        response.json(mulherAtualizadaNoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }


    /*const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.imagem) {
        mulherEncontrada.nome = request.body.imagem
}


    if (request.body.minibio) {
        mulherEncontrada.nome = request.body.minibio
    }
*/

}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso!'})

    } catch(erro) {
        console.log(erro)
    }

  /*function todasMenosEla(mulher) {
    if(mulher.id !== request.params.id) {
        return mulher 
    }
  }  

  const mulheresQueFicam = mulheres.filter(todasMenosEla)
  response.json(mulheresQueFicam)*/
}

//Mostrar a porta
function mostraPorta() {
    console.log('Servidor criado e rodando na porta:', porta)
}


app.use(router.get('/mulheres', mostraMulheres)) //config da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //config da rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //config da rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //config da rota DELETE /mulheres/:id
app.listen(porta, mostraPorta) //servidor ouvindo a porta