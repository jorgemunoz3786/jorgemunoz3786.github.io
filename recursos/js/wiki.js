document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('pokemon');
    const pokemonInfo = document.getElementById('pokemonInfo');
    
    if (pokemonName) {
        pokemonInfo.innerHTML = '<p>Cargando información...</p>';
        
        // Fetch básico del Pokémon
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(response => {
                if (!response.ok) throw new Error('Pokemon no encontrado');
                return response.json();
            })
            .then(data => {
                // Luego pedimos la especie para obtener la descripción
                return fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`)
                    .then(response => response.json())
                    .then(speciesData => ({ data, speciesData }));
            })
            .then(({ data, speciesData }) => {
                // Extraer descripción en español (si existe)
                const entry = speciesData.flavor_text_entries.find(e => e.language.name === 'es');
                const description = entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Descripción no disponible.';

                const pokemonHtml = `
                    <div class="pokemon-card">
                        <h2>${capitalizeFirstLetter(data.name)} #${data.id}</h2>
                        <div class="pokemon-images">
                            <img src="${data.sprites.front_default}" alt="${data.name} front" class="pokemon-sprite">
                        </div>
                        <div class="pokemon-types">
                            <h3>Tipos:</h3>
                            <div class="type-list">
                                ${data.types.map(type => `
                                    <span class="type ${type.type.name}">
                                        ${capitalizeFirstLetter(type.type.name)}
                                    </span>`).join('')}
                            </div>
                        </div>
                        <div class="pokemon-stats">
                            <h3>Estadísticas:</h3>
                            ${data.stats.map(stat => {
                                const maxForBar = 200;
                                const pct = Math.min(stat.base_stat, maxForBar) / maxForBar * 100;
                                return `
                                    <div class="stat-row">
                                        <span class="stat-name">${formatStatName(stat.stat.name)}:</span>
                                        <div class="stat-bar-container">
                                            <div class="stat-bar" style="width: ${pct.toFixed(1)}%">
                                                ${stat.base_stat}
                                            </div>
                                        </div>
                                    </div>`;
                            }).join('')}
                        </div>
                        <div class="pokemon-info-grid">
                            <div class="info-item">
                                <h3>Altura:</h3>
                                <p>${(data.height / 10).toFixed(1)} m</p>
                            </div>
                            <div class="info-item">
                                <h3>Peso:</h3>
                                <p>${(data.weight / 10).toFixed(1)} kg</p>
                            </div>
                            <div class="info-item">
                                <h3>Habilidades:</h3>
                                <p>${data.abilities.map(a => translateAbility(a.ability.name)).join(', ')}</p>
                            </div>
                        </div>
                        <div class="pokemon-description">
                            <h3>Descripción:</h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                pokemonInfo.innerHTML = pokemonHtml;
            })
            .catch(error => {
                pokemonInfo.innerHTML = '<p class="error">Pokémon no encontrado o error al cargar los datos.</p>';
                console.error(error);
            });
    }
});

// --- Funciones auxiliares ---
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function translateAbility(abilityName) {
    const abilityTranslations = {
        'stench': 'Hedor', 'drizzle': 'Llovizna', 'speed-boost': 'Impulso',
        'battle-armor': 'Armadura Batalla', 'sturdy': 'Robustez', 'damp': 'Humedad',
        'limber': 'Flexibilidad', 'sand-veil': 'Velo Arena', 'static': 'Electricidad Estática',
        'volt-absorb': 'Absorbe Electricidad', 'water-absorb': 'Absorbe Agua',
        'oblivious': 'Despiste', 'cloud-nine': 'Aclimatación', 'compound-eyes': 'Ojo Compuesto',
        'insomnia': 'Insomnio', 'color-change': 'Cambio Color', 'immunity': 'Inmunidad',
        'flash-fire': 'Absorbe Fuego', 'shield-dust': 'Polvo Escudo', 'own-tempo': 'Ritmo Propio',
        'suction-cups': 'Ventosas', 'intimidate': 'Intimidación', 'shadow-tag': 'Sombra Trampa',
        'rough-skin': 'Piel Tosca', 'wonder-guard': 'Superguarda', 'levitate': 'Levitación',
        'effect-spore': 'Efecto Espora', 'synchronize': 'Sincronía', 'clear-body': 'Cuerpo Puro',
        'natural-cure': 'Cura Natural', 'lightning-rod': 'Pararrayos', 'serene-grace': 'Dicha',
        'swift-swim': 'Nado Rápido', 'chlorophyll': 'Clorofila', 'illuminate': 'Iluminación',
        'trace': 'Rastro', 'huge-power': 'Potencia', 'poison-point': 'Punto Tóxico',
        'inner-focus': 'Foco Interno', 'magma-armor': 'Escudo Magma', 'water-veil': 'Velo Agua',
        'magnet-pull': 'Imán', 'soundproof': 'Insonorizar', 'rain-dish': 'Cura Lluvia',
        'sand-stream': 'Chorro Arena', 'pressure': 'Presión', 'thick-fat': 'Sebo',
        'early-bird': 'Madrugar', 'flame-body': 'Cuerpo Llama', 'run-away': 'Fuga',
        'keen-eye': 'Vista Lince', 'hyper-cutter': 'Corte Fuerte', 'pickup': 'Recogida',
        'truant': 'Ausente', 'hustle': 'Entusiasmo', 'cute-charm': 'Encanto',
        'plus': 'Más', 'minus': 'Menos', 'forecast': 'Predicción', 'sticky-hold': 'Viscosidad',
        'shed-skin': 'Mudar', 'guts': 'Agallas', 'marvel-scale': 'Escama Especial',
        'liquid-ooze': 'Lodo Líquido', 'overgrow': 'Espesura', 'blaze': 'Mar Llamas',
        'torrent': 'Torrente', 'swarm': 'Enjambre', 'rock-head': 'Cabeza Roca',
        'drought': 'Sequía', 'arena-trap': 'Trampa Arena', 'vital-spirit': 'Espíritu Vital',
        'white-smoke': 'Humo Blanco', 'pure-power': 'Energía Pura', 'shell-armor': 'Caparazón',
        'air-lock': 'Bucle Aire', 'tangled-feet': 'Tumbos', 'motor-drive': 'Motor Fuerte',
        'rivalry': 'Rivalidad', 'steadfast': 'Impasible', 'snow-cloak': 'Manto Níveo',
        'gluttony': 'Gula', 'anger-point': 'Irascible', 'unburden': 'Liviano',
        'heatproof': 'Ignífugo', 'simple': 'Simple', 'dry-skin': 'Piel Seca',
        'download': 'Descarga', 'iron-fist': 'Puño Férreo', 'poison-heal': 'Antídoto',
        'adaptability': 'Adaptable', 'skill-link': 'Encadenado', 'hydration': 'Hidratación',
        'solar-power': 'Poder Solar', 'quick-feet': 'Pies Rápidos', 'normalize': 'Normalidad',
        'sniper': 'Francotirador', 'magic-guard': 'Muro Mágico', 'no-guard': 'Indefenso',
        'stall': 'Rezagado', 'technician': 'Experto', 'leaf-guard': 'Defensa Hoja',
        'klutz': 'Zoquete', 'mold-breaker': 'Rompemoldes', 'super-luck': 'Afortunado',
        'aftermath': 'Detonación', 'anticipation': 'Anticipación', 'forewarn': 'Alerta',
        'unaware': 'Ignorante', 'tinted-lens': 'Tinta Lente', 'filter': 'Filtro',
        'slow-start': 'Inicio Lento', 'scrappy': 'Intrépido', 'storm-drain': 'Colector',
        'ice-body': 'Cuerpo Helado', 'solid-rock': 'Roca Sólida', 'snow-warning': 'Nieve',
        'honey-gather': 'Recogemiel', 'frisk': 'Cacheo', 'reckless': 'Audaz',
        'multitype': 'Multitipo', 'flower-gift': 'Don Floral', 'bad-dreams': 'Mal Sueño'
    };
    return abilityTranslations[abilityName] || capitalizeFirstLetter(abilityName.replace(/-/g, ' '));
}

function formatStatName(statName) {
    const statNames = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        'speed': 'Velocidad'
    };
    return statNames[statName] || statName;
}
