import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    if (localStorage.getItem("authUser")) {
      return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
