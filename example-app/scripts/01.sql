CREATE SCHEMA IF NOT EXISTS public;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL, -- password = sha256(text)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE IF EXISTS public.roles;

CREATE TABLE public.roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


INSERT INTO public.users (name, email) VALUES ('Alice', 'alice@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO public.users (name, email) VALUES ('Bob', 'bob@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO public.users (name, email) VALUES ('Jorge', 'jorge@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO public.users (name, email) VALUES ('Miranda', 'miranda@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');

INSERT INTO public.roles (name) VALUES ('director'), ('manager'), ('salesman'), ('assistant');
