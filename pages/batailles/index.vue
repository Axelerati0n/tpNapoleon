
<script setup lang="ts">
// Importation des types et modules nécessaires
import type { BatailleInterface } from "~/types/bataille";
import ConfirmDeletePopup from "~/components/ConfirmDeletePopup.vue";
import axios from 'axios';

import { onMounted,ref } from "vue";
import { useRouter } from "vue-router";

//const allBatailles = ref([]);
let myModal : any;


// onMounted(() => {
//   //myModal = new bootstrap.Modal(document.getElementById("deletePopup"));
//   axios.get('http://localhost:3000/batailles').then((response) => {
//     //allBatailles.value = response.data;
// })
// });

// Récupération des données des batailles depuis l'API
const { data } = useFetch<Array<BatailleInterface>>('/api/bataille', {
  default: () => [] as Array<BatailleInterface>,
});
// Initialisation de l'icône pour l'affichage des détails
let icon = defineModel<'mdi-eye-minus-outline' | 'mdi-eye-plus'>({ required: true });
icon.value = 'mdi-eye-minus-outline';
// Fonction pour changer l'icône lorsqu'on survole
const changeIconOver = () => {
  if (icon.value === 'mdi-eye-minus-outline') {
    icon.value = 'mdi-eye-plus';
  }
};
// Fonction pour changer l'icône lorsqu'on quitte le survol
const changeIconOut = () => {
  if (icon.value === 'mdi-eye-plus') {
    icon.value = 'mdi-eye-minus-outline';
  }
};
// Référence pour stocker les descriptions étendues des batailles
const expandedDescriptions = ref([] as { id: number; elements: string[] }[]);
// Fonction pour vérifier si une description spécifique est étendue pour une bataille donnée
const isDescriptionExpanded = (batailleId: number, element: string) => {
  const expanded = expandedDescriptions.value.find((item) => item.id === batailleId);
  return expanded ? expanded.elements.includes(element) : false;
};
// Fonction pour basculer l'état d'expansion des détails d'une bataille
const toggleDescription = (batailleId: number) => {
  const index = expandedDescriptions.value.findIndex((item) => item.id === batailleId);
  if (index !== -1) {
    // La bataille a déjà des détails étendus, donc les supprimer
    expandedDescriptions.value.splice(index, 1);
  } else {
    // La bataille n'a pas de détails étendus, réinitialiser les autres à leur état initial
    expandedDescriptions.value = [];
    // Ajouter les nouveaux détails
    expandedDescriptions.value.push({ id: batailleId, elements: ['lieu', 'force', 'pertes', 'situation'] });
  }
};


//  //popup delete
//  const itemToDelete = ref(0);
//  const openDeletePopup = (id : number) => {
//    itemToDelete.value = id;
//    myModal.show();
//  }
//  const confirmDelete = () => {
//    axios.delete(`http://localhost:3000/batailles/${itemToDelete.value}`)
//    .then(() => {
//      //allBatailles.value = allBatailles.value.filter(_=> _.id !== itemToDelete.value);
//      myModal.hide();
//    })
  
// }


  /** STORES **/
  const storeEntity = useFetchEntityStore<BatailleInterface>('batailles')
  const {data : dataaa, pending, error} = storeToRefs(storeEntity)
  const {refreshData, forceRefresh} = storeEntity

  const handleDeleteItem = async (item: BatailleInterface) => {
    await useFetch(`/api/batailles/${item.id}`, {
      method: 'DELETE',
      onResponse: ({response}) => {
        if (response.ok) {
          forceRefresh()
        }
      },
    })
  }

  onBeforeMount(() => {
    refreshData()
  })



</script>


<template>
    
  <div class="divParent">
    <VBtn id="btnAjout" :href="'/batailles/create'" class="btnAjout">Ajouter une nouvelle bataille</VBtn>
    <div v-for="bataille in data" :key="bataille.id" class="divBataille">
      <span v-if="bataille.victoire" class="spanVictoire">
        <!-- Carte affichant le nom et l'année de la bataille -->
        <VCard class="card" :title="(bataille.nom + ' - ' + bataille.annee)">
          <!-- Image de la bataille encodée en base64 -->
          <img class="image" :src="`data:image/png;base64,${bataille.image}`" alt="decodedImage" width="100%" />
        </VCard>
        <!-- Contenu des détails de la bataille -->
        <div :id="'divInformation' + bataille.id" class="divInformation" ref="divInformation">
          <!-- Informations de base : Date et lieu -->
          <p class="pTitle">Date et lieu</p>
          <p class="pInfo">{{ bataille.lieu }}</p>
          <!-- Informations de base : Forces en présence -->
          <p class="pTitle">Forces en présence</p>
          <p class="pInfo">{{ bataille.force }}</p>
          <!-- Informations de base : Pertes -->
          <p class="pTitle">Pertes</p>
          <p class="pInfo">{{ bataille.pertes }}</p>
          <!-- Affichage conditionnel de la situation en fonction de l'expansion -->
          <p class="pTitle" v-if="isDescriptionExpanded(bataille.id, 'situation')">Situation</p>
          <p class="pInfo" v-if="isDescriptionExpanded(bataille.id, 'situation')">{{ bataille.situation }}</p>
        </div>
        <!-- Bouton pour basculer l'état d'expansion des détails -->
        <div class="divActions">
          <VBtn id="btnDetail" @mouseover="changeIconOver" @mouseout="changeIconOut"
          @click="toggleDescription(bataille.id)" :icon="icon"></VBtn>
          <VBtn id="btnModif" :href="`/batailles/update/${bataille.id}`" icon="mdi-pencil-plus"></VBtn>
          <VBtn id="btnDelete" icon="mdi-delete-empty" @click="handleDeleteItem(bataille)"></VBtn>
          <!--@click="openDeletePopup(bataille.id)"-->
        </div>
      </span>
    </div>
  </div>
  <!--<ConfirmDeletePopup @confirm-delete-clicked="confirmDelete"/>-->
</template>

<style scoped>
.divParent {
  width: 90%;
  margin: 3% 5%;
  border: 0.2rem solid red;
  background-color: grey;
}
.spanVictoire {
  display: flex;
  width: 95%;
  margin: 2% 2%;
  padding: 2%;
  flex-direction: row;
  border: 0.2rem solid rgb(75, 73, 73);
}
.card {
  width: 35%;
  text-align: center;
  
  padding: 5px;
  background-color: rgb(140, 115, 148);
}
.divInformation {
  border: 0.2rem solid aquamarine;
  width: 60%;
  height: auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12;
  overflow: hidden; /* Ajout de la propriété overflow pour masquer le texte */
}
.divActions {
  display: flex;
  flex-direction: column;
}
.btnAjout{
  display: flex;
  text-align: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
  width: 25%;
  
  margin: 0.5rem 0.5rem 0.5rem 70%;
  padding: 0.5rem 0.5rem;
}
.pTitle {
  font-weight: bold;
  margin: 10px 0 10px 10px;
}
.pInfo {
  margin: 0 0 10px 40px;
}
.image {
  height: 60%;
}
</style>