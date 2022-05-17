//varaibles

const btnEnviar=document.querySelector('#enviar');
const Btnreset = document.querySelector('#resetBtn');
const formulario=document.querySelector('#enviar-mail');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//funciones
eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded',iniciarApp);
    
    
    
    //campos del formulario
    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    // Boton de reset
    Btnreset.addEventListener('click', resetear);
     // Boton de enviar en el submit
     formulario.addEventListener('submit', enviarEmail);
    

}

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//valida el formulario

function validarFormulario(e){

     
    if(e.target.value.length > 0 ) {
        const error=document.querySelector('p.error');
        if(error){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
   } else {
    e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError("Todos los campos son requeridos");
   }

   if(e.target.type==='email'){
   
    if(re.test(e.target.value)){
        const error=document.querySelector('p.error');
        if(error){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{

        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError("Email no valido");
    }
   }

   if(re.test(email.value) && asunto.value !== '' && mensaje.value !== '' ) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('opacity-50');
    btnEnviar.classList.remove('cursor-not-allowed');
 }
}


function mostrarError(mensaje){

    const mensajeError=document.createElement('p');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('border', 'border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');

    const errores=document.querySelectorAll('.error');

    if(errores.length===0) {
        formulario.appendChild(mensajeError);
    }
   
}


// Cuando se envia el correo
function enviarEmail(e) {

    e.preventDefault();


     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

    

     // Ocultar Spinner y mostrar gif de enviado
     setTimeout( () => {
          spinner.style.display = 'none';
 // Gif que envia email
            const parrafo = document.createElement('p');
            parrafo.textContent = 'Mensaje Enviado Correctamente';
            parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')
         
            formulario.insertBefore(parrafo,spinner);

          setTimeout(() =>  {
               parrafo.remove();
               formularioresetear();
          }, 5000);
     }, 3000); 
}


function formularioresetear(){
    formulario.reset();
    iniciarApp();
}

function resetear(e){
    formulario.reset();
    e.preventDefault();
    iniciarApp();
}