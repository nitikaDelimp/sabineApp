// import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {Provider} from 'react-redux';
// import {NavigationContainer} from '@react-navigation/native';
// import store from './src/Services/Store';
// import Index from './src/Index';
// import Navigator from './src/Navigator';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <SafeAreaProvider>
//         <NavigationContainer>
//           {/* <Index /> */}
//           <Navigator/>
//         </NavigationContainer>
//       </SafeAreaProvider>
//     </Provider>
//   );
// };

// export default App;


import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

//Navigation
import Navigator from './src/Navigator';

//Reduux
import { Provider } from 'react-redux';
import store from './src/Services/Store';
import Index from './src/Index';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <Provider  store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <NavigationContainer>
        {/* <SafeAreaView style={{ flex: 0, backgroundColor: 'green' }} /> */}
        <Navigator />
        </NavigationContainer>
        {/* <Index/> */}
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
