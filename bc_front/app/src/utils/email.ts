import { ApiFetch } from "@/hooks/useFetcher"

export const createStudentEmail = async (
    emails: string[],
    fullName: string,
    type: string,
    role: string,
    link: string,
    apiFetch: ApiFetch
  ): Promise<void> => {
    try {
  
      const emailRequest = {
        to: emails,
        fullName: fullName,
        type: type,
        role: role,
        link: link,
      }
  
      await apiFetch('/api/send-email', 'POST', emailRequest)
    } catch (error) {
        //create error message (enqueueSnackbar)
        throw error
    }
  }
