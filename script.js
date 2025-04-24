// Load saved suggestions from localStorage
window.onload = function() {
    const savedSuggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
    savedSuggestions.forEach(displaySuggestion);
  };
  
  // Add a new suggestion
  function addSuggestion() {
    const foodInput = document.getElementById("foodInput").value.trim();
    const linkInput = document.getElementById("linkInput").value.trim();
    
    if (!foodInput) return;  // Don't add if no food suggestion
    
    const suggestion = {
      name: foodInput,
      link: linkInput,
      votes: 0
    };
    
    const savedSuggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
    savedSuggestions.push(suggestion);
    localStorage.setItem("foodSuggestions", JSON.stringify(savedSuggestions));
    
    displaySuggestion(suggestion);
    
    // Clear inputs after adding
    document.getElementById("foodInput").value = "";
    document.getElementById("linkInput").value = "";
  }
  
  // Display a suggestion
  function displaySuggestion(suggestion) {
    const suggestionsList = document.getElementById("suggestionsList");
    
    const suggestionDiv = document.createElement("div");
    suggestionDiv.classList.add("suggestion");
    
    suggestionDiv.innerHTML = `
      <div>
        <strong>${suggestion.name}</strong><br>
        ${suggestion.link ? `<a href="${suggestion.link}" target="_blank">View Link</a>` : ""}
      </div>
      <div>
        Votes: <span id="votes-${suggestion.name}">${suggestion.votes}</span>
        <button onclick="vote('${suggestion.name}')">Vote</button>
      </div>
    `;
    
    suggestionsList.appendChild(suggestionDiv);
  }
  
  // Vote on a suggestion
  function vote(suggestionName) {
    const savedSuggestions = JSON.parse(localStorage.getItem("foodSuggestions")) || [];
    
    const suggestion = savedSuggestions.find(s => s.name === suggestionName);
    if (suggestion) {
      suggestion.votes++;
      localStorage.setItem("foodSuggestions", JSON.stringify(savedSuggestions));
      document.getElementById(`votes-${suggestionName}`).textContent = suggestion.votes;
    }
  }
  