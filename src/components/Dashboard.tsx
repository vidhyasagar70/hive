import React, { useState } from "react";
import "../styles/dashboard.css"; // Adjust path based on React.js structure
import UOMMaster from "../components/UOMMaster"; // Adjust the path based on your project structure

// Define OpenMenus interface
interface OpenMenus {
  Master: boolean;
  Item: boolean;
  Contributor: boolean;
  General: boolean;
}

const Dashboard: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<OpenMenus>({
    Master: false,
    Item: false,
    Contributor: false,
    General: false,
  });

  const [activePage, setActivePage] = useState<string>("dashboard");
  const [showInventoryContent, setShowInventoryContent] = useState<boolean>(false);

  const toggleMenu = (menu: keyof OpenMenus) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const closeSubmenus = () => {
    setOpenMenus({
      Master: false,
      Item: false,
      Contributor: false,
      General: false,
    });
  };

  const toggleInventoryContent = () => {
    setShowInventoryContent((prev) => !prev);
    setActivePage("dashboard"); // Reset active page when toggling inventory
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo" onClick={toggleInventoryContent}>
          AgamHive
        </h2>
        <nav>
          <ul>
            <h3 className="dashboard-heading" onClick={toggleInventoryContent}>
              Dashboard
            </h3>

            <li className="submenu" onClick={() => toggleMenu("Master")}>
              <span>Master</span>
              <ul className={openMenus.Master ? "submenu-list open" : "submenu-list"}>
                <li className="submenu" onClick={(e) => { e.stopPropagation(); toggleMenu("Item"); }}>
                  <span>Item</span>
                  <ul className={openMenus.Item ? "submenu-list open" : "submenu-list"}>
                    <li onClick={() => setActivePage("newItem")}>New Item</li>
                    <li onClick={() => setActivePage("itemCategory")}>Item Category</li>
                    <li onClick={() => setActivePage("itemModel")}>Item Model</li>
                    <li onClick={() => setActivePage("inwardOption")}>Inward Option</li>
                    <li onClick={() => setActivePage("outwardOption")}>Outward Option</li>
                    <li onClick={() => setActivePage("newRack")}>New Rack</li>
                    <li onClick={() => setActivePage("itemAssignedRack")}>Item Assigned Rack</li>
                  </ul>
                </li>

                <li className="submenu" onClick={(e) => { e.stopPropagation(); toggleMenu("Contributor"); }}>
                  <span>Contributor</span>
                  <ul className={openMenus.Contributor ? "submenu-list open" : "submenu-list"}>
                    <li onClick={() => setActivePage("newContributor")}>New Contributor</li>
                    <li onClick={() => setActivePage("customerParts")}>Customer Parts</li>
                    <li onClick={() => setActivePage("supplierParts")}>Supplier Parts</li>
                    <li onClick={() => setActivePage("deliveryPlace")}>Delivery Place</li>
                  </ul>
                </li>

                <li className="submenu" onClick={(e) => { e.stopPropagation(); toggleMenu("General"); }}>
                  <span>General</span>
                  <ul className={openMenus.General ? "submenu-list open" : "submenu-list"}>
                    <li onClick={() => setActivePage("cityMaster")}>City Master</li>
                    <li onClick={() => setActivePage("stateMaster")}>State Master</li>
                    <li onClick={() => setActivePage("countryMaster")}>Country Master</li>
                    <li onClick={() => setActivePage("currencyMaster")}>Currency Master</li>
                    <li onClick={() => setActivePage("gstSlabMaster")}>GST Slab Master</li>
                    <li onClick={() => setActivePage("uomMaster")}>UOM Master</li>
                    <li onClick={() => setActivePage("approvalRole")}>Approval Role</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="content">
  <div className="dashboard-header">
    <h1>Welcome to Dashboard</h1>
  </div>

  {/* Show content based on activePage */}
  {activePage === "dashboard" && <h2>Dashboard Overview</h2>}
  {activePage === "uomMaster" && <UOMMaster />}
</main>

    </div>
  );
};

export default Dashboard;
