'use strict';

const userModel = require('../models/user');

/**
 * Stores a new user into the database.
 * @param {Object} user user object to create.
 * @throws {Error} If the user is not provided.
 */
module.exports.create = async (user) => {
    if (!user)
        throw new Error('Missing user');

    await userModel.create(user);
};

/**
 * Retrieves a user by id.
 * @param {String} id user unique identifier
*/
module.exports.getById = async (id) => {
    return userModel.findById(id);
};


/**
 * Retrieves all users.
 * 
*/
module.exports.getAll = async () => {
    return userModel.find();
};