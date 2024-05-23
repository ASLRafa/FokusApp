const html = document.querySelector("HTML");
const focobt = document.querySelector(".app__card-button--foco")
const curtobt = document.querySelector(".app__card-button--curto")
const longobt = document.querySelector(".app__card-button--longo")
const tempoNaTela = document.querySelector("#timer")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const musicafocoinput = document.querySelector("#alternar-musica")
const startPause = document.querySelector("#start-pause")
const startPauseimg = document.querySelector("#start-pause img")
const startPausebtn = document.querySelector("#start-pause span")
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const endSound = new Audio('sons/beep.mp3')


musica.loop = true
play.volume = 0.5;
pause.volume = 0.2;
endSound.volume = 0.4
let tempoDecorrido = 1500;
let intervaloID = null

function exibeTempo(){
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

function changebg(){
    focobt.addEventListener("click",()=>{
        alterarcontexto('foco',`Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa</strong>`,1500);
    focobt.classList.add('active')
    })
    curtobt.addEventListener("click",()=>{
        alterarcontexto('descanso-curto',`Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!</strong>`,300);
    curtobt.classList.add('active')
    })
    longobt.addEventListener("click",()=>{
        alterarcontexto('descanso-longo',`Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`,900);
    longobt.classList.add('active')
    })
}


function alterarcontexto(contexto,texto,temporizador){
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    tempoDecorrido = temporizador;
    exibeTempo()
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    titulo.innerHTML = `${texto}`
}


function player(){
    musicafocoinput.addEventListener("change", () =>{

        musica.volume = 0.3;
        if (musica.paused){
            musica.play()
        }else{
            musica.pause()
        }
    })
}

const contagemRegressiva = () =>{
    if (tempoDecorrido <= 0){
        endSound.play()
        alert("finalizado");
        zerar();
        return;
    }
    tempoDecorrido -= 1
    exibeTempo()
}


function iniciarPause(){
    if(intervaloID){
        zerar()
        pause.play()
        startPausebtn.textContent = "Começar"
        startPauseimg.setAttribute("src",`/imagens/play_arrow.png`)
        return;
    }
    play.play()
    intervaloID = setInterval(contagemRegressiva,1000)
    startPauseimg.setAttribute("src",`/imagens/pause.png`)
    startPausebtn.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloID)
    intervaloID = null
}

startPause.addEventListener("click",iniciarPause)


changebg()
player()
exibeTempo()