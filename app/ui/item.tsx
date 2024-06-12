import { ItemType } from '@/app/ui/drag-and-drop';
import Image from 'next/image';
interface ItemProps {
  clsName: string;
  item: ItemType;
}

const Item: React.FC<ItemProps> = ({ clsName, item }) => {
  const { img, title, position } = item;
  return (
    <div className={`${clsName} w-full border-y-[1px] flex items-center px-10 py-5 first:border-0 last:border-0 pointer-events-none`}>
      <Image src={img} className="rounded-[12px] pointer-events-none" width="96" height="96" alt={title} />
      <div className='ml-6 pointer-events-none'>
        <span className='font-medium text-[19px] text-[#292B36]'>{ title }</span>
        <div className='flex'>
          <Image src="Frame.svg" width='16' height="16" alt="icon"/>
          <span className='font-normal text-[17px] text-[#A8A9AE] pt-[3px] ml-1 text-center leading-[22px]'>{ position }</span>
        </div>
      </div>
    </div>
  )
}
export default Item;