import { TrashIcon } from "@assets/icons/stroke";
import { Spiner } from "@components/Spiner";
import { Button, Input } from "@features/ui";
import { useLoading } from "@hooks/useLoading";
import { IHandbook } from "@models/Handbook";
import { EntityId } from "@reduxjs/toolkit";
import { getRandomUUID } from "@utils/index";
import { useEffect, useState } from "react";

interface IHandbooksEditProps {
    initialHandbooks?: Partial<IEditHandbook>[]
}

interface IEditHandbook extends IHandbook {
    key?: EntityId
}

export function HandbooksEdit({ initialHandbooks }: IHandbooksEditProps) {
    const { loading } = useLoading()
    const [handbooks, setHandbooks] = useState<Partial<IEditHandbook>[]>(initialHandbooks || [])

    useEffect(() => {
        setHandbooks(initialHandbooks || [])
    }, [initialHandbooks])

    function addItem() {
        setHandbooks([
            ...handbooks,
            {
                key: getRandomUUID(),
                name: '',
            }
        ])
    }

    function updateHandbookName(id?: EntityId, name?: string) {
        if (!id) return

        setHandbooks((prev) => prev.map((item) => {
            if (item.id === id || item.key === id) {
                return {
                    ...item,
                    name
                }
            }

            return item
        }))
    }

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(handbooks);

    }

    return (
        <form onSubmit={submitHandler}>
            {handbooks.map((handbook) => (
                <div className="flex mb-4" key={handbook.id || handbook.key}>
                    <div>
                        {/* <div className="text-sm mb-2 font-medium">Заголовок</div> */}
                        <Input className='w-96'
                            value={handbook.name}
                            onChange={(event) => updateHandbookName(handbook.id || handbook.key, event.target.value)} />
                    </div>
                    <Button color="red" variant="light" icon className="ml-6 self-end">
                        <TrashIcon className="text-2xl" />
                    </Button>
                </div>
            ))}


            <Button onClick={addItem} variant='text' className='mt-2'>Добавить позицию</Button>


            <div className="flex gap-4 mt-8">
                <Button type='submit' disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                <Button variant='light'>Отмена</Button>
            </div>
        </form>
    );
}