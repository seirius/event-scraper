export type Types = string | number | boolean;

export enum EType {
    string,
    number,
    boolean
}

export class Environment {
    public static getEnv<T extends Types>(type: EType, name: string, def?: any): T {
        let prop: any = process.env[name];
        if (prop) {
            if (type === EType.string) {
                prop = prop.toString();
            } else if (type === EType.number && !isNaN(prop as any)) {
                prop = parseFloat(prop);
            } else if (type === EType.boolean) {
                prop = prop === 1 || prop === true;
            }
        }
        if (prop === undefined) {
            prop = def;
        }
        return prop as T;
    }

}