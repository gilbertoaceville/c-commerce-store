export default function SearchBar() {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search store"
        autoComplete="off"
        className="p-2 border-gray-500 text-secondary rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-700 w-80"
      />
      <button className="p-2 bg-secondary text-primary hover:opacity-80 rounded-r-md">Search</button>
    </div>
  );
}
