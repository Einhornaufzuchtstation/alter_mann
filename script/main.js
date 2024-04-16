$(document).ready(function () {
    const wrapper = $('#wrapper');

    // Function to sort the cards
    function sortCards(yearAscending) {
        const sortedData = [...rocketData].sort((a, b) => {
            return yearAscending ? a.year_built - b.year_built : b.year_built - a.year_built;
        });
        renderCards(sortedData);
    }

    // Function to render cards
    function renderCards(data) {
        wrapper.empty(); // Clear the wrapper before appending sorted cards
        data.forEach(rocket => {
            const imageName = rocket.name.toLowerCase().replace(/\s+/g, '_') + '.webp';
            const imageUrl = `images/${imageName}`;

            const card = $(`
            <div class="max-w-xs mx-auto">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <span class="text-indigo-800 font-semibold text-lg">${rocket.group_letter}${rocket.number}</span>
                        <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">${rocket.year_built}</span>
                    </div>
                    <h3 class="text-xl font-bold my-2">${rocket.name}</h3>
                    <p class="text-gray-600 text-sm">${rocket.group}</p>
                </div>
                <img class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" src="${imageUrl}" alt="${rocket.name}">
                <div class="p-4 bg-gray-100">
                    <ul class="space-y-2">
                        <li class="flex justify-between items-center text-sm">
                            <span class="text-gray-700">Mission Goal:</span>
                            <span class="font-semibold">${rocket.mission_goal}</span>
                        </li>
                        <li class="flex justify-between items-center text-sm">
                            <span class="text-gray-700">Mission Duration:</span>
                            <span class="font-semibold">${rocket.mission_duration}</span>
                        </li>
                        <li class="flex justify-between items-center text-sm">
                            <span class="text-gray-700">Max Speed:</span>
                            <span class="font-semibold">${rocket.max_speed}</span>
                        </li>
                        <li class="flex justify-between items-center text-sm">
                            <span class="text-gray-700">Max Earth Distance:</span>
                            <span class="font-semibold">${rocket.max_earth_distance}</span>
                        </li>
                        <li class="flex justify-between items-center text-sm">
                            <span class="text-gray-700">Development Cost:</span>
                            <span class="font-semibold">${rocket.development_cost}</span>
                        </li>
                        <li class="flex justify-between items-center text-sm">
                            <span class="text-gray-700">Weight:</span>
                            <span class="font-semibold">${rocket.weight}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            `); // Keep your existing card structure here
            wrapper.append(card);
        });
    }

    // Initial render
    renderCards(rocketData);

    // Menu bar structure with sort options
    const menuBar = $(`
        <div class="w-full bg-gray-800 text-white p-4">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <h1 class="text-xl font-bold">Rocket Cards</h1>
                <div>
                    <label for="sort-select" class="mr-2">Sort by Year:</label>
                    <select id="sort-select" class="bg-gray-700 text-white p-2 rounded">
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    `);

    // Event listener for the sort select menu
    menuBar.find('#sort-select').change(function () {
        const sortValue = $(this).val();
        sortCards(sortValue === 'ascending');
    });

    // Prepend the menu bar to the body or another container as needed
    $('body').prepend(menuBar);

    // Call the sort function with the initial sort order if needed
    sortCards(true); // or sortCards(false) for descending
});
