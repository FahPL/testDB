<template>
  <div class="about">
    <v-card class="text-center container mt-10" width="500">
      <v-form  ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="25"
          :rules="nameRules"
          label="Name"
          required
          clearable
        ></v-text-field>
        <v-select
          v-model="age"
          :items="itemsage"
          :rules="[(v) => !!v || 'Item is required']"
          label="Age"
          required
        ></v-select>
        <v-select
          v-model="sex"
          :items="itemsex"
          :rules="[(v) => !!v || 'Item is required']"
          label="Sex"
          required
        ></v-select>
        <v-text-field
          v-model="phone"
          :counter="10"
          :rules="phoneRules"
          label="Phone"
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-btn
          
          color="success"
          class="mr-4"
          @click="savedata"
        >
          SUMMIT
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        <!-- <v-btn color="cyan" class="mr-4" @click="editdata"> Edit </v-btn> -->

      
      </v-form>
    </v-card>

    <!-- <v-card class="text-center">
      <v-btn class="mx-2" fab dark large color="cyan" @click="savedata">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark large color="red" @click="editdata">
        <v-icon dark> mdi-wrench </v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark large @click="deletedata">
        <v-icon dark> mdi-minus-circle </v-icon>
      </v-btn>
    </v-card> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    text: "start-text",
    valid: false,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 25 || "Name must be less than 10 characters",
    ],
    age: null,
      itemsage: [
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      ],
    phone: "",
    phoneRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Phone must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    sex: null,
      itemsex: [
        'male',
        'female',
        'etc.',
      ],
  }),
  created() {
    this.Render();
  },
  methods: {
    async Render() {
      let result = await this.$guest_api.get("/test-get-start").catch((err) => {
        console.log(err);
      });
      this.text = result.data;
    },
    reset () {
        this.$refs.form.reset()
      },
    savedata() {
      let value = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        phone: this.phone,
        email: this.email,
      };

      this.$guest_api.post("/insert-get-start", value).catch((err) => {
        console.log(err);
      });
      this.$router.push("/table")
    },
    editdata() {
      this.$guest_api.put("/test-put").catch((err) => {
        console.log(err);
      });
    },
    deletedata() {
      this.$guest_api.delete("/test-delete").catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped></style>
