<script setup lang="ts">
  import type {BatailleInterface} from '~/types/bataille'
  import {FORM_VALIDATIONS_RULES} from '~/constantes/formValidationsRules.const'
  import { Methods } from '~/constantes/httpMethods.const'
  import { entityConfig } from '~/domains/entity.config'
  import { computed } from 'vue';
  import FormBataille from '~/domains/bataille/FormBataille.vue'
import axios from 'axios';


  let newBataille = reactive({
    name: '',
    annee: '',
    victoire: '',
    lieu: '',
    force: '',
    pertes: '',
    situation: '',
    image: '',
  })
const router = useRouter();


const addNewBataille = () => {
  axios.post('http://localhost:3000/batailles', newBataille).then(() => {
    router.push('/batailles')
  })
  console.log(newBataille)
}
const handleClickCancel = () => {
    useRouter().back()
  }
</script>

<template>
  
  <VCard title="Ajout d'une nouvelle bataille" width="40%">
  <VForm @submit.prevent="addNewBataille" title="Ajout d'une nouvelle bataille" >
  <v-text-field
  v-model="newBataille.name"
    label="Nom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
  v-model="newBataille.annee"
    label="Annee"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <VCheckbox 
    v-model="newBataille.victoire"
    type="boolean"
    label="Victoire"
  />
  <v-text-field
    v-model="newBataille.lieu"
    label="Lieu"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="newBataille.force"
    label="Force"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="newBataille.pertes"
    label="Pertes"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="newBataille.situation"
    label="Situation"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <VBtn
            color="warning"
            @click="handleClickCancel"
            size="large"
            variant="text"
            text="Annuler"
          />
          <VBtn
            color="warning"
            type="submit"
            size="large"
            variant="flat"
            text="Valider"
           
            
            
          />
  </VForm>
  </VCard>
</template>

<style scoped>
</style>
