<template>
  <div id="messages">
    <Navbar />
    <v-row class="pa-2">
      <!-- <v-col cols="12" md="4">
        <v-card class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

              <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>-->

      <v-col cols="12" md="12">
        <h1 class="text-center">
          <span class="blue--text">Chu</span>ddle Chat
        </h1>
        <v-card class="mx-auto">
          <div class="messagesBox" v-chat-scroll>
            <v-list three-line>
              <template v-for="(item) in this.$store.getters.getMessage">
                <v-list-item :key="item['.key']">
                  <v-list-item-avatar>
                    <v-img :src="item.from.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>
                      <strong class="green--text">{{item.from.name}}:</strong>
                      {{item.message}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <div class="messageTime">
                        <span class="chatTime">{{ item.time | moment("from", "now") }}</span>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </div>

          <v-card-actions>
            <NewMessage class="new-message" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import Navbar from "@/components/Navbar";
import NewMessage from "@/components/message/NewMessage";
import moment from "moment";
export default {
  name: "Messages",
  components: {
    Navbar,
    NewMessage
  },
  firestore() {
    return {
      messages: db.collection("messages")
    };
  },
  data() {
    return {
      date: moment().format("MM-D-YYYY"),
      messages: [],
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    };
  },
  created() {}
};
</script >

<style scoped>
.messageTime {
  margin-top: -2px;
}
.chatTime {
  font-size: 0.8em;
}
.messagesBox {
  max-height: 370px;
  overflow: auto;
}

.messagesBox::-webkit-scrollbar {
  width: 3px;
}

.messagesBox::-webkit-scrollbar-track {
  background: #ddd;
}

.messagesBox::-webkit-scrollbar-thumb {
  background: skyblue;
}
</style>