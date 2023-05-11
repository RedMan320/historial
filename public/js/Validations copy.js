let hc = document.getElementById("hc")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let lastAppointment = document.getElementById("lastAppointment")
let box = document.getElementById("box")
let span = document.querySelectorAll(".errores")
let boxErrores = document.querySelectorAll(".box-errores")
let form = document.getElementById("form")

window.addEventListener("load",()=>{
    hc.addEventListener("input",()=>{
        if (hc.value.trim().length < 6 || hc.value.trim().length > 20 || !/^[a-zA-Z0-9]+$/.test(hc.value.trim())) {
            hc.style.border = "1px solid #f04141";
        }else{
            hc.style.border = "1px solid #10dc60";
            boxErrores[0].style.display="none"
        }
    })
    firstname.addEventListener("input",()=>{
        if (firstname.value.trim().length < 6 || firstname.value.trim().length > 100 || !/^[a-zA-Z]+$/.test(firstname.value.trim())) {
            firstname.style.border = "1px solid #f04141";
        }else{
            firstname.style.border = "1px solid #10dc60";
            boxErrores[1].style.display="none"
        }
    })
    lastname.addEventListener("input",()=>{
        if (lastname.value.trim().length < 6 || lastname.value.trim().length > 100 || !/^[a-zA-Z]+$/.test(lastname.value.trim())) {
            lastname.style.border = "1px solid #f04141";
        }else{
            lastname.style.border = "1px solid #10dc60";
            boxErrores[2].style.display="none"
        }
    })
    lastAppointment.addEventListener("input",()=>{
        const date = new Date(lastAppointment.value).toString() !== "Invalid Date"
        if ( !date || /^[0-9\s]+$/.test(lastAppointment.value.trim())) {
            lastAppointment.style.border = "1px solid #f04141";
        }else{
            lastAppointment.style.border = "1px solid #10dc60";
            boxErrores[3].style.display="none"
        }
    })
    box.addEventListener("input",()=>{
        if (box.value.trim().length < 4 || box.value.trim().length > 50 || !/^[a-zA-Z0-9]+$/.test(box.value.trim())) {
            box.style.border = "1px solid #f04141";
        }else{
            box.style.border = "1px solid #10dc60";
            boxErrores[4].style.display="none"
        }
    })


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
