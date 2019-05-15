const express = require('express');
const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const addPost = postDb.insert(req.body);
        if(addPost) {
            res.status(200).json(addPost);
        } else {
            res.status(400).json({
                message: 'Post could not be added'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
});

router.post('/:id/posts', (req, res) => {
    try{
        const addUserPost = postDb.insert(req.body);
        if(addUserPost) {
            res.status(200).json(addUserPost);
        } else {
            res.status(400).json({
                message: 'Post could not be added'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await userDb.get();
        if(user.length > 0) {
            res.status(200).json(user)
        } else {
            res.status(400).json({
                message: 'Error getting users'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
});

router.get('/:id', async (req, res) => {
    try{
        const user = await userDb.getById(req.params.id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                message: 'Could not find the specified user'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
});

router.get('/:id/posts', async (req, res) => {
    try{
        const posts = await userDb.getUserPosts(req.params.id);
        if(posts.length > 0) {
            res.status(200).json(posts);
        } else {
            res.status(400).json({
                message: 'Could not find any posts for this user'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await userDb.getById(req.params.id);
        if(user) {
            userDb.remove(user);
            res.status(200).json({
                message: 'This user has been removed'
            })
        } else {
            res.status(400).json({
                message: 'Could not remove this user'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
});

router.put('/:id', async (req, res) => {
    try{
        const user = await userDb.update(req.params.id, req.body);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                message: 'this user could not be updated'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to process your request', err
        })
    }
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
