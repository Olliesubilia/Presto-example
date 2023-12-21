function generateCard(announcement) {

    const createdAt = new Date(announcement.createdAt);

//Header card con immagine e span
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'col-xl-4', 'overflow')
    announcementsRow.appendChild(col)

    const card = document.createElement('a');
    card.setAttribute('href', `/singleannouncement.html?id=${announcement.id}`)
    card.classList.add('card', 'h-100')
    col.appendChild(card)

    const position = document.createElement('div');
    position.classList.add('position-relative')
    card.appendChild(position)

    const img = document.createElement('img');
    img.classList.add('card-img-top')
    img.setAttribute('src', 'https://picsum.photos/seed/127/640/480')
    position.appendChild(img)

    const span = document.createElement('span');
    span.className = `position-absolute top-0 end-0  badge px-4 py-2 ${announcement.type === 'sell' ? 'bg-danger' : 'bg-primary'}`;
    span.textContent = announcement.type.toUpperCase()
    position.appendChild(span)



//Card body con prezzo, titolo e descrizione
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const price = document.createElement('p');
    price.classList.add('mb-1', 'text-primary', 'fs-5', 'fw-semibold')
    price.textContent =`€ ${announcement.price}`;
    cardBody.appendChild(price)

    const h5 = document.createElement('h5');
    h5.classList.add('card-title', 'display-6','a', 'text-black')
    h5.textContent = announcement.name;
    cardBody.appendChild(h5)

    const text = document.createElement('p');
    text.classList.add('card-text', 'text-muted')
    text.textContent = 'Some quick example text to build on the card title and make up the bulk of the card content.';
    cardBody.appendChild(text)


//Footer
    const footer = document.createElement('div');
    footer.classList.add('card-footer', 'd-flex', 'justify-content-around', 'p-3', 'bg-white', 'text-primary')
    card.appendChild(footer)

//Icon Heart
    const p1 = document.createElement('p');
    p1.classList.add('mb-0')
    footer.appendChild(p1)

    const iconHeart = document.createElement('i');
    iconHeart.classList.add('bi', 'bi-heart-fill')
    p1.appendChild(iconHeart)


    const span1 = document.createElement('span');
    span1.textContent = 'Like'
    p1.appendChild(span1)

//Icon Bookmark
    const p2 = document.createElement('p');
    p2.classList.add('mb-0')
    footer.appendChild(p2)

    const iconBookmark = document.createElement('i');
    iconBookmark.classList.add('bi', 'bi-bookmark-check-fill')
    p2.appendChild(iconBookmark)

    const span2 = document.createElement('span');
    span2.textContent = announcement.category
    p2.appendChild(span2)

//Icon Calendar
    const p3 = document.createElement('p');
    p3.classList.add('mb-0')
    footer.appendChild(p3)

    const iconCalendar= document.createElement('i');
    iconCalendar.classList.add('bi', 'bi-calendar-fill');
    p3.appendChild(iconCalendar)

    const span3 = document.createElement('span');
    span3.textContent = createdAt.toLocaleDateString()
    p3.appendChild(span3)

    return col;
}





async function readAllAnnouncements() {
    const response = await fetch('server/api/annunci.json');
    const announcements = await response.json();

    return announcements;

}








function filterAnnouncements(announcements,{search, category, minPrice, maxPrice}) {

    const filteredAnnouncemements = announcements.filter((announcement) => {

        let isAnnouncementsRequired = true;
           
        if(search) {
            isAnnouncementsRequired = announcement.name.toLowerCase().includes(search);
        }
        
        if(isAnnouncementsRequired && category) {
            isAnnouncementsRequired = announcement.category.toLowerCase() == category;
        }
        
        
        if(isAnnouncementsRequired && minPrice) {
            isAnnouncementsRequired = announcement.price >= parseFloat(minPrice);
        }
        
        
        if(isAnnouncementsRequired && maxPrice) {
            isAnnouncementsRequired = announcement.price <= parseFloat(maxPrice);
        }
         
            return isAnnouncementsRequired;
        });
        
        return filteredAnnouncemements;
}




function sortAnnouncements(announcements, sortBy) {

    if(sortBy) {

        switch(sortBy) {
         case 'ascByPrice':
             announcements.sort((left, right) => {
                 return parseFloat(left.price) - parseFloat(right.price);
             });
             break;
         case 'descByPrice':
             announcements.sort((left, right) => {
                 return parseFloat(right.price) - parseFloat(left.price);
             });
             break;
         case 'ascByDate':
             announcements.sort((left, right) => {
                 return left.createdAt - right.createdAt;
             });
             break;
         case 'descByDate':
             announcements.sort((left, right) => {
                 return right.createdAt - left.createdAt;
             });
             break;
         case 'ascByAlpha':
             announcements.sort((left, right) => {
                 return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
             });
             break;
         case 'descByAlpha':
             announcements.sort((left, right) => {
                 return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
             });
             break;
        } 
    }
}



function showAnnouncements(announcements, parentElement) {
    while(parentElement.hasChildNodes()) {
        parentElement.removeChild(parentElement.firstChild);
    }

     announcements.forEach((announcement) => {
            generateCard(announcement);
        });
    
        searchInput.value = '';
    
    }



function showCategories(announcements, parentElement) {

        const uniqueCategories = new Set();
        announcements.forEach((announcement) => {
            uniqueCategories.add(announcement.category);
        });

        uniqueCategories.forEach((category) => {
        
        const option = document.createElement('option');
        option.setAttribute('value', category.toLowerCase());
        option.textContent = category;

        parentElement.appendChild(option);
       });
    };

    


    
document.addEventListener('DOMContentLoaded', async () => {

    const announcementsRow = document.getElementById('announcementsRow');

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    const sortSelect = document.getElementById('sortSelect');
    
    const filteringForm = document.getElementById('filteringForm');
    filteringForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const filteringOptions = {
            search: searchInput.value.toLowerCase(),
            category: categorySelect.value.toLowerCase(),
            minPrice: minPriceInput.value,
            maxPrice: maxPriceInput.value,
        };

        const sortBy = sortSelect.value;

        const announcements = await readAllAnnouncements();
        const filteredAnnouncements = filterAnnouncements(announcements, filteringOptions); 
        sortAnnouncements(filteredAnnouncements, sortBy);

        showAnnouncements(filteredAnnouncements, announcementsRow);
    });


// Fetch iniziale
    const announcements= await readAllAnnouncements()
    showCategories(announcements, categorySelect);
    showAnnouncements(announcements, announcementsRow);
    });
