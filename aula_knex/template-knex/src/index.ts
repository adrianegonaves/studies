import express, { Request, Response } from "express";
import cors from "cors";
import connection from "./database/connection";
import { Produto } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/produtos", async (request: Request, response: Response) => {
  let errorCode = 400;
  try {
    const busca = request.query.busca;
    if (busca) {
      const resultado = await connection.raw(`
      SELECT * FROM Produtos
      WHERE nome = "${busca}";
      `);
      response.status(200).send(resultado[0]);
    }
    const resultado = await connection.raw(`
    SELECT * FROM Produtos;
    `);

    response.status(200).send(resultado[0]);
  } catch (error: any) {
    response.status(errorCode).send(error.message);
  }
});

app.post("/produtos", async (request: Request, response: Response) => {
  let errorCode = 400;
  try {
    const { nome, preco, categoria } = request.body;

    // verificação
    if (!nome || !preco || !categoria) {
      throw new Error(
        "Você deve passar um nome, preço e categoria para cadastrar um produto"
      );
    }

    const novoProduto: Produto = {
      id: Number(Date.now()),
      nome: nome,
      preco: preco,
      categoria: categoria,
    };

    await connection.raw(`
  INSERT INTO Produtos( id, nome, preco, categoria)
  VALUES(${novoProduto.id}, "${novoProduto.nome}",${novoProduto.preco}, "${novoProduto.categoria}")
  `);
    response.status(200).send("Produto adicionado");
  } catch (error: any) {
    response.status(errorCode).send(error.message);
  }
});

app.put("/produtos/:id", async (request: Request, response: Response) => {
  let errorCode = 400;
  try {
    const id = Number(request.params.id);
    const preco = Number(request.body.preco);
    const produtos = await connection.raw(`
    SELECT *FROM Produtos 
    WHERE id = ${id};
    `);
    if (produtos[0].length === 0) {
      throw new Error("Produto não encontrado");
    }

    if (!preco) {
      throw new Error("Passe um novo preço");
    }
    await connection.raw(`
    UPDATE Produtos
    SET preco = ${preco}
    WHERE id = ${id};
    `);
    response.status(200).send("Preço alterado");
  } catch (error: any) {
    response.status(errorCode).send(error.message);
  }
});

app.delete("/produtos/:id", async (request: Request, response: Response) => {
  let errorCode = 400;
  try {
    const id = Number(request.params.id);
    const produtos = await connection.raw(`
    SELECT *FROM Produtos 
    WHERE id = ${id};
    `);
    if (produtos[0].length === 0) {
      throw new Error("Produto não encontrado");
    }

    await connection.raw(`
    DELETE FROM Produtos
    WHERE id = ${id};
    `);
    response.status(200).send("Produto deletado");
  } catch (error: any) {
    response.status(errorCode).send(error.message);
  }
});

// put com query  builder
app.put("/produtos/:id", async (request: Request, response: Response) => {
  let errorCode = 400;
  try {
    const id = Number(request.params.id);
    const preco = Number(request.body.preco);

    const produtos = await connection("Produtos")
    .select()
    .where({id})

    if (produtos.length === 0) {
      throw new Error("Produto não encontrado");
    }

    if (!preco) {
      throw new Error("Passe um novo preço");
    }

    await connection("Produtos")
    .update({preco: preco})
    .where({id:id})

    response.status(200).send("Preço alterado");
  } catch (error: any) {
    response.status(errorCode).send(error.message);
  }
});

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
