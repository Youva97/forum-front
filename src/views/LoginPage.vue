<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="custom-header2">
        <img
          id="logo-header"
          alt="le logo de LEA"
          src="https://www.asso-lea.org/template/images/logo.png"
        />
      </div>
      <div class="content">
        <form @submit.prevent="onSignIn">
          <ion-list class="login-form-input">
            <span class="input-label">Email</span>
            <ion-item class="input">
              <ion-input v-model="loginForm.email"></ion-input>
              <ion-note v-if="errors.email.required" color="danger"
                >L'email est requis</ion-note
              >
              <ion-note v-if="errors.email.email" color="danger"
                >Email invalide</ion-note
              >
            </ion-item>
            <span class="input-label">Mot de passe</span>
            <ion-item class="input">
              <ion-input
                v-model="loginForm.motDePasse"
                type="password"
              ></ion-input>
              <ion-note v-if="errors.motDePasse.required" color="danger"
                >Le mot de passe est requis</ion-note
              >
            </ion-item>
          </ion-list>
          <div class="login-buttons">
            <ion-button
              class="custom-button"
              type="submit"
              expand="block"
              :disabled="!isFormValid"
              >Je me connecte</ion-button
            >
            <ion-label class="forgot-password" @click="navigateToForgotPassword"
              >Mot de passe oublié ?</ion-label
            >
          </div>
        </form>

        <div class="signup">
          <h5>Vous n'avez pas de compte ?</h5>
          <ion-button
            expand="block"
            @click="ionRouter.push({ name: 'registration' })"
            class="custom-button"
            >Je m'inscris</ion-button
          >
        </div>
      </div>

      <ion-toast
        :isOpen="isErrorDisplayed"
        :message="loginError"
        :duration="3000"
        @didDismiss="() => (isErrorDisplayed = false)"
        position="top"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  IonPage,
  IonButton,
  IonContent,
  IonToast,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonNote,
} from "@ionic/vue";
import { onIonViewDidEnter } from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import { useAuthentification } from "../stores/authStore";
import { onBeforeMount } from "vue";

const apiUrl = "http://localhost:8084/utilisateurs";

const ionRouter = useIonRouter();

let token = localStorage.getItem("token");

onBeforeMount(() => {
  if (token) {
    ionRouter.push("/tabs/account");
  }
});

const isErrorDisplayed = ref(false);
const loginError = ref("");

const isFormValid = ref(false);

const authentification = useAuthentification();
const loginForm = ref({
  email: "",
  motDePasse: "",
});

const errors = ref({
  email: { required: false, email: false },
  motDePasse: { required: false },
});

onIonViewDidEnter(() => {
  console.log("Forcer le recalcul de la vue Login");
  document.querySelector("ion-content")?.style.setProperty("display", "none");
  setTimeout(() => {
    document.querySelector("ion-content")?.style.removeProperty("display");
  }, 10);
});

const validateForm = () => {
  let isValid = true;

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  errors.value.email.required = !loginForm.value.email;
  errors.value.email.email =
    !emailPattern.test(loginForm.value.email) && !errors.value.email.required;

  errors.value.motDePasse.required = !loginForm.value.motDePasse;

  if (
    errors.value.email.required ||
    errors.value.email.email ||
    errors.value.motDePasse.required
  ) {
    isValid = false;
  }

  return isValid;
};

const validate = () => {
  return (isFormValid.value = validateForm());
};

watch(
  () => loginForm.value,
  () => {
    validate();
  },
  { deep: true }
);

const onSignIn = async () => {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      alert("Vous êtes déjà connecté.");
      return;
    }
    console.log("Email:", loginForm.value.email);
    console.log("Mot de Passe:", loginForm.value.motDePasse);

    const response = await fetch(`${apiUrl}/connexion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: loginForm.value.email,
        motDePasse: loginForm.value.motDePasse,
      }),
    });

    if (!response.ok) {
      const json = await response.json();
      loginError.value = json.error || "Erreur inconnue";
      isErrorDisplayed.value = true;
      return;
    }

    const json = await response.json();
    if (json.data && json.data.token) {
      localStorage.setItem("token", json.data.token); // Stocker le token JWT
      authentification.login(json.data.token);
      ionRouter.push("/tabs/account");
    }
  } catch (error) {
    loginError.value =
      "Erreur lors de la connexion, veuillez vérifier votre réseau.";
    isErrorDisplayed.value = true;
    console.error("Erreur lors de la connexion", error);
  }
};

const navigateToForgotPassword = () => {
  // Logique de redirection
  console.log("Redirection vers la page mot de passe oublié");
};

const displayError = (state: boolean) => {
  isErrorDisplayed.value = state;
};
</script>

<style>
ion-content {
  --background: #fbbd1b;
  --min-height: 100vh;
  /* S'assure que le contenu occupe toujours la totalité de la vue */
}

.custom-header2 {
  display: flex;
  justify-content: center;
  background-color: white !important;
  padding-top: 20px;
  padding-bottom: 20px;
}

ion-button {
  --background: #c3237c;
  --background-activated: #881756;
  --padding-start: 2rem;
  --padding-end: 2rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}

ion-item {
  --background: #ffffff;
  --border-color: transparent;
  /* Enlever la bordure par défaut */
  border-bottom: 2px solid #c3237c;
  /* Appliquer la couleur à la bordure inférieure */
  padding-bottom: 0.5rem;
  /* Ajout de l'espacement pour plus de lisibilité */
}

ion-input {
  --background: transparent;
  --color: #333 !important;
  /* Texte principal en gris foncé */
}

ion-label {
  --color: #c3237c;
  /* Couleur des labels au-dessus des inputs */
}

ion-item ion-input::part(native) {
  font-size: 1rem;
  font-weight: 500;
}

ion-note {
  --color: #cc0000;
  /* Couleur des messages d'erreur */
}

ion-item {
  --background: #ffffff;
  /* Définit le fond blanc pour les champs de saisie */
  --border-color: #c3237c;
  /* Conserve la couleur de la bordure */
}

ion-toast {
  --background: #cc0000;
}

.content {
  padding: 5rem 2rem 2rem !important;
  display: flex !important;
  flex-flow: column !important;
  justify-content: center !important;
}

.login-form-input {
  background-color: #fbbd1b;
}

.input {
  margin: 0.5rem 0 1.5rem;
}

.signup {
  margin-top: 3rem;
  text-align: center;
}

.signup h5 {
  margin-left: 0.5rem;
}

.login-buttons {
  margin-top: 0.7rem;
}

.custom-button {
  text-transform: none;
}

.forgot-password {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
