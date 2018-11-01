/* eslint-disable linebreak-style */
import pool from './db';

const Seed = {
  async seedr() {
    /* eslint-disable no-console */
    console.log('Dumping table products');
    await pool.query(`
      INSERT INTO products (title, image, description, price, quantity, status, cdate) VALUES 
        ('Things fall apart', 'default_pix.png', 'Book written by Chinua Achebe', 42.00, 3, 'active', '2018-10-31 14:21:26.517019'),
        ('Moonlight', 'default_pix.png', 'Book written by Chinua Achebe', 42.00, 3, 'active', '2018-10-31 14:21:26.517019'),
        ('Close Call', 'default_pix.png', 'Book written by Chinua Achebe', 42.00, 3, 'active', '2018-10-31 14:21:26.517019');
    `);


    console.log('Dumping table profiles');
    await pool.query(`
      INSERT INTO profiles (firstname, lastname, email, role, image, password) VALUES 
        ('Akano', 'Ade', 'abati1.cole@ini.net', 'admin', 'images/pix1.png', '$2b$08$.8MyBoCqVYe58KKG0vlMHuW7LFLoaKdYJJw0LttRZm5UFi2iiMoyC'),
        ('Marilyn', 'Cole', '0.61mary.cole@ini.net', 'admin', 'images/pix2.png', '$2b$08$XeG/JxMxMhh2K1xNv5Rsp.DeUaefk6zm1cVwh7hp98E7kDxiRmSq2'),
        ('Ella', 'Mari', 'mary.cole@ini.net', 'store_attendant', 'images/pix10.png', '$2b$08$XeG/JxMxMhh2K1xNv5Rsp.DeUaefk6zm1cVwh7hp98E7kDxiRmSq2');
    `);


    console.log('Dumping table sales');
    await pool.query(`
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 22:40:17.871464');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 22:54:18.169689');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 22:57:29.032253');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 22:59:45.889629');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 23:00:42.191778');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 23:03:37.450926');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 23:04:46.900825');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 23:07:06.864819');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 23:08:07.585420');
      INSERT INTO sales (product_id, profile_id, title, description, price, quantity, cdate) VALUES (2, 3, 'Things fall apart', 'Book written by Chinua Achebe', 42.00, 3, '2018-10-31 23:08:38.010604');
    `);
  },
};

export default Seed;

Seed.seedr();