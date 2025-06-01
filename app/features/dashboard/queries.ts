import db from "~/db";
import { userActionHistory } from "./schema";

export const getActionHistory = async () => {
    const userActionHistoryList = await db.select({
        id: userActionHistory.id,
        action: userActionHistory.action,
        count: userActionHistory.count,
        description: userActionHistory.description,
        createdAt: userActionHistory.createdAt,
        updatedAt: userActionHistory.updatedAt,
    })
        .from(userActionHistory)

    return userActionHistoryList;
}