import Container from "@/components/layout/container/container";
import SigninForm from "@/components/section/form/components/signin";
import FormContainer from "@/components/section/form/container";

export default function Signin() {
  return (
    <Container>
      <FormContainer>
        <SigninForm />
      </FormContainer>
    </Container>
  );
}
