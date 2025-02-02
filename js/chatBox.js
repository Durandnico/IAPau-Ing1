function changeConversation(idReceiver, idSender) {



    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = xhr.responseText;
            document.getElementById("messagerie-container").innerHTML = response;
        }
    };
    xhr.open("GET", "/php/loadMessage.php?idReceiver=" + idReceiver + "&idSender=" + idSender, true);
    xhr.send();


}

//Eviter que l'appuie de la touche entrer recharge la page en envoyant le form malgre le ajax
document.getElementById("msg-new-form").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) { // 13 represents the Enter key
        event.preventDefault();
        loadSendMsg();
    }
});

function loadSendMsg() {

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const response = this.responseText;
        const msgContainer = document.getElementById("messagerie-container");
        const newMsg = document.createElement("div");
        newMsg.setAttribute("class", "msg right");
        newMsg.innerHTML = response;
        msgContainer.appendChild(newMsg);
        document.getElementById('msg-new-form').reset();
    }

    // Get the form data
    const form = document.getElementById("msg-new-form");
    const formData = new FormData(form);

    xmlhttp.open("POST", "/php/sendMsg.php");
    xmlhttp.send(formData);
}


function changeIdSender(idSender) {
    var inputElement = document.getElementById("user-contacted");

    // Vérification si l'élément existe
    if (inputElement) {
        // Définition de la nouvelle valeur
        inputElement.value = idSender;
    }

    var activeElements = document.querySelectorAll(".active");


}

function generateFormNewUser() {
    fetch('/php/contactNewUser.php')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById('messagerie-container').innerHTML = data;
            const searchInput = document.getElementById('user-search-input');

            searchInput.addEventListener('input', function () {
                const searchTerm = this.value;

                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        // Process and display the suggestions
                        console.log(data);
                    }
                };

                xhr.open('GET', `/php/contactNewUser.php?searchTerm=${searchTerm}`, true);
                xhr.send();
            });
        })
        .catch(function (error) {
            console.error('Error:', error);
        });



}

function contactNewUser() {
    var inputElement = document.getElementById("user-search-input");
    var value = inputElement.value;

    changeIdSender(value);

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const response = this.responseText;
        const msgContainer = document.getElementById("messagerie-container");
        const newMsg = document.createElement("div");
        newMsg.setAttribute("class", "msg right");
        newMsg.innerHTML = response;
        msgContainer.appendChild(newMsg);

    }

    // Get the form data
    const form = document.getElementById("contact-new-user-form");
    const formData = new FormData(form);
    console.log(formData);

    xmlhttp.open("POST", "/php/sendMsg.php");
    xmlhttp.send(formData);

}

function updateNewContact() {
    var inputNewContact = document.getElementById("user-search-input");
    var hiddenInput = document.getElementById("user-contacted");

    hiddenInput.value = inputNewContact.value;
}

const searchInput = document.getElementById('user-search-input');

function searchSuggestions() {
  const searchText = searchInput.value;

  if (searchText.length === 0) {
    datalist.innerHTML = '';
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/php/contactNewUser.php?searchText=' + searchText, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const options = xhr.responseText;
        document.getElementById('users-name').innerHTML = options;
      }
    };
    xhr.send();
  }
}

// Call the searchSuggestions function when the user input changes
searchInput.addEventListener('input', searchSuggestions);

function updateInputValue() {
    var input = document.getElementById("user-search-input");
    var selectedOption = input.querySelector("option[value='" + input.value + "']");
    var selectedId = selectedOption.getAttribute("data-id");
    input.value = selectedId; // Set the input value to the selected ID
  }