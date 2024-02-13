const cards = document.getElementsByClassName('cards');
const CHARACTER_LIST = [];

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
              /* <img src="https://image.tmdb.org/t/p/w185${card.poster_path}" alt="${card.title}"> */
  
    }
  }



const fetchCharacters = async () => {
    try {
        const response = await fetch(
        "https://rickandmortyapi.com/api/character"
        );
    
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
        CHARACTER_LIST.length = 0; 
        console.log(data.results);
        data.results.forEach(character => CHARACTER_LIST.push(character));
        
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    }
}

const home = async () => {
    await fetchCharacters();
    //getPopularSeries();
    renderCards(CHARACTER_LIST);
}

home();