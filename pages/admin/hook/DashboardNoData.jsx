import Image from "next/image"

export default function DashboardNoData() {
    return (
      <div className="empty-state h-[30vh]">
      <div className="empty-state__content">
        <div className="empty-state__icon ">
          <Image
            src="https://th.bing.com/th/id/OIP.N0gCnBAfUaHLWOVZ8v9_PgHaHa?rs=1&pid=ImgDetMain"
            alt="No data"
            width={40}
            height={40}
          />
        </div>
        <div className="empty-state__message">
          No Data available. Please try again later.
        </div>
      </div>
    </div>      
      );
}
