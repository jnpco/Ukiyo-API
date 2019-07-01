const mongoose = require('mongoose');

// MODEL IMPORT
const { THREAD_MODEL } = require('../models/thread');
// COLLECTION NAMES
const { USER_LABEL } = require('../models/user');
// ARCHIVE ALL POSTS INSIDE THREAD
const { archiveAllPosts, deleteAllPosts } = require('./post');
// TODO: Add permission requirements for ops

const getThread = (req, res) => {
    const threadId = req.params.threadId;
    THREAD_MODEL.findById(threadId)
        .populate(USER_LABEL)
        .then((thread) => {
            if (thread.archived) {
                res.status(404).json({
                    message: "Thread not found.",
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: thread
                });
            }
        }).catch((err) => {
            res.status(404).json({
                message: "Thread not found.",
                err: err
            });
        });
};

const getAllThreads = (req, res) => {
    THREAD_MODEL.find({ archived: false })
        .populate(USER_LABEL)
        .then((threads) => {
            res.status(200).json({
                success: true,
                data: threads
            });
        }).catch((err) => {
            res.status(404).json({
                message: "No threads here.",
                err: err
            });
        });
};

const createThread = (req, res) => {
    const { userId, subject } = req.body;
    const thread = new THREAD_MODEL({
        _id: new mongoose.Types.ObjectId(),
        [USER_LABEL]: userId,
        subject
    });

    thread.save()
        .then((thread) => {
            res.status(201).json({
                success: true,
                data: thread
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not create thread",
                err: err
            });
        });
};

const archiveThread = (req, res) => {
    const { threadId } = req.body;
    THREAD_MODEL.updateOne({ _id: threadId }, { $set: { "archived": true, "dateDeleted": Date.now() } })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
            archiveAllPosts(threadId);
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete thread.",
                err: err
            });
        });
};

const deleteThread = (req, res) => {
    const { threadId } = req.body;
    THREAD_MODEL.deleteOne({ _id: threadId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
            deleteAllPosts(threadId);
        }).catch((err) => {
            res.status(500).json({
                message: "Thread could not be permanently deleted.",
                err: err
            });
        });
};

module.exports = {
    getThread,
    getAllThreads,
    createThread,
    archiveThread,
    deleteThread
};