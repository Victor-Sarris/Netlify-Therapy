// Função para controlar a sidebar automaticamente durante a pesquisa

        function toggleSidebarForSearch() {
            const sidebar = document.getElementById('sidebar');
            const mainContainer = document.querySelector('.main-container');
            const searchInput = document.getElementById('searchInput');
            const specialtyFilter = document.getElementById('specialtyFilter');
            const locationFilter = document.getElementById('locationFilter');
            const priceFilter = document.getElementById('priceFilter');
            
            const searchTerm = searchInput.value.trim();
            const hasSpecialtyFilter = specialtyFilter.value !== '';
            const hasLocationFilter = locationFilter.value !== '';
            const hasPriceFilter = priceFilter.value !== '';
            
            // Se há qualquer tipo de pesquisa ou filtro ativo, recolhe a sidebar
            if (searchTerm.length > 0 || hasSpecialtyFilter || hasLocationFilter || hasPriceFilter) {
                sidebar.classList.add('collapsed');
                mainContainer.classList.add('sidebar-collapsed');
            } else {
                // Se não há nenhuma pesquisa ou filtro, expande a sidebar
                sidebar.classList.remove('collapsed');
                mainContainer.classList.remove('sidebar-collapsed');
            }
        }
        
        // Função para realizar a pesquisa
        function performSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const specialtyFilter = document.getElementById('specialtyFilter').value.toLowerCase();
            const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
            const priceFilter = document.getElementById('priceFilter').value;
            
            // Controla a sidebar baseado na pesquisa
            toggleSidebarForSearch();
            
            const specialistCards = document.querySelectorAll('.specialist-card');
            
            specialistCards.forEach(card => {
                let showCard = true;
                
                // Pesquisa por texto (nome, descrição, especialidade)
                if (searchTerm) {
                    const cardText = card.textContent.toLowerCase();
                    if (!cardText.includes(searchTerm)) {
                        showCard = false;
                    }
                }
                
                // Filtro por especialidade
                if (specialtyFilter && showCard) {
                    const title = card.querySelector('.title').textContent.toLowerCase();
                    if (!title.includes(specialtyFilter)) {
                        showCard = false;
                    }
                }
                
                // Filtro por localização
                if (locationFilter && showCard) {
                    const address = card.querySelector('.address').textContent.toLowerCase();
                    if (!address.includes(locationFilter)) {
                        showCard = false;
                    }
                }
                
                // Filtro por preço
                if (priceFilter && showCard) {
                    const priceText = card.querySelector('.price').textContent;
                    const price = parseInt(priceText.replace('R$ ', ''));
                    
                    switch(priceFilter) {
                        case '0-100':
                            if (price > 100) showCard = false;
                            break;
                        case '100-150':
                            if (price < 100 || price > 150) showCard = false;
                            break;
                        case '150-200':
                            if (price < 150 || price > 200) showCard = false;
                            break;
                        case '200+':
                            if (price < 200) showCard = false;
                            break;
                    }
                }
                
                // Mostra ou esconde o card
                card.style.display = showCard ? 'grid' : 'none';
            });
            
            // Atualiza o título da página
            const pageTitle = document.querySelector('.page-title');
            if (searchTerm || specialtyFilter || locationFilter || priceFilter) {
                pageTitle.textContent = 'Resultados da sua busca';
            } else {
                pageTitle.textContent = 'Você buscou por esses Especialistas';
            }
        }
        
        // Pesquisa em tempo real
        document.getElementById('searchInput').addEventListener('input', performSearch);
        document.getElementById('specialtyFilter').addEventListener('change', performSearch);
        document.getElementById('locationFilter').addEventListener('change', performSearch);
        document.getElementById('priceFilter').addEventListener('change', performSearch);
        
        // Pesquisa ao pressionar Enter
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Limpar filtros
        function clearFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('specialtyFilter').value = '';
            document.getElementById('locationFilter').value = '';
            document.getElementById('priceFilter').value = '';
            performSearch();
        }
        
        // Inicializa a sidebar expandida ao carregar a página
        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const mainContainer = document.querySelector('.main-container');
            
            // Garante que a sidebar começa expandida
            sidebar.classList.remove('collapsed');
            mainContainer.classList.remove('sidebar-collapsed');
        });





/*
Código para criacao de modal sobre o especialista
*/

// Abrir modal ao clicar em "Agendar Consulta"
document.querySelectorAll('.btn-more').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('consultaModal').style.display = 'flex';
    });
});

// Fechar modal
function fecharModal() {
    document.getElementById('consultaModal').style.display = 'none';
}
