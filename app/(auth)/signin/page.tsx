import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import SigninForm from "@/components/section/form/components/signin";
import FormContainer from "@/components/section/form/container";

export default async function Signin() {
  const user = await getUser();

  return (
    <Container>
      <FormContainer>
        <SigninForm currentUser={user} />
      </FormContainer>
    </Container>
  );
}
