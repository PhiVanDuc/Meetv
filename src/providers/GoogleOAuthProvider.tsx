"use client"

import { GoogleOAuthProvider as GoogleOAuthProviderLibrary } from '@react-oauth/google';

interface Props {
    readonly children: React.ReactNode
}

export default function GoogleOAuthProvider({ children }: Props) {
    return (
        <GoogleOAuthProviderLibrary clientId={process.env.NEXT_PUBLIC_GOOGLE_CUSTOMER_ID ?? ""}>
            {children}
        </GoogleOAuthProviderLibrary>
    )
}
