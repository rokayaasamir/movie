const API_kEY="f7f86b4f5035dbae1c79e70bf309399f",
pageNum=1,
  API_URL=`https://api.themoviedb.org/3/discover/movie?page=${pageNum}&sort_by=popularity.desc&&api_key=${API_kEY}`,
  IMG_URL="https://image.tmdb.org/t/p/w500",
  SEARCH_URL=`https://api.themoviedb.org/3/search/movie?api_key=${API_kEY}&query="`;

  async function getMovies(url){
    //fetch=>response=>body

    const res = await fetch(url),
      data = await res.json()
      console.log(data)

  displayMovies(data.results);
  }

  getMovies(API_URL)

  async function displayMovies(movies){
    const row = document.querySelector('.row')
    for(let movie of movies){
      const div=document.createElement('div')
      div.className=`col col-lg-4 col-md-6 my-4 col-sm-12`;
      const {title , vote_average ,overview ,poster_path}=movie
      div.innerHTML=`
      <div class ="card">
  <img src="${IMG_URL}${poster_path}" class="card-img-top" alt="poster image">
  <div class="card-body">
  <h5 class="card-text bg-light shadow p-3 text-center">
  ${title} | <span class="badge rounded-pill ${getClassByVoteaVerage(vote_average)}">
  ${vote_average}
  
  </span>
  </h5>
  <div class="bg-light  p-4 text-dark text-center overview">
  ${overview}
  </div>
  </div>
  </div>
    `;  
      row.appendChild(div)
    }
  }

  function getClassByVoteaVerage(vote){
  //  if(vote > 6.5){
    //  return 'bg-success'
    //}else if(vote >=5 && vote < 6.5){
  //    return 'bg-warning'
  //  }else{
  //    return 'bg-danger'
  //  }

  return vote >6.5 ? 'bg-success' : vote>=5 && 
  vote <6.5? 'bg-warning':'bg-danger';
  }

//  search

const form=document.querySelector("#form")
const search=document.querySelector('#search')
form.addEventListener('submit' ,(event)=>{
  event.preventDefault()
//  console.log(event.target)
const searchVal=search.Value
if(searchVal!=""){
  getMovies(`${SEARCH_URL}${searchVal}`)
  searchVal =""
}else{
  window.location.reload();
}
})