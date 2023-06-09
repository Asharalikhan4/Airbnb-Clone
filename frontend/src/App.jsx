import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account/:subpage?" element={<AccountPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App;