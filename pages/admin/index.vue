<template>
    <div>dashbord</div>
</template>
<script lang="ts" setup>
 const { status, data, signIn, signOut } = useAuth()
definePageMeta({
    layout:'admin',
     middleware: 'auth' 
})

</script>
