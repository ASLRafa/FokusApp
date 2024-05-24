const btnAdicionarTask = document.querySelector(".app__button--add-task");
const formulario = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")
const tarefas = []
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
    localStorage.setItem('tarefas',tarefas)
})