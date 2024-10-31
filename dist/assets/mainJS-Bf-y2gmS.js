const a=document.querySelector(".images"),o=document.querySelector(".btn-random"),i=function(s){const t=`
     <article class="character">
      <div class="inner-container">
        <div class="card__top">
          <p class="card__name">${s.name}</p>
        </div>
      <img class="card__img" src="${s.image}" alt="">
      <div class="card__bottom">
        <p class="card__status"><span>Status:</span> ${s.status}</p>
        <p class="card__species">Species: ${s.species}</p>
        <p class="card__origin">Origin: ${s.origin.name}</p>
      </div>
    </div>
    </article>
    `;a.insertAdjacentHTML("beforeend",t)},l=function(){return a.innerHTML="",new Promise(function(s,t){const c=Math.floor(Math.random()*42);fetch(`https://rickandmortyapi.com/api/character/?page=${c}`).then(e=>{if(!e.ok){t(new Error("Data not found"));return}return e.json()}).then(e=>{e.results.forEach(r=>{i(r)}),s()}).catch(e=>{console.error(e),t(e)})})},n=function(){return l().then(()=>{console.log("Data resolved ✅"),d().catch(s=>console.error(s))})};n();const d=()=>{console.log("checking status 🔃"),document.querySelectorAll(".card__status").forEach(s=>{const t=s.textContent.trim().toLowerCase();t==="status: alive"?s.classList.add("alive"):t==="status: dead"?s.classList.add("dead"):s.classList.add("unknown")})};o.addEventListener("click",n);
