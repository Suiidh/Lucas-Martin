/** DÉFINITION DE LA CLASS POUR CRÉATION DE COMPTE **/
class CompteBancaire {
    constructor(proprietaire, numeroCompte, solde) {
        this.proprietaire = proprietaire;
        this.numeroCompte = numeroCompte;
        this.solde = solde;
    }
}

/** CRÉATION DU TABLEAU POUR REGROUPER LES COMPTES **/
let comptes = [];


/** DÉFINITION DES CONSTANTE AVEC ÉLÉMENTS HTML **/
const btnCompte = document.querySelector('#form-accompte');
const btnDepot = document.querySelector('#form-depot');
const content = document.querySelector('.content');
const btnClose = document.querySelector('#close');

/** SUPPRESSION DES FORMULAIRES INUTILES **/


/** ENLEVER LES DIVS RESPONSE **/


/** Response Compte **/

function ResponseCompte(Color, titleValue, textValue) {
    const div = document.createElement('div');
    div.classList.add('content-response');
    div.setAttribute('id', 'result-compte');
    div.style.background = Color;

    const title = document.createElement('h2');
    title.innerText = titleValue;

    const text = document.createElement('p');
    text.innerText = textValue
    div.append(title, text);

    content.appendChild(div);
}







/** CRÉATION DU COMPTE **/
function creationCompte(proprietaire, numeroCompte, solde) {
    let newcomptes = new CompteBancaire(proprietaire, numeroCompte, solde);
    comptes.push(newcomptes);
}

function verifCompte(nom, numeroCompte) {

    if (document.querySelector('#result-compte')) {
        document.querySelector('#result-compte').remove();
    }

    const found = comptes.find((compte) => compte.numeroCompte == numeroCompte);
    if (found) {
        ResponseCompte('red', 'erreur', 'Ce compte existe déjà');

    } else {

        ResponseCompte('green', 'Success', 'Votre compte a bien été créé au nom de ' + nom + ' avec le numéro de compte ' + numeroCompte);
        creationCompte(nom, numeroCompte, 0);
        console.log(comptes);
    }
}



/** FONCTION PRINCIPALE CRÉATION D'ACCOMPTE **/
function createFormCompte() {

    if (document.querySelector('#form-accompte.form')) {
        document.querySelector('#form-accompte.form').remove();
    }
    if (document.querySelector('#form-depot.form')) {
        document.querySelector('#form-depot.form').remove();
    }
    if (document.querySelector('#result-compte')) {
        document.querySelector('#result-compte').remove();
    }
    if (document.querySelector('#result-depot.content-response')) {
        document.querySelector('#result-depot.content-response').remove();
    }

    const div = document.createElement('div');
    div.classList.add('form');
    div.setAttribute('id', 'form-accompte');

    const title = document.createElement('h2');
    title.innerText = 'Créer un compte';

    const groupInput = document.createElement('div');
    groupInput.classList.add('input-content');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Entrez votre prénom');

    const input2 = document.createElement('input');
    input2.setAttribute('type', 'number');
    input2.setAttribute('placeholder', 'Numéro de compte');

    const btnForm = document.createElement('button');
    btnForm.setAttribute('type', 'submit');
    btnForm.innerText = 'Créer un compte';

    groupInput.append(input, input2, btnForm);

    div.append(title, groupInput);

    content.appendChild(div);

    btnForm.addEventListener('click', () => {
        verifCompte(input.value, input2.value);
    });
}



/** Fonction de création de response depot **/

function ResponseDepot(Color, titleValue, textValue) {
    const div = document.createElement('div');
    div.classList.add('content-response');
    div.setAttribute('id', 'result-depot');
    div.style.background = Color;

    const title = document.createElement('h2');
    title.innerText = titleValue;

    const text = document.createElement('p');
    text.innerText = textValue
    div.append(title, text);

    content.appendChild(div);
}

/** FONCTIONS POUR LE DÉPOT **/
function createFormDepot() {
    
    if (document.querySelector('#form-depot.form')) {
        document.querySelector('#form-depot.form').remove();
    }
    if (document.querySelector('#form-accompte.form')) {
        document.querySelector('#form-accompte.form').remove();
    }
    if (document.querySelector('#result-compte')) {
        document.querySelector('#result-compte').remove();
    }
    if (document.querySelector('#result-depot.content-response')) {
        document.querySelector('#result-depot.content-response').remove();
    }

    const div = document.createElement('div');
    div.classList.add('form');
    div.setAttribute('id', 'form-depot');

    const title = document.createElement('h2');
    title.innerText = 'Faire un dépot';

    const groupInput = document.createElement('div');
    groupInput.classList.add('input-content');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Entrez votre prénom');

    const input2 = document.createElement('input');
    input2.setAttribute('type', 'number');
    input2.setAttribute('placeholder', 'Numéro de compte');

    const input3 = document.createElement('input');
    input3.setAttribute('type', 'number');
    input3.setAttribute('placeholder', 'Entrez un montant');

    const btnForm = document.createElement('button'); 
    btnForm.setAttribute('type', 'submit');
    btnForm.innerText = 'Confirmer';

    groupInput.append(input, input2, input3, btnForm);

    div.append(title, groupInput);

    content.appendChild(div);

    btnForm.addEventListener('click', () => {
        VerifDepot(input.value, input2.value, input3.value);
    });
}



/** FONCTION PRINCIPALE FAIRE DÉPOT **/
function VerifDepot(nom, numeroCompte, montant) {
    if (document.querySelector('#result-depot')) {
        document.querySelector('#result-depot').remove();
    }
    let string = montant;

    let number = parseFloat(string);

    if (comptes.find((compte) => compte.numeroCompte === numeroCompte)) {
        comptes.find((compte) => compte.numeroCompte === numeroCompte).solde += number;
        ResponseDepot('green', 'Dépot effectué', 'Votre transaction est acceptée pour le compte de ' + nom + ' avec le numéro de compte '+ numeroCompte + '. Nous avons ajouté ' + montant + ' € à votre compte');
    } else {
        ResponseDepot('red', 'Erreur', 'Veuillez créer un compte');
    }
    console.log(comptes)
};

/** AJOUT DES EVENTS LISTENER POUR DÉCLANCHER LES FONCTIONS **/
btnCompte.addEventListener('click', createFormCompte);
btnDepot.addEventListener('click', createFormDepot);
btnClose.addEventListener('click', () => {
    if (document.querySelector('#form-accompte.form')) {
        document.querySelector('#form-accompte.form').remove();
    }
    if (document.querySelector('#form-depot.form')) {
        document.querySelector('#form-depot.form').remove();
    }
    if (document.querySelector('#result-compte.content-response')) {
        document.querySelector('#result-compte.content-response').remove();
    }
    if (document.querySelector('#result-depot.content-response')) {
        document.querySelector('#result-depot.content-response').remove();
    }
});