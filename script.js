// Load suggestions from localStorage on page load
window.onload = function () {
  const savedSuggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
  savedSuggestions.forEach(displaySuggestion);
};

// Add a new suggestion
function addSuggestion() {
  const name = document.getElementById("foodInput").value.trim();
  const link = document.getElementById("linkInput").value.trim();

  if (!name) return;

  const suggestion = {
    id: Date.now(), // Unique ID
    name,
    link,
    votes: 0
  };

  const savedSuggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
  savedSuggestions.push(suggestion);
  localStorage.setItem("foodSuggestions", JSON.stringify(savedSuggestions));

  displaySuggestion(suggestion);

  document.getElementById("foodInput").value = "";
  document.getElementById("linkInput").value = "";
}

// Display a suggestion card
function displaySuggestion(suggestion) {
  const list = document.getElementById("suggestionsList");

  const div = document.createElement("div");
  div.className = "suggestion";
  div.id = `suggestion-${suggestion.id}`;
  div.innerHTML = `
    <div>
      <strong class="name">${suggestion.name}</strong><br>
      <a class="link" href="${suggestion.link}" target="_blank">${suggestion.link ? "View Link" : ""}</a>
    </div>
    <div>
      Votes: <span class="votes">${suggestion.votes}</span>
      <button onclick="vote(${suggestion.id})">Vote</button>
      <button onclick="editSuggestion(${suggestion.id})">Edit</button>
      <button onclick="deleteSuggestion(${suggestion.id})">Delete</button>
    </div>
  `;
  list.appendChild(div);
}

// Vote for a suggestion
function vote(id) {
  const suggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
  const suggestion = suggestions.find(s => s.id === id);
  if (suggestion) {
    suggestion.votes++;
    localStorage.setItem("foodSuggestions", JSON.stringify(suggestions));
    document.querySelector(`#suggestion-${id} .votes`).textContent = suggestion.votes;
  }
}

// Delete a suggestion
function deleteSuggestion(id) {
  let suggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
  suggestions = suggestions.filter(s => s.id !== id);
  localStorage.setItem("foodSuggestions", JSON.stringify(suggestions));
  document.getElementById(`suggestion-${id}`).remove();
}

// Edit a suggestion
function editSuggestion(id) {
  const suggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
  const suggestion = suggestions.find(s => s.id === id);
  if (!suggestion) return;

  const newName = prompt("Edit the name:", suggestion.name);
  if (newName === null) return;

  const newLink = prompt("Edit the link:", suggestion.link || "");

  suggestion.name = newName.trim();
  suggestion.link = newLink.trim();

  localStorage.setItem("foodSuggestions", JSON.stringify(suggestions));

  const div = document.getElementById(`suggestion-${id}`);
  div.querySelector(".name").textContent = suggestion.name;
  const linkEl = div.querySelector(".link");
  linkEl.href = suggestion.link;
  linkEl.textContent = suggestion.link ? "View Link" : "";
}
