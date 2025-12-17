-- Dans l'onglet "SQL" de phpMyAdmin
CREATE DATABASE IF NOT EXISTS tableau_tva;
USE tableau_tva;

CREATE TABLE produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    libelle VARCHAR(100) NOT NULL,
    prix_ht DECIMAL(10,2) NOT NULL,
    tva DECIMAL(4,2) NOT NULL,
    prix_ttc DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO produits (libelle, prix_ht, tva, prix_ttc) VALUES
('Gomme', 10.00, 20.00, 12.00),
('Crayon', 2.00, 5.50, 2.11),
('Livre', 12.00, 5.50, 12.66);