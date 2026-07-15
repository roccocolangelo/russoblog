const API_URL =
    "https://russoblog-api.roccocolangelo.workers.dev";

let articles = [];

let currentPage = 1;

const pageSize = 5;

async function loadArticles() {

    const response =
        await fetch(
            `${API_URL}/api/articles`
        );

    articles =
        await response.json();

    renderArticles();

}

function renderArticles() {

    const start =
        (currentPage - 1) * pageSize;

    const end =
        start + pageSize;

    const pageArticles =
        articles.slice(start, end);

    const container =
        document.getElementById(
            "articles-container"
        );

    if (!pageArticles.length) {

        container.innerHTML =
            "<p>Nessun articolo disponibile.</p>";

        return;

    }

    container.innerHTML =
        pageArticles.map(article => `

            

                <a
                    href="${article.url}"
                    target="_rd">
                    
                    div class="article-card">
                        <h4>
                            ${article.title}
                        </h4>

                        <p>
                            ${article.category || ""}
                        </p>

                    </div>

                </a>

         


        `).join("");

    renderPagination();

}

function renderPagination() {

    const totalPages =
        Math.ceil(
            articles.length / pageSize
        );

    const container =
        document.getElementById(
            "pagination"
        );

    let html = "";

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        html += `

            <button
                class="
                    page-btn
                    ${i === currentPage
                        ? "active"
                        : ""}
                "
                onclick="goToPage(${i})">

                ${i}

            </button>

        `;

    }

    container.innerHTML = html;

}

function goToPage(page) {

    currentPage = page;

    renderArticles();

}

loadArticles();