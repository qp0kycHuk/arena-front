import { Button, Input } from '@features/ui';
import { Link } from 'react-router-dom';
import { MaskedInput } from '@features/ui/components/Input';
import { phoneMask } from '@const/maskExpressions';

interface IRegistrationFormProps {
}

export function RegistrationForm(props: IRegistrationFormProps) {
    return (
        <form className="bg-white dark:bg-black dark:text-white m-auto rounded-3xl px-8 py-10 w-[400px]">
            <h1 className='text-2xl text-center font-semibold mb-10'>Регистрация</h1>
            <div className="space-y-4">
                <label className='block'>
                    <div className="text-sm font-medium mb-2">Телефон</div>
                    <MaskedInput className='w-full' type='tel' name="login" required mask={phoneMask} />
                </label>
                <label className='block'>
                    <div className="text-sm font-medium mb-2">Пароль</div>
                    <Input className='w-full' type='password' name="password" required />
                </label>
                <label className='block'>
                    <div className="text-sm font-medium mb-2">Повторите пароль</div>
                    <Input className='w-full' type='password' name="password_confirmation" required />
                </label>
            </div>
            <Button className='mt-7 w-full'>Зарегистрироваться</Button>
            <div className="mt-5 text-center">
                Уже есть аккаунт <br />
                <Link to='/login' className="font-semibold text-primary underline underline-offset-4 decoration-dashed decoration-1">
                    Войти
                </Link>
            </div>
        </form>
    );
}
