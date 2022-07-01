'use strict';

const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.close-modal');
const buttons = document.querySelectorAll('.show-modal');
const overlay = document.querySelector('.overlay');

const hideModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


closeModal.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

document.addEventListener('keyup', function(event) {
    if(event.key === 'Escape' || event.key === 'Enter' && !modal.classList.contains('hidden')) 
            hideModal();
    }
)