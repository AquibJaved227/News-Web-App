
  const API_KEY = "f7ef6544496e4bb7bda0213af2821080";
  const url = "https://newsapi.org/v2/everything?q=";
  
    window.addEventListener('DOMContentLoaded', () => fetchNews('India'));

    function reload(){
    window.location.reload();
    }
    
    async function fetchNews (query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
     bindData(data.articles);
      }
    
      function bindData(articles){
        const cardscontainer = document.getElementById('cards-container');
        const newsCardTemplate = document.getElementById('template-news-card');
        cardscontainer.innerHTML = '';
        
        articles.forEach(article => {
          if(!article.urlToImage) return;
          const cardClone = newsCardTemplate.content.cloneNode(true);
          fillDataInCard(cardClone, article);
          cardscontainer.appendChild(cardClone);
        });
    }
    
    
      function fillDataInCard(cardClone, article){
       const newsImg = cardClone.querySelector('#news-img');
       const newsTitle = cardClone.querySelector('#news-title');
       const newsDesc = cardClone.querySelector('#news-desc');
       const newsSource= cardClone.querySelector('#news-source');
       
    
       newsDesc.innerHTML = article.description;
       newsImg.src = article.urlToImage;
       newsTitle.innerHTML = article.title;
        
        const date = new Date(article.publishedAt).toLocaleString("en-US",{
          timeZone: "Asia/jakarta"
        });
       
        newsSource.innerHTML = `${article.source.name} - ${date}`;
        
         
        cardClone.firstElementChild.addEventListener('click',()=>{
          window.open(article.url,"_blank")
        });
      
      }
          
  
         let curSelectedNav = null;
        function onNavItemClick(id){
          fetchNews(id);
          const navItem = document.getElementById(id);
          curSelectedNav?.classList.remove('active');
          curSelectedNav = navItem;
          curSelectedNav.classList.add('active');
        }
  
       const searchButton = document.getElementById('search-button');
       const searchText = document.getElementById('search-text');
  
       searchButton.addEventListener('click',()=>{
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav.classList.remove('active');
        curSelectedNav = null;
  
       });

       const darkModeToggle = document.getElementById('dark-mode-toggle');
       const body = document.body;
       body.classList.remove('dark-mode');

    darkModeToggle.addEventListener('click', () => {
  
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }
});








  
