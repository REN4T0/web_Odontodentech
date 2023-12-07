// Classes com as propriedades e métodos para lidar com os dados dos serviços.

// URL para realizar as interações com a API
const url = "https://dentech-api.vercel.app"

export default class Servicos {

    constructor(nomeServico = '', descricao = '', preco = '') {
        this.nomeServico = nomeServico;
        this.descricao = descricao;
        this.preco = preco;
    };

    async cadastrar (token) {
        try {

            const obj = {
                nomeServico: this.nomeServico,
                descricao: this.descricao,
                preco: this.preco
            };

            const req = await fetch(`${url}/servicos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
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

    async buscar (id = '', token) {
        try {

            const req = await fetch(`${url}/servicos?id=${id}`, {
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

    async editar (id, token) {
        try {

            const obj = {
                nomeServico: this.nomeServico,
                descricao: this.descricao,
                preco: this.preco
            };

            const req = await fetch(`${url}/servicos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
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

    async apagar (id, token) {
        try {

            const req = await fetch(`${url}/servicos/${id}`, {
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
    };

}