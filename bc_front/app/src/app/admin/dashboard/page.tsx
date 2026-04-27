'use client'
import Informations from "@/components/profile/Informations";
import Divider from "@/components/profile/Divider";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/interfaces/User.interface";
import Loader from "@/components/Loader";
import { Box } from "@mui/material";
import DashboardCards from "@/components/admin/DashboardCards";
import { Offer } from "@/interfaces/Offer.interface";
import { Contract } from "@/interfaces/Contract.enum";
import DashboardCompanyValidate from "@/components/admin/DashboardCompanyValidate";
import { Company } from "@/interfaces/Company.interface";
import DashboardOfferValidate from "@/components/admin/DashboardOfferValidate";
export default function DashboardPage() {
    const { data: session } = useSession()
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);
    const dashBoardCards = [
        {
            title: 'Offres disponibles'
        },
        {
            title: 'Étudiants'
        },
        {
            title: 'Ancien étudiants'
        },
        {
            title: 'Entreprises'
        }
    ]
    useEffect(() => {
        if (session) {
            setUser(session?.user as User);
            setIsLoading(false);
        }
    }, [session]);


    const profileType = useMemo<"administrator" | "student" | "company">(() => {
        if (!user) return "student";
        if (user.roles.includes("ROLE_ADMIN")) return "administrator";
        if (user.roles.includes("ROLE_COMPANY")) return "company";
        return "student";
    }, [user]);

    if (isLoading || !user) {
        return(<Loader />) 
    }


    const companiesToValidate: Company[] = [
        {
            id: 1,
            name: 'Company 1',
            siret: '1234567890',
            jobFunction: 'Job Function 1',
            logo: undefined,
            isSearch: false,
            sector: 'Sector 1',
            sizeCompany: 200,
            instagram: 'instagram1',
            website: 'website1',
            linkedin: 'linkedin1',
            description: 'Description 1',
            isValidate: false,
            place: [{
                id: 1,
                libelle:'Paris'
            }],
            createdAt: new Date('2026-04-24T10:00:00Z')
        },{
            id: 2,
            name: 'Company 2',
            siret: '1234567890',
            jobFunction: 'Job Function 2',
            logo: undefined,
            isSearch: false,
            sector: 'Sector 2',
            sizeCompany: 200,
            instagram: 'instagram2',
            website: 'website2',
            linkedin: 'linkedin2',
            description: 'Description 2',
            isValidate: false,
            place: [{
                id: 1,
                libelle:'Nantes'
            }],
            createdAt: new Date('2026-04-24T08:00:00Z')
        },{
            id: 3,
            name: 'Company 3',
            siret: '1234567890',
            jobFunction: 'Job Function 3',
            logo: undefined,
            isSearch: false,
            sector: 'Sector 3',
            sizeCompany: 200,
            instagram: 'instagram3',
            website: 'website3',
            linkedin: 'linkedin3',
            description: 'Description 3',
            isValidate: false,
            place: [{
                id: 1,
                libelle:'le mans'
            }],
            createdAt: new Date('2026-04-23T12:00:00Z')
        },{
            id: 4,
            name: 'Company 4',
            siret: '1234567890',
            jobFunction: 'Job Function 4',
            logo: undefined,
            isSearch: false,
            sector: 'Sector 4',
            sizeCompany: 200,
            instagram: 'instagram4',
            website: 'website4',
            linkedin: 'linkedin4',
            description: 'Description 4',
            isValidate: false,
            place: [{
                id: 1,
                libelle:'le mans'
            }],
            createdAt: new Date('2026-04-22T12:00:00Z')
        }
    ]
    const offers: Offer[] = [
        {
            id: 1,
            title: 'Offre 1',
            domain: 'Domain 1',
            level: 1,
            description: 'Description 1',
            mission: 'Mission 1',
            startDate: new Date(),
            endDate: new Date(),
            duration: 1,
            salary: 1000,
            compensation: 1000,
            rythm: 'Rythm 1',
            isTeleWorking: true,
            workingTime: 1,
            isClosed: false,
            contract: Contract.CDI,
            place: [{
                id: 1,
                libelle:'le mans'
            }],
            company: {
                id: 1,
                name: 'Company 1',
                siret: '1234567890',
                jobFunction: 'Job Function 1',
                logo: undefined,
                sector: 'Sector 1',
                sizeCompany: 1,
                isSearch: true,
                instagram: 'instagram1',
                website: 'website1',
                linkedin: 'linkedin1',
                description: 'Description 1',
                place: [{
                    id: 1,
                    libelle:'Paris'
                }],
            },
            createdAt: new Date(),
            administrator: {
                id: 1,
                name: 'Administrator 1',
                logo: undefined,
                description: 'Description 1',
                instagram: 'instagram1',
                website: 'website1',
                linkedin: 'linkedin1',
                place: [{
                    id: 1,
                    libelle:'Paris'
                }],
            },
            isValidate: false
        }
    ]
    return (
        <Box>
            <Informations user={user as User} setUser={setUser} role={profileType} />
            <Divider user={user as User} role={profileType}/>
            <Box sx={{width: { xs: "92%", md: "70%", xl: "70%" },marginInline: 'auto'}}>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    {dashBoardCards.map((card) => (
                        <DashboardCards key={card.title} title={card.title} numbers={0} />
                    ))}
                </Box>
                <DashboardCompanyValidate companiesToValidate={companiesToValidate} />
                <DashboardOfferValidate offersToValidate={offers} />
            </Box>
        </Box>
    )
}