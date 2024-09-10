
// Função para tocar música de fundo
window.addEventListener('load', function() {
    const backgroundMusic = document.querySelector('audio');
    
    if (backgroundMusic) {
        // Tenta forçar a reprodução ao carregar a página
        backgroundMusic.play().then(function() {
            console.log('Música tocando');
        }).catch(function(error) {
            console.log('Reprodução automática bloqueada. Tentando tocar manualmente...');
            document.addEventListener('click', () => {
                backgroundMusic.play().catch(err => console.log('Erro ao tentar reproduzir a música:', err));
            });
        });
    }
});


function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();

    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome de um personagem</p>";
        return;
    }

    let resultados = "";

    for (let dado of dados) {
        try {
            let titulo = dado.titulo?.toLowerCase() || ""; 
            let descricao = dado.descricao?.toLowerCase() || "";
            let tags = (dado.tags || []).join(' ').toLowerCase();
            let itens = dado.itens ? dado.itens.split(',').map(url => `<img src="${url.trim()}" alt="Item" class="item-imagem">`).join(' ') : '';

            // Adiciona a URL da imagem do personagem
            let imagemPersonagem = dado.imagemPersonagem ? `<img src="${dado.imagemPersonagem}" alt="${dado.titulo}" class="imagem-personagem">` : '';

            if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
                resultados += `
                    <div class="item-resultado">
                        <h2>${dado.titulo}</h2>
                        ${imagemPersonagem} <!-- Exibe a imagem do personagem -->
                        <p class="descricao-meta">${descricao}</p>
                        <div class="itens">
                            ${itens}
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Erro ao acessar propriedades do objeto:", error);
            continue; 
        }
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>";
    }

    section.innerHTML = resultados;
}
