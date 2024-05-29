const btnAdicionarTask = document.querySelector(".app__button--add-task");
const formulario = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")
const ul = document.querySelector(".app__section-task-list")
const tarefas = JSON.parse(localStorage.getItem('tarefas'))

btnAdicionarTask.addEventListener("click",()=>{
    formulario.classList.toggle("hidden")
    
})

formulario.addEventListener("submit",(e) =>{
    e.preventDefault()
    console.log(e)

    const tarefa = {
        descricao : textArea.value,
    }
    tarefas.push(tarefa)
    const itemTarefa = createTask(tarefa)
    ul.appendChild(itemTarefa)
    salvarStorage()
    textArea.value = ''
    formulario.classList.add("hidden")
})


function createTask(tarefa){
    const li = document.createElement('li')
    li.classList.add("app__section-task-list-item")

    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
</svg>`
    
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao;

    const button =  document.createElement('button')
    button.classList.add('app_button-edit')
    button.onclick = () =>{
       const novadescricao = prompt("Qual é o novo nome da tarefa?")
       paragrafo.textContent = novadescricao
       tarefa.descricao = novadescricao
       salvarStorage()
       
    }


    const buttonimg = document.createElement('img')
    buttonimg.setAttribute('src','/imagens/edit.png')
    button.append(buttonimg)
    
    li.append(svg)
    li.append(paragrafo)
    li.append(button)
    return li;
}

function listTask (){
    if(tarefas.length >= 1 ){
        tarefas.forEach(e => {
            item = createTask(e)
            ul.appendChild(item)
        });
    }
}

function salvarStorage(){
    localStorage.setItem('tarefas',JSON.stringify(tarefas))

}

listTask()



