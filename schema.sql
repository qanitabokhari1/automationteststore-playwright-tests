-- PostgreSQL table schema for Automation Test Store Database
-- Run this script to create the users table

-- Create database (if it doesn't exist)
-- Note: CREATE DATABASE cannot be run inside a transaction block
-- Run this separately if needed:
-- CREATE DATABASE "SeleniumTestDb";

-- Connect to the database (run this in psql)
-- \c SeleniumTestDb;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample test data
INSERT INTO users (email, password, first_name, last_name) VALUES
('Qanita12', 'Qanita123', 'Qanita', 'Bokhari'),
('test@example.com', 'password123', 'Test', 'User'),
('admin@example.com', 'admin123', 'Admin', 'User')
ON CONFLICT (email) DO NOTHING;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Display the created table structure (run in psql)
-- \d users;

