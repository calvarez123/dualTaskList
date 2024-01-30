document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    init();
}

function init() {
    // Cargar la lista al iniciar la aplicación
    loadTaskList();

    $("#addTask").click(addTask);
}

function addTask() {
    var taskName = prompt("¿Qué tienes que hacer?");
    if (taskName.trim() !== "") {
        var newElem = $('<li>' + taskName +
            '<button class="editButton" data-icon="edit" data-iconpos="notext">Edit</button>' +
            '<button class="deleteButton" data-icon="delete" data-iconpos="notext">Delete</button></li>');

        $('ul').append(newElem).listview('refresh');


        // Guardar la lista cada vez que se agrega una tarea
        updateAndSaveTaskList();
    }
}

function updateAndSaveTaskList() {
    // Obtener la lista de nombres de tareas como un arreglo
    var taskNameArray = [];
    $('ul li').each(function () {
        var taskName = $(this).clone().children().remove().end().text().trim();
        taskNameArray.push(taskName);
    });

    // Convertir el arreglo a JSON y guardar en localStorage
    localStorage.setItem('taskList', JSON.stringify(taskNameArray));
}

function loadTaskList() {
    // Cargar la lista desde localStorage y agregar a la vista
    var savedTaskList = localStorage.getItem('taskList');
    if (savedTaskList) {
        var taskNameArray = JSON.parse(savedTaskList);
        taskNameArray.forEach(function (taskName) {
            var newElem = $('<li>' + taskName +
                '<button class="editButton" data-icon="edit" data-iconpos="notext">Edit</button>' +
                '<button class="deleteButton" data-icon="delete" data-iconpos="notext">Delete</button></li>');
            $('ul').append(newElem);
        });
        
        // Actualizar la vista de la lista
        $('ul').listview('refresh');
    }
}
