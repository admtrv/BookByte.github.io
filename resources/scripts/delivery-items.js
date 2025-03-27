document.addEventListener("DOMContentLoaded", function () {
    const deliveryOptions = document.querySelectorAll('input[name="deliveryMethod"]');
    const collapsibleSections = {
        home: document.getElementById("address_info"),
        zbox: document.getElementById("drop_box_locations"),
        store: document.getElementById("store_pickup_locations"),
    };

    const collapses = {
        home: new bootstrap.Collapse(collapsibleSections.home, { toggle: false }),
        zbox: new bootstrap.Collapse(collapsibleSections.zbox, { toggle: false }),
        store: new bootstrap.Collapse(collapsibleSections.store, { toggle: false }),
    };

    const subOptions = {
        dropBox: document.querySelectorAll('input[name="dropBox"]'),
        storePickup: document.querySelectorAll('input[name="storePickup"]')
    };

    const personalInfo = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email_address: ""
    };

    function createPersonalInfoForm() {
        const container = document.createElement("div");
        container.classList.add("personal-info-fields-container", "mb-3");

        container.innerHTML = `
            <label for="first_name" class="form-label">First name</label>
            <input type="text" class="form-control mb-2" id="first_name" name="first_name" placeholder="Enter your first name" value="${personalInfo.first_name}" required>
    
            <label for="last_name" class="form-label">Last name</label>
            <input type="text" class="form-control mb-2" id="last_name" name="last_name" placeholder="Enter your last name" value="${personalInfo.last_name}" required>
    
            <label for="phone_number" class="form-label">Phone number</label>
            <input type="text" class="form-control mb-2" id="phone_number" name="phone_number" placeholder="Enter your phone number" value="${personalInfo.phone_number}" required>
    
            <label for="email_address" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email_address" name="email_address" placeholder="Enter your email address" value="${personalInfo.email_address}" required>
        `;

        container.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", () => {
                personalInfo[input.name] = input.value;
            });
        });

        return container;
    }


    deliveryOptions.forEach(option => {
        option.addEventListener("change", function () {
            const selected = this.value;

            Object.keys(collapsibleSections).forEach(key => {
                if (key !== selected) {
                    collapses[key].hide();
                    const oldForm = collapsibleSections[key].querySelector(".personal-info-fields-container");
                    if (oldForm) oldForm.remove();
                }
            });

            collapses[selected].show();

            const target = collapsibleSections[selected];
            const alreadyHas = target.querySelector(".personal-info-fields-container");

            if (!alreadyHas) {
                const wrapper = document.createElement("div");
                wrapper.classList.add("personal-info-fields-container", "mb-3");
                wrapper.appendChild(createPersonalInfoForm());
                target.insertBefore(wrapper, target.firstChild);
            }

            Object.values(subOptions).forEach(options => {
                options.forEach(input => {
                    input.checked = false;
                });
            });
        });
    });
});
