const Sequelize = require('sequelize');

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




