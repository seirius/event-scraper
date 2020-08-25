import { Module } from '@nestjs/common';
import { DefaultModule } from './default/default.module';
import { SearchModule } from './search/SearchModule';

@Module({
    imports: [DefaultModule, SearchModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
