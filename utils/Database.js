/**
 * Database - PostgreSQL database utility class
 * Handles database connections and queries for test data validation
 * 
 * Usage:
 * const Database = require('./utils/Database');
 * const db = new Database();
 * await db.connect();
 * const users = await db.queryUser(username, password);
 * await db.disconnect();
 */

const { Client } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        this.client = null;
    }

    /**
     * Connect to PostgreSQL database
     * Uses environment variables for configuration
     */
    async connect() {
        try {
            this.client = new Client({
                host: process.env.DB_HOST || '127.0.0.1',
                port: process.env.DB_PORT || 5432,
                database: process.env.DB_DATABASE || 'SeleniumTestDb',
                user: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD,
            });
            
            await this.client.connect();
            console.log('✅ Connected to PostgreSQL database');
            return this.client;
        } catch (error) {
            throw new Error(`Failed to connect to database: ${error.message}`);
        }
    }

    /**
     * Disconnect from database
     */
    async disconnect() {
        if (this.client) {
            await this.client.end();
            this.client = null;
            console.log('Database connection closed');
        }
    }

    /**
     * Query user by email and password
     * @param {string} email - User email/username
     * @param {string} password - User password
     * @returns {Promise<Array>} Array of matching users
     */
    async queryUser(email, password) {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }

        try {
            const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
            const result = await this.client.query(query, [email, password]);
            return result.rows;
        } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
        }
    }

    /**
     * Get user by email only
     * @param {string} email - User email/username
     * @returns {Promise<Array>} Array of matching users
     */
    async getUserByEmail(email) {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }

        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = await this.client.query(query, [email]);
            return result.rows;
        } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
        }
    }

    /**
     * Insert a new user into the database
     * @param {Object} userData - User data object
     * @param {string} userData.email - User email
     * @param {string} userData.password - User password
     * @param {string} userData.firstName - User first name
     * @param {string} userData.lastName - User last name
     * @returns {Promise<Object>} Inserted user record
     */
    async insertUser(userData) {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }

        try {
            const query = `
                INSERT INTO users (email, password, first_name, last_name) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *
            `;
            const result = await this.client.query(query, [
                userData.email,
                userData.password,
                userData.firstName,
                userData.lastName
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Failed to insert user: ${error.message}`);
        }
    }

    /**
     * Execute a custom SQL query
     * @param {string} query - SQL query string
     * @param {Array} params - Query parameters
     * @returns {Promise<Object>} Query result
     */
    async query(query, params = []) {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }

        try {
            const result = await this.client.query(query, params);
            return result;
        } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
        }
    }

    /**
     * Get the database client (for advanced operations)
     * @returns {Client} PostgreSQL client instance
     */
    getClient() {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.client;
    }
}

module.exports = Database;

