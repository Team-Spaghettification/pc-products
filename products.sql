use sdcproducts;

drop table if exists productsJCTstyles;

create table product (
  id int primary key,
  name varchar(500) not null,
  slogan varchar(500) not null,
  description varchar(1500) not null,
  category varchar(100),
  default_price varchar(100)
);

create table styles (
  style_id int primary key,
  product_id int,
  name varchar(500),
  sale_price varchar(25),
  original_price int,
  default_style int,
  foreign key (product_id)
    references product(id)
);

create table related (
  id int,
  current_product_id int,
  related_product_id int,
  foreign key (current_product_id)
    references product(id),
  foreign key (related_product_id)
    references product(id)
);

  create table features (
  id int,
  product_id int,
  feature varchar(50),
  value varchar(50),
  foreign key (product_id)
    references product(id)
);

create table photos (
  id int,
  style_id int,
  url varchar(2500),
  thumbnail_url varchar(2500),
  foreign key (style_id)
    references styles(id)
);

create table skus (
  id int,
  style_id int,
  size varchar(100),
  quantity int,
  foreign key (style_id)
    references styles(id)
);

/* create table productJCTstyles (
  id int not null auto_increment,
  product_id int,
  style_id int,
  primary key(id, product_id, style_id),
  foreign key (product_id) references product(id),
  foreign key (style_id) references styles(id)
);
 */