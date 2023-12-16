import React, {useState} from "react";
import LoginFormContainer, {
  DivCenter,
  Form,
  FormInput,
  HeadLogIn,
  InputSubmit,
  SignupNow,
  SignupNowAccount,
  TitleLogin,
} from "./login.styles";

import {DivPass, DivTxtField} from "../shared/styles";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../Loader";
import {useTranslation} from "react-i18next";
import {login} from "../../services/auth/utils";

function Login() {
  const {t} = useTranslation();
  let navigate = useNavigate();
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const location = useLocation();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(
        location?.state?.redirectTo?.length > 0
          ? location.state.redirectTo
          : "/"
      );
    } catch (err) {
      console.log("Failed to login : ", err?.response?.data || err);
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassowrd = (e) => {
    setPassword(e.target.value);
  };

  if (loading) {
    return (
      <main>
        <Loader/>
      </main>
    );
  }

  return (
    <LoginFormContainer>
      <DivCenter>
        <HeadLogIn>
          <TitleLogin>
            {`${t("login")}`}
          </TitleLogin>
          <SignupNowAccount>
            Don’t have an account?{" "}
            <SignupNow href="/signup">Signup now!</SignupNow>
          </SignupNowAccount>
        </HeadLogIn>

        {/*TODO: Uncomment when it's ready*/}
        {/*<MediaOneLine>*/}
        {/*  <MediaLogIn>*/}
        {/*    {" "}*/}
        {/*    <img src={AppleLogo} alt="" />*/}
        {/*  </MediaLogIn>*/}
        {/*  <MediaLogIn>*/}
        {/*    {" "}*/}
        {/*    <img src={GoogleLogo} alt="" />*/}
        {/*  </MediaLogIn>*/}
        {/*  <MediaLogIn>*/}
        {/*    <img src={FBLogo} alt="" />*/}
        {/*  </MediaLogIn>*/}
        {/*</MediaOneLine>*/}

        {/*/!* <HeadLogIn> *!/*/}
        {/*/!* <img src={WirdLogo} alt='' /> *!/*/}
        {/*<OrWayToLogIn>Or</OrWayToLogIn>*/}
        {/*/!* </HeadLogIn> *!/*/}

        <Form onSubmit={handleSubmit}>
          <DivTxtField>
            <FormInput
              onChange={handleChangeUsername}
              type="text"
              placeholder="Username"
              required
            />
          </DivTxtField>

          <DivTxtField>
            <FormInput
              onChange={handleChangePassowrd}
              placeholder="Password"
              type="password"
              required
            />
          </DivTxtField>

          {/* TODO: style the error message */}
          {showErrorMessage && (
            <DivPass className="red">
              Check your email and password or create an account.
            </DivPass>
          )}
          {/* <PageLink href="https://www.facebook.com/Wird.Competition/" target="_blank">
            هل تواجه مشكلة تقنية أو نسيت كلمة المرور؟ تواصل مع الدعم الفني
          </PageLink> */}
          <InputSubmit type="submit" value="login">
            Login
          </InputSubmit>
        </Form>

        {/*TODO: Uncomment when it's ready*/}
        {/*<SignupNowAccount>*/}
        {/*  Or<SignupNow href="/forgot-password"> Forgot Password</SignupNow>*/}
        {/*</SignupNowAccount>*/}
      </DivCenter>
    </LoginFormContainer>
  );
}

export default Login;
