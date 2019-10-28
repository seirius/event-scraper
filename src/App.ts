import { EventServer } from './Server';
import { Environment, EType } from './misc/Environment';

const run = async () => {
    try {
        new EventServer().start(Environment.getEnv<number>(EType.number, 'PORT', 3000));
    } catch (error) {
        console.error(error);
    }
}

run();