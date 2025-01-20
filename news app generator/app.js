const apiKey = '7ef20b7fea874c6aa759442f1e358a0b'; 
const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');

// Fetch news articles
async function fetchNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Display news articles
function displayNews(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('news-card');
    articleCard.innerHTML = `
      <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
      <p>${article.description}</p>
      <p><strong>Source:</strong> ${article.source.name}</p>
    `;
    newsContainer.appendChild(articleCard);
  });
}

// Search functionality
function searchNews() {
  const query = searchInput.value.toLowerCase();
  const articles = document.querySelectorAll('.news-card');
  articles.forEach(article => {
    const title = article.querySelector('h3').textContent.toLowerCase();
    const description = article.querySelector('p').textContent.toLowerCase();
    if (title.includes(query) || description.includes(query)) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Initial fetch of news
fetchNews();
