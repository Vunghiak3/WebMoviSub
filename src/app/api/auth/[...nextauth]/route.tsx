import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Role from "@/models/Role";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectionToDatabase();

        const user = await User.findOne({
          username: credentials?.username,
        }).populate("roleId");

        if (user && credentials?.password) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            return {
              id: user._id.toString(),
              name: user.name,
              birthday: user.birthday,
              username: user.username,
              email: user.email,
              image: user.image,
              role: user.roleId.role,
            };
          }
        }

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile) {
        await connectionToDatabase();

        let user = await User.findOne({ email: profile.email });
        const roleDefault = await Role.findOne({ role: "user" });

        const currentDate = new Date();
        const birthday = `${currentDate.getDate()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getFullYear()}`;

        if (!user) {
          user = new User({
            name: profile.name,
            birthday: birthday,
            username: profile.email,
            email: profile.email,
            password: "null",
            image: profile.picture,
            roleId: roleDefault,
          });

          await user.save();
        }

        return {
          id: user._id.toString(),
          name: user.name,
          birthday: user.birthday,
          username: user.username,
          email: user.email,
          image: user.image,
          role: user.roleId.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/dang-nhap",
    verifyRequest: "/",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // Nếu người dùng đăng nhập thành công, thêm thông tin vào token
      if (user) {
        token.id = user.id;
        (token.name = user.name),
          (token.birthday = user.birthday),
          (token.username = user.username);
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Đưa thông tin từ token vào session
      session.user.id = token.id;
      (session.user.name = token.name),
        (session.user.birthday = token.birthday),
        (session.user.username = token.username);
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
