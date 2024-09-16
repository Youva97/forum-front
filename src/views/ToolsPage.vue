<template>
    <ion-page>
        <ion-content>

        </ion-content>
        <ion-footer class="ion-padding">
            <div id="footerSocialLink">
                <div class="contactInfo">
                    <a href="tel:0805950874" class="button button-positive">
                        <ion-icon class="phone-icon" :icon="call"></ion-icon>
                    </a>
                    <a class="phone-number" style="text-decoration: none" href="tel:0805950874">
                        <span class="number-label">Numéro Vert</span>
                        <span class="number-value" style="font-size: 13px;">0805950874</span>
                    </a>
                </div>
                <a href="https://www.facebook.com/associationlea1" target="_blank">
                    <ion-icon class="customIcon" :icon="logoFacebook"></ion-icon>
                </a>
                <a href="https://www.instagram.com/association_lea/" target="_blank">
                    <ion-icon class="customIcon" :icon="logoInstagram"></ion-icon>
                </a>
                <a href="https://fr.linkedin.com/company/tousderrierelea" target="_blank">
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
import { IonPage, IonCard, IonCardContent, IonCardHeader, IonFooter, IonButton, IonContent } from '@ionic/vue';
import { call, logoFacebook, logoInstagram, logoLinkedin, logoTwitter, logoYoutube, walletOutline } from 'ionicons/icons';
</script>

<style>
#footerSocialLink {
    display: flex;
    justify-content: center;
    gap: 50px;
    height: 80%;
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

ion-button {
    --background: #C3237C;
}

.phone-number .number-value {
    font-size: 13px;
}

ion-icon {
    color: #FFFFFF;
}

.customIcon {
    width: 35px;
    height: 40px;
    color: white;
}

.ion-padding {
    background: #7BC668;
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