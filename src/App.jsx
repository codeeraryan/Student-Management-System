import React from 'react';
import { DashboardView } from './screens/DashboardView';
import { LoginView } from './screens/LoginView';

import { useFirebase } from './context/FirebaseProvider';


const App = () => {
  const userDetails=useFirebase();
 return userDetails.loading?<DashboardView />:<LoginView/>
};

export default App;