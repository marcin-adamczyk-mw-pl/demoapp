import { StackScreenProps } from '@react-navigation/stack';

export type BottomTabRoutes = {
  Home: undefined;
  Cards: undefined;
  Shopping: undefined;
};

export type RootStackRoutes = {
  BottomNavigation: { screen?: keyof BottomTabRoutes };
};

export type Routes = BottomTabRoutes & RootStackRoutes;

export type Route = keyof Routes;

export type ScreenComponent<
  RouteName extends Route,
  Props = {}
> = React.FunctionComponent<StackScreenProps<Routes, RouteName> & Props>;
