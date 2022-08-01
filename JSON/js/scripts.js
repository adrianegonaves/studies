const objs = [
  {
    nome: "Adriane",
    idade: 30,
    esta_trabalhando: true,
    profissao: {
      profissao: "desenvolvedora",
      empresa: "minhaTech",
    },
    filmes: ["casa blanca", "Hot Summer Nights", "Thor: O Mundo Sombrio"],
  },
  {
    nome: "Pedro",
    idade: 28,
    esta_trabalhando: false,
    profissao: {
      profissao: null,
      empresa: null,
    },
    filmes: ["casa blanca", "Hot Summer Nights", "Thor: O Mundo Sombrio"],
  },
];
console.log(objs)
// JSON
//converter objeto para JSON
const jsonData =JSON.stringify(objs)
console.log(jsonData)
//check o tipo
console.log(typeof jsonData)

// converter JSON para objeto
const objData= JSON.parse(jsonData)
console.log(objData)
//check o tipo
console.log(typeof objData)

objData.map ((pessoa) => {
    console.log(pessoa.nome)
    console.log(pessoa.profissao)
})