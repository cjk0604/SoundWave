CREATE table albums(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity INT NOT NULL,
  price DECIMAL(6,2),
  title VARCHAR(100),
  description VARCHAR(100),
  image VARCHAR(100)
);

CREATE TABLE songs(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  album_id INT,
  title VARCHAR(100),
  singer VARCHAR(100),
  FOREIGN KEY(album_id) REFERENCES albums(id)
);
