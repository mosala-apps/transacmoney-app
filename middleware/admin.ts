
export default defineNuxtRouteMiddleware((to, from) => {
   
    const { canAdminsView} = useACLRole()
    if (!canAdminsView.value) return navigateTo('/admin')
    
})