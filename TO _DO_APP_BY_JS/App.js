
//--------- Get data........>

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });


//--------- Form Validation........>

let formValidation = () => {

    if (textInput.value === "") {
    //   console.log("failure");
      msg.innerHTML = "* Enter Your Task *";

    } else {
    //   console.log("success");
      msg.innerHTML = "";

      acceptData();
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
  
      // (() => {
      //   add.setAttribute("data-bs-dismiss", "");
      // });

    }
  };

//--------- Accept & Store Data........>



let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  // console.log(data);
  createTasks();
};
  
    



//----------------- create Data.........>

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold text-warning">${x.text}</span>
            <span class="small text-secondary text-light">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };

//----------------- Delete Data.........>


let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    // console.log(e.parentElement.parentElement.id)
  };
//----------------- Update Data.........>
  

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
     // when we click old task remove and enter in model for edit task
}
  

//----------------- reset Data.........>

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };
  
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    // console.log(data);
    createTasks();
  })();

 