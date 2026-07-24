export function Textarea({ children }: { children: string }) {
  return (
    <div className="flex items-start space-x-3 text-sm font-mono bg-dark border border-dark p-4 rounded-lg">
      <div className=" text-white">
        <textarea
          rows={100}
          onChange ={(e)=>console.log(e.target.value)}
          placeholder={children}
          className="flex-1 bg-dark border-none outline-none  focus:ring-0 p-2 resize-none"
        ></textarea>
      </div>
    </div>
  );
}
