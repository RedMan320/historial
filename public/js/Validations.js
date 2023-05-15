let hc = document.getElementById("hc")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let lastAppointment = document.getElementById("lastAppointment")
let box = document.getElementById("box")
let span = document.querySelectorAll(".errores")
let boxErrores = document.querySelectorAll(".box-errores-front")
let form = document.getElementById("form")

function validateField(field, minLength, maxLength, regex) {
    const value = field.value.trim();
    const isValid = value.length >= minLength && value.length <= maxLength && regex.test(value);
    field.style.border = isValid ? "1px solid #10dc60" : "1px solid #f04141";
    isValid ? boxErrores[field.dataset.index].removeAttribute('style') : null
}
window.addEventListener("load",()=>{
      hc.addEventListener("input", () => {
        validateField(hc, 4, 20, /^[a-zA-Z0-9]+$/);
      });
      
      firstname.addEventListener("input", () => {
        validateField(firstname, 2, 100, /^[a-zA-Z\s]+$/);
      });
      
      lastname.addEventListener("input", () => {
        validateField(lastname, 2, 100, /^[a-zA-Z\s]+$/);
      });
      
      lastAppointment.addEventListener("input", () => {
        const date = new Date(lastAppointment.value).toString() !== "Invalid Date"
        if ( !date || /^[0-9\s]+$/.test(lastAppointment.value.trim())) {
            lastAppointment.style.border = "1px solid #f04141";
        }else{
            lastAppointment.style.border = "1px solid #10dc60";
            boxErrores[lastAppointment.dataset.index].removeAttribute('style')
        }
      });
      
      box.addEventListener("input", () => {
        validateField(box, 2, 50, /^[a-zA-Z0-9]+$/);
      });

    form.addEventListener("submit",e=>{
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
            form.submit();
        }
    })
})
