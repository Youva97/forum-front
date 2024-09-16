<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="custom-header">
        <img
          id="logo-header"
          alt="le logo de LEA"
          src="https://www.asso-lea.org/template/images/logo.png"
        />
      </div>
      <div class="waves-effect">
        <svg
          transform="rotate(180)"
          width="100%"
          height="100"
          viewBox="0 0 600 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q25,100 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 V100 H0 Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="wave-container">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#4CAF50"
            fill-opacity="1"
            d="M0,128L80,144C160,160,320,192,480,197.3C640,203,800,181,960,186.7C1120,192,1280,224,1360,240L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <h2 class="accueilTitreH1">BIENVENUE!</h2>
      <h5 class="accueilTitreH2">sur votre application LÉA</h5>

      <ion-card class="mission">
        <ion-card-header>
          <ion-card-title>
            <h1 style="color: #c3237c; font-weight: bold">
              Vous êtes chez vous ici !
            </h1>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <br />
          <p>
            Vous pouvez naviguer entre plusieurs espaces LÉA pour vous
            renseigner sur l'association...
          </p>
          <br />
          <p>Belle navigation</p>
          <br />
          <h4 style="color: #c3237c">
            Jessica Baba - Fondatrice de l'association LÉA
          </h4>
        </ion-card-content>
      </ion-card>

      <h2 class="accueilTitreH2">Pourquoi donner ?</h2>

      <ion-card-content>
        <img
          alt="enfant qui court avec un cervolant"
          src="https://www.asso-lea.org/client/cache/contenu/1600_400____2__middlecenter_lea-site_73.jpg"
          class="imageHomePageEnfantQuicour"
        />
      </ion-card-content>

      <ion-card color="Medium-tint">
        <ion-card-content>
          <p class="homParagraphe">
            L'association Léa est une association à but non lucratif (loi
            1901)...
          </p>
          <p class="homParagraphe homParagraphe2">Belle navigation</p>
          <p class="homParagraphe">
            Jessica Baba - Fondatrice de l'association LÉA
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card-content>
        <ion-button
          href="https://donner.asso-lea.org/jedonne/~mon-don"
          target="_blank"
          expand="block"
        >
          Faire un don <ion-icon slot="end" :icon="walletOutline"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-content>
    <ion-footer class="ion-padding">
      <div id="footerSocialLink">
        <div class="contactInfo">
          <a href="tel:0805950874" class="button button-positive">
            <ion-icon class="phone-icon" :icon="call"></ion-icon>
          </a>
          <a
            class="phone-number"
            style="text-decoration: none"
            href="tel:0805950874"
          >
            <span class="number-label">Numéro Vert</span>
            <span class="number-value" style="font-size: 13px">0805950874</span>
          </a>
        </div>
        <a href="https://www.facebook.com/associationlea1" target="_blank">
          <ion-icon class="customIcon" :icon="logoFacebook"></ion-icon>
        </a>
        <a href="https://www.instagram.com/association_lea/" target="_blank">
          <ion-icon class="customIcon" :icon="logoInstagram"></ion-icon>
        </a>
        <a
          href="https://fr.linkedin.com/company/tousderrierelea"
          target="_blank"
        >
          <ion-icon class="customIcon" :icon="logoLinkedin"></ion-icon>
        </a>
        <a href="https://www.youtube.com/@AssociationLea" target="_blank">
          <ion-icon class="customIcon" :icon="logoYoutube"></ion-icon>
        </a>
        <a href="https://twitter.com/association_lea?lang=fr" target="_blank">
          <ion-icon class="customIcon" :icon="logoTwitter"></ion-icon>
        </a>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonFooter,
  IonButton,
  IonContent,
  IonIcon,
  IonCardTitle,
} from "@ionic/vue";
import {
  call,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
  logoYoutube,
  walletOutline,
} from "ionicons/icons";
import { ref, onMounted } from "vue";

const utilisateur = ref({});

const apiUrl = "http://localhost:8084/utilisateurs";

// Fonction pour vérifier la connexion avec le back
const verificationBack = async () => {
  try {
    const response = await fetch(`${apiUrl}/tous`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Si le statut de la réponse n'est pas 2xx
      console.error("Erreur:", response.status, response.statusText);
    } else {
      const json = await response.json();
      console.log("Réponse reçue du back:", json);
    }
  } catch (error) {
    // Gestion des erreurs de réseau
    console.error("Erreur de connexion au back-end:", error);
  }
};

// Appeler la fonction lors du montage de la page
onMounted(() => {
  verificationBack();
});
</script>

<style>
/* General Styles */
ion-button {
  --background: #c3237c;
}

ion-card {
  background-color: #ffffff;
  border-radius: 25px;
}

ion-icon {
  color: #ffffff;
}

ion-card-subtitle {
  --color: #c3237c;
}

.accueilInfos {
  background: #c0c0c0;
}

.logoHomePage {
  display: block;
  margin: 0 auto;
  width: 50%;
}

.accueilTitreH1,
.accueilTitreH2,
.accueilCardHeader {
  text-align: center;
  color: #ffffff;
}

.accueilTitreH1 {
  font-size: 40px;
}

.accueilTitreH2 {
  font-size: 18px;
}

.homParagraphe {
  color: #333;
  margin-bottom: 10px;
  padding: 0.4em;
}

.homParagraphe {
  text-align: center;
}

ion-card-content {
  padding: 20px;
  background-color: #ffffff;
  color: #333;
}

.ion-padding {
  background: #7bc668;
}

#footerSocialLink {
  display: flex;
  justify-content: center;
  gap: 50px;
  height: 80%;
}

.d-flex {
  display: flex;
  flex-direction: column;
}

.imageHomePageEnfantQuicour {
  overflow-clip-margin: content-box;
}

ion-content {
  --background: #fbbd1b;
}

.contactInfo {
  text-decoration: none !important;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 16px;
  font-weight: normal;
}

.phone-icon {
  background-size: contain;
  background-repeat: no-repeat;
  width: 50px;
  height: 45px;
}

.phone-number {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  color: white;
  user-select: none;
}

.phone-number .number-label {
  font-size: 16px;
}

.phone-number .number-value {
  font-size: 13px;
}

.customIcon {
  width: 35px;
  height: 40px;
  color: white;
}

.custom-header {
  display: flex;
  justify-content: center;
  background-color: white !important;
  padding-top: 20px;
  padding-bottom: 0;
}

.logo {
  width: 300px;
  height: auto;
}

.wave-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave-container svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.content {
  background-color: #fbbd1b;
  border-radius: 10px;
  margin-bottom: 20px;
}

.description {
  margin-left: 5px;
  font-size: 14px;
  color: #ffff;
  font-weight: bold;
  margin-bottom: 20px;
}

.mission {
  background-color: white;
  padding: 60px;
  border-radius: 10px;
  margin: 10px 30px;
  text-align: center;
}

.mission ion-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mission ion-icon {
  font-size: 90px;
  color: #ffcc00;
  margin-bottom: 10px;
}

.mission p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.welcome {
  display: flex;
  justify-items: center;
  flex-direction: column;
  text-align: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  #footerSocialLink {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    gap: 15px;
  }

  .contactInfo {
    flex-direction: row;
    gap: 5px;
  }

  .phone-icon {
    width: 30px;
    height: 30px;
  }

  .phone-number {
    font-size: 10px;
  }

  .customIcon {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 600px) {
  .logo {
    max-width: 200px;
  }

  .content {
    padding: 5px;
    margin-top: 10px;
  }

  .mission {
    padding: 20px;
    text-align: left;
  }
}
</style>
