import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { PageContent } from "@layouts/PageContent";
import { UserList } from "../components/UserList/UserList";

interface IUserListPageProps { }

export function UserListPage(props: IUserListPageProps) {
    useDocumentTitle('Пользователи')

    return (
        <PageContent className="p-8">
            <div className="mb-10 text-2xl font-semibold">Пользователи</div>

            <UserList />
        </PageContent>
    );
}