import * as env from "env-var";
import { config as envConfig } from "dotenv";
envConfig();

export class WebTargetConfig {
    public static readonly NOTIKUMI_URL: string = env.get("NOTIKUMI_URL", "https://www.notikumi.com").asString();
    public static readonly WEGOW_URL: string = env.get("WEGOW_URL", "https://www.wegow.com").asString();
    public static readonly TICKETMASTER_URL: string = env.get("TICKETMASTER_URL", "https://www.ticketmaster.com").asString();
    public static readonly TICKETMASTER_HEADER_USER_AGENT: string = env
        .get("TICKETMASTER_HEADER_USER_AGENT", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36")
        .asString();
}
