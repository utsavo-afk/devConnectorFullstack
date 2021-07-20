import Notification from "./components/Notification";
import ScrollToTop from "./components/ScrollToTop";
import MainRoutes from "./core/MainRoutes";
import Navigation from "./core/Navigation";
import "./App.css";
import { useSelector } from "react-redux";
import DismissableNotification from "./components/DismissableNotification";
import Footer from "./components/Footer";

function App() {
  const notification = useSelector((state) => state.alert);

  return (
    <div className="App">
      <Navigation />
      {notification && <Notification alert={notification} />}
      {notification?.persist && (
        <DismissableNotification alert={notification} />
      )}
      <MainRoutes />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
export default App;
