
//global variables
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

//api call with user input
function getUserRepos(user) {
   var apiUrl = "https://api.github.com/users/" + user + "/repos";

   fetch(apiUrl).then(function(response) {

    if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        })
    } else {
        alert("Error:" + response.statusText);
    }
   })
   .catch(function(error) {
    alert('Unable to connect to GutHub');
   }); 
};
  
function formSubmitHandler(event) {
    event.preventDefault();
    // console.log(event);

    var userName = nameInputEl.value.trim();    

    if (userName) {
        getUserRepos(userName);
        nameInputEl.value='';
    } else {
        alert("please enter a valid GirHub username");
    }
}

function displayRepos(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = "";

    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    

    for (i=0;i<repos.length;i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name
    
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        repoEl.innerHTML = "<span>" + repoName + "</span>";

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"; 
        } else {
            statusEl.innerHTML =  "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}


userFormEl.addEventListener('submit', formSubmitHandler);