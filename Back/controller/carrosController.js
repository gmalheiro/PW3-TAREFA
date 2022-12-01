const express = require('express');

const router = express.Router();

const modelCarros = require('../model/carrosModel');

router.get('/listarCarros', (req, res)=>{

    modelCarros.findAll()
        .then(
            (carros)=>{
                return res.status(200).json(carros);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados do carro',
                    erroBancoDados: erro
                });
            }
        );

});

router.get('/listarCarro/:id',(req, res)=>{

    let {id} = req.params;

    modelCarros.findByPk(id)
        .then(
            (carro)=>{
                res.status(200).json(carro);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados do carro',
                    erroBancoDados: erro
                });
            }
        );

});

router.post('/inserirCarro', (req, res)=>{
    let {nome_carro}  = req.body ;
    modelCarros.create(
        {nome_carro}
    ).then(
        ()=>{
                return res.status(201).json({
                    erroStatus: false,
                    menssagemStatus: 'Carro inserido com sucesso!'
            });
        }
    ).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao cadastrar o carro',
                        erroBancoDados: erro
                    });
        }
    );

});

router.put('/alterarCarro', (req, res)=>{

    let {id, nome_carro} = req.body;

    modelCarros.update(
        {nome_carro},
        {where:{id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Carro alterado com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao alterar o carro',
                        erroBancoDados: erro
                    });
        }
    );

});

router.delete('/excluirCarro/:id', (req, res)=>{

    let {id} = req.params;

    modelCarros.destroy(
        {where: {id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Carro excluido com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao excluir o carro',
                        erroBancoDados: erro
                    });
        }
    );

});

module.exports = router;