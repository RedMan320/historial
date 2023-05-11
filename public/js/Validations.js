let hc = document.getElementById("hc")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let lastAppointment = document.getElementById("lastAppointment")
let box = document.getElementById("box")
let span = document.querySelectorAll(".errores")
let boxErrores = document.querySelectorAll(".box-errores")
let form = document.getElementById("form")

window.addEventListener("load",()=>{
    function validateField(field, minLength, maxLength, regex) {
        const value = field.value.trim();
        const isValid = value.length >= minLength && value.length <= maxLength && regex.test(value);
        field.style.border = isValid ? "1px solid #10dc60" : "1px solid #f04141";
        boxErrores[field.dataset.index].style.display = isValid ? "none" : "flex";
      }
      
      hc.addEventListener("input", () => {
        validateField(hc, 6, 20, /^[a-zA-Z0-9]+$/);
      });
      
      firstname.addEventListener("input", () => {
        validateField(firstname, 6, 100, /^[a-zA-Z]+$/);
      });
      
      lastname.addEventListener("input", () => {
        validateField(lastname, 6, 100, /^[a-zA-Z]+$/);
      });
      
      lastAppointment.addEventListener("input", () => {
        const date = new Date(lastAppointment.value).toString() !== "Invalid Date"
        if ( !date || /^[0-9\s]+$/.test(lastAppointment.value.trim())) {
            lastAppointment.style.border = "1px solid #f04141";
        }else{
            lastAppointment.style.border = "1px solid #10dc60";
            boxErrores[3].style.display="none"
        }
      });
      
      box.addEventListener("input", () => {
        validateField(box, 4, 50, /^[a-zA-Z0-9]+$/);
      });
      

    form.addEventListener("submit",e=>{
        e.preventDefault()
        // AL ENVIAR FORMULARIO ERRORES DE NOMBRE
        if (hc.value.length <= 0) {
            boxErrores[0].style.display="flex"
            span[0].innerHTML = "La historia clinica es obligatoria"
            hc.style.border = "1px solid #f04141";
        }else{
            span[0].innerHTML = ""
            boxErrores[0].removeAttribute('style');
        }

        if (firstname.value.length <= 0) {
            boxErrores[1].style.display="flex"
            span[1].innerHTML = "El nombre es obligatorio"
            firstname.style.border = "1px solid #f04141";
        }else{
            span[1].innerHTML = ""
            boxErrores[1].removeAttribute('style');
        }
        if (lastname.value.length <= 0) {
            boxErrores[2].style.display="flex"
            span[2].innerHTML = "El apellido es obligatorio"
            lastname.style.border = "1px solid #f04141";
        }else{
            span[2].innerHTML = ""
            boxErrores[2].removeAttribute('style');
        }
        if (lastAppointment.value.length <= 0) {
            boxErrores[3].style.display="flex"
            span[3].innerHTML = "La fecha es obligatoria"
            lastAppointment.style.border = "1px solid #f04141";
        }else{
            span[3].innerHTML = ""
            boxErrores[3].removeAttribute('style');
        }
        if (box.value.length <= 0) {
            boxErrores[4].style.display="flex"
            span[4].innerHTML = "La caja es obligatoria"
            box.style.border = "1px solid #f04141";
        }else{
            span[4].innerHTML = ""
            boxErrores[4].removeAttribute('style');
        }

        let erroresActivos = []
        span.forEach(error =>{ 
            if (error.textContent != "") {
                erroresActivos.push(error.textContent)
                e.preventDefault()
            }
        })
        console.log(erroresActivos)
        erroresActivos.length != 0 ? e.preventDefault() : form.submit()
    })
})
