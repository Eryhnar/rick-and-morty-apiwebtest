const cards = document.getElementsByClassName('cards');
const CHARACTER_LIST = [];
let nextPageUrl = '';
let prevPageUrl = '';

const renderCards = characters =>{ 
    const character_list = document.querySelector('main.cards');
    character_list.innerHTML = '';
      for (const char of characters){
          character_list.innerHTML +=`
          <div class="card">
              <h3>${char.name}</h3>
              <img src=${char.image} alt="${char.title}">
              </div>
              `
  
    }
  }



  const fetchCharacters = async (url = "https://rickandmortyapi.com/api/character") => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        nextPageUrl = data.info.next;
        prevPageUrl = data.info.prev;

        CHARACTER_LIST.length = 0; 
        console.log(data);
        console.log(data.results);

        data.results.forEach(character => CHARACTER_LIST.push(character));
        
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    }
}

const home = async () => {
    await fetchCharacters();
    renderCards(CHARACTER_LIST);
}

home();

const pageUpBtns = Array.from(document.getElementsByClassName("page-up"));

pageUpBtns.map(btn => btn.addEventListener('click', async () => {
    if (nextPageUrl) {
        await fetchCharacters(nextPageUrl);
        renderCards(CHARACTER_LIST);
    }
}));

const pageDownBtns = Array.from(document.getElementsByClassName("page-down"));

pageDownBtns.map(btn => btn.addEventListener('click', async () => {
    if (prevPageUrl) {
        await fetchCharacters(prevPageUrl);
        renderCards(CHARACTER_LIST);
    }
}));