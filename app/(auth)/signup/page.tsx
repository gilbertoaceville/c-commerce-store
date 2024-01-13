import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import SignupForm from "@/components/section/form/components/signup";
import FormContainer from "@/components/section/form/container";

export default async function Signup() {
  const user = await getUser();

  return (
    <Container>
      <FormContainer>
        <SignupForm currentUser={user} />
      </FormContainer>
    </Container>
  );
}
