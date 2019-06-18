import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '../.env') });
import 'reflect-metadata';
import { Container } from 'typedi';
import { useContainer } from 'routing-controllers';
import App from './Application';

useContainer(Container);

export default App;