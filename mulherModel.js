//criando o modelo mulher que define como vai ser aceito a entrada dos dados na api, definindo a solicitação do front e resposta do back

const mongoose = require('mongoose')


//definindo objeto do modelo MulherSchema
const MulherSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    citacao: {
        type: String,
        required: true
    },
    minibio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('diva', MulherSchema)