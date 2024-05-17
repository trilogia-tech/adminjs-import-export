CREATE SCHEMA IF NOT EXISTS public;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL, -- password = sha256(text)
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE IF EXISTS public.roles;

CREATE TABLE public.roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE IF EXISTS public.permissions;

CREATE TABLE public.permissions (
        name TEXT NOT NULL PRIMARY KEY,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        constraint valid_permission_name check (name ~ '^[a-z_:]+$')
    );


INSERT INTO public.users (name, email, password) 
VALUES 
('Alice', 'alice@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92')
,('Bob', 'bob@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92')
,('Jorge', 'jorge@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92')
,('Miranda', 'miranda@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');

INSERT INTO public.roles (name) VALUES ('director'), ('manager'), ('salesman'), ('assistant');

INSERT INTO public.permissions (name) VALUES
('users:view'), ('users:create'), ('users:edit'), ('users:delete'), 
('roles:view'), ('roles:create'), ('roles:edit'), ('roles:delete'), 
('permissions:view'), ('permissions:create'), ('permissions:edit'), ('permissions:delete');
