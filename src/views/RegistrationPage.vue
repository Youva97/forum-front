<template>
    <ion-content :fullscreen="true">
        <div class="header">
            <img id="logo-header" alt="le logo de LEA" src="https://www.asso-lea.org/template/images/logo.png" />
        </div>

        <!-- Form with steps -->
        <transition name="fade"></transition>
        <div v-if="currentStep === 1">
            <!-- Step 1: Basic Information -->
            <form @submit.prevent="finishRegistration">
                <h2 class="contentTitle">CRÉATION DE MON ESPACE PERSONNEL</h2>
                <ion-list class="registrationForm">
                    <!-- Nom -->
                    <ion-item>
                        <ion-input v-model="utilisateur.nom" label="Nom du parent :" labelPlacement="stacked"
                            placeholder="Dupond" id="nom"></ion-input>
                        <ion-note v-if="errors.nom.required" color="danger">Nom est requis</ion-note>
                        <ion-note v-if="errors.nom.minlength" color="danger">Le nom doit avoir au moins 2 caractères</ion-note>
                    </ion-item>

                    <!-- Prénom -->
                    <ion-item>
                        <ion-input v-model="utilisateur.prenom" label="Prénom du parent :" labelPlacement="stacked"
                            placeholder="Marie" id="prenom"></ion-input>
                        <ion-note v-if="errors.prenom.required" color="danger">Prénom est requis</ion-note>
                        <ion-note v-if="errors.prenom.minlength" color="danger">Le prénom doit avoir au moins 2 caractères</ion-note>
                    </ion-item>

                    <!-- Téléphone -->
                    <ion-item>
                        <ion-input v-model="utilisateur.telephone" label="Téléphone :" labelPlacement="stacked"
                            placeholder="1234567890" id="telephone"></ion-input>
                        <ion-note v-if="errors.telephone.required" color="danger">Téléphone est requis</ion-note>
                        <ion-note v-if="errors.telephone.pattern" color="danger">Téléphone invalide</ion-note>
                    </ion-item>

                    <!-- Email -->
                    <ion-item>
                        <ion-input v-model="utilisateur.email" type="email" label="Mail :" labelPlacement="stacked"
                            placeholder="Email@test.com" id="email"></ion-input>
                        <ion-note v-if="errors.email.required" color="danger">Email est requis</ion-note>
                        <ion-note v-if="errors.email.email" color="danger">Email invalide</ion-note>
                        <ion-note v-if="errors.email.uniqueEmail" color="danger">Votre email est déjà utilisé</ion-note>
                        <ion-note v-if="errors.email.uniqueCheckError" color="danger">Nous n'arrivons pas à vérifier si votre email est déjà utilisé</ion-note>
                    </ion-item>

                    <!-- Mot de passe -->
                    <ion-item>
                        <ion-input v-model="utilisateur.motDePasse" type="password" label="Mot de passe :" labelPlacement="stacked" id="motDePasse"></ion-input>
                        <ion-note v-if="errors.motDePasse.required" color="danger">Mot de passe est requis</ion-note>
                        <ion-note v-if="errors.motDePasse.minlength" color="danger">Le mot de passe doit avoir au moins 8 caractères</ion-note>
                    </ion-item>
                </ion-list>

                <div class="validerBtn">
                    <ion-button type="submit" expand="block" :disabled="!isFormValid"
                        class="redirectToMySpaceButton">Confirmer</ion-button>
                </div>
            </form>
        </div>


        <div v-if="currentStep === 2">
            <div class="successContent">
                <h2 class="contentTitle">VOTRE COMPTE A ÉTÉ CRÉÉ</h2>
                <img alt="Icone de succès" src="../../assets/success.svg" />
                <p>Bienvenue sur l’application LEA ! Vous pourrez accéder à votre espace, mais également aux différents
                    outils que fournit l’application.</p>
                <div class="validerBtn">
                    <ion-button @click="goToUserSpace" expand="block" class="redirectToMySpaceButton">Aller sur mon
                        espace</ion-button>
                </div>
            </div>
        </div>

        <ion-toast :isOpen="isErrorDisplayed" :message="registrationError" :duration="3000"
            @didDismiss="displayError(false)" position="top"></ion-toast>
    </ion-content>
</template>


<script setup lang="ts">
import { IonToast, IonItem, IonList, IonNote, IonButton, IonContent, IonInput } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const currentStep = ref(1);
const isErrorDisplayed = ref(false);
const registrationError = ref("");
const apiUrl = 'http://localhost:8084/utilisateurs';

const utilisateur = ref({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    motDePasse: '',
});

const errors = ref({
    nom: { required: false, minlength: false },
    prenom: { required: false, minlength: false },
    email: { required: false, email: false, uniqueEmail: false, uniqueCheckError: false },
    motDePasse: { required: false, minlength: false },
    telephone: { required: false, pattern: false }
});

const goToStep = (step: number) => {
    currentStep.value = step;
};

const isFormValid = ref(false);

const validateFormStep1 = () => {
    let isValid = true; // Initialement, on suppose que le formulaire est valide

    // Validate Nom
    if (!utilisateur.value.nom || utilisateur.value.nom.length < 2) {
        errors.value.nom.required = true;
        errors.value.nom.minlength = utilisateur.value.nom.length > 0;
        isValid = false; // Si nom invalide, isValid est false
    } else {
        errors.value.nom.required = false;
        errors.value.nom.minlength = false;
    }

    // Validate Prénom
    if (!utilisateur.value.prenom || utilisateur.value.prenom.length < 2) {
        errors.value.prenom.required = true;
        errors.value.prenom.minlength = utilisateur.value.prenom.length > 0;
        isValid = false; // Si prénom invalide, isValid est false
    } else {
        errors.value.prenom.required = false;
        errors.value.prenom.minlength = false;
    }

    // Validate Telephone
    const phonePattern = /^[0-9]{10}$/;
    if (!utilisateur.value.telephone || !phonePattern.test(utilisateur.value.telephone)) {
        errors.value.telephone.required = true;
        errors.value.telephone.pattern = !phonePattern.test(utilisateur.value.telephone);
        isValid = false; // Si téléphone invalide, isValid est false
    } else {
        errors.value.telephone.required = false;
        errors.value.telephone.pattern = false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!utilisateur.value.email || !emailPattern.test(utilisateur.value.email)) {
        errors.value.email.required = true;
        errors.value.email.email = !emailPattern.test(utilisateur.value.email);
        isValid = false; // Si email invalide, isValid est false
    } else {
        errors.value.email.required = false;
        errors.value.email.email = false;
    }

    // Validate Password
    if (!utilisateur.value.motDePasse || utilisateur.value.motDePasse.length < 8) {
        errors.value.motDePasse.required = true;
        errors.value.motDePasse.minlength = utilisateur.value.motDePasse.length > 0;
        isValid = false; // Si mot de passe invalide, isValid est false
    } else {
        errors.value.motDePasse.required = false;
        errors.value.motDePasse.minlength = false;
    }

    return isValid; // Renvoie true si tous les champs sont valides, sinon false
};

const validate = () => {
    return isFormValid.value = validateFormStep1();
}

// Observer les changements dans utilisateur et valider automatiquement le formulaire
watch(() => utilisateur.value, () => {
    validate();
}, { deep: true });

const goToUserSpace = () => {
    router.push({name: "login"});
}

const inscriptionUtilisateur = async () => {
    try {
        console.log("L'utilisateur que j'enregistre :", utilisateur.value);
        const response = await fetch(`${apiUrl}/inscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(utilisateur.value),
        });

        const json = await response.json();

        if (!json.error) {
            goToStep(2);
        } else {
            throw new Error(json.error);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            registrationError.value = error.message;
        } else {
            registrationError.value = String(error); // Fallback in case it's not an Error object
        }
        isErrorDisplayed.value = true;
    }
};

const displayError = (display: boolean) => {
    isErrorDisplayed.value = display;
};

// Gérer l'envoi du formulaire
const finishRegistration = () => {
    if (isFormValid.value) {
        inscriptionUtilisateur();
    }
};
</script>


<style scoped>
/* Transitions pour rendre la navigation entre étapes fluide */
/* Transitions pour rendre la navigation entre étapes fluide */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

ion-content {
    --background: #FBBD1B;
    /* Fond général */
    padding: 1rem;
}

ion-item {
    --background: #ffffff;
    --border-color: transparent;
    /* Enlever la bordure par défaut */
    border-bottom: 2px solid #C3237C;
    /* Appliquer la couleur à la bordure inférieure */
    padding-bottom: 0.5rem;
    /* Ajout de l'espacement pour plus de lisibilité */
}

ion-input {
    --background: transparent;
    --color: #333;
    /* Texte principal en gris foncé */
}

ion-label {
    --color: #C3237C;
    /* Couleur des labels au-dessus des inputs */
}

ion-item ion-input::part(native) {
    font-size: 1rem;
    font-weight: 500;
}

ion-note {
    --color: #CC0000;
    /* Couleur des messages d'erreur */
}

ion-button {
    --background: #C3237C;
    /* Couleur principale */
    --background-activated: #881756;
    --color: white;
    border-radius: 25px;
    /* Boutons arrondis */
    font-size: 1rem;
    /* Taille de police légèrement augmentée */
    padding: 0.75rem;
    /* Augmenter la hauteur du bouton */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Ajouter une ombre pour effet de profondeur */
}

ion-toast {
    --background: #CC0000;
}

.header {
    display: flex;
    justify-content: flex-end;
    background-color: white;
    padding: 0.5rem 1rem;
    border-bottom: 0.3rem solid #C3237C;
}

.contentTitle {
    color: #C3237C;
    /* Même couleur que les bordures */
    text-align: center;
    /* Centré */
    font-weight: bold;
    /* Mettre en gras */
    margin-bottom: 1.5rem;
    /* Espacement sous le titre */
}

.content {
    padding: 1.5rem 1rem;
    background-color: #FBBD1B;
}

.registrationForm {
    margin-top: 2rem;
    padding: 1rem;
    background-color: white;
    /* Fond blanc pour les inputs */
    border-radius: 12px;
    /* Bords arrondis pour un effet plus moderne */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* Ombre douce pour donner de la profondeur */
}

.validerBtn {
    margin-top: 2rem;
}

.customButton {
    text-transform: none;
    /* Empêcher la transformation automatique des textes */
    font-size: 1.1rem;
    /* Taille de texte légèrement plus grande */
}

ion-item {
    --highlight-color-focused: #C3237C;
    /* Couleur de mise en avant lors du focus */
    --color-focused: #C3237C;
    /* Couleur du texte lorsque l'élément est sélectionné */
    --border-color-focused: #C3237C;
    /* Couleur de la bordure au focus */
}

ion-input:focus {
    transition: border-color 0.3s ease-in-out;
}

.successContent {
    color: white;
    text-align: center;
}

.redirectToMySpaceButton {
    margin-top: 9rem;
}
</style>