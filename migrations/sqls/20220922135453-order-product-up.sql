CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES product(id)
);