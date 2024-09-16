<template>
    <ion-page>
        <ion-header>
            <img id="logo-header" alt="le logo de LEA" src="https://www.asso-lea.org/template/images/logo.png" />
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <div id="profile">
                <div id="profile-image"></div>
                <div>
                    <h3>{{ utilisateur.nom }} {{ utilisateur.prenom }}</h3>
                    <ion-button target="_blank" expand="block">Editer mon profile
                        <ion-icon slot="end" name="pencil"></ion-icon>
                    </ion-button>
                </div>
            </div>

            <div id="buttons-section">
                <hr />
                <!-- faire la gestion des crise, document, et compte rendu -->
                <ion-button target="_blank" expand="block">
                    <div class="link-button">GESTION DES CRISES DE MON ENFANT</div>
                </ion-button>
                <ion-button target="_blank" expand="block">
                    <div class="link-button">GESTION DES DOCUMENTS</div>
                </ion-button>
                <ion-button expand="block">
                    <div class="link-button">GENERER UN COMPTE RENDU</div>
                </ion-button>
                <hr />
            </div>

            <!-- Bouton de déconnexion -->
            <ion-button expand="block" color="danger" (click)="logout()">
                Déconnexion
                <ion-icon slot="end" name="log-out-outline"></ion-icon>
            </ion-button>
        </ion-content>


    </ion-page>
</template>

<script setup lang="ts">
import { IonIcon, IonButton, IonContent, IonHeader, IonPage } from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useAuthentification } from '../stores/authStore';
import { useRoute, useRouter } from "vue-router";

const apiUrl = 'http://localhost:8084/utilisateurs';

const userId = useRoute().params.id;
const router = useRouter();

const utilisateur = ref({
    nom: "",
    prenom: ""
})

const authentification = useAuthentification();

const recuperationUtilisateur = async () => {
    try {
      const json = await fetch(`${import.meta.env.VITE_API_URL}/utilisateurs/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentification.token}`,
      }
    });
    if (!json.ok) {
      throw new Error('Erreur lors de la récupération des données utilisateur');
    }

    const data = await json.json();
    utilisateur.value = data.data;
    } catch (error: unknown) {
      console.error('Erreur:', error);
    }
}

onMounted(async () => {
  await recuperationUtilisateur();
})

</script>


<style>
ion-header {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  background-color: white;
  border-bottom: 4px solid #c3237c;
  min-height: 70px;
}

#logo-header {
  height: 7vh;
  margin-top: auto;
  margin-bottom: auto;
}

ion-title {
  width: 60%;
}

.ion-padding {
  --ion-background-color: white;
}

.logout-button {
  width: 20%;
  --background: #ac1327;
}

#profile {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}

#profile-image {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  background-color: rgb(201, 200, 200);
  display: inline-block;
}

#profile h3 {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}

ion-button {
  --background: #c3237c;
}

hr {
  border-width: 1px;
  height: 0;
  width: 100%;
}

#buttons-section {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 60%;
}

#buttons-section ion-button {
  width: 95%;
  font-size: 0.9rem;
}

.link-button {
  padding: 8px 0px;
}
</style>