"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const criarTabelaProdutos = async () => {
    try {
        await connection_1.default.raw(`
            CREATE TABLE IF NOT EXISTS Produtos (
            id BIGINT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            preco DECIMAL(8, 2) NOT NULL,
            categoria ENUM("acessórios", "calçados", "roupas") NOT NULL
            );
        `);
        console.log("Tabela Produtos criada com sucesso.");
    }
    catch (error) {
        console.log("Erro ao criar tabela Produtos.");
        console.log(error.sqlMessage);
    }
};
async function popularTabelaProdutos() {
    try {
        await connection_1.default.raw(`
            INSERT INTO Produtos (id, nome, preco, categoria)
            VALUES 
            (1, "Chinelo", 19.99, "calçados"),
            (2, "Relógio", 30.00, "acessórios"),
            (3, "Boné", 25.00, "acessórios"),
            (4, "Camiseta", 49.99, "roupas"),
            (5, "Calça", 99.00, "roupas");
        `);
        console.log("Tabela Produtos populada com sucesso.");
    }
    catch (error) {
        console.log("Erro ao popular tabela Produtos.");
        console.log(error.sqlMessage);
    }
}
criarTabelaProdutos()
    .then(() => popularTabelaProdutos())
    .finally(() => process.exit());
//# sourceMappingURL=migrations.js.map