const express = require('express');

const router = express.Router();

const modelCarro = require('../model/carrosModel');

router.get('listarCarro', (req, res)=>{

    modelCarro.findAll()
        .then(
            (carros)=>{
                return res.status(200).json(carros);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados de carro',
                    erroBancoDados: erro
                });
            }
        );

});

router.get('listarCarro/:id',(req, res)=>{

    let {id} = req.params;

    modelCarro.findByPk(id)
        .then(
            (carro)=>{
                res.status(200).json(carro);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados de carro',
                    erroBancoDados: erro
                });
            }
        );

});

router.post('/inserirCarro', (req, res)=>{
    let {nome_carro} = req.body;
    console.log(nome_carro);
    
    modelCarro.create(
        {nome_carro}
    ).then(
        ()=>{
                return res.status(201).json({
                    erroStatus: false,
                    menssagemStatus: 'carro inserida com sucesso!'
            });
        }
    ).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao cadastrar a carro',
                        erroBancoDados: erro
                    });
        }
    );

});

router.put('alterarCarro', (req, res)=>{

    let {id, nome_carro} = req.body;

    modelCarro.update(
        {nome_carro},
        {where:{id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'carro alterada com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao alterar a carro',
                        erroBancoDados: erro
                    });
        }
    );

});

router.delete('/excluircarro/:id', (req, res)=>{

    let {id} = req.params;

    modelCarro.destroy(
        {where: {id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'carro excluida com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao excluir a carro',
                        erroBancoDados: erro
                    });
        }
    );

});

module.exports = router;