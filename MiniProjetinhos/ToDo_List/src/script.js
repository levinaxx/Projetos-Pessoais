const button = document.querySelector(".btn-add-task");
const input = document.querySelector(".input-task");
const completeList = document.querySelector(".list-tasks");

let listOfItems = [];

function addNewTask() {
  const newTask = input.value.trim();
  if (newTask === "") {
    alert("Você não digitou nenhuma tarefa");
    return;
  }
  const taskExists = listOfItems.some((item) => item.task === newTask);

  if (taskExists) {
    alert("Essa Tarefa ja existe");
    return;
  }

  listOfItems.push({
    task: input.value,
    complete: false,
  });

  showTasks();
}

function showTasks() {
  let newLi = "";

  listOfItems.forEach((item, index) => {
    newLi =
      newLi +
      `
        <li class="task ${item.complete && "done"}">
            <img  src="./img/check.png" alt="checked" onclick="concluirTask(${index})" />
                <p>${item.task}</p>
            <img src="./img/delete.png" alt="delete" onclick="deleteItem(${index})"/>
        </li>
        `;
  });

  completeList.innerHTML = newLi;

  localStorage.setItem("list", JSON.stringify(listOfItems));
}

function concluirTask(index) {
  listOfItems[index].complete = !listOfItems[index].complete;
  showTasks();
}

function deleteItem(index) {
  listOfItems.splice(index, 1);

  showTasks();
}

function refreshItems() {
  const taskLocalStorage = localStorage.getItem("list");

  if (taskLocalStorage) {
    listOfItems = JSON.parse(taskLocalStorage);
  }

  showTasks();
}

refreshItems();

button.addEventListener("click", addNewTask);
