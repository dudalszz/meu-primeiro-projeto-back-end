const mongoose = require('mongoose') //fazendo a intrgração do projeto c o banco de dados mongodb utilizando o pacote mongoose
require('dotenv').config() //chamando o pacote dotenv para proteger a string de conexão c o banco de dados

async function conectaBancoDeDados() {
    try {
        console.log('Conexão com o banco de dados iniciou')

    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conexão com o banco de dados feita com sucesso!')

    } catch(erro) {
        console.log(erro)
    }

}

module.exports = conectaBancoDeDados