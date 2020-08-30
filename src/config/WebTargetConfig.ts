import * as env from "env-var";
import { config as envConfig } from "dotenv";
envConfig();

export class WebTargetConfig {
    public static readonly NOTIKUMI_URL: string = env.get("NOTIKUMI_URL", "https://www.notikumi.com").asString();
    public static readonly WEGOW_URL: string = env.get("WEGOW_URL", "https://www.wegow.com").asString();
}
