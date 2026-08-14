import { createClient } from "contentful";

const client = createClient({
  space: "evi0v0pbuj4z",
  accessToken: "sIyMgBSAa-giuTK9pAZeT81Qg04xNgSoXMJwiegV8Mk",
  environment: "master",
});

export default client;