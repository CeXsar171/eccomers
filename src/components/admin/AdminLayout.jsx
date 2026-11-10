import Sidebar from "./Sidebar";
import Header from "./Header";

import "../../styles/admin/AdminLayout.css";

function AdminLayout({ children }) {

  return (

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <Header />

        <main className="admin-main">

          {children}

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;