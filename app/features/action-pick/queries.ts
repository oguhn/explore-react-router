import db from "~/db";
import { actionPick } from "./schema";

export const getActionPickList = async () => {
    const actionPickList = await db.select({
        id: actionPick.id,
        title: actionPick.title,
        image: actionPick.image,
        description: actionPick.description,
        benefits: actionPick.benefits,
        createdAt: actionPick.createdAt,
        updatedAt: actionPick.updatedAt,
    })
        .from(actionPick)

    return actionPickList;
}