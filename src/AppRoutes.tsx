import { createBrowserRouter } from "react-router-dom";
import TableSpace from "./pages/TableSpace";
import AllTablesLinks from "./pages/AllTablesLinks";
import HomePage from "./pages/HomePage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Ooops, there're nothing</div>
  },
  {
    path: "/lists/",
    element: <AllTablesLinks />
  },
  {
    path: "/lists/emploees/",
    element: <TableSpace context="Emploees" />
  },
  {
    path: "/lists/cashiers/",
    element: <TableSpace context="Cashiers" />
  },
  {
    path: "/lists/chief-cashiers/",
    element: <TableSpace context="ChiefCashiers" />
  },
  {
    path: "/lists/conductors/",
    element: <TableSpace context="Conductors" />
  },
  {
    path: "/lists/routes/",
    element: <TableSpace context="Routes" />
  },
  {
    path: "/lists/checklists/",
    element: <TableSpace context="Checklists" />
  },
  {
    path: "/lists/internal-dco/",
    element: <TableSpace context="InternalDisbursementCashOrderTable" />
  },
  {
    path: "/lists/external-dco/",
    element: <TableSpace context="ExternalDisbursementCashOrderTable" />
  },
  {
    path: "*",
    element: <div>Ooops, there're nothing</div>
  }
]);

export default AppRoutes;
