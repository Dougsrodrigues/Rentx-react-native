import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackRoutesParams } from "../routes/stack.routes";

type NavigationParams = StackNavigationProp<StackRoutesParams>;

export const useNavigationHooks = () => {
  const navigation = useNavigation<NavigationParams>();

  return navigation;
};
