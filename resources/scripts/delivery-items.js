document.addEventListener("DOMContentLoaded", function () {
    const deliveryOptions = document.querySelectorAll('input[name="deliveryMethod"]');
    const collapsibleSections = {
        home: new bootstrap.Collapse(document.getElementById("address_info"), { toggle: false }),
        zbox: new bootstrap.Collapse(document.getElementById("drop_box_locations"), { toggle: false }),
        store: new bootstrap.Collapse(document.getElementById("store_pickup_locations"), { toggle: false }),
    };

    const subOptions = {
        dropBox: document.querySelectorAll('input[name="dropBox"]'),
        storePickup: document.querySelectorAll('input[name="storePickup"]')
    };

    const addressFields = document.querySelectorAll('#address_info input');

    deliveryOptions.forEach(option => {
        option.addEventListener("change", function () {
            Object.keys(collapsibleSections).forEach(key => {
                if (key !== this.value) {
                    collapsibleSections[key].hide();
                }
            });

            Object.values(subOptions).forEach(options => {
                options.forEach(input => {
                    input.checked = false;
                });
            });

            addressFields.forEach(input => {
                input.value = "";
            });
        });
    });
});
