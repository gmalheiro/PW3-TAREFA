const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//MAPEAMENTO DA PASTA PUBLIC
app.use(express.static('public'));

//CONFIGURA O EJS COMO VIEW ENGINE (REDENRIZA AS PÁGINAS DE FRONT-END)
app.set('view engine', 'ejs');

app.get('',(req,res)=>{
    const urlListagemCarros = 'http://localhost:3000/listarCarros';

    axios.get(urlListagemCarros)
    .then((response)=> {
        let carros = response.data;
        res.render('carro/listagemCarros',{carros});
    });
})

app.get('/cadastroCarros',(req,res)=>{
    res.render('carro/index');
})

app.get('/listagemCarros',(req,res)=>{

    const urlListagemCarros = 'http://localhost:3000/listarCarros';

    axios.get(urlListagemCarros)
    .then((response)=> {
        let carros = response.data;
        res.render('carro/listagemCarros',{carros});
    });
});

app.get('/formEdicaoCarros/:id', (req, res)=>{
        
    let {id} = req.params;

    const urlListagemCarros = `http://localhost:3000/listarCarro/${id}`;
    
    axios.get(urlListagemCarros)
    .then(
        (response)=>{

            let carro = response.data;
            res.render('carro/editarCarro', {carro});

        }
    )
});

app.post('/alterarCarro', (req, res)=>{

    const urlAlterarCarro = 'http://localhost:3000/alterarCarro';
    console.log(req.body);

    axios.put(urlAlterarCarro, req.body)
    .then(
        res.send('ALTERADO!')
    )

});

app.get ('/deletarCarro/:id',(req, res)=>{
    let id = req.params.id;
    const urlDeletarCarro = `http://localhost:3000/excluirCarro/${id}`;
    axios.delete(urlDeletarCarro, req.body)
    .then(
        res.send('DELETADO')
)});

app.listen(3001, ()=>{
        console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});