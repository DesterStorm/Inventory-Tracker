Index.html
1. sets the header to the name of the app, the stylesheet to style.css
and a message defining the purpose of the app
2. contains the card and container divs which house the majority of the 
html in the app.
3. sets the order of the scripts which interact with it

Index.js
1. DOMContentLoaded is called to load the DOM at the start of the app
2. getCategories(), located in category.js, is run
3. newCategoryForm, also located in category.js, is called on the Category class

category.js
1. getCategories() fetches the data from the rails api and runs 3 functions; 
renderCategoriesHtml(data), addCategoriesClickListeners() and addItemsClickListeners()
    1. renderCategoriesHtml(data) renders the html for items and categories using the 
    categoryItemsHtml() and categoryHtml() functions respectively and renders the 
    addItemButton() html upon displaying the items for a selected category.
    2. addCategoriesClickListeners() is called, setting the click eventListeners for 
    the editCategory and deleteCategory buttons
    3. addItemsClickListeners() is called from item.js, setting click eventListeners 
    for the viewCategoryItems, renderNewItemForm and deleteItem buttons.
2. categoryItemsHtml() returns the html used for the categories item attribute views, 
as well as the items delete button.
3. categoryHtml() returns the html used for the category view, as well as the buttons 
to view the items in the category, edit and delete the category.
4. addItemButton() uses the add-item-button query selector to renderNewItemForm 
(from item.js) to render the form used in creating a new item, using the 
renderItemFormFields(categoryId) and addItem() functions.
5. clearCategoriesHtml() prevents duplicating the list of categories when a new category
is added and rendered.
6. deleteCategory() fetches the data for the selected category and uses the DELETE method 
to return a promise and responds with the category data and removes the selected category.
7. editCategory() handles rendering the edit category form and populate it with current 
info.
8. updateCategory() Issues a patch when the edit category form is submitted, with the 
updated information as an object attached to the body of the fetch request.
9. createCategory() takes the values entered by the user in the new category form, creates 
a category object and attaches the stringified object to the body of the POST request.
10. class Category{} is constructed with the corresponding attributes of the categories 
table of the Rails API's schema, and a sorting method for the items belonging to it.
11. static newCategoryForm() and static editCategoryForm() renders the html for creating
a new category and editing one respectively.


