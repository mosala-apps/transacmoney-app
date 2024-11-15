import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const urlRequiresNonAuth = /^\/auth(\/|$)/.test(to.fullPath)
    const requiresNonAuth = /^\/admin(\/|$)/.test(to.fullPath)
    const transactionsAuth = /^\/transactions(\/|$)/.test(to.fullPath)
    const accessToken = !!(useCookie('access_token').value)
    if (!accessToken && requiresNonAuth && transactionsAuth) return navigateTo('/auth/signin')
    const {isAuthenticated,user} = storeToRefs(useAuthStore())
    const role = useACLRole()
    console.log("Auth", role.canAdminsView.value )
    try {
        if (accessToken) {
            isAuthenticated.value = true
        }
        if (urlRequiresNonAuth && accessToken) {
            if (role.canAdminsView.value) {
                return navigateTo('/admin/users')
            }
            else if (role.canAgenciesView.value) {
                return navigateTo('/admin')
            }
        }

    } catch (error) {
        
    }
})