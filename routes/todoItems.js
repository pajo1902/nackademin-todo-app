const express = require('express');
const router = express.Router();

const db = require('../database/dbSetup');

//hämta alla items
router.get('/all', async(req, res) => {
    let results = await db.find({});
    res.json(results);
});

//skapa ett nytt item
router.post('/create', async( req, res) => {
    var item = {  
        title: req.body.title, content: req.body.content, done: req.body.done
    };

    let x = await db.insert(item);
       
    res.json(x);
});

//ta bort ett item
router.delete('/delete/:id', async( req, res) => {
    var item = {  
        _id: req.params.id
    };

    await db.remove(item);
       
    res.send('The item has been deleted');
});

//uppdatera ett item
router.put('/update/:id', async( req, res) => {
    let updatedItem = {  
        title: req.body.title, content: req.body.content, done: req.body.done
    };
    await db.update({ _id: req.params.id }, updatedItem);
    
    let results = await db.findOne({ _id: req.params.id });
    res.json(results);
});

module.exports = router;