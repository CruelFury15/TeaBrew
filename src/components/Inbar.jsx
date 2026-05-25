import { Filter } from 'lucide-react';

function Inbar() {
  const categories = ['Home','Discover','Hype','Alerts','Profile'];

  return (
    <div className="rounded-xl md:rounded-2xl border border-purple-200 bg-violet-50 shadow-md md:shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-3">
        <Filter className="w-4 h-4 md:w-5 md:h-5 text-white" />
        <h3 className="text-base md:text-lg font-bold text-white">Filter by Category</h3>
      </div>

      {/* Categories List */}
      <div className="divide-y divide-purple-200">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-purple-100 transition-colors text-left group"
          >
            <span className="text-sm md:text-sm font-medium text-[#11001C] group-hover:text-pink-600">
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Inbar;


