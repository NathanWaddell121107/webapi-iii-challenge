const express = 'express';
const userDb = require('../users/userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
    try{
        const userId = await userDb.getById(req.params.id);
        if(userId) {
            req.userId = userId;
            next();
        } else {
            res.status(404).json({
                message: 'invalid user id'
            })
        }
    }
    catch(err) {
        res.status(500).json({
            message: 'Failed to process request'
        })
        next();
    }    
};

function validateUser(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        if(req.body.name !== '') {
            next();
            res.status(400).json({
                message: 'Missing required name field'
            })
            next();
        }
    } else {
        res.status(400).json({
            message: 'Missing user data'
        })
        next();
    }
};

function validatePost(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        if(req.body.text !== '') {
            next();
            res.status(400).json({
                message: 'Missing required text field'
            })
            next();
        }
    } else {
        res.status(400).json({
            message: 'Missing post data'
        })
        next();
    }

};

module.exports = router;
