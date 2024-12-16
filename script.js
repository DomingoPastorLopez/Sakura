const productos = [
    {
        id: 1,
        nombre: "Sushi",
        imagen: "Imagen/sushi.png",
        descripcionCorta: "Variedad de sushi tradicional y moderno.",
        descripcionLarga: "Nuestro sushi se sirve con salsa de soya, wasabi y jengibre encurtido.",
        salsas: "Salsa de soya, Wasabi, Jengibre encurtido"
    },
    {
        id: 2,
        nombre: "Ramen",
        imagen: "Imagen/ramen.png",
        descripcionCorta: "Ramen caliente con los mejores ingredientes.",
        descripcionLarga: "El ramen incluye caldo miso o soya, cebollín fresco y huevo marinado.",
        salsas: "Caldo miso, Salsa de soya, Picante opcional"
    },
    {
        id: 3,
        nombre: "Takoyaki",
        imagen: "Imagen/tako.png",
        descripcionCorta: "Takoyaki de pulpo o verdura.",
        descripcionLarga: "Se sirve con salsa takoyaki, mayonesa japonesa y hojuelas de bonito.",
        salsas: "Salsa takoyaki, Mayonesa japonesa, Katsuobushi"
    }
];


function cargarProductos() {
    const menu = document.querySelector("#menu .productos");
    menu.innerHTML = "";
    productos.forEach(producto => {
        const card = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcionCorta}</p>
                <button class="toggle-descripcion" data-id="${producto.id}">Ver más</button>
                <div class="descripcion-adicional" id="descripcion-${producto.id}">
                    <p><strong>Detalles:</strong> ${producto.descripcionLarga}</p>
                    <p><strong>Salsas:</strong> ${producto.salsas}</p>
                </div>
            </div>
        `;
        menu.innerHTML += card;
    });

    document.querySelectorAll(".toggle-descripcion").forEach(boton => {
        boton.addEventListener("click", (e) => {
            toggleDescripcion(e.target);
        });
    });
}

function toggleDescripcion(boton) {
    const id = boton.dataset.id;
    const descripcion = document.querySelector(`#descripcion-${id}`);
    descripcion.style.display = descripcion.style.display === "block" ? "none" : "block";
    boton.textContent = descripcion.style.display === "block" ? "Ver menos" : "Ver más";
}

document.addEventListener("DOMContentLoaded", cargarProductos);
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reservaForm");
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const errorMessage = input.nextElementSibling;
            if (input.validity.valid) {
                errorMessage.textContent = "";
                input.style.borderColor = "green";
            } else {
                showError(input, errorMessage);
            }
        });
    });

    form.addEventListener("submit", (e) => {
        let formIsValid = true;
        inputs.forEach((input) => {
            const errorMessage = input.nextElementSibling;
            if (!input.validity.valid) {
                showError(input, errorMessage);
                formIsValid = false;
            }
        });
        if (!formIsValid) {
            e.preventDefault(); 
            alert("Por favor, completa los campos correctamente.");
        }
    });

    function showError(input, errorMessage) {
        if (input.validity.valueMissing) {
            errorMessage.textContent = "Este campo es obligatorio.";
        } else if (input.validity.typeMismatch) {
            errorMessage.textContent = "Ingresa un formato válido.";
        } else if (input.validity.rangeUnderflow) {
            errorMessage.textContent = "El número debe ser mayor a 0.";
        }
        input.style.borderColor = "red";
    }
});
