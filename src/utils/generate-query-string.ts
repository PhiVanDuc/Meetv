type QueryValue = 
    | string
    | number
    | boolean
    | QueryValue[];

export default (object: Record<string, QueryValue>) => {
    const searchParams = new URLSearchParams();

    Object.entries(object).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach(element => {
                if (element === undefined || element === null) return;
                searchParams.append(key, element.toString())
            });
        }
        else searchParams.append(key, value.toString());
    });

    const query = searchParams.toString();
    return query ? `?${query}` : "";
}