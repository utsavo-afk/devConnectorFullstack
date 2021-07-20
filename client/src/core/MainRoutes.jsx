import { Switch, Route } from "react-router-dom";
import { Landing, Login, Signup, Developers } from "../views";
import PrivateRoute from "../components/PrivateRoute";
import {
  Dashboard,
  Posts,
  CreateProfile,
  EditProfile,
  AddEducation,
  AddExperience,
} from "../private";
import Profile from "../components/Profile";
import Post from "../components/Post";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/developers" component={Developers} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/api/profiles/:id" component={Profile} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute exact path="/api/posts/:id" component={Post} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
    </Switch>
  );
};
export default MainRoutes;
