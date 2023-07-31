import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const urlRequiresNonAuth = /^\/auth(\/|$)/.test(to.fullPath)
    const requiresNonAuth = /^\/admin(\/|$)/.test(to.fullPath)
    const accessToken = !!(useCookie('access_token').value)
    if (!accessToken && requiresNonAuth) return navigateTo('/auth/signin')
    const {isAuthenticated} = storeToRefs(useAuthStore())
    try {
        if (accessToken) {
            isAuthenticated.value = true
        }
        if (urlRequiresNonAuth && accessToken) {
            return navigateTo('/admin/users')
        }

    } catch (error) {
        
    }
})