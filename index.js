function createCard(category) {

    const categoriesRow = document.getElementById('categoriesRow');

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-sm-6', 'col-md-3', 'mb-3', 'bg-light', 'card-bg-rounded-4')
    categoriesRow.appendChild(col)

    const card = document.createElement('div');
    card.classList.add('card', 'text', 'card-primary');
    col.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'align-items-center','p-0');
    card.appendChild(cardBody);

    const icon = document.createElement('i');
    icon.className = category.icon;
    icon.classList.add('text-center', 'text-primary', 'rounded-icon-container');
    card.appendChild(icon);

    const h5 = document.createElement('h5');
    h5.textContent = category.name
    h5.classList.add('card-title', 'text-center', 'text-card')
    card.appendChild(h5);

    const paragraph = document.createElement('p');
    paragraph.textContent = `${category.announcementsCount} Annunci`
    paragraph.classList.add('card-text', 'text-center', 'mb-3', 'text-primary')
    card.appendChild(paragraph);

    return col;

}


fetch('/server/api/categorie.json')
.then((response) => {
    return response.json();
})
.then((categories) => {
    
    categories.forEach((category) => {
        createCard(category);  
    });
    
})
.catch((error) => {
    console.log(error);
});


