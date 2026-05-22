type Key = string
type Value = string | number | boolean | string[] | number[] | null | undefined

export default (data: Record<Key, Value>) => {
    const searchParams = new URLSearchParams()

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(valueItem => {
                if (valueItem !== "" && valueItem !== null && valueItem !== undefined) {
                    searchParams.append(key, valueItem.toString())
                }
            })
        }
        else if (value !== "" && value !== null && value !== undefined) {
            searchParams.set(key, value.toString())
        }
    })

    const queryString = searchParams.toString()
    return queryString ? `?${queryString}` : ""
}