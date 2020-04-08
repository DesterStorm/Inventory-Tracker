const categoryFormFields = `
    <label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="categoryId">
    <label><strong>Description: </strong></label><br/>
    <textarea id="description" rows="3" cols="20"></textarea><br/>
`;

class Category {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.description = data.description
        this.items = data.items.sort((a,b) => (a.updated_at < b.updated_at) ? 1 : ((b.updated_at < a.updated_at) ? -1 : 0));
    }

    static newCategoryForm() {
        let newCategoryFormDiv = document.getElementById('category-form')
        newCategoryFormDiv.innerHTML = `
        <form onsubmit="createCategory(); return false;">` +
            categoryFormFields +
            `<input class="button" type="submit" value="Add New Category">
        </form>
        <br/>`
    }

    static editCategoryForm() {
        let editCategoryFormDiv = document.getElementById('category-form')
        editCategoryFormDiv.innerHTML = `
        <form onsubmit="updateCategory(); return false;">` +
            categoryFormFields +
            `<input type="submit" value="Update Info">
        </form>
        <br/>`
    }

}

function getCategories() {
    fetch("http://localhost:3000/categories")
        .then(resp => resp.json())
        .then(data => {
            renderCategoriesHtml(data)
            addCategoriesClickListeners()
            addItemsClickListeners()
        })
}

function createCategory() {
    const category = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
    }


    fetch("http://localhost:3000/categories", {
        method: 'POST',
        body: JSON.stringify(category),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
        .then(resp => resp.json() )
        .then(category => {
            clearCategoriesHtml()
            getCategories()
            Category.newCategoryForm()
        });

}

// Click on categories name to view/hide additional info
function showMoreInfo() {
    console.log("this", this)
    console.log(this.parentElement.querySelector('.additional-info'))
    toggleHideDisplay(this.parentElement.querySelector('.additional-info'))
}

// Issue a patch when the edit category form is submitted
function updateCategory() {
    let categoryId = this.event.target.categoryId.value

    const category = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
    }

    fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(category),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
        .then(resp => resp.json() )
        .then(category => {
            clearCategoriesHtml()
            getCategories()
            Category.newCategoryForm()
        });
}

// Handler to render the edit category form and populate it with current info
function editCategory() {
    let categoryId = this.parentElement.getAttribute('data-category-id')

    // Populate the category form with categories' info
    fetch(`http://localhost:3000/categories/${categoryId}`)
        .then(resp => resp.json())
        .then(data => {
            Category.editCategoryForm()
            let categoryForm = document.getElementById('category-form')
            categoryForm.querySelector('#title').value = data.title
            categoryForm.querySelector('#categoryId').value = data.id
            categoryForm.querySelector('#description').value = data.description
        })
}

// Handler to delete a category
function deleteCategory() {
    let categoryId = this.parentElement.getAttribute('data-category-id')

    fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
        .then(json => {
            let selectedCategory = document.querySelector(`.card[data-category-id="${categoryId}"]`)
            selectedCategory.remove()
        })
}

function addCategoriesClickListeners() {
    document.querySelectorAll('.category-name').forEach(element => {
        element.addEventListener("click", showMoreInfo)
    })

    document.querySelectorAll('.edit-category-button').forEach(element => {
        element.addEventListener("click", editCategory)
    })

    document.querySelectorAll('.delete-category-button').forEach(element => {
        element.addEventListener("click", deleteCategory)
    })

}

function clearCategoriesHtml() {
    let categoriesIndex = document.getElementById("categories-list")
    categoriesIndex.innerHTML = ''
}

Category.prototype.categoryItemsHtml = function () {
    let categoryItems = this.items.map(item => {

        return (`
        <div class="card" data-item-id="${item.id}" >
        <strong>Name: </strong>${item.name} <br/>
        <strong>Details: </strong>${item.details} <br/>
        <strong>Quantity: </strong>${item.quantity} <br/>
        <strong>Color: </strong>${item.color} <br/>
                 
        <button class="delete-item-button" style="background-color:red">Delete Item</button>  
        </div>
		`)
    }).join('')

    return (categoryItems)
}


Category.prototype.categoryHtml = function () {

    return `<div class="card" data-category-id="${this.id}">
            
            </br>
            <strong class="category-title">${this.title}</strong> <br/>
            <strong>Description: </strong>${this.description}<br/>
            <button class="view-items-category-button">View Inventory</button>  
            <button class="edit-category-button">Edit Info</button>  
            <button class="delete-category-button">Delete</button>
            </div>
        </div>`
};

Category.prototype.addItemButton = function () {

    let addNewItemButton = document.createElement('button')
    addNewItemButton.className = 'add-item-button'
    addNewItemButton.id = this.id
    addNewItemButton.innerText = "Add Item"

    return addNewItemButton
}

function renderCategoriesHtml(data) {
    let categoriesIndex = document.getElementById("categories-list")

    data.forEach((category) => {

        let itemsIndexHtml = document.createElement('div')
        itemsIndexHtml.className = 'items'
        itemsIndexHtml.style.display = 'none'
        let emptyItemsHtml = itemsIndexHtml

        let newCategory = new Category(category)
        itemsIndexHtml.innerHTML = newCategory.categoryItemsHtml()

        categoriesIndex.innerHTML += newCategory.categoryHtml()

        let selectedCategoryHtml = document.querySelector(`.card[data-category-id="${newCategory.id}"]`)
        selectedCategoryHtml.append(itemsIndexHtml.childElementCount ? itemsIndexHtml : emptyItemsHtml )
        selectedCategoryHtml.querySelector('.items').appendChild(newCategory.addItemButton())
    });
}