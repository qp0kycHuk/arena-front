import { PageContent } from "@layouts/PageContent";
import { IUser } from "@models/User";
import { EntityId } from "@reduxjs/toolkit";
import { ProfileEditImage } from "./ProfileEdit.Image";
import { useUserEditContext } from "./ProfileEdit.Context";
import { Button, DatePicker, Input } from "@features/ui";
import { PhoneInput } from "@components/PhoneInput";
import { getUnmaskedPhoneValue } from "@utils/index";
import { Spiner } from "@components/Spiner";


interface IProfileEditProps {

}

export function ProfileEdit({ }: IProfileEditProps) {
    const { user, update, loading, submitHandler } = useUserEditContext()

    return (
        <form onSubmit={submitHandler}>
            <ProfileEditImage />
            <div className="my-5"></div>

            <div className="flex">
                <div className="w-[360px] ">
                    <div className="mb-8 text-2xl font-semibold">Личные данные</div>
                    <div className="flex flex-col gap-5">
                        <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Фамилия</div>
                            <Input value={user.last_name || ''} className="w-full" required
                                onChange={(event) => update({ last_name: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Имя</div>
                            <Input value={user.first_name || ''} className="w-full" required
                                onChange={(event) => update({ first_name: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Отчество</div>
                            <Input value={user.patronymic || ''} className="w-full"
                                onChange={(event) => update({ patronymic: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Дата рождения</div>
                            <DatePicker className="w-full" value={user.date_of_birth}
                                onSelect={({ date }) => update({ date_of_birth: (date as Date).toISOString() })} />
                        </label>
                    </div>
                </div>
                <div className="mx-12 border-r border-gray border-opacity-20"></div>
                <div className="w-[360px] ">
                    <div className="mb-8 text-2xl font-semibold">Контакты</div>
                    <div className="flex flex-col gap-5">
                        <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Почта</div>
                            <Input value={user.email || ''} className="w-full"
                                onChange={(event) => update({ email: event.target.value })} />
                        </label>
                        {/* <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Телеграм</div>
                            <Input value={user.email || ''} className="w-full"
                                onChange={(event) => update({ email: event.target.value })} />
                        </label> */}
                    </div>
                </div>
                <div className="mx-12 border-r border-gray border-opacity-20"></div>
                <div className="w-[360px] ">
                    <div className="mb-8 text-2xl font-semibold">Данные для входа в ЛК</div>
                    <div className="flex flex-col gap-5">
                        <label className="block w-full">
                            <div className="mb-2 text-sm font-medium">Логин</div>
                            <PhoneInput value={user.phone || ''} className="w-full" required
                                onChange={(event) => update({ phone: getUnmaskedPhoneValue(event.target.value) })} />
                        </label>

                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <Button type='submit' disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                <Button variant='light'>Отмена</Button>
            </div>
        </form>
    );
}