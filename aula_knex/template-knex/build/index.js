"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./database/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/produtos", async (request, response) => {
    let errorCode = 400;
    try {
        const busca = request.query.busca;
        if (busca) {
            const resultado = await connection_1.default.raw(`
      SELECT * FROM Produtos
      WHERE nome = "${busca}";
      `);
            response.status(200).send(resultado[0]);
        }
        const resultado = await connection_1.default.raw(`
    SELECT * FROM Produtos;
    `);
        response.status(200).send(resultado[0]);
    }
    catch (error) {
        response.status(errorCode).send(error.message);
    }
});
app.post("/produtos", async (request, response) => {
    let errorCode = 400;
    try {
        const { nome, preco, categoria } = request.body;
        if (!nome || !preco || !categoria) {
            throw new Error("Você deve passar um nome, preço e categoria para cadastrar um produto");
        }
        const novoProduto = {
            id: Number(Date.now()),
            nome: nome,
            preco: preco,
            categoria: categoria,
        };
        await connection_1.default.raw(`
  INSERT INTO Produtos( id, nome, preco, categoria)
  VALUES(${novoProduto.id}, "${novoProduto.nome}",${novoProduto.preco}, "${novoProduto.categoria}")
  `);
        response.status(200).send("Produto adicionado");
    }
    catch (error) {
        response.status(errorCode).send(error.message);
    }
});
app.put("/produtos/:id", async (request, response) => {
    let errorCode = 400;
    try {
        const id = Number(request.params.id);
        const preco = Number(request.body.preco);
        const produtos = await connection_1.default.raw(`
    SELECT *FROM Produtos 
    WHERE id = ${id};
    `);
        if (produtos[0].length === 0) {
            throw new Error("Produto não encontrado");
        }
        if (!preco) {
            throw new Error("Passe um novo preço");
        }
        await connection_1.default.raw(`
    UPDATE Produtos
    SET preco = ${preco}
    WHERE id = ${id};
    `);
        response.status(200).send("Preço alterado");
    }
    catch (error) {
        response.status(errorCode).send(error.message);
    }
});
app.delete("/produtos/:id", async (request, response) => {
    let errorCode = 400;
    try {
        const id = Number(request.params.id);
        const produtos = await connection_1.default.raw(`
    SELECT *FROM Produtos 
    WHERE id = ${id};
    `);
        if (produtos[0].length === 0) {
            throw new Error("Produto não encontrado");
        }
        await connection_1.default.raw(`
    DELETE FROM Produtos
    WHERE id = ${id};
    `);
        response.status(200).send("Produto deletado");
    }
    catch (error) {
        response.status(errorCode).send(error.message);
    }
});
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
//# sourceMappingURL=index.js.map