function showForm(){
    const span_search = document.querySelector('.flex-search span');
    span_search.classList.add('hidden');
    const form_search = document.querySelector('#search-form');
    form_search.classList.remove('hidden');
}

function showSearch(){
  const span_search = document.querySelector('.flex-search span');
  span_search.classList.remove('hidden');
  const form_search = document.querySelector('#search-form');
  form_search.classList.add('hidden');
}

function onJson_album(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const page_block = document.querySelector('.homepage-to-hidden');
  page_block.classList.add('hidden');

  const top_res = document.querySelector('#result');
  top_res.classList.remove('hidden');
  const library = document.querySelector('#search-result');
  library.classList.remove('hidden');
  library.innerHTML = '';

  const results = json.albums.items;
  let num_results = results.length;
  if(num_results > 10)
    num_results = 10;

  for(let i=0; i<num_results; i++){
    const album_data = results[i];

    const album = document.createElement('div');
    album.classList.add('item-made-for-you');

    const album_a = document.createElement('a');
    album_a.classList.add('link-list');
    album_a.href = album_data.external_urls.spotify;
    album_a.target = "_blank";
    
    const selected_image = album_data.images[0].url;
    const img = document.createElement('img');
    img.src = selected_image;
    img.classList.add('img-list-dmix');

    const caption = document.createElement('span');
    const title = album_data.name;;
    const strong = document.createElement('strong');
    strong.textContent = title;    
    caption.appendChild(strong);
    
    album.appendChild(album_a);
    album_a.appendChild(img);
    album_a.appendChild(caption);
    library.appendChild(album);
  } 
}

function onResponse_album(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onTokenJson(json){
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response){
  return response.json();
}

function searchAlbum(event) {
  event.preventDefault();
  const album_input = document.querySelector('#search-album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse_album).then(onJson_album);
}

// OAuth credentials --- NON SICURO!
const client_id = '563edfb1ff7c48a8b800c2f045a2487d';
const client_secret = 'c6a63380553e439abfd33b1f754b4183';
let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const search_btn = document.querySelector('.flex-search');
search_btn.addEventListener('mouseover', showForm);
search_btn.addEventListener('mouseleave', showSearch);

const form_album = document.querySelector('#search-form');
form_album.addEventListener('input', searchAlbum);