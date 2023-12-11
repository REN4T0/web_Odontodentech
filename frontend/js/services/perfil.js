window.addEventListener("load", async () =>{
    const nome = localStorage.getItem("nome");
    const sobrenome = localStorage.getItem("sobrenome");
    const email = localStorage.getItem("email");
    const cargo = localStorage.getItem("cargo");

    console.log(nome);
    console.log(sobrenome);
    console.log(email);
    console.log(cargo);

    const inputNome = document.querySelector("#nome");
    const inputEmail= document.querySelector("#email");
    const inputCargo = document.querySelector("#cargo");

    const caixaCargo = document.querySelector(".box-cargo")


    inputNome.value = `${nome} ${sobrenome}`;
    inputEmail.value = `${email}`;


    if(cargo != undefined){
        inputCargo.value = cargo;
    }else{
        caixaCargo.style.display = "none";
    }
})