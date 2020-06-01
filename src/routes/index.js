const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const developers_json = fs.readFileSync('src/developers.json', 'utf-8');

let developers = JSON.parse(developers_json);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        developers
    });
})

router.get('/developers', (req, res) => {
    res.render('newDeveloper')
})

router.post('/developers', (req, res) => {

    const { nombres_completos, link_github, tecnologias_conocidas } = req.body;

    if (!nombres_completos || !link_github || !tecnologias_conocidas) {
        res.status(400).send('Escriba todos los campos');
        return;
    }

    const nuevas_tecnologias_conocidas = tecnologias_conocidas.split("\r\n");
    let newDeveloper = {
        id: uuid(),
        nombres_completos,
        link_github,
        tecnologias_conocidas: nuevas_tecnologias_conocidas
    };

    developers.push(newDeveloper);
    const developers_json = JSON.stringify(developers)
    fs.writeFileSync('src/developers.json', developers_json, 'utf-8');

    res.redirect('/')
})

router.delete('/developers/:id', (req, res) => {
    developers = developers.filter(developer => developer.id != req.params.id);
    const developers_json = JSON.stringify(developers)
    fs.writeFileSync('src/developers.json', developers_json, 'utf-8');

    res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    let dataId;

    for (let i = 0; i < developers.length; i++) {
        if (Number(id) === developers[i].id) {
            dataId = i;
        }

    }
    res.render('editDeveloper', { developers: developers[dataId] });
})

router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nombres_completos, link_github, tecnologias_conocidas } = req.body;
    let dataId;

    for (let i = 0; i < developers.length; i++) {
        if (Number(id) === developers[i].id) {
            dataId = i;
        }

    }
    developers[dataId].nombres_completos = nombres_completos;
    developers[dataId].link_github = link_github;
    developers[dataId].tecnologias_conocidas = tecnologias_conocidas;

    fs.writeFileSync('src/developers.json', developers_json, 'utf-8');

    res.redirect('/')
})

module.exports = router;