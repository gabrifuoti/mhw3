function checkStatus(){
    const events_btn = document.querySelector('#search-events');
    if(events_btn.className = 'button-playlist-artist-current'){
        events_btn.classList.remove('button-playlist-artist-current');
        events_btn.classList.add('button-playlist-artist');
        
        events_btn.removeEventListener('click', checkStatus);
        events_btn.addEventListener('click', searchEvents);

        const playlist_list = document.querySelector('#playlist-list');
        playlist_list.classList.remove('hidden');
        
        const library = document.querySelector('#event-list');
        library.classList.add('hidden');
    }
    else{
        events_btn.addEventListener('click', searchEvents);
    }
}

function onJson_event(json) {
    console.log('JSON ricevuto');
    console.log(json);
    events_btn.classList.remove('button-playlist-artist');
    events_btn.classList.add('button-playlist-artist-current');
    const playlist_list = document.querySelector('#playlist-list');
    playlist_list.classList.add('hidden');

    const library = document.querySelector('#event-list');
    library.classList.remove('hidden');
    library.innerHTML = '';

    const results = json._embedded.attractions;
    let num_results = results.length;
    if(num_results > 8)
    num_results = 8;

    for(let i=0; i<num_results; i++){
        const event_data = results[i];

        const event = document.createElement('div');
        const event_a = document.createElement('a');
        event_a.classList.add('link-list');
        event_a.href = event_data.url;
        event_a.target = "_blank";

        const selected_image = event_data.images[0].url;
        const img = document.createElement('img');
        img.src = selected_image;
        img.classList.add('img-list-playlist');

        const caption = document.createElement('span');
        const title = event_data.name;;
        const strong = document.createElement('strong');
        strong.textContent = title;  
        const genre = event_data.classifications[0].genre.name;
        console.log(genre);
        const new_br = document.createElement('br');
        const text_genre = document.createTextNode(genre);

        caption.appendChild(strong);
        caption.appendChild(new_br);
        caption.appendChild(text_genre);
        
        event.appendChild(event_a)
        event_a.appendChild(img);
        event_a.appendChild(caption);
        library.appendChild(event);
    } 
}
  
function onResponse_event(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

const ticketmaster_key = "V5Fcb6Ipb85gUrAh4SkWaAdUf9KxOgq8";

function searchEvents(event) {
    event.preventDefault();
    events_btn.removeEventListener('click', searchEvents);
    events_btn.addEventListener('click', checkStatus);
    fetch("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey="+ticketmaster_key+"&classificationName=music")
    .then(onResponse_event)
    .then(onJson_event);
}

const events_btn = document.querySelector('#search-events');
events_btn.addEventListener('click', searchEvents);