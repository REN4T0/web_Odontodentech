// Classes com as propriedades e métodos para lidar com os dados da consulta.

// URL para realizar as interações com a API
const url = "https://dentech-api.vercel.app"

export default class Consultas {

    constructor(data = null, horario = null, idDentista = null, status = null, idCliente = null, idServico = null) {
        this.data = data;
        this.horario = horario;
        this.idDentista = idDentista;
        this.status = status;
        this.idCliente = idCliente;
        this.idServico = idServico;
    };

    async criar(token) {
        try {

            const obj = {
                data: this.data,
                horario: this.horario,
                idDentista: this.idDentista,
                idServico: this.idServico
            };

            const req = await fetch(`${url}/consultas`, {
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

    async buscar(token, idConsulta = '', idCliente = '', idDentista = '', data = '', status = '', idServico = "") {
        try {

            const endpoints = `/consultas?idConsulta=${idConsulta}&idCliente=${idCliente}&idDentista=${idDentista}&data=${data}&status=${status}&idServico=${idServico}`

            const req = await fetch(`${url}${endpoints}`, {
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

    async status(token, id, status) {
        try {

            const obj = {
                idCliente: this.idCliente,
                idServico: this.idServico
            };

            const req = await fetch(`${url}/consultas/${id}/${status}`, {
                method: "PATCH",
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
}