'use strict';

const mongoose = require('mongoose');

/**
 * Product model schema.
 */
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('user', userSchema);