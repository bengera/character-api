const imagesContainer = document.querySelector('.images');

const displayCharacters = function(){
    return new Promise(function(resolve,reject){
        const randomNumber = Math.floor(Math.random() * 42);
        console.log(`Page ${randomNumber}`);
        fetch(`https://rickandmortyapi.com/api/character/?page=${randomNumber}`)
        .then((res)=>{
            if(!res.ok){
                reject(new Error('Data not found'))
                return;
            }
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            let results = data.results;
            console.log(results);
            results.forEach(el => {
                console.log(`${el.name} is ${el.status}`)
                const img = document.createElement('img')
                img.src = el.image;
                imagesContainer.append(img);
                
            });
            resolve()
        }).catch((err) => {
            console.error(err);
            reject(err);
        })
        
    })
}

let pageNum = 1

displayCharacters()
.then(()=>{
    console.log('Data resolved ✅')
    
    
    
})
.catch((err)=> console.error(err));