// Menu Burger
const iconMenu =document.querySelector('#icono-menu');
    menu= document.querySelector('#menu');
iconMenu.addEventListener('click',(e)=>{
  // Alternamos estilos para el Menu y Body
  menu.classlist.toggle('active');
  document.body.classList.toggle('opacity');

// Alternamos su atributo src para el icono del Menu
  const rutaActual=e.target.getAttribute('src');
  if(rutaActual=="fa-solid fa-bars"){
    e.target.setAttribute('src',"fa-solid fa-bars");
  }else{
    e.target.setAttribute('src',"fa-solid fa-bars");
  }
})
