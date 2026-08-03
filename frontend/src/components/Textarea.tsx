export function Textarea({ children , readonly , onChange}: { children: string , readonly:boolean , onChange:(e : React.ChangeEvent<HTMLTextAreaElement>)=>void} ) {
  return (
    <div className="flex items-start space-x-3 text-sm font-mono bg-dark border border-dark p-4 rounded-lg">
      <div className=" text-white">
        <textarea readOnly= {readonly}
          rows={100}
           cols ={100}
          onChange ={onChange}
          placeholder={children}
          className="flex-1 bg-dark border-none outline-none  focus:ring-0 p-2 resize-none"
        ></textarea>
      </div>
    </div>
  );
}
