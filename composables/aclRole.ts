import { useAuthStore } from "~/store/auth"
import { UserRoleEnum } from "~/types/role.enum"

const roles = useRoles()
export const useACLRole =()=>{
    const {user} = useAuthStore()
    const hashSuperAdminRole =  computed(()=>!!user.role.match(UserRoleEnum.ROOT))
    const hashAdminRole =  computed(()=>!!user.role.match(UserRoleEnum.ADMIN))
    const hashExpeditorRole = computed(()=>!!user.role.match(UserRoleEnum.EXPERDITOR))
    const hashReceiverRole = computed(()=>!!user.role.match(UserRoleEnum.RECIPIENT))
    const hashAgencyRole = computed(()=>!!user.role.match(UserRoleEnum.AGENCY))
    const hashSubAgencyRole = computed(()=>!!user.role.match(UserRoleEnum.SUB_AGENCY))
    const canAdminsView = computed(()=>(hashAdminRole.value||hashSuperAdminRole.value))
    const canAgenciesView = computed(()=>(hashAgencyRole.value||hashSubAgencyRole.value))

    return{
        hashSuperAdminRole,
        hashAgencyRole,
        hashAdminRole,
        hashExpeditorRole,
        hashReceiverRole,
        canAdminsView,
        canAgenciesView,
        canSubAgencyView: hashSubAgencyRole,
    }
}