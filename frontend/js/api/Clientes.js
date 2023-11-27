// Classes com as propriedades e métodos para lidar com os dados do cliente.

// URL para realizar as interações com a API
const url = "https://dentech-api.vercel.app"

export default class Clientes {

    constructor(nome = null, sobrenome = null, email = null, senha = null) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
    };

    async cadastrar() {

        try {

            const obj = {
                nome: this.nome,
                sobrenome: this.sobrenome,
                email: this.email,
                senha: this.senha
            }

            const req = await fetch(`${url}/clientes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            const res = await req.json();

            return res;
            
        } catch (error) {
            console.log(error);
            return false;
        }

    };

    async buscar(id, token) {

        try {

            const req = await fetch(`${url}/clientes/${id}`, {
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

    };

    async apagar(id, token) {

        try {

            const req = await fetch(`${url}/clientes/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            
        } catch (error) {
            console.log(error);
            return false;
        }

    };

    // async enviarEmail() {

    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // };

    async alterarSenha(id, novaSenha) {

        try {

            const req = await fetch(`${url}/clientes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({senha: novaSenha})
            });

            const res = await req.json();

            return res;
            
        } catch (error) {
            console.log(error);
            return false;
        }

    };


};