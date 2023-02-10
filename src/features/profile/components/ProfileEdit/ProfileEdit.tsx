import { PageContent } from "@layouts/PageContent";
import { IUser } from "@models/User";
import { EntityId } from "@reduxjs/toolkit";
import { ProfileEditImage } from "./ProfileEdit.Image";
import { useUserEditContext } from "./ProfileEdit.Context";
import { DatePicker, Input } from "@features/ui";
import { PhoneInput } from "@components/PhoneInput";
import { getUnmaskedPhoneValue } from "@utils/index";


interface IProfileEditProps {

}

export function ProfileEdit({ }: IProfileEditProps) {
    const { user, update } = useUserEditContext()

    return (
        <div>
            <ProfileEditImage />
            <div className="my-5"></div>

            <div className="flex">
                <div className="w-[360px] ">
                    <div className="text-2xl font-semibold mb-8">Личные данные</div>
                    <div className="flex flex-col gap-5">
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Фамилия</div>
                            <Input value={user.last_name || ''} className="w-full"
                                onChange={(event) => update({ last_name: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Имя</div>
                            <Input value={user.first_name || ''} className="w-full"
                                onChange={(event) => update({ first_name: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Отчество</div>
                            <Input value={user.patronymic || ''} className="w-full"
                                onChange={(event) => update({ patronymic: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Дата рождения</div>
                            <DatePicker className="w-full" value={user.date_of_birth}
                                onSelect={({ date }) => update({ date_of_birth: (date as Date).toISOString() })} />
                        </label>
                    </div>
                </div>
                <div className="border-r border-gray border-opacity-20 mx-12"></div>
                <div className="w-[360px] ">
                    <div className="text-2xl font-semibold mb-8">Контакты</div>
                    <div className="flex flex-col gap-5">
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Почта</div>
                            <Input value={user.email || ''} className="w-full"
                                onChange={(event) => update({ email: event.target.value })} />
                        </label>
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Телеграм</div>
                            <Input value={user.email || ''} className="w-full"
                                onChange={(event) => update({ email: event.target.value })} />
                        </label>
                    </div>
                </div>
                <div className="border-r border-gray border-opacity-20 mx-12"></div>
                <div className="w-[360px] ">
                    <div className="text-2xl font-semibold mb-8">Данные для входа в ЛК</div>
                    <div className="flex flex-col gap-5">
                        <label className="block w-full">
                            <div className="text-sm font-medium mb-2">Логин</div>
                            <PhoneInput value={user.phone || ''} className="w-full"
                                onChange={(event) => update({ phone: getUnmaskedPhoneValue(event.target.value) })} />
                        </label>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}