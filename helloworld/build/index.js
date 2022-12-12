"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let mensagem = "Hello world, Adriane";
console.log(mensagem);
const prompt_1 = __importDefault(require("prompt"));
prompt_1.default.start();
prompt_1.default.get(['username', 'email'], function (err, result) {
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
});
//# sourceMappingURL=index.js.map