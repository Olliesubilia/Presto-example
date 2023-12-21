function showAnnouncement(announcement) {

    const createdAt = new Date(announcement.createdAt);
    const announcementRow = document.getElementById('announcementRow')

// Col e immagine
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6')
    announcementRow.appendChild(col)

    const img = document.createElement('img');
    img.classList.add('img-fluid', 'w-100', 'h-100')
    img.setAttribute('src', 'https://picsum.photos/seed/127/640/480')
    col.appendChild(img)

// Col2: price, Title and text
    const col2 = document.createElement('div');
    col2.classList.add('col-12', 'col-md-6', 'p-4' , 'd-flex', 'align-items-center')
    announcementRow.appendChild(col2)

    const divContainer = document.createElement('div');
    col2.appendChild(divContainer)

    const divContainerText = document.createElement('div');
    divContainer.appendChild(divContainerText)

    const price = document.createElement('p');
    price.classList.add('mb-1', 'fw-semibold', 'fs-5', 'text-primary')
    price.textContent =`€ ${announcement.price}`;
    divContainerText.appendChild(price)

    const h5 = document.createElement('h5')
    h5.classList.add('card-title', 'display-5')
    h5.textContent = announcement.name;
    divContainerText.appendChild(h5)

    const text = document.createElement('p');
    text.classList.add('card-text', 'text-muted')
    text.textContent = 'Some quick example text to build on the card title and make up the bulk of the card content.';
    divContainerText.appendChild(text)

// Icons
    const divContainerIcon = document.createElement('div')
    divContainerIcon.classList.add('d-flex', 'justify-content-around', 'p-3', 'bg-white', 'text-primary')
    divContainer.appendChild(divContainerIcon)

//Icon Heart
    const p1 = document.createElement('p');
    p1.classList.add('mb-0')
    divContainerIcon.appendChild(p1)

    const iconHeart = document.createElement('i');
    iconHeart.classList.add('bi', 'bi-heart-fill')
    p1.appendChild(iconHeart)

    const span1 = document.createElement('span');
    span1.textContent = 'Like'
    p1.appendChild(span1)

//Icon Bookmark
    const p2 = document.createElement('p');
    p2.classList.add('mb-0')
    divContainerIcon.appendChild(p2)

    const iconBookmark = document.createElement('i');
    iconBookmark.classList.add('bi', 'bi-bookmark-check-fill')
    p2.appendChild(iconBookmark)

    const span2 = document.createElement('span');
    span2.textContent = announcement.category
    p2.appendChild(span2)

//Icon Calendar
    const p3 = document.createElement('p');
    p3.classList.add('mb-0')
    divContainerIcon.appendChild(p3)

    const iconCalendar= document.createElement('i');
    iconCalendar.classList.add('bi', 'bi-calendar-fill');
    p3.appendChild(iconCalendar)

    const span3 = document.createElement('span');
    span3.textContent = createdAt.toLocaleDateString()
    p3.appendChild(span3)

    return col;
}



readAllAnnouncements()
.then((announcements) => {
    
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    //console.log(id);
    
    const foundAnnouncement = announcements.find((announcement) => {
        return announcement.id == id;
    });

    showAnnouncement(foundAnnouncement);

})
.catch((error) => {
    console.log(error);
})



async function readAllAnnouncements() {
    const response = await fetch('/server/api/annunci.json');
    const announcements = await response.json();

    return announcements;
}


