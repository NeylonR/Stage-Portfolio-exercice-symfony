const getButtonModal = document.querySelectorAll('.buttonModal');
const getModal = document.getElementById('modal');
const getModalContent = document.querySelector('.modalContent');
const getCloseButton = document.getElementById('closeButton');

// sur chaque 'en savoir plus' ajout d'un eventListener au click
getButtonModal.forEach(buttonModal => {
    buttonModal.addEventListener("click", function(e){
        // rajout de classe open pour faire apparaitre le modal
        getModal.classList.toggle('open');
        // récupération des éléments du dom selon la project card lié au button
        const getImg = buttonModal.parentElement.querySelector('img').src;
        const getTitle = buttonModal.parentElement.querySelector('h4').textContent;
        const getDescription = buttonModal.parentElement.querySelector('.description').textContent;
        const getDemo = buttonModal.parentElement.querySelector('.demo').getAttribute("href");
        const getGithub = buttonModal.parentElement.querySelector('.github').getAttribute("href");
        const getTagsLi = buttonModal.parentElement.querySelectorAll('li');
        
        const getTagsModal = getModalContent.querySelectorAll('li');
        // retrait des li déjà présent si au moins 1 li est déjà présent dans la liste du modal
        if(getTagsModal.length > 0){
            getTagsModal.forEach(element => {
                element.remove();
            });
        }
        
        // rajout du contenu au modal
        getModalContent.querySelector('img').src = getImg;
        getModalContent.querySelector('h2').textContent = getTitle;
        getModalContent.querySelector('.description').textContent = getDescription;
        getModalContent.querySelector('.demo').href = getDemo;
        getModalContent.querySelector('.github').href = getGithub;

        // pour chaque li > rajout dans le dom
        getTagsLi.forEach(li => {
            const createLi = document.createElement('li');
            createLi.textContent = li.textContent;
            const getUl = document.getElementById('ulModal');
            getUl.appendChild(createLi);
        });
    })
    
});

getCloseButton.addEventListener("click", function(){
    getModal.classList.toggle('open');
})


// js pour le burger button de la version mobile
const getBurgerButton = document.getElementById('burgerButton');
const getBurger = document.getElementById('burger');
const getBurgerNavbar = document.getElementById('navbar');

// lors du click sur le burger button > rajout si non présent/retrait si déjà présent de la classe "active" 
getBurgerButton.addEventListener('click', function() {
    getBurger.classList.toggle('active');
    getBurgerNavbar.classList.toggle('active');
})

// Media query pour afficher la navbar mode desktop si la page à une width supérieur a 900px
if (window.matchMedia("(min-width: 900px)").matches) {
    document.getElementById('navbar').classList.add("active");
};