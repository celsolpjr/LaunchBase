const modalOverlay = document.querySelector( " .modal-overlay " );
const modal = document.querySelector( ".modal" );
const cards = document.querySelectorAll( " .card " );
const closeModal = document.querySelector( " .close-modal " );
const maximizeModal = document.querySelector( " .maximize-modal " );

for ( let card of cards ) {
    card.addEventListener( "click", function() { 
        const videoId = card.getAttribute( "id" );
        modalOverlay.classList.add( "active" );
        modalOverlay.querySelector( "iframe" ).src = `https://blog.rocketseat.com.br/${ videoId }`;
     } )
}

closeModal.addEventListener( "click",  function() { 
    modalOverlay.classList.remove( "active" );
    modalOverlay.querySelector( "iframe" ).src = "  ";
    if ( modal.classList.contains( "maximize" ) ) {
        modal.classList.remove( "maximize" );
    } 
 })

 maximizeModal.addEventListener( "click", function() { 
     modal.classList.add( "maximize" );
  } )