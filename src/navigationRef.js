import { NavigationActions } from "react-navigation";

let navigator;

//creating a reference to App.js so that it can be called from here
//nav is provided by react
export const setNavigator = (nav) => {
  navigator = nav;
};

//calling App.js and attach a dispatch that ends the navigation action
export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params,
    })
  );
};

//we will import the abbove function whenwever we are navigating to a new
//component. once the function is called that navigator referencing app.js
//calls app.js and tell it to navigate using the dispatch to a new route
//and also pass params which are values to other components if needed.
