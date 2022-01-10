class Book {
    constructor (name, author, isbn)
    {
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static AddBook(book)
    {
        const list = document.querySelector('#table-body');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="cross-button"></a></td>
        `;
        list.appendChild(row);
    }
    static clear_info()
    {
        document.querySelector("#name").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#ISBN").value = '';
    }
}

// When submit button is pressed


let is_label_alert = false, time_out, element,new_element;


document.querySelector(".form").addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const id = document.querySelector("#author").value;
    const isbn = document.querySelector("#ISBN").value;
    if(name === '' || id === '' || isbn === '')
    {
        if(is_label_alert){
            clearTimeout(time_out);
            element.removeChild(new_element);
        }
        is_label_alert = true;
        element = document.querySelector('.form');
        new_element = document.createElement('label');
        new_element.innerHTML = `
            <label id="alert_label">Fill out all details first</label>
        `;
        element.prepend(new_element);
        time_out = setTimeout(function() {
            element.removeChild(new_element);
            is_label_alert = false;
         }, 1500);
        return;
    }
    const b1 = new Book(name, id, isbn);
    UI.AddBook(b1);
    {
        if(is_label_alert){
            clearTimeout(time_out);
            element.removeChild(new_element);
        }
        is_label_alert = true;
        element = document.querySelector('.form');
        new_element = document.createElement('label');
        new_element.innerHTML = `
            <label id="success_label">Book is added</label>
        `;
        element.prepend(new_element);
        time_out = setTimeout(function() {
            element.removeChild(new_element);
            is_label_alert = false;
         }, 1500);
    }
    UI.clear_info();
});


document.querySelector("#table-body").addEventListener('click', (e) => {
    if(e.target.tagName != 'A')
        return;
    e.preventDefault();
    const elem = e.target;
    elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
    if(is_label_alert){
        clearTimeout(time_out);
        element.removeChild(new_element);
    }
    is_label_alert = true;
    element = document.querySelector('.form');
    new_element = document.createElement('label');
    new_element.innerHTML = `
        <label id="remove_label">Book is removed</label>
    `;
    element.prepend(new_element);
    time_out = setTimeout(function() {
        element.removeChild(new_element);
        is_label_alert = false;
     }, 1500);
})

for(let i = 0; i<20; i++)
{
    const b1 = new Book(`Anuj ${i}`,"Yadav", 54534512);
    UI.AddBook(b1);
}