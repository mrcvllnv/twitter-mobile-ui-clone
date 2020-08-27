import { createServer, Model, Factory, trait } from "miragejs";
import { add, parseISO } from "date-fns";
import faker, { image, name, internet, lorem } from "faker";

faker.seed(123);

let startingDate = parseISO("2020-01-14");
let server = createServer({
  timing: 1000,
  models: {
    tweet: Model,
  },

  factories: {
    tweet: Factory.extend({
      name() {
        return name.findName();
      },

      username() {
        return internet.userName();
      },

      text() {
        return lorem.sentence();
      },

      avatarUrl() {
        return image.avatar();
      },

      date(i) {
        return add(startingDate, { days: i }).toISOString();
      },

      fromMarc: trait({
        name: "Marc Villanueva",
        username: "mrcvllnv",
        avatarUrl: "https://pbs.twimg.com/profile_images/1285150028734947329/Gupdxqqo_400x400.jpg",
      }),
    }),
  },

  routes() {
    this.namespace = "api";
    this.get("tweets");

    this.passthrough();
  },

  seeds(server) {
    server.create("tweet", "fromMarc", { text: "just setting up my twttr" });
    server.create("tweet", "fromMarc", { text: "Hi" });
    server.create("tweet", "fromMarc", {
      text: "I still don't understand useEffect",
    });
    server.createList("tweet", 50);
  },
});

// setInterval(() => {
//   server.create("tweet");
// }, 5000);
