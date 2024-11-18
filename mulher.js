const express = require('express')
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json( {
        nome: 'Simara Conceição',
        imagem: 'https://media.licdn.com/dms/image/v2/C4E03AQFAcqqo2WX_8A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1563116727332?e=1737590400&v=beta&t=SBeLoYk1N9dN4wOFmXX2TVUuXaoB9ZSw-H3GJ_Oy2cA',
        minibio: 'Desenvolvedora e instrutora'
    })
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta:', porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)