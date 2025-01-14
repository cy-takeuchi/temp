import * as z from "zod";
import * as fs from "fs";

const ConfigJsonSchema = z.object({
  domain: z.string(),
});

type ConfigJson = z.infer<typeof ConfigJsonSchema>;

(async () => {
  const configFile = fs.readFileSync("./src/config.json", "utf-8");
  console.log(configFile);

  const configJson = JSON.parse(configFile);
  try {
    const res = ConfigJsonSchema.parse(configJson);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
})();
