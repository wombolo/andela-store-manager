/* eslint-disable linebreak-style */
import pool from './db';

const Migration = {
  async migrate() {
    /* eslint-disable no-console */
    console.log('Creating table products');
    await pool.query(`create table if not exists products (id serial not null constraint products_pkey primary key,title text not null,image text,description text,price numeric(11,2) not null,quantity integer,status text default 'active'::text,cdate timestamp default now() not null);
    `);

    console.log('Creating table profiles');
    await pool.query(`
      create table if not exists profiles (
        id serial not null constraint profile_pkey primary key,
        firstname text,
        lastname text,
        email text not null,
        role text default 'store_attendant'::text,
        image text,
        password text not null
      );create unique index if not exists profile_email_uindex on profiles (email);
     `);


    console.log('Creating table sales');
    await pool.query(`
      create table if not exists sales(
        id serial not null constraint sales_pkey primary key,
        product_id integer constraint sales_products_id_fk references products on update cascade on delete cascade,
        profile_id integer constraint sales_profiles_id_fk references profiles on update cascade on delete cascade,
        title text,description text,
        price numeric(11,2),
        quantity integer,
        cdate timestamp default now() not null
      );
   `);
    await process.exit(0);
  },
};

export default Migration;

Migration.migrate();
