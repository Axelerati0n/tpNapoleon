<script setup lang="ts" >
const {mobile} = useDisplay()
const darkMode=ref<'light' | 'dark'>('dark')
const drawer = ref(!mobile.value)
onMounted(() => {
  console.log('Mounted layout')
})
onBeforeMount(() => {
  console.log('Before mount layout')
})
onBeforeUnmount(() => {
  console.log('Before unmount layout')
})

function handleClick(){
  drawer.value = !drawer.value
}


</script>


<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="icon" href="/favicon.ico">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TP-NAPOLEON</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.js" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    </html>

<VApp :theme='darkMode'>
  <VLayout class="rounded rounded-md">
    <VAppBar title="TP-NAPOLEON" class="position-fixed">
      <template v-slot:prepend>
      <NavButton v-if="mobile" @click="handleClick" />
      <!--afficher AppNavigationDrawer une fois le bouton cliqué-->
      

      </template>
      <AppButton v-model="darkMode"/>
    </VAppBar>
      <AppNavigationDrawer v-model="drawer"/>


    <VMain class="d-flex align-center justify-center" style="min-height: 300px;">
      <slot/>
    </VMain>
  </VLayout>
  </Vapp>
</template>
<style>
html{
  overflow: auto;
}

</style>