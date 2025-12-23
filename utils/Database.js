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
            const config = {
                host: process.env.DB_HOST || '127.0.0.1',
                port: parseInt(process.env.DB_PORT || 5432),
                database: (process.env.DB_DATABASE || 'PalywrightTestDb').trim() + ' ',
                user: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD,
            };

            console.log('🔍 Database Connection Config:', {
                host: config.host,
                port: config.port,
                database: config.database,
                user: config.user
            });

            this.client = new Client(config);
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

    getClient() {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.client;
    }
}

module.exports = Database;

