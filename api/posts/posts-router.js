// implement your posts router here
const express = require('express');
const db = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    })
})

router.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            });
        })
});

router.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then((post) => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: `Sorry, that post doesn't exist.`
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: `The post information could not be retrieved.`
            })
        })
});

router.post('/api/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if(!title || !contents) {
        return res.status(400).json({
            message: 'Please provide title and contents for the post.'
        })
    }
    db.insert(req.body)
        .then((newPost) => {
            res.status(201).json(newPost)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error while saving the post to the database.'
            })
            
        })
});

router.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;

    if(!title || !contents) {
        res.status(400).json({
            message: 'Post cannot be empty.'
        })
    }

    db.update(id, req.body)
        .then((post) => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: `Sorry, that post doesn't exist.`
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: `The post information could not be retrieved.`
            })
        })

})

module.exports = router;