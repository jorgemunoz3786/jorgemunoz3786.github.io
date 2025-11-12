document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return; // seguridad por si el elemento no existe

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                window.location.href = `wiki.html?pokemon=${encodeURIComponent(searchTerm)}`;
            } else {
                searchInput.placeholder = 'Introduce un nombre o número válido.';
                searchInput.classList.add('input-error');
                setTimeout(() => searchInput.classList.remove('input-error'), 1500);
            }
        }
    });
});
