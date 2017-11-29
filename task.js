function seeLists() {
  fetch('http://localhost:3000/lists').then(res => res.json()).then(json => seeListData(json))
}

function seeListData(json) {
  let ul = document.createElement('ul');
  json.forEach(function(list){
    let div = document.createElement('div')
    div.id = `div-${list.id}`
    let button = document.createElement('button')
    button.id = list.id;
    button.className = "task-button";
    button.innerText = "See Tasks";
    div.appendChild(button)
    ul.innerHTML +=  `<li> ${list.name}</li>`;
    ul.appendChild(div);
  })
  let lists = document.querySelector('.lists')
  lists.appendChild(ul);

}

document.addEventListener('click', function(e){
  if (e.target.classList.contains('task-button')){
    return seeTasks(e.target.id);
  }
})

function seeTasks(id){
  url = "http://localhost:3000/lists/" + id
  fetch(url).then(res => res.json()).then(json => seeTasksData(json))
}

function seeTasksData(json){
  const tasks = json.tasks
  let ul = document.createElement('ul')
  tasks.forEach(function(task) {
    ul.innerHTML += `<li> Name: ${task.name} <br>Completed: ${task.completed}</li>`
  })
  let button = document.getElementById(`div-${json.id}`)
  button.append(ul);
}
