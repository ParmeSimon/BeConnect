export type ApiFilter = {
    property: string
    value: string
}

export const fetcher = async (
    endPoint: string,
    token?: string,
    setHasMore?: (hasMore: boolean) => void,
    fullResponse?: boolean
) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
        method: 'GET',
        headers: {
            Accept: 'application/ld+json',
            Authorization: token ? `Bearer ${token}` : ''
        }
    }).then(async res => {
        const response = await res.json()
        if (res.status === 200) {
            if (setHasMore) {
                if (
                    response['hydra:view'] === undefined ||
                    endPoint === response['hydra:view']['hydra:last']
                ) {
                    setHasMore(false)
                }
            }
            if (fullResponse) return response
            if (response['hydra:member'] !== undefined) {
                return response['hydra:member']
            } else {
                return response
            }
        }
        if (res.status === 500) {
            throw { status: 500, message: response['detail'] }
        }
        throw response
    })
}

export const getKey = (
    endPoint: string,
    pageIndex: number,
    previousPageData: any | null,
    query?: string
) => {
    if (previousPageData && !previousPageData.length) {
        return null
    }

    return `${endPoint}?page=${pageIndex + 1}${query ? query : ''}`
}
