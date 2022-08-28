//enviar um POST para https://mock-api.driven.com.br/api/v6/uol/participants 

const nomeUsuario = {
    name: ""
};



pedirNome();
let mensagens = []
function pedirNome() {
    const nome = prompt("Digite o nome de usuário:");
    nomeUsuario.name = nome;
    console.log(nomeUsuario);
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario);

    promessa.then(usuarioValido);
    promessa.catch(usuavioInvalido);
}

function usuarioValido(resposta) {
    alert('Usuário Valido');
    carregarMensagens();
}

function usuavioInvalido(repsosta) {
    alert('Usuário Inválido, digite outro nome');
    pedirNome();
}
//////////////////////////////////////////////////////////////////////////

function usuarioConectado(resposta) {

}

function usuarioNaoConectado(resposta) {

}

function confirmaConexao() {

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);

    promessa.then(usuarioConectado);
    promessa.catch(usuarioNaoConectado);

}

setInterval(confirmaConexao, 5000);

setInterval(carregarMensagens, 3000);


///////////////////////////////////////////////////////////////

function carregarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promessa.then(renderizarMensagens);
    promessa.catch(erroMensagens);
}

/*
{from: 'Emicida', to: 'Todos', text: 'entra na sala...', type: 'status', time: '06:46:30'}
*/

function renderizarMensagens(resposta) {
    mensagens = resposta.data;

    const ul = document.querySelector(".lista-mensagens");

    ul.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {

        if (mensagens[i].type === 'status') {

            ul.innerHTML = ul.innerHTML + `
        <li class="mensagem alerta-entrada">
        <span><span class="horario">${mensagens[i].time}</span><strong>${mensagens[i].from}</strong> ${mensagens[i].text}</span>
        </li>
        `;
        }

        if (mensagens[i].type === 'private_message') {
            
            ul.innerHTML = ul.innerHTML + `
            <li class="mensagem mensagem-privada">
                <span><span class="horario">${mensagens[i].time}</span><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</span>
            </li>
            `;

        } 
        if (mensagens[i].type === 'message') {
            
            ul.innerHTML = ul.innerHTML + `
            <li class="mensagem mensagem-todos">
                <span><span class="horario">${mensagens[i].time}</span><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</span>
            </li>
            `;

        }
    }
    let elementoQueQueroQueApareca = document.querySelector('ul');
    elementoQueQueroQueApareca = elementoQueQueroQueApareca.lastElementChild
    console.log(elementoQueQueroQueApareca)
    elementoQueQueroQueApareca.scrollIntoView();

}

function erroMensagens(resposta) {
    console.log('deu erro');
}



function sucessoNoEnvio(resposta){
    console.log("deu certo o envio da mensagem")
}

function erroNoEnvio(resposta){
    console.log("deu errado o envio da mensagem")
}

function enviarMensagem(){
    const mensagemEnviada = document.querySelector('textarea');

    const mensagemObjeto = {
        from: nomeUsuario.name,
        to: "Todos",
        text: mensagemEnviada.value,
        type: "message"
    }

    const envio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemObjeto);

    envio.then(carregarMensagens);
    envio.catch(erroNoEnvio);

    mensagemEnviada.value = '';

}











