const mongoose = require('mongoose');

const { USER_MODEL } = require('../models/User');

const getUser = (req, res) => {
    const userId = req.params.userId;
    USER_MODEL.findById(userId, (err, user) => {
        user ?
            res.status(200).json({
                success: true,
                data: user
            })
            :
            res.status(404).json({
                message: "User not found",
                err: err
            })
    })
};

const registerUser = (req, res) => {
    // Validation both client and server
    const { username, password } = req.body;
    const user = new USER_MODEL({ _id: new mongoose.Types.ObjectId(), username, password });

    user.save()
        .then((newUser) => {
            res.status(201).json({
                success: true,
                data: newUser
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not register user.",
                err: err
            });
        });
};

const deleteUser = (req, res) => {
    res.status(200).json({
        message: "DEL req user"
    });
}

module.exports = {
    getUser,
    registerUser,
    deleteUser
}