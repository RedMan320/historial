let hc = document.getElementById("hc")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let lastAppointment = document.getElementById("lastAppointment")
let box = document.getElementById("box")
let span = document.querySelectorAll(".errores")
let boxErrores = document.querySelectorAll(".box-errores-front")
let form = document.getElementById("form")
let alert = document.getElementById("alert")
let alertp = document.getElementById("alert-p")
/* Modal */
let modal = document.getElementById("myModal");
let btnModal = document.getElementById("myBtn");
let spanModal = document.getElementsByClassName("close")[0];
let btnModalSubmit = document.getElementById("btnModalSubmit")
function validateField(field, minLength, maxLength, regex) {
  const value = field.value.trim();
  const isValid = value.length >= minLength && value.length <= maxLength && regex.test(value);
  field.style.border = isValid ? "1px solid #10dc60" : "1px solid #f04141";
  isValid ? boxErrores[field.dataset.index].removeAttribute('style') : null
}
function validatesubmit() {
  const value = field.value.trim();
  const isValid = value.length >= minLength && value.length <= maxLength && regex.test(value);

}
window.addEventListener("load", () => {
  hc.addEventListener("input", () => {
    /* validateField(hc, 4, 20, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/); */
    const value = hc.value.trim();
    const isValid = value.length >= 4 && value.length <= 20 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/.test(value) && /\d/.test(value);
    hc.style.border = isValid ? "1px solid #10dc60" : "1px solid #f04141";
    isValid ? boxErrores[hc.dataset.index].removeAttribute('style') : null
    /* if (value.length >= minLength && value.length <= maxLength && regex.test(value) && /\d/.test(hc.value)) {
      field.style.border = isValid ? "1px solid #10dc60" : "1px solid #f04141";
      isValid ? boxErrores[field.dataset.index].removeAttribute('style') : null
    } */
  });

  firstname.addEventListener("input", () => {
    validateField(firstname, 2, 100, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/);
  });

  lastname.addEventListener("input", () => {
    validateField(lastname, 2, 100, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/);
  });

  lastAppointment.addEventListener("input", () => {
    const date = new Date(lastAppointment.value).toString() !== "Invalid Date"
    if (!date || /^[0-9\s]+$/.test(lastAppointment.value.trim())) {
      lastAppointment.style.border = "1px solid #f04141";
    } else {
      lastAppointment.style.border = "1px solid #10dc60";
      boxErrores[lastAppointment.dataset.index].removeAttribute('style')
    }
  });

  box.addEventListener("input", () => {
    validateField(box, 1, 50, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/);
  });

  form.addEventListener("submit", e => {
    e.preventDefault()

    const fields = [
      { element: hc, index: 0, errorMessage: "La historia clínica es obligatoria" },
      { element: firstname, index: 1, errorMessage: "El nombre es obligatorio" },
      { element: lastname, index: 2, errorMessage: "El apellido es obligatorio" },
      { element: lastAppointment, index: 3, errorMessage: "La fecha es obligatoria" },
      { element: box, index: 4, errorMessage: "La caja es obligatoria" }
    ];
    let erroresActivos = [];

    fields.forEach(field => {
      const { element, index, errorMessage } = field;
      const value = element.value.trim();


      if (value.length <= 0) {
        boxErrores[index].style.display = "flex";
        span[index].innerHTML = errorMessage;
        element.style.border = "1px solid #f04141";
        erroresActivos.push(errorMessage);
      } else {
        span[index].innerHTML = "";
        boxErrores[index].removeAttribute('style');
      }
    });

    if (erroresActivos.length === 0) {
      btnModal.onclick = function () {
        modal.style.display = "block";
      }
      spanModal.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      btnModalSubmit.onclick = (e) =>{
        form.submit();
      }
    }
  })
  // When the user clicks on the button, open the modal
  

  // When the user clicks on <span> (x), close the modal
  

  // When the user clicks anywhere outside of the modal, close it
  
})

