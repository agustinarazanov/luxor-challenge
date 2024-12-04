import { boolean, timestamp, pgTable, text, primaryKey, integer, real, pgEnum } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import type { AdapterAccount } from "next-auth/adapters";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL!);
export default db;

export const collection = pgTable("collection", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    description: text().notNull(),
    stocks: integer().notNull(),
    price: real().notNull(),
    userId: text()
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const status = pgEnum("status", ["pending", "accepted", "rejected"]);

export const bid = pgTable("bid", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    collectionId: integer()
        .notNull()
        .references(() => collection.id, { onDelete: "cascade" }),
    price: real().notNull(),
    userId: text()
        .notNull()
        .references(() => user.id),
    status: status().notNull().default("pending"),
});

export const user = pgTable("user", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text(),
    email: text().unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text(),
    password: text(),
});

export const account = pgTable(
    "account",
    {
        userId: text()
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        type: text().$type<AdapterAccount>().notNull(),
        provider: text().notNull(),
        providerAccountId: text().notNull(),
        refresh_token: text(),
        access_token: text(),
        expires_at: integer(),
        token_type: text(),
        scope: text(),
        id_token: text(),
        session_state: text(),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const session = pgTable("session", {
    sessionToken: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationToken = pgTable(
    "verificationToken",
    {
        identifier: text().notNull(),
        token: text().notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

export const authenticator = pgTable(
    "authenticator",
    {
        credentialID: text().notNull().unique(),
        userId: text()
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        providerAccountId: text().notNull(),
        credentialPublicKey: text().notNull(),
        counter: integer().notNull(),
        credentialDeviceType: text().notNull(),
        credentialBackedUp: boolean().notNull(),
        transports: text(),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
);
