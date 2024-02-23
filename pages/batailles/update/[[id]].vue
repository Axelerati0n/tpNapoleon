<script setup lang="ts">
  import {Methods} from '~/constantes/httpMethods.const'
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetchEntityStore } from '~/stores/fetchEntityStore'
import type { BatailleInterface } from '~/types/bataille'
import { FORM_VALIDATIONS_RULES } from '~/constantes/formValidationsRules.const'
import FormBataille from '~/domains/bataille/FormBataille.vue'
import { entityConfig } from '~/domains/entity.config'
import {reactive, onMounted} from 'vue';
import axios from 'axios'


let updateBataille = reactive({
    name: '',
    annee: '',
    victoire: '',
    lieu: '',
    force: '',
    pertes: '',
    situation: '',
    image: '',
  })

  const router = useRoute()
  let idBataille =router.params.id
  onMounted(() => {
    
     axios.get(`http://localhost:3000/batailles/update/${idBataille}`).then((response) => {
      updateBataille.name = response.data.name
      updateBataille.annee = response.data.annee
      updateBataille.victoire = response.data.victoire
      updateBataille.lieu = response.data.lieu
      updateBataille.force = response.data.force
      updateBataille.pertes = response.data.pertes
      updateBataille.situation = response.data.situation
      updateBataille.image = response.data.image

     })
  })
const editBataille = () => {
  axios.put(`http://localhost:3000/batailles/update/${idBataille}`, updateBataille).then(() => {
    useRouter().push('/batailles')
  })
}
</script>

<template>
  <!--Subtitle si il faut-->
 <!-- <AppFormLayout
    width="60%"
    title="Modification de la bataille"
    :submit="execute"
    :loading="loadingComputed"
  >
    <component
      :is="FormBataille"
      v-model="data"
    />
  </AppFormLayout>
-->

  
  <VCard title="Modification d'une bataille" width="40%">
  <VForm @submit.prevent="editBataille" >
  <v-text-field
  v-model="updateBataille.name"
    label="Nom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
  v-model="updateBataille.annee"
    label="Annee"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <VCheckbox 
    v-model="updateBataille.victoire"
    label="Victoire"
  />
  <v-text-field
    v-model="updateBataille.lieu"
    label="Lieu"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="updateBataille.force"
    label="Force"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="updateBataille.pertes"
    label="Pertes"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="updateBataille.situation"
    label="Situation"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <VBtn
            color="warning"
            @click="useRouter().push('/batailles')"
            size="large"
            variant="text"
            text="Annuler"
          />
          <VBtn
            color="warning"
            type="submit"
            size="large"
            variant="flat"
            text="Modifier"
           
            
            
          />
  </VForm>
  </VCard>


</template>

<style scoped>

</style>
