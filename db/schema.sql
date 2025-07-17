DROP DATABASE IF EXISTS marvel_u;
CREATE DATABASE marvel_u;

\connect marvel_u

DROP TABLE IF EXISTS professors;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department TEXT NOT NULL UNIQUE
);

CREATE TABLE professors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    date_of_hire DATE NOT NULL,
    profile_image_url TEXT,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);