let hc = document.getElementById("hc")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let lastAppointment = document.getElementById("lastAppointment")
let box = document.getElementById("box")
let span = document.querySelectorAll(".errores")
let form = document.getElementById("form")

window.addEventListener("load",()=>{
    /* hc.addEventListener("input",()=>{
        if (hc.value.length <= 0) {
            span[0].innerHTML = "Debes indicar el nombre del producto"
            hc.classList.add("is-invalid")
        }else{
            span[0].innerHTML = ""
            hc.classList.remove("is-invalid")
            hc.classList.add("is-valid")
        }
    }) */
    form.addEventListener("submit",e=>{
        e.preventDefault()
        // AL ENVIAR FORMULARIO ERRORES DE NOMBRE
        if (hc.value.length <= 0) {
            span[0].style.display="flex"
            span[0].innerHTML = "La historia clinica es obligatoria"
            /* hc.classList.add("is-invalid") */
        }else{
            span[0].innerHTML = ""
            span[0].removeAttribute('style');

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
