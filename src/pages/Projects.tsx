import { AdjustmentsHorizontalIcon, BookmarkIcon, FileTextIcon, FoldersIcon, SearchIcon, SettingsIcon } from '@assets/icons/stroke';
import { ReactComponent as FolderIcon } from '@assets/img/folder.svg';
import { Button, Input } from '@features/ui';
import { Menu } from '@lib/Menu';


export interface IProjectsProps {
}

export function Projects(props: IProjectsProps) {
  return (
    <div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white">
      <div className="absolute text-xs opacity-50 left-8 top-6">База знаний / Проекты</div>
      <div className="flex items-center mb-8">
        <div className="text-2xl font-semibold">Проекты</div>
        <Button variant='contur' color='gray' className='ml-auto'>
          <SettingsIcon className="text-2xl" />
        </Button>
        <Menu align='end' menuButton={
          <Button className='ml-4 px-7'> Добавить </Button>
        }>
          <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FoldersIcon className="mr-2" /> Папка </Button>
          <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FileTextIcon className="mr-2" /> Статья </Button>

        </Menu>
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
        <FolderIcon className='mr-4 text-3xl' />
        <div className="py-2 mr-4 text-xs font-semibold text-center rounded-full bg-gray bg-opacity-10 text-gray w-11">
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
        <FolderIcon className='mr-4 text-3xl' />
        <div className="py-2 mr-4 text-xs font-semibold text-center rounded-full bg-gray bg-opacity-10 text-gray w-11">
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
          <img src="img/test.jpg" alt="" className="absolute object-cover w-full h-full" />
        </div>
        <div className='max-w-5xl ml-4'>
          <div className="mb-2 font-semibold">Сколько столбцов должно быть в идеальной форме регистрации?</div>
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
          <img src="img/test.jpg" alt="" className="absolute object-cover w-full h-full" />
        </div>
        <div className='max-w-5xl ml-4'>
          <div className="mb-2 font-semibold">Сколько столбцов должно быть в идеальной форме регистрации?</div>
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
