import GasChart from "@/components/gaschart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Main Content */}
      <div className="w-full space-y-6">
        {/* Gas Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <UserCard 
            type="O2" 
            displayName="Oxygen (O₂)"
            percentage="20.925"
          />
          <UserCard 
            type="CO2" 
            displayName="Carbon Dioxide (CO₂)"
            percentage="0.040"
          />
          <UserCard 
            type="H2O" 
            displayName="Water Vapor (H₂O)"
            percentage="0.250"
          />
          <UserCard 
            type="CO" 
            displayName="Carbon Monoxide (CO)"
            percentage="0.010"
          />
        </div>
        
        {/* Charts Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Count Chart */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-4 h-[400px]">
              <CountChart />
            </div>
          </div>
          
          {/* Gas Composition Chart */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow p-4 h-[400px]">
              <GasChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
