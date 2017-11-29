const store = {}

function populateStore() {
  fetch('http://localhost:3000/lists').then(res => res.json()).then(json => addListsToStore(json))
}

function addListsToStore(json) {
  store["lists"] = json
}

function seeListData() {
  let lists = document.querySelector('.lists')
  if (lists.innerText === "") {
    let json = store.lists
    let ul = document.querySelector('.lists-ul');
    json.forEach(function(list){
      let div = document.createElement('div')
      div.id = `div-${list.id}`
      let button = document.createElement('button')
      button.id = list.id;
      button.className = "task-button";
      button.innerText = "See Tasks";
      div.appendChild(button)
      let li = document.createElement('li')
      li.innerText = list.name
      li.append(div)
      ul.appendChild(li);
    })

    lists.appendChild(ul);
  }
}

document.addEventListener('click', function(e){
  if (e.target.classList.contains('task-button')){
    return seeTasksData(e.target.id);
  }
})

function seeTasksData(id){
  const list = store.lists.find(function(list) {
    return list.id === parseInt(id);
  })
  let tasks = list.tasks
  let ul = document.createElement('ul')
  tasks.forEach(function(task) {
    ul.innerHTML += `<li> Name: ${task.name} <br>Completed: ${task.completed}</li>`
  })
  let button = document.getElementById(`div-${id}`)
  button.append(ul);
}

function createList() {
  let input = document.querySelector(".list-name").value
  let url = "http://localhost:3000/lists/"

  fetch(url, {
    method: 'post',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"list": {"name": input}})
  }).then(res => res.json()).then(json => addNewList(json))

  document.querySelector(".list-name").value = ""
}

function addNewList(json) {
  store.lists.push(json);
  let ul = document.querySelector('.lists-ul');
  let newList = document.createElement('li');

  if (ul.innerText != "") {
    let div = document.createElement('div')
    div.id = `div-${json.id}`
    let button = document.createElement('button')
    button.id = json.id;
    button.className = "task-button";
    button.innerText = "See Tasks";
    div.appendChild(button)
    let li = document.createElement('li')
    li.innerText = json.name
    li.append(div)
    ul.appendChild(li);
  }

}

populateStore()
