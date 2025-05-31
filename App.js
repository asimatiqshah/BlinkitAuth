import {StyleSheet, Text, View} from 'react-native';
import CarIcon from './src/assets/svg/CarIcon';
import Navigation from './src/navigation/Navigation';
import BasicExample from './src/components/Roboto3dCollapsable/BasicExample';
import CollapsibleHeaderTwo from './src/components/Roboto3dCollapsable/CollapsibleHeaderTwo';
import RollingBarExample from './src/components/dashboard/RollingBarExample';
import TestCarousal from './src/components/dashboard/TestCarousal';
import WithWelcome from './src/features/dashboard/WithWelcome';
import UserComponent from './src/features/dashboard/UserComponent';
import HelloWrold from './src/components/dashboard/HelloWrold';
import MapCheckingTut from './src/components/map/MapCheckingTut';

// const EnhancedUserComponent = WithWelcome(UserComponent)
const App = () => {
  return (
    // <MapCheckingTut />
    // <EnhancedUserComponent name="Haider Ali" />
    <Navigation />
    // <BasicExample />
    // <CollapsibleHeaderTwo />
    // <RollingBarExample />
    // <TestCarousal />
    // <HelloWrold />
  );
};
export default App;
