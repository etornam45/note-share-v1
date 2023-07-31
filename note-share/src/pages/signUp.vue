<script>
import { ref } from "vue";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export default {
  setup() {
    let btnLoading = ref(false);

    let email = ref("");
    let name = ref("");
    let password = ref("");
    let passwordHint = ref("");
    let emailHint = ref("");

    const SignUp = async () => {
      btnLoading.value = true;

      const record = await pb
        .collection("users")
        .create({
          username: name.value.split(" ").join(""),
          email: email.value,
          emailVisibility: true,
          password: password.value,
          passwordConfirm: password.value,
          name: name.value,
        })
        .then(async (result) => {
          console.log(result);
          await pb
            .collection("users")
            .requestVerification(email.value)
            .then((verified) => {});
          const authData = await pb
            .collection("users")
            .authWithPassword(email.value, password.value).then(() => {
                console.log("Logged In");
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      btnLoading,
      name,
      email,
      password,
      passwordHint,
      emailHint,
      SignUp,
    };
  },
};
</script>

<template>
  <section>
    <h5>Create an account</h5>
    <form action="">
      <q-input
        outlined
        v-model="name"
        label="Name"
        placeholder="John Doe"
        :hint="emailHint"
        :dense="dense"
        type="text"
      />
      <q-input
        outlined
        v-model="email"
        label="E-mail"
        placeholder="example@email.com"
        :hint="emailHint"
        :dense="dense"
        type="email"
      />
      <q-input
        outlined
        v-model="password"
        label="Password"
        :hint="passwordHint"
        :dense="dense"
        type="password"
      />
      <q-btn
        rounded
        size="lg"
        color="primary"
        class="full-width"
        label="Sign up"
        :loading="btnLoading"
        :disable="btnLoading"
        :onclick="SignUp"
      />
      <RouterLink to="/login">Log In</RouterLink>
    </form>
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* min-height: 100%; */
  flex-direction: column;
}

form {
  width: 300px;
}
</style>
