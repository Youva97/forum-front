<template>
  <ion-page>
    <ion-tabs class="tabs" id="tabsPages">
      <router-view></router-view>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home" :class="{ active: includesString('home') }">
          <ion-icon aria-hidden="true" :icon="homeOutline"></ion-icon>
          <ion-label>ACCUEIL</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tools" href="/tabs/tools" :class="{ active: includesString('tools') }">
          <ion-icon aria-hidden="true" :icon="constructSharp"></ion-icon>
          <ion-label>OUTILS</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="navigateToMySpace" :class="{ active: includesString('login') }" >
          <ion-icon aria-hidden="true" :icon="personSharp"></ion-icon>
          <ion-label>MON ESPACE</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthentification } from '../stores/authStore';

import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { homeOutline, constructSharp, personSharp } from 'ionicons/icons';


const authentification = useAuthentification();

const route = useRoute();
const router = useRouter();

const navigateToMySpace = (route = '') => {
  if (route === 'registration') {
    // Autoriser l'accès à la page d'inscription
    router.push('/tabs/registration');
  } else if (authentification.isAuthenticated) {
    router.push('/tabs/account');
  } else {
    router.push('/tabs/login');
  }
};


const includesString = (str: string): boolean => {
  return route.path.includes(str);
};


</script>

<style>
ion-tab-bar {
  --background: #C3237C;
}
ion-tab-button {
  --color: #FFFFFF;

}

ion-tab-button.active {
  --color: #fbbd1b; 
  color: #fbbd1b;
}

ion-tab-button.active ion-icon {
  color: #fbbd1b !important;
}

ion-tab-button.active ion-label {
  color: #fbbd1b;
}
</style>