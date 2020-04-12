

class Item {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.details = data.details
        this.quantity = data.quantity
        this.color = data.color
        this.category_id = data.category_id
        this.updated_at = data.updated_at
        this.created_at = data.created_at
    }
}

function addItem() {
    const item = {
        name: document.getElementById('name').value,
        quantity: document.getElementById('quantity').value,
        color: document.getElementById('color').value,
        details: document.getElementById('item-details').value,
        category_id: document.getElementById('item-categoryId').value
    }

    fetch("http://localhost:3000/items", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
        .then(resp => resp.json())
        .then(item => {
            clearCategoriesHtml()
            getCategories()
        });
}

function renderItemFormFields(categoryId) {
    return `<label><strong>Name: </strong></label><br/>
    <input type="text" id="name" required><br/>
    <input type="hidden" id="item-categoryId" value="${categoryId}">
    <label><strong>Quantity: </strong></label><br/>
    <input type="text" id="quantity" required><br/>
    <input type="hidden" id="item-categoryId" value="${categoryId}">
    <label><strong>Color: </strong></label><br/>
    <input type="text" id="color"><br/>
    <input type="hidden" id="item-categoryId" value="${categoryId}">
    <label><strong>Details:   </strong></label><br/>
    <input type="text" id="item-details"><br/>  
    <input class="submit-new-item" type="submit" value="Submit">
    `
}

function renderNewItemForm() {
    let categoryId = this.getAttribute('id')
    this.style.display = "none"
    let itemsHtml = this.parentElement
    let itemForm = document.createElement('form')
    itemForm.setAttribute("onsubmit", "addItem(); return false;")
    itemForm.innerHTML = renderItemFormFields(categoryId)
    itemsHtml.appendChild(itemForm)
}

function deleteItem() {
    let itemId = this.parentElement.getAttribute('data-item-id')

    fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
        .then(json => {
            let selectedItem = document.querySelector(`.card[data-item-id="${itemId}"]`)
            selectedItem.remove()
        })
}

function addItemsClickListeners() {
    document.querySelectorAll('.view-items-category-button').forEach(element => {
        element.addEventListener('click', viewCategoryItems)
    })

    document.querySelectorAll('.add-item-button').forEach(element => {
        element.addEventListener('click', renderNewItemForm)
    })

    document.querySelectorAll('.delete-item-button').forEach(element => {
        element.addEventListener("click", deleteItem)
    })
}

function viewCategoryItems() {
    Category.newCategoryForm()
    let categorySelectedHtml = this.parentElement.querySelector('.items')
    toggleHideDisplay(categorySelectedHtml)
}