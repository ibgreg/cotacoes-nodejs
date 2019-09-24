const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacoes = require('./util/cotacao');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações',
        author: 'Ítalo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Ítalo Gregório'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author : 'Ítalo'
    });
});

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        return res.status(400).json({
            error : {
                message : 'O ativo deve ser informado!',
                code : 400
            }
        });
    }

    const symbol = req.query.ativo.toUpperCase();

    cotacoes(symbol, (err, body) => {
        if (err) {
            return res.status(err.code).json({error : {
                message: err.message,
                code:  err.code
            }})
        }

        res.status(200).json(body);
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Não existe página depois de /help',
        author : 'Ítalo'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Página não encontrada',
        author : 'Ítalo'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});