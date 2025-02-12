import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            birthday: string;
            username: string;
            email: string;
            image: string;
            role: string;
        } & DefaultSession["user"];
    }
}
