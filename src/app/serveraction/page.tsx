import WhoAmIButton from "@/app/serveraction/whoAmIButton"
import { getServerSession } from "next-auth"

export default async function ServerActionPage() {
    const whoAmI = async()=>{
        'use server'
        const session = await getServerSession()
        return session?.user?.name || "not logged in"
    }

    return(
        <div>
            <WhoAmIButton whoAmIAction={whoAmI}/>
        </div>
    )
}
