<template>
  <div class="table">
    <v-simple-table fixed-header height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Age</th>
            <th class="text-left">Sex</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Email</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datatest" :key="item.datatest">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.email }}</td>
            <td>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="cyan"
                
                @click="editdialog(item)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>

              <v-btn fab dark small color="red" @click="deletedata(item.id)">
                <v-icon dark> mdi-minus-circle </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="detail" width="500">
      <v-card class="text-center container">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="dataforms.name"
            :counter="25"
            :rules="nameRules"
            label="Name"
            required
            clearable
          ></v-text-field>
          <v-select
            v-model="dataforms.age"
            :items="itemsage"
            :rules="[(v) => !!v || 'Item is required']"
            label="Age"
            required
          ></v-select>
          <v-select
            v-model="dataforms.sex"
            :items="itemsex"
            :rules="[(v) => !!v || 'Item is required']"
            label="Sex"
            required
          ></v-select>
          <v-text-field
            v-model="dataforms.phone"
            :counter="10"
            :rules="phoneRules"
            label="Phone"
            required
            clearable
          ></v-text-field>

          <v-text-field
            v-model="dataforms.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-btn color="success" class="mr-4" @click="editform(dataforms.id)">
            SUMMIT
          </v-btn>
          <v-btn color="error" class="mr-4" @click="detail = false">
            Close
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <p>Total: {{ datatest.length }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datatest: [],
      dataforms: {},
      detail: false,
      valid: true,
      name: " ",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 25 || "Name must be less than 10 characters",
      ],
      age: " ",
      itemsage: [
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
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
      sex: " ",
      itemsex: ["male", "female", "etc."],
    };
  },

  created() {
    this.Render();
  },
  methods: {
    async Render() {
      let result = await this.$guest_api.get("/test-get-start").catch((err) => {
        console.log(err);
      });
      this.text = result.data;
      this.datatest = this.text.data;
    },
    editform() {
      
      let valueedit = {
        id: this.dataforms.id,
        name: this.dataforms.name,
        age: this.dataforms.age,
        sex: this.dataforms.sex,
        phone: this.dataforms.phone,
        email: this.dataforms.email,
      };
      this.$guest_api.put(`/test-put`, valueedit).catch((err) => {
        console.log(err);
      });
      this.detail = false;
    },

    editdialog(item) {
      this.dataforms = item;
      this.detail = true;
    },

    deletedata(id) {
      alert("delete!!!!" + id);

      this.$guest_api.delete(`/test-delete/${id}`).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
