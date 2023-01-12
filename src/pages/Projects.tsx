import { AdjustmentsHorizontalIcon, BookmarkIcon, SearchIcon, SettingsIcon } from '@assets/icons/stroke';
import { ReactComponent as FolderIcon } from '@assets/img/folder.svg';
import { Button, Input } from '@features/ui';

export interface IProjectsProps {
}

export function Projects(props: IProjectsProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-opacity-5 dark:text-white p-8 flex-grow relative">
      <div className="text-xs opacity-50 absolute left-8 top-6">База знаний / Проекты</div>
      <div className="flex items-center mb-8">
        <div className="text-2xl font-semibold">Проекты</div>
        <Button variant='contur' color='gray' className='ml-auto'>
          <SettingsIcon className="text-2xl" />
        </Button>
        <Button className='ml-4 px-7'>
          Добавить
        </Button>
      </div>

      <div className="relative mb-3">
        <Button variant='text' color='gray' size='small' className='px-3 absolute left-1 top-1.5'>
          <AdjustmentsHorizontalIcon className="text-2xl" />
        </Button>
        <Input placeholder='Поиск' className='w-full pl-14 bg-gray bg-opacity-10' />
        <Button variant='text' color='gray' size='small' className='px-3 absolute right-2 top-1.5'>
          <SearchIcon className="text-lg" />
        </Button>
      </div>

      <div className="flex items-center py-4">
        <FolderIcon className='text-3xl mr-4' />
        <div className="bg-gray bg-opacity-10 text-gray w-11 text-center py-2 text-xs font-semibold rounded-full mr-4">
          123
        </div>
        <div className="font-semibold">Дирижер сада</div>
        <div className="ml-auto text-right whitespace-nowrap">
          <div className="text-xs text-gray">Созд: 04.06.2020</div>
          <div className="text-xs text-gray">Ред: 12.06.2022</div>
        </div>
      </div>
      <div className="border-t border-gray border-opacity-20"></div>
      <div className="flex items-center py-4">
        <FolderIcon className='text-3xl mr-4' />
        <div className="bg-gray bg-opacity-10 text-gray w-11 text-center py-2 text-xs font-semibold rounded-full mr-4">
          123
        </div>
        <div className="font-semibold">Дирижер сада</div>
        <div className="ml-auto text-right whitespace-nowrap">
          <div className="text-xs text-gray">Созд: 04.06.2020</div>
          <div className="text-xs text-gray">Ред: 12.06.2022</div>
        </div>
      </div>
      <div className="border-t border-gray border-opacity-20"></div>

      <div className="flex items-center py-3">
        <div className="w-24 h-[76px] rounded-xl relative overflow-hidden">
          <img src="img/test.jpg" alt="" className="absolute w-full h-full object-cover" />
        </div>
        <div className='ml-4 max-w-5xl'>
          <div className="font-semibold mb-2">Сколько столбцов должно быть в идеальной форме регистрации?</div>
          <div className="text-xs text-gray">
            UX — это не только ценные экраны, но и особая оптика: умение смотреть на привычные вещи с непривычного ракурса, находить связи и формулировать рекомендации.В этом тексте я попробую показать вам поездку в такси своими глазами.
          </div>
        </div>
        <div className="ml-auto text-right whitespace-nowrap">
          <div className="text-xs text-gray">Созд: 04.06.2020</div>
          <div className="text-xs text-gray">Ред: 12.06.2022</div>
        </div>
        <Button variant='text' size='small' color='gray' className='px-3 ml-3'>
          <BookmarkIcon className="text-2xl" />
        </Button>
      </div>
      <div className="border-t border-gray border-opacity-20"></div>
      <div className="flex items-center py-3">
        <div className="w-24 h-[76px] rounded-xl relative overflow-hidden">
          <img src="img/test.jpg" alt="" className="absolute w-full h-full object-cover" />
        </div>
        <div className='ml-4 max-w-5xl'>
          <div className="font-semibold mb-2">Сколько столбцов должно быть в идеальной форме регистрации?</div>
          <div className="text-xs text-gray">
            UX — это не только ценные экраны, но и особая оптика: умение смотреть на привычные вещи с непривычного ракурса, находить связи и формулировать рекомендации.В этом тексте я попробую показать вам поездку в такси своими глазами.
          </div>
        </div>
        <div className="ml-auto text-right whitespace-nowrap">
          <div className="text-xs text-gray">Созд: 04.06.2020</div>
          <div className="text-xs text-gray">Ред: 12.06.2022</div>
        </div>
        <Button variant='text' size='small' color='gray' className='px-3 ml-3'>
          <BookmarkIcon className="text-2xl fill-primary text-primary" />
        </Button>
      </div>
    </div>
  );
}
