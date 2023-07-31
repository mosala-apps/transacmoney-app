import { useAuthStore } from "~/store/auth"

const roles = useRoles()
export const useACLRole =()=>{
    const {user} = useAuthStore()
    const hashSuperAdminRole =  computed(()=>!!user.role.match('super_admin'))
    const hashAdminRole =  computed(()=>!!user.role.match('admin'))
    const hashExpeditorRole = computed(()=>!!user.role.match('expeditor'))
    const hashReceiverRole = computed(()=>!!user.role.match('receiver'))
    const hashAgencyRole = computed(()=>!!user.role.match('agency'))
    const hashSubAgencyRole = computed(()=>!!user.role.match('sub_agency'))
    const canAdminsView = computed(()=>(hashAdminRole.value||hashSuperAdminRole.value))
    const canAgenciesView = computed(()=>(hashAgencyRole.value||hashSubAgencyRole.value))

    return{
        hashSuperAdminRole,
        hashAdminRole,
        hashExpeditorRole,
        hashReceiverRole,
        canAdminsView,
        canAgenciesView
    }
}