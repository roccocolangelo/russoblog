const API_URL =
    "https://russoblog-api.roccocolangelo.workers.dev";

async function saveArticle() {

    const url =
        document.getElementById("articleUrl")
        .value
        .trim();

    const category =
        document.getElementById("articleCategory")
        .value
        .trim();

    if (!url) {

        alert("Inserire URL");

        return;

    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/articles`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        url,
                        category
                    })
                }
            );

        const result =
            await response.json();

        document.getElementById("result")
            .innerHTML =
            `
            <p class="success">
                ✅ ${result.title}
            </p>
            `;

        document.getElementById("articleUrl")
            .value = "";

        loadArticles();

    }
    catch(error) {

        console.error(error);

        document.getElementById("result")
            .innerHTML =
            `
            <p class="error">
                ❌ Errore salvataggio
            </p>
            `;

    }

}

async function loadArticles() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/articles`
            );

        const articles =
            await response.json();

        const container =
            document.getElementById(
                "articlesList"
            );

        if (!articles.length) {

            container.innerHTML =
                "Nessun articolo.";

            return;

        }

        container.innerHTML =
            articles.map(article => `

                <div class="article-card">

                    <h4>
                        ${article.title}
                    </h4>

                    <p>
                        ${article.category || ""}
                    </p>

                    ${article.url}                        target="_blank">

                        Apri articolo →

                    </a>

                </div>

            `).join("");

    }
    catch(error) {

        console.error(error);

    }

}

loadArticles();