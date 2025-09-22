import {  betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./prisma";
import { hashPassword, verifyPassword } from "./argon";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware,  APIError } from "better-auth/api";
import { getValidDomains, normalizeName} from "./utils";
import { Projects_Names, UserRole } from "@prisma/client";
import { admin, customSession } from "better-auth/plugins";
import {ac, roles} from "@/lib/permission";
import { sendEmailAction } from "./actions/sendEmailAction";

const options = {
    database: prismaAdapter(db, {
       provider : "postgresql"
    }),
    socialProviders: {
        google: {
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
        }  
    },
    emailAndPassword: {    
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: false,
        password: {
           hash: hashPassword,
           verify: verifyPassword,
        },
        requireEmailVerification: true,

        sendResetPassword: async ({user, url}) => {
            await sendEmailAction({
                to: user.email,
                subject:"Reset your password",
                meta: {
                    description:"Please click the link below to reset your password",
                    link: url
                }
            })
        }      
    },
    emailVerification: {
        sendOnSignUp: true,
        // expiresIn: 60 * 60,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async ({user,url}) => {
            const link = new URL(url);
            link.searchParams.set("callbackURL", "/verify");
            
            await sendEmailAction({
                to: user.email,
                subject: "Verify your email address",
                meta: {
                    description:"Please verify your email address to complete the registration process.",
                    link: String(link),
                },
            });
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(':') ?? []

                    if (ADMIN_EMAILS.includes(user.email)) {
                        return{ data: { ...user, role: UserRole.ADMIN}};
                    }
                    return {data: user}
                }
            }
        }
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if(ctx.path === "/sign-up/email") {
                const email = String(ctx.body.email)
                const domain = email.split("@")[1];

                if(!getValidDomains().includes(domain)) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid domain. Please use a valid email address."
                    })
                }

                const name = normalizeName(ctx.body.name);
                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name,
                        }
                    }
                }
            }
        }),
    },
    user: {
        additionalFields: {
            role: {
                type: ["USER", "ADMIN"] as Array<UserRole>,
                input: false,
            },
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60,
        cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
        },
    },
    account: {
        accountLinking: {
            enabled: false
        }
    },
    advanced: {
        database: {
            generateId: false
        }
    },
    plugins: [
        nextCookies(),
        admin({
            defaultRole: UserRole.USER,
            adminRoles: [UserRole.ADMIN],
            ac,
            roles
        }),
    ],
    
} satisfies BetterAuthOptions


export const auth = betterAuth({
    ...options,
    plugins: [
        ...(options.plugins ?? []),
        customSession(async ({user,session}) => {
            return {
                session: {
                    expiresAt: session.expiresAt,
                    token: session.token,
                    userAgent: session.userAgent
                },
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    createdAt: user.createdAt,
                    role: user.role,
                    projects: Projects_Names,
                }
            }
        }, options),
    ]
});


export type ErrorCode =  keyof typeof auth.$ERROR_CODES | "UNKNOWN"

export type User = typeof auth.$Infer.Session.user