CREATE table users(
  id VARCHAR(100) PRIMARY KEY NOT NULL,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  loyal_point INT DEFAULT 0,
  is_admin INT DEFAULT 0,
  email VARCHAR(300)
);


INSERT INTO users(id, password, first_name, last_name, is_admin, email) VALUES(
  "admin", "1234", "admin", "admin", 1, "admin@gmail.com"
);
