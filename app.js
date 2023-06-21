const allBtns = document.querySelectorAll(".btn");
const container = document.querySelector(".container");
allBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    getData(e.target.innerText);
  });
});
const getData = async (subject) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${subject}&apiKey=2687835867e3406c992d7b7eefe8fd65`
  );
  const data = await response.json();
  //console.log(data.articles);
  renderData(data.articles);
};
const renderData = (data) => {
  container.innerHTML = "";
  for (let item of data) {
    const { title, description, urlToImage, url, author, publishedAt } = item;
    //if there is no img from the specific obj, it continues next suitable obj
    if (!urlToImage) {
      continue;
    }
    let card = document.createElement("div");
    // card.classList.add("card");
    card.innerHTML = `
    <div
    class="card news-image-container m-3 mx-auto border-info-subtle"
    style="width: 70%;"
  >
    <img src="${urlToImage}" class="card-img-top" alt="${title}" />
    <div class="card-body">
      <button
        class="btn close-button mt-2 mb-2 btn-outline-danger rounded"
        type="button"
      >
        Delete
      </button>
  
      <h5 class="news-title">${title}</h5>
      <p class="news-description">${description || content || " "}</p>
      <div class="card-footer text-body-secondary border-0">
        <div class="row">
          <div class="col">
            <p class="news-author">
              <span class="fw-bolder">Author:</span> ${author}
            </p>
          </div>
          <div class="col">
            <p class="news-published">
              <span class="fw-bolder">Published At:</span> ${publishedAt}
            </p>
          </div>
        </div>
      </div>
  
      <a
        class="view-button btn my-2 btn-outline-info"
        href="${url}"
        target="_blank"
        >Read more</a
      >
    </div>
  </div>
        `;
    container.appendChild(card);
    const deleteBtn = card.querySelector(".close-button");
    deleteBtn.addEventListener("click", (e) => {
      card.remove();
    });
  }
};
