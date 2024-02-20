

<script setup lang="ts">

import type { BatailleInterface } from "~/types/bataille";





const {data } = useFetch<Array<BatailleInterface>>('/api/bataille', {
    default : () => [] as Array<BatailleInterface>,
})

var rest='';


/** CHANGEMENT D'ICONE */

let icon = defineModel<'mdi-eye-minus-outline' | 'mdi-eye-plus'>({required: true})
icon.value='mdi-eye-minus-outline'

const changeIconOver = () => {
    if(icon.value === 'mdi-eye-minus-outline') {
        icon.value = 'mdi-eye-plus'
    }
}
const changeIconOut = () => {
    if(icon.value === 'mdi-eye-plus') {
        icon.value = 'mdi-eye-minus-outline'
    }
    
}

/** TRONCAGE DE TEXTE */
// onMounted(() => {
//     function initierTrunc(elementId: string, maxLength :number, grandMaxLength : number) {
//     var element = document.getElementById(elementId);
    
    
//     if (element == null) return;

//     var textReduit = element.innerText.substring(0, maxLength-10).trim() +'...';
//     var totalCharacters = element.innerText.length;
//     console.log(totalCharacters);

//     if (totalCharacters >= (grandMaxLength+10)) {
//         element.innerText = textReduit;
//         console.log('oui ca passe dedans')
//     }
// }
//     initierTrunc('divInformation', 300, 300)
//   })

function truncateText(elementId: string, maxLength :number, grandMaxLength : number) {
    var element = document.getElementById(elementId);
    
    
    if (element == null) return;
    var rest = element.innerText.substring(maxLength, grandMaxLength);
    var textEntier = element.innerText.substring(0, maxLength-10).trim() +rest+'...';
    var textReduit = element.innerText.substring(0, maxLength-10).trim() +'...';
    var totalCharacters = element.innerText.length;
    console.log(totalCharacters);

    if (totalCharacters >= (grandMaxLength+20)) {
        element.innerText = textReduit;
        console.log('oui ca passe dedans')
    }
    else if (totalCharacters < grandMaxLength && totalCharacters > (maxLength+10)) {
        element.innerText = textReduit;
        console.log('texte reduit')
    }
    else if(totalCharacters < (maxLength+10)) {
        element.innerText = textEntier;
        console.log('texte entier')
    }
    
    
    
  }






   



  

      
  

  


</script>

<template>
    <div class="divParent">
    <div v-for="bataille in data" :key="bataille.id" class="divBataille">
        <span v-if="bataille.victoire" class="spanVictoire">
        <VCard class="card" :title="(bataille.nom + ' - ' + bataille.annee)">
            <img class="image" :src="`data:image/png;base64,${bataille.image}`" alt="decodedImage" width="100%"/>
        </VCard>
        <div id="divInformation" class="divInformation">
            <p class="pTitle">Date et lieu</p>
            <p class="pInfo">{{bataille.lieu}}</p>
            <p class="pTitle">Forces en présence</p>
            <p class="pInfo">{{bataille.force}}</p>
            <p class="pTitle">Pertes</p>
            <p class="pInfo">{{bataille.pertes}}</p>
            <p class="pTitle">Situation</p>
            <p class="pInfo">{{bataille.situation}}</p>
           
        </div>
        <VBtn id="btnHidden" @mouseover="changeIconOver()" @mouseout="changeIconOut()" @click="truncateText('divInformation',300,900)" :icon=icon></VBtn>
        </span>
        </div>
        


        
    
    </div>
    <!-- <VDataTable :items="data"></VDataTable> -->
</template>

<style scoped>
.divParent{
    width: 90%;
    margin: 3% 5%;
    border: 0.2rem solid red;
    background-color: grey;
}
.spanVictoire{
    display: flex;
    width: 95%;
    margin: 2% 2%;
    padding: 2%;
    flex-direction: row;
    border:  0.2rem solid rgb(75, 73, 73);
}

.card{
    width: 35%;
    text-align: center;
    font-size: small;
    padding:  5px;
    background-color: none;
}
.divInformation{
    border: 0.2rem solid aquamarine;
    width: 60%;
    height: auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12;
 
 
    
    
}
.pTitle{
    font-weight: bold;
    margin: 10px 0 10px 10px;
   
}

.pInfo{
    margin: 0 0 10px 40px;
   
}
.image{
    height: 60%;
}
</style>