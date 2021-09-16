import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { useNavigationHooks } from "../../../hooks/NavigationHooks";
import { StackRoutesParamList } from "../../../routes/stack.routes";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { api } from "../../../services/api";

export interface UserPropsSignInFirstStep {
  name: string;
  email: string;
  drivenLicense: string;
}

export interface SignUpSecondStepProps {
  user: UserPropsSignInFirstStep;
}

export const useSignUpSecondStep = () => {
  const {
    params: { user },
  } = useRoute<StackRoutesParamList<"SignUpSecondStep">>();
  return { user };
};

export const SignUpSecondStep: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigationHooks();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useSignUpSecondStep();

  const handleRegister = async () => {
    if (!password || !confirmPassword)
      return Alert.alert("Informe a senha e a confirmação dela");

    if (password !== confirmPassword)
      return Alert.alert("As senhas não são iguais");

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.drivenLicense,
        password,
      })
      .then((response) => {
        navigation.navigate("Confirmation", {
          title: "Conta criada",
          message: `Agora é so fazer o login\ne aproveitar`,
          nextScreenRoute: "SignIn",
        });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  };

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}sua conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
