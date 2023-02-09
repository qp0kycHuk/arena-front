import { PageContent } from "@layouts/PageContent";
import { EntityId } from "@reduxjs/toolkit";
import { useFetchUserById } from "@store/users/users.hooks";


interface IProfileViewProps {
    userId: EntityId
}

export function ProfileView({ userId }: IProfileViewProps) {
    const user = useFetchUserById(userId)

    return (
        <PageContent className="p-8">
            <pre >
                {JSON.stringify(user, null, 2)}
            </pre>
        </PageContent>
    );
}