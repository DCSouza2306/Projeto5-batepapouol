//enviar um POST para https://mock-api.driven.com.br/api/v6/uol/participants 

const nomeUsuario = {
   name: ""
};

function pedirNome(){
    const nome = prompt("Digite o nome de usuário:");
    

    nomeUsuario.name = nome;
    console.log(nomeUsuario);
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario);

    promessa.then(usuarioValido);
    promessa.catch(usuavioInvalido);
}

function usuarioValido(resposta){
    alert('Usuário Valido');
}

function usuavioInvalido(repsosta){
    alert('Usuário Inválido, digite outro nome');
    pedirNome();
}
//////////////////////////////////////////////////////////////////////////

function usuarioConectado(resposta){
    
}

function usuarioNaoConectado(resposta){
   
}

function confirmaConexao(){

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);

    promessa.then(usuarioConectado);
    promessa.catch(usuarioNaoConectado);

}


///////////////////////////////////////////////////////////////

function carregarMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promessa.then(renderizarMensagens);
    promessa.catch(erroMensagens);
}

function renderizarMensagens(resposta){
    console.log(resposta.data);
}

function erroMensagens(resposta){
    console.log('deu erro');
}









