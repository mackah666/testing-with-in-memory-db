'use strict';

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const userService = require('../src/services/user');
const userModel = require('../src/models/user');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
// afterAll(async () => {
//     await dbHandler.closeDatabase();
// });

/**
 * user create test suite.
 */
describe('user create ', () => {
    /**
     * Tests that a valid user can be created through the userService without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => {
            await userService.create(userComplete);
        })
            .not
            .toThrow();
    });

    /**
     * Tests that a user can be created without a description.
     */
    it('can be created without description', async () => {
        expect(async () => {
            await userService.create(userMissingDescription);
        })
            .not
            .toThrow();
    });

    /**
     * user should exist after being created.
     */
    it('exists after being created', async () => {
        await userService.create(userComplete);

        const createduser = await userModel.findOne();

        expect(createduser.name)
            .toBe(userComplete.name);
    });

    /**
     * Should throw an error when user doesn't have a firstname or or lastname.
     */
    it('requires name and price', async () => {
        await expect(userService.create(userMissingFirstName))
            .rejects
            .toThrow(mongoose.Error.ValidationError);

        await expect(userService.create(userMissingLastName))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });
});

const userComplete = {
    firstname: 'kwaku',
    lastname: 'osei',
    description: 'A new dual‑camera system captures more of what you see and love. '
};

const userMissingDescription = {
    firstname: 'kwaku',
    lastname: 'osei'
};

const userMissingFirstName = {
    lastname: 'osei',
    description: 'A new dual‑camera system captures more of what you see and love. '
};

const userMissingLastName = {
    firstname: 'kwaku',
    description: 'A new dual‑camera system captures more of what you see and love. '
};