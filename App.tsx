import "react-native-gesture-handler";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./src/presentation/provider/AuthProvider";
import ToastManager from "toastify-react-native";
import MainNavigator from "./src/presentation/router/MainNavigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastManager />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthProvider>
          <IconRegistry icons={EvaIconsPack} />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
