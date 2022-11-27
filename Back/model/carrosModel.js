/* IMPORT DO SEQUELIZE */
const Sequelize = require('sequelize');

/* IMPORT DA CONEXÃO */
const connection = require('../database/database');

const Carros = connection.define(
    'tbl_carros',
    {
        nome_carro:{
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }
);

//Carros.sync({force:true});

module.exports = Carros;




