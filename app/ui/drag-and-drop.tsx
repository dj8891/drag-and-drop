'use client'

import Item from "@/app/ui/item";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export interface ItemType {
  id: number;
  img: string;
  title: string;
  position: string;
}
const listItems: ItemType[] = [
  {
    id: 1,
    img: 'dTop1.svg',
    title: 'Scotland Island',
    position: 'Sydney, Australia'
  },
  {
    id: 2,
    img: 'dTop2.svg',
    title: 'The Charles Grand Brasserie & Bar',
    position: 'Lorem ipsum, Dolor'
  },
  {
    id: 3,
    img: 'People and action3.svg',
    title: 'Bridge Climb',
    position: 'Dolor, Sit amet'
  },
  {
    id: 4,
    img: 'Beach & Water.svg',
    title: 'Scotland Island',
    position: 'Sydney, Australia'
  },
  {
    id: 5,
    img: 'People and action5.svg',
    title: 'Clam Bar',
    position: 'Etcetera veni, Vidi vici'
  },
  {
    id: 6,
    img: 'dTop6.svg',
    title: 'Vivid Festival',
    position: 'Sydney, Australia'
  }
]

export const DragAndDrop = () => {

  const dragRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<ItemType[]>(listItems);
  const [draggingItem, setDraggingItem] = useState<ItemType | null>(null);
  const [dropItem, setDropItem] = useState<HTMLDivElement | null>(null);
  const [prevDropItem, setPrevDropItem] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if(prevDropItem) prevDropItem.style.borderTop = "1px solid white";
    if(dropItem) dropItem.style.borderTop = "3px solid #1E9BF0";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropItem])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: ItemType) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", '');
    if (dragRef.current) {
      const refRect = dragRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(dragRef.current, refRect.width / 2, refRect.height / 2);
    }
  }

  const handleDragEnd = () => {
    setDraggingItem(null);
    if(dropItem) dropItem.style.borderTop = "1px solid white";
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const tarEle = e.target as HTMLDivElement;
    setDropItem(prevItem => {
      setPrevDropItem(prevItem);
      return tarEle;
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: ItemType) => {
    if (!draggingItem) return;
    const currentIndex = items.findIndex(item => item.id === draggingItem.id);
    const targetIndex = items.findIndex(item => item.id === targetItem.id);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const tmpItems = [...items];
      tmpItems.splice(currentIndex, 1);
      tmpItems.splice(targetIndex, 0, draggingItem);
      setItems(tmpItems);
    }
  }

  return (
    <div className="py-5 w-[568px] bg-white">
      {
        items.map((item, index) => {
          return (
            <div key={index}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, item)}>
              <Item item={item}
                clsName={`${JSON.stringify(item) === JSON.stringify(draggingItem) ? '!bg-[#F4F5F6] opacity-30' : ''}`} />
              <div ref={dragRef} className="flex items-center w-[288px] rounded-lg border-[1px] border-[#000000] border-opacity-[0.1] p-4 shadow-[0_8px_16px_0_#061F30_0.08] bg-white absolute top-[-9999px] left-[-9999px] pointer-events-none">
                {draggingItem && draggingItem.img && (
                  <Image
                    src={draggingItem.img}
                    width={32}
                    height={32}
                    className="rounded-[5px]"
                    alt="dragged image"
                  />
                )}
                <span className='px-1 text-[17px] font-medium text-[#292B36] ml-3'>{draggingItem?.title}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}