import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"; // Ensure this query is correctly defined in the import path
import { client } from "@/sanity/lib/client"; // Sanity client for reading data
import { writeClient } from "@/sanity/lib/write-client"; // Sanity client for writing data

// Export handlers for API routes
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Configure your providers
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    // Callback to be called during sign in
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio }
    }) {
      // Fetch existing user from Sanity
      const existingUser = await client
        .withConfig({ useCdn: false }) // Bypass CDN and get fresh data
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      // If user does not exist, create a new entry in the Sanity backend
      if (!existingUser) {
        await writeClient.create({
          _type: "author", // This should match your Sanity schema
          id, // GitHub ID
          name, // User's name from GitHub
          username: login, // GitHub login handle
          email, // User's email
          image, // User's profile image
          bio: bio || "" // User's bio
        });
      }

      return true; // Return true to proceed with the sign-in
    },
    // Callback to manage JSON Web Tokens
    async jwt({ token, account, profile }) {
      // Only execute this logic if account and profile are available
      if (account && profile) {
        // Fetch user data to add to the token
        const user = await client
          .withConfig({ useCdn: false }) // Bypass CDN again
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

        token.id = user?._id; // Assign user ID to the token for later use
      }

      return token; // Return the token
    },
    // Callback to manage user session
    async session({ session, token }) {
      // Attach the user ID from token to the session
      Object.assign(session, { id: token.id });
      return session; // Return the session object
    }
  }
});
