import Image from "next/image";

const UserCard = ({ 
  type, 
  displayName, 
  percentage 
}: { 
  type: string; 
  displayName: string;
  percentage: string; 
}) => {
  const gasColors: Record<string, string> = {
    "O2": "#1976D2",    // Darker blue
    "CO2": "#2E7D32",   // Darker green
    "H2O": "#F57C00",   // Darker orange
    "CO": "#D32F2F"     // Darker red
  };

  return (
    <div 
      className="rounded-2xl p-6 flex-1 min-w-[180px] relative overflow-hidden
        transition-all duration-300 hover:scale-105 hover:shadow-xl
        backdrop-blur-sm border border-white/10 hover:brightness-75"
      style={{ 
        backgroundColor: `${gasColors[type]}ee` || "#A9A9A9",
        boxShadow: `0 8px 32px ${gasColors[type]}40` || "#D3D3D340",
        transition: 'all 0.3s ease'
      }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[11px] font-medium bg-white/90 px-3 py-1.5 
            rounded-full text-gray-700 shadow-sm
            transition-transform duration-300 hover:-translate-y-0.5">
            Gas Level
          </span>
          <button className="p-1.5 rounded-full hover:bg-black/20 
            transition-colors duration-200">
            <Image src="/moreDark.png" alt="More" width={20} height={20} />
          </button>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            {percentage}
            <span className="text-lg ml-1 opacity-90">ppm</span>
          </h1>
          
          <h2 className="text-sm font-semibold text-white/90 
            tracking-wide uppercase">{displayName}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
