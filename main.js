// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
window.addEventListener("DOMContentLoaded", function(e){
    console.log("The DOM has been loaded")

    fetch('http://localhost:3000/api/v1/calorie_entries')
        .then(response => response.json())
        .then(json => json.forEach(loadEntry))

    const entryList = document.getElementById("calories-list")
    let progress = document.querySelector(".uk-progress").value
    let newProgress 

    function loadEntry(entryObj){
        const li = document.createElement("li")
        li.dataset.id = entryObj.id
        li.className = "calories-list-item"
        li.innerHTML = `<div class="uk-grid">
        <div class="uk-width-1-6">
        <strong>${entryObj.calorie}</strong>
        <span>kcal</span>
        </div>
        <div class="uk-width-4-5">
        <em class="uk-text-meta">${entryObj.note}</em>
        </div>
        </div>
        <div class="list-item-menu">
        <a class="edit-button" uk-toggle="target: #edit-form-container" uk-icon="icon: pencil"></a>
        <a class="delete-button" uk-icon="icon: trash"></a>
        </div>`
        entryList.insertBefore(li, entryList.firstChild)
        newProgress = progress += entryObj.calorie
        document.querySelector(".uk-progress").value = newProgress
    }
    
    function newEntry(e){
        e.preventDefault()
        const calorie = e.target.calorie.value
        const note = e.target.note.value
        const newEntry = {calorie, note}
        loadEntry(newEntry)
    }
    

    

    entryList.addEventListener("click", function(e){
        if (e.target.dataset.svg === "trash"){
            const li = e.target.parentNode.parentNode.parentNode
            li.remove()
        }
    })
    const newEntryForm = document.getElementById("new-calorie-form")
    newEntryForm.addEventListener("submit", newEntry)
    

//!END OF DOM LISTENER
})