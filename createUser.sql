CREATE table users(
  username VARCHAR(100) PRIMARY KEY NOT NULL,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  loyal_point INT DEFAULT 0,
  is_admin CHAR(1) DEFAULT 'N',
  email VARCHAR(300)
);


INSERT INTO users(username, password, first_name, last_name, is_admin, email) VALUES(
  "admin", "admin", "admin", "admin", 'Y', "admin@gmail.com"
);
