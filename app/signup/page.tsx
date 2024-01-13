import Container from "@/components/layout/container/container";
import SignupForm from "@/components/section/form/components/signup";
import FormContainer from "@/components/section/form/container";

export default function Signup() {
  return (
    <Container>
      <FormContainer>
        <SignupForm />
      </FormContainer>
    </Container>
  );
}
