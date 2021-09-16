import React, { useState } from "react";
import * as Yup from "yup";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useNavigationHooks } from "../../../hooks/NavigationHooks";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

export const SignUpFirstStep: React.FC = () => {
  const navigation = useNavigationHooks();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [drivenLicense, setDrivenLicense] = useState("");

  function handleBack() {
    navigation.goBack();
  }

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigtório"),
        email: Yup.string().required("E-mail é obrigtório").email(),
        drivenLicense: Yup.string().required("Nome é obrigtório"),
      });

      const data = { name, email, drivenLicense };

      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
  };

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
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCapitalize="none"
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDrivenLicense}
              value={drivenLicense}
            />
          </Form>

          <Button title="Proxímo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
