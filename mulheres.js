const express = require('express')
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Simara Conceição',
        imagem: 'https://media.licdn.com/dms/image/v2/C4E03AQFAcqqo2WX_8A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1563116727332?e=1737590400&v=beta&t=SBeLoYk1N9dN4wOFmXX2TVUuXaoB9ZSw-H3GJ_Oy2cA',
        minibio: 'Desenvolvedora e instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://media.licdn.com/dms/image/v2/D4D03AQH94QQ7TrKasQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1686007268307?e=1737590400&v=beta&t=hbmhs946MauSz743yIrREbR0U5pd2yht2B2IRsdzniI', 
        minibio: 'Fundadora da PrograMaria'
    },

    {
        nome: 'Nina Silva',
        imagem: 'https://media.licdn.com/dms/image/v2/C5603AQFuuejw9URzWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1616715071546?e=1737590400&v=beta&t=JPBVLL_-GSEDLpaglZ1vYStjzLBN91aQRgmU9Y3QIeI', 
        minibio: 'Hacker antirracista'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta:', porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)