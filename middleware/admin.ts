
export default defineNuxtRouteMiddleware((to, from) => {
   
    const { canAdminsView} = useACLRole()
    console.log("es")
    if (!canAdminsView.value) return navigateTo('/admin')
    
})