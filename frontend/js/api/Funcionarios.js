// Classes com as propriedades e métodos para lidar com os dados dos funcionários.

// URL para realizar as interações com a API
const url = "https://dentech-api.vercel.app"

export default class Funcionarios {

    constructor(nome = null, sobrenome = null, cargo = null, status = null, email = null, senha = null) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cargo = cargo;
        this.status = status;
        this.email = email;
        this.senha = senha;
    }

    async cadastrar(token) {
        try {

            const obj = {
                nome: this.nome,
                sobrenome: this.sobrenome,
                cargo: this.cargo,
                status: this.status,
                email: this.email,
                senha: this.senha,
            }

            const req = await fetch(`${url}/funcionarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            });

            const res = req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async buscar(token, id = null) {
        try {

            const req = await fetch(`${url}/funcionarios?nome=${this.nome}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            const res = await req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async buscarEspecifico(token, id) {
        try {

            const req = await fetch(`${url}/funcionarios?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            const res = await req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async editar(token, id, cargo) {

        try {

            const req = await fetch(`${url}/funcionarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ cargo: cargo })
            });

            const res = await req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async inativar(id, token) {

        try {

            const req = await fetch(`${url}/funcionarios/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            const res = await req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async resetarSenha(id, token) {
        try {

            const req = await fetch(`${url}/funcionarios/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            const res = await req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async alterarSenha(id, token, novaSenha) {
        try {

            const req = await fetch(`${url}/funcionarios/alterarsenha/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ senha: novaSenha })
            });

            const res = await req.json();

            return res;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}