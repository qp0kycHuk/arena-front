import { useFetchUsers } from "@store/users/users.hooks";


interface IUserListProps { }

export function UserList(props: IUserListProps) {
    const { items: users } = useFetchUsers()

    return (
        <div>
            {users.map((user) => <div>{user.last_name}</div>)}
        </div>
    );
}