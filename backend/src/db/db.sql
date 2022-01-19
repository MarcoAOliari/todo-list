CREATE DATABASE todolist;

CREATE TABLE todolists (
    id SERIAL,
    title VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tasks (
    id SERIAL,
    title VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
);