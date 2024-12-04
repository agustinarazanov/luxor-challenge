import { bid, collection } from "./db/schema";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type BidSelect = InferSelectModel<typeof bid>;
export type CollectionSelect = InferSelectModel<typeof collection>;
export type BidInsert = InferInsertModel<typeof bid>;
export type CollectionInsert = InferInsertModel<typeof collection>;
