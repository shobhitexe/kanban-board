import TrashIcon from "@/icons/TrashIcon";
import { ColumnsType } from "@/types";

type ColumnContainerProps = {
  column: ColumnsType;
};

export default function ColumnContainer({ column }: ColumnContainerProps) {
  return (
    <div className=" bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] flex flex-col">
      <div className="flex gap-2 items-center w-full justify-center bg-mainBackgroundColor">
        <div className="flex justify-center px-2 py-1 text-sm rounded-full">
          0
        </div>
        <div className=" text-sm cursor-grab rounded-md rounded-b-none p-3 font-bold">
          {column.title}
        </div>
        <button>
          <TrashIcon
            width={24}
            height={24}
            className="stroke-gray-500 hover:stroke-white"
          />
        </button>
      </div>

      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}
