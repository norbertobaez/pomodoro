

const tareas = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const add = document.querySelector("#add");
const esTarea = document.querySelector("#esTarea");
const form = document.querySelector("#form");
const nameTarea = document.querySelector("#time #nameTarea");

renderTareas();
renderTime();

form.addEventListener("submit", e=>{
    e.preventDefault();
    if(esTarea.value !== ""){
        createTarea(esTarea.value);
        esTarea.value = "";
        renderTareas();
    }
});

function createTarea(value){
    const newTarea = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false

    };

    tareas.unshift(newTarea);
}

function renderTareas(){
    const html = tareas.map(tarea =>{
        return `
            <div class = "tarea">
                  <div class = "completed">${tarea.completed ? `<span class="done">Listo!!!</span>` : `<button class="btn-inicio" data-id="${tarea.id}">Iniciar</button>` }</div>
                  <div class = "title">${tarea.title}</div>
            </div>      
        `;
    });

    const tareaContainer = document.querySelector("#tareas");
    tareaContainer.innerHTML = html.join("");

    const inicioButton = document.querySelectorAll(".tarea .btn-inicio");
    inicioButton.forEach(button =>{
        button.addEventListener("click", e =>{
         if(!timer){
            const id = button.getAttribute("data-id");
            inicioButtonHandler(id);
            button.textContent = "en progreso ...";
         }
        });
    });
}

function inicioButtonHandler (id){
    time = 5 ;
    current = id;

    const tareaIndex = tareas.findIndex((tarea) => tarea.id === id);
    nameTarea.textContent = tareas [tareaIndex].title;
    renderTime();
    timer = setInterval(() => {
        timerHandler (id);
    }, 1000);

}

function timerHandler (id){
    time-- ;
    renderTime ();

    if (time === 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTareas();
        startBreak();
    }

}

function renderTime(){
    const timeDiv = document.querySelector("#time #value");
    const minutos = parseInt ( time / 60 );
    const segundos = parseInt ( time % 60 );

    timeDiv.textContent =  ` ${minutos < 10 ? "0" : ""}${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;

}

function markCompleted(id){
    const tareaIndex = tareas.findIndex((tarea) => tarea.id === id);
    tareas [tareaIndex].completed = true;

}

function startBreak(){
    time = 5  ;
    nameTarea.textContent = "Break";
    renderTime();
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

function timerBreakHandler(){
    time-- ;
    renderTime ();

    if (time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        nameTarea.textContent = "";
        renderTareas();
        
    }
}