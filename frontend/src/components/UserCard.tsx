import Image from "next/image";

const UserCard = ({ type, displayName, percentage }: { 
  type: string, 
  displayName: string,
  percentage: string 
}) => {
  const gasColors = {
    O2: "#64B5F6",    // Blue
    CO2: "#81C784",   // Green
    H2O: "#FFB74D",   // Orange
    CO: "#E57373"     // Red
  };

  return (
    <div className={`rounded-2xl p-4 flex-1 min-w-[130px]`} 
         style={{ backgroundColor: gasColors[type] }}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-gray-600">
          Gas Level
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-bold my-4">{percentage}%</h1>
      <h2 className="text-sm font-bold text-gray-700">{displayName}</h2>
    </div>
  );
};

export default UserCard;
