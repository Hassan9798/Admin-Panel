import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useSelector } from "react-redux";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  // const { darkMode } = useContext(DarkModeContext);
  const admin = useSelector(state => state.user.loggedInUser?.isAdmin);
  const user = useSelector(state => state.user.loggedInUser===null);
console.log(user);
  // const admin=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).loggedInUser.isAdmin;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={admin ? <Navigate to='/home' /> : <Login />} />
           
            {admin &&
              <>
              
                <Route path="home" element={ <Home />} />
                <Route path="users">
                  
                    <Route index element={ <List />} />
                  <Route path=":id" element={ <Single />} />
                  <Route
                    path="new"
                    element={ <New inputs={userInputs} title="Add New User" />}
                  />
                </Route>
                <Route path="products">
                  <Route index element={ <List />} />
                  <Route path=":productId" element={ <Single />} />
                  <Route
                    path="new"
                    element={ <New inputs={productInputs} title="Add New Product" />}
                  />
                </Route>
              </>
            }
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
