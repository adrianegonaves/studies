let mensagem: string = "Hello world, Adriane"
console.log(mensagem)


import prompt from "prompt";

prompt.start();
prompt.get(['username', 'email'], function (err: any, result: { username: string; email: string; }) {
 
  console.log('Command-line input received:');
  console.log('  username: ' + result.username);
  console.log('  email: ' + result.email);
});