const formulaire = document.getElementById("form") as HTMLFormElement;
const inputTask = document.getElementById("inputTask") as HTMLInputElement;
const listTask = document.getElementById("listTask") as HTMLUListElement;

let isEditing = false; //pour savoir si une tache est en cours de modification

let currentTaskElement: HTMLLIElement  | null; //element de tache a modifier      
formulaire?.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputTask.value== '' || inputTask.value == null) return;

    if(isEditing && currentTaskElement ){
        currentTaskElement.firstChild!.textContent = inputTask.value;
        isEditing = false;
        currentTaskElement = null;

        // modifierTask(oldTask, inputTask.value);
    }else{
        addTask(inputTask.value, true);
        // console.log(inputTask.value);

    }

    inputTask.value = '';
})

// function pour ajouter des taches 
function addTask(taks: string, save: boolean = true) {
    // les elements li

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center mt-4";
    // li.textContent = task;
    listTask.appendChild(li);
    inputTask.value = "";

    // span
    const span = document.createElement('span')
    span.textContent = taks

    li.appendChild(span)
    // les elements button
    const button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Supprimer";
    li.appendChild(button);

    button.addEventListener("click", () => {
        listTask.removeChild(li);
        taskDelete(taks)
    })

    // buttons modifier
    const buttonModifier = document.createElement("button");
    buttonModifier.className = "btn btn-warning";
    buttonModifier.textContent = "Modifier";
    li.appendChild(buttonModifier);

    buttonModifier.addEventListener("click", () => {
        inputTask.value = taks;
        // const newTask = inputTask.value;
        isEditing = true;
        currentTaskElement = li;

        // modifierTask(taks, inputTask.value)
    })

    //sauvegarde si necessaure 
    if(save){
    saveTasks(taks)

    }
}

// sauvegarde des taches
function saveTasks(tache: string) {
    let tasks: string[] = JSON.parse(localStorage.getItem('taches') || '[]')
 if(!Array.isArray(tasks)){
    tasks = []
 }
 tasks.push(tache)

 localStorage.setItem('taches',JSON.stringify(tasks))
 console.log(tasks);
 
}

// recuperation  

function getTasks(){
    let tasks: string[] = JSON.parse(localStorage.getItem('taches') || '[]')
    if(!Array.isArray(tasks)){
       tasks = []
    }

    tasks.forEach(tache=>{
        addTask(tache,false)
    })
}

getTasks()

// fonction pour supprimr un tache dans le localStorage

function taskDelete(delTask: string){
    let tasks: string[] = JSON.parse(localStorage.getItem('taches') || '[]')
    if(!Array.isArray(tasks)){
       tasks = []
    }

    tasks = tasks.filter(tache=>{
        return tache !== delTask
    })

    localStorage.setItem('taches',JSON.stringify(tasks))
}

// fonction pour modifier dans le localStorage

function modifierTask(oldTask: string,newTask: string){
    let tasks: string[] = JSON.parse(localStorage.getItem('taches') || '[]')
    if(!Array.isArray(tasks)){
       tasks = []
    }

    tasks = tasks.map(tache=>{
        if(tache === oldTask){
            return newTask
        }else{
            return tache
        }
    })
    localStorage.setItem('taches',JSON.stringify(tasks))
}
// console.log('hello');
