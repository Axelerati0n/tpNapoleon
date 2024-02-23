<script setup lang="ts">
  import type {BatailleInterface} from '~/types/bataille'
  import {FORM_VALIDATIONS_RULES} from '~/constantes/formValidationsRules.const'
  import { computed } from 'vue';

  /** PROPS **/
  // interface Props {
  //   modelValue: unknown
  // }

  // const props = defineProps<Props>()

  // /** EMITS **/
  // type Emits = {
  //   'update:modelValue': [
  //     value: BatailleInterface | Omit<BatailleInterface, 'id'>,
  //   ]
  // }
  // const emit = defineEmits<Emits>()

  // /** COMPUTED **/
  // const bataille = computed({
  //   get: () =>
  //     props.modelValue as BatailleInterface | Omit<BatailleInterface, 'id'>,
  //   set: (value) => emit('update:modelValue', value),
  // })
</script>

<template>
  <VForm>
  <v-text-field
    label="Nom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    label="Annee"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <VCheckbox 
    label="Victoire"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    label="Lieu"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    label="Force"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    label="Pertes"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    label="Situation"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
<!--  <v-input type="image" 
  label="Image" 
  />-->
  </VForm>
  <!--
    v-model="bataille.nom"
    v-model.number="bataille.annee"
    v-model="bataille.victoire"
    v-model="bataille.lieu"
    v-model="bataille.force"
    v-model="bataille.pertes"
    v-model="bataille.situation"
    v-model="bataille.image" 
    -->
</template>

<style scoped></style>
