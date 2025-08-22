const form = document.getElementById("rsvp-form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("form-status");
  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    status.style.color = ''; // Reset color
    if (response.ok) {
      status.innerHTML = "¡Gracias! Tu confirmación ha sido enviada.";
      status.style.color = "#4c6c45"; // Success color
      form.reset();
    } else {
      response.json().then(data => {
        if (data.errors) {
          status.innerHTML = data.errors.map(error => error.message).join(", ");
        } else {
          status.innerHTML = "Oops! Hubo un problema al enviar el formulario.";
        }
        status.style.color = "#8B0000"; // Error color
      });
    }
  }).catch(error => {
    status.innerHTML = "Oops! Hubo un problema al enviar el formulario.";
    status.style.color = "#8B0000"; // Error color
  });
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}