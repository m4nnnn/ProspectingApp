function CompanyCard({ name }) {
    
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-2">
        <p className="font-medium text-sm">{name}</p>
        </div>
    );
    }

export default CompanyCard;