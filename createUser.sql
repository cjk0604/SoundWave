CREATE DATABASE IF NOT EXISTS sound_wave_v3;

USE sound_wave_v3;

CREATE table users(
  username VARCHAR(100) PRIMARY KEY NOT NULL,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  loyal_point INT DEFAULT 0,
  is_admin CHAR(1) DEFAULT 'N',
  email VARCHAR(300)
);

CREATE table albums(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity INT NOT NULL,
  price DECIMAL(6,2),
  title VARCHAR(100),
  description VARCHAR(100),
  image VARCHAR(512)
);

CREATE TABLE songs(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  album_id INT,
  title VARCHAR(100),
  singer VARCHAR(100),
  file_directory VARCHAR(512),
  FOREIGN KEY(album_id) REFERENCES albums(id)
);


CREATE TABLE orders(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(100),
  album_id INT,
  loyaltyUsed CHAR(1) DEFAULT 'N',
  refund_status CHAR(1) DEFAULT 'N',
  data_of_order TIMESTAMP DEFAULT NOW(),
  price INT,
  FOREIGN KEY(album_id) REFERENCES albums(id),
  FOREIGN KEY(username) REFERENCES users(username)
);


INSERT INTO users(username, password, first_name, last_name, is_admin, email) VALUES
("admin", "admin", "admin", "admin", 'Y', "admin@gmail.com"),
("cjk123", "cjk123", "bruce", "Lee", 'N', "cjk123@gmail.com"),
("jj456", "jj456", "John", "Dave", 'N', "jj456@gmail.com"),
("gy789", "gy789", "David", "Park", 'N', "gy789@gmail.com"),
("hello", "hello", "Lucas", "Wong", 'N', "hello@gmail.com"),
("bye", "bye", "Son", "Lee", 'N', "bye@gmail.com"),
("abcd", "abcd", "Joon", "ho", 'N', "abcd@gmail.com")
;


INSERT INTO albums(quantity, price, title, description, image) VALUES
(100, 100, "Twice mini album", "2nd Album", "twice.jpg"),
(100, 100, "Beatles mini album", "1st Album", "beatles.jpg"),
(100, 100, "Queen album", "3rd Album", "queen.jpg"),
(100, 100, "Coldplay album", "4th Album", "Coldplay.jpg"),
(100, 100, "Eminem album", "5th Album", "eminem.jpg")
;


INSERT INTO songs(album_id, title, singer, file_directory) VALUES
(1, "I love you", "Twice", "examplesong1.mp3"),
(2, "example2", "Beatles", "examplesong2.mp3"),
(3, "example3", "Queen", "examplesong3.mp3"),
(4, "example4", "Queen", "examplesong4.mp3"),
(5, "example5", "Coldplay", "examplesong5.mp3"),
(1, "example6", "Eminem", "examplesong6.mp3"),
(2, "example7", "Twice", "examplesong7.mp3"),
(3, "example8", "Beatles", "examplesong8.mp3"),
(4, "example9", "Coldplay", "examplesong9.mp3"),
(5, "example10", "Eminem", "examplesong10.mp3"),
(1, "example11", "Twice", "examplesong11.mp3"),
(2, "example12", "Beatles", "examplesong12.mp3"),
(3, "example13", "Coldplay", "examplesong13.mp3")
;

INSERT INTO orders(username, album_id, price) VALUES
("cjk123", 1, 100),
("cjk123", 2, 100),
("cjk123", 3, 100),
("cjk123", 4, 100),
("jj456", 5, 100),
("jj456", 1, 100),
("jj456", 2, 100),
("gy789", 1, 100),
("gy789", 2, 100),
("hello", 3, 100),
("hello", 4, 100),
("bye", 1, 100),
("bye", 5, 100),
("abcd", 1, 100)
;
