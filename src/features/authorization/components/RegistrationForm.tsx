import { Button, Input } from '@features/ui';
import { Link } from 'react-router-dom';
import { PhoneInput } from '@components/PhoneInput';

interface IRegistrationFormProps {
}

export function RegistrationForm(props: IRegistrationFormProps) {
    return (
        <form className="bg-white dark:bg-black dark:text-white m-auto rounded-3xl px-8 py-10 w-[400px]">
            <h1 className='mb-10 text-2xl font-semibold text-center'>Регистрация</h1>
            <div className="space-y-4">
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Телефон</div>
                    <PhoneInput className='w-full' type='tel' name="login" required />
                </label>
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Пароль</div>
                    <Input className='w-full' type='password' name="password" required />
                </label>
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Повторите пароль</div>
                    <Input className='w-full' type='password' name="password_confirmation" required />
                </label>
            </div>
            <Button className='w-full mt-7'>Зарегистрироваться</Button>
            <div className="mt-5 text-center">
                Уже есть аккаунт <br />
                <Link to='/login' className="font-semibold underline text-primary underline-offset-4 decoration-dashed decoration-1">
                    Войти
                </Link>
            </div>
        </form>
    );
}
