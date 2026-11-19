CREATE DATABASE IF NOT EXISTS lancheria;
USE lancheria;

-- CLIENTES
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PEDIDOS
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    pago BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'pendente',
    observacao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- ITENS DO PEDIDO
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,

    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
        ON DELETE CASCADE
);

-- ADICIONAIS
CREATE TABLE adicionais_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_pedido_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (item_pedido_id) REFERENCES itens_pedido(id)
        ON DELETE CASCADE
);

-- PRODUTOS DO CARDÁPIO
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- ADICIONAIS DISPONÍVEIS
CREATE TABLE adicionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- PRODUTOS DO SEU CARDÁPIO ATUAL
INSERT INTO produtos (nome, descricao, preco) VALUES
('X-BURGUER', 'pao de 20cm, tomate, cebola, ovo, cheddar e salada', 15.00),
('X-calota', 'pao de 40cm, ovo, cheddar, salada, tomate, carne da casa', 65.00),
('cachorro quente', 'pao de 15cm, salsicha, salada, ervilha, tomate, queijo', 20.00);

-- ADICIONAIS ATUAIS
INSERT INTO adicionais (nome, preco) VALUES
('Bacon', 4.00),
('Ovo extra', 2.00),
('Queijo extra', 3.00);