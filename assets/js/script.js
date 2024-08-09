let data = [];

function renderTodo() {
  document.querySelector(".todo").innerHTML = "";

  data.forEach((task) => {
    let li = document.createElement("li");

    li.innerHTML = `
            <input type="checkbox" id="task-${task.id}">
            <label for="task-${task.id}">${task.title}</label>
            <button type="button">x</button> 
        `;

    li.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        li.classList.add("complete");
      } else {
        li.classList.remove("complete");
      }
    });

    li.querySelector("button").addEventListener("click", (e) => {
      let button = e.target;
      let li = button.parentNode;
      let input = li.querySelector("input");
      let id = input.id;
      let idArray = id.split("-");
      let todoId = idArray[1];
      let title = li.querySelector("label").innerText;

      if (confirm(`Deseja realmente excluir a tarefa ${title}?`)) {
        data = data.filter((task) => task.id !== parseInt(todoId));

        renderTodo();
      }
    });

    document.querySelector(".todo").append(li);
  });
}

document.querySelector("#new-task").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask(e.target.value);
    e.target.value = "";
  }
});

// Função para adicionar uma nova tarefa
function addTask(taskTitle) {
  const taskId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

  data.push({
    id: taskId,
    title: taskTitle,
  });

  renderTodo();
}

// Evento para o botão .btnTarefa
let btnTarefa = document.querySelectorAll(".btnTarefa");
btnTarefa.forEach((btn) => {
  btn.addEventListener("click", () => {
    const newTaskInput = document.querySelector("#new-task");
    const taskTitle = newTaskInput.value.trim();

    if (taskTitle) {
      addTask(taskTitle);
      newTaskInput.value = "";
    } else {
      alert("Por favor, digite uma tarefa.");
    }
  });
});

renderTodo();
