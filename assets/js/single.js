var issueContainerEl = document.querySelector("#issues-container");

function getRepoIssues(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data)
            });
        } else {
            alert("there was a problem with your request");
        }
    });
}   



function displayIssues(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (i=0;i<issues.length;i++) {
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");


        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueContainerEl.appendChild(issuesEl);
        issuesEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issuesEl.appendChild(typeEl);
    }
}

getRepoIssues("facebook/react");