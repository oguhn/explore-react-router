import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import type { Database } from 'database.types'

export const browserClient = createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)

export const makeSSRClient = (request: Request) => {
    const headers = new Headers();

    const serverSideClient = createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    const cookieHeader = request.headers.get("Cookie") ?? "";
                    const parsedCookies = parseCookieHeader(cookieHeader);

                    return parsedCookies
                        .filter(cookie => cookie.value !== undefined)
                        .map(cookie => ({
                            name: cookie.name,
                            value: cookie.value!
                        }));
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        headers.append(
                            "Set-Cookie",
                            serializeCookieHeader(name, value, options)
                        );
                    });
                },
            },
        }
    );

    return {
        client: serverSideClient,
        headers,
    };
}