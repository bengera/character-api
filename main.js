'use strict';
const imagesContainer = document.querySelector('.images');
const randomButton = document.querySelector('.btn-random');



const renderCharacters = function(data){
    const card = `
     <article class="character">
      <div class="inner-container">
        <div class="card__top">
          <p class="card__name">${data.name}</p>
        </div>
      <img class="card__img" src="${data.image}" alt="">
      <div class="card__bottom">
        <p class="card__status"><span>Status:</span> ${data.status}</p>
        <p class="card__species">Species: ${data.species}</p>
        <p class="card__origin">Origin: ${data.origin.name}</p>
      </div>
    </div>
    </article>
    `
    imagesContainer.insertAdjacentHTML('beforeend', card);
    

    
}

const displayCharacters = function(){
    imagesContainer.innerHTML = '';
    return new Promise(function(resolve,reject){
        const randomNumber = Math.floor(Math.random() * 42);
        fetch(`https://rickandmortyapi.com/api/character/?page=${randomNumber}`)
        .then(res=>{
            if(!res.ok){
                reject(new Error('Data not found'))
                return;
            }
            return res.json();
        })
        .then(data=>{
            let results = data.results;
                results.forEach(el => {
                renderCharacters(el)
                
                
            })
            resolve()
        }).catch(err => {
            console.error(err);
            reject(err);
        })
        
    })
}

const loadAndCheckCharacters = function(){
    return displayCharacters()
    .then(()=>{
    console.log('Data resolved ✅')
    checkStatus()
    shuffleCards();
    
})

}
    

loadAndCheckCharacters() // initial

const checkStatus = (()=>{
    console.log('checking status 🔃')
    document.querySelectorAll('.card__status').forEach((card)=> {
        const statusText = card.textContent.trim().toLowerCase()
        if (statusText === 'status: alive'){
            card.classList.add('alive')
        } else if(statusText === 'status: dead'){
            card.classList.add('dead')
        } else(
            card.classList.add('unknown')
        )
        
    })
})

function shuffleCards() {
    
    const cardsArray = Array.from(imagesContainer.children);
  
    // Shuffle the array of divs
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
  
    // Remove all divs from the container
    imagesContainer.innerHTML = '';
  
    // Append the shuffled divs back to the container
    cardsArray.forEach(div => imagesContainer.appendChild(div));
  }
  

randomButton.addEventListener('click', loadAndCheckCharacters);