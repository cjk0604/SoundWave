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
)



Order
- Order Id
- User id
- Album id
- loyaltyUsed (bool)
- RefundStatus (string)
- DateOfOrder
(Current date - Date of order > 3 , no refund)
