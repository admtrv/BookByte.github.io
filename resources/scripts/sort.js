var priceSlider = document.getElementById('priceSlider');
var priceMinLabel = document.getElementById('priceMinLabel');
var priceMaxLabel = document.getElementById('priceMaxLabel');

noUiSlider.create(priceSlider, {
    start: [3, 42],
    connect: true,
    range: {
        'min': 3,
        'max': 42
    },
    step: 1,
    tooltips: false,
    format: {
        to: function (value) {
            return Math.round(value) + '€';
        },
        from: function (value) {
            return Number(value.replace('€', ''));
        }
    }
});

priceSlider.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
        priceMinLabel.textContent = values[0];
    } else {
        priceMaxLabel.textContent = values[1];
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get("sort");

    const sortSelect = document.getElementById("sortSelect");
    if (sortParam && sortSelect) {
        sortSelect.value = sortParam;
    }
});