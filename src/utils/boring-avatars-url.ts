interface Parameters {
    name?: string
}

export default ({ name: paramName }: Parameters) => {
    const name = paramName || "default name";
    return `https://boring-avatars-api.vercel.app/api/avatar?name=${encodeURIComponent(name)}`;
}