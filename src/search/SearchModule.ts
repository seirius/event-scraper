import { Module } from "@nestjs/common";
import { SearchController } from "./SearchController";
import { SearchService } from "./SearchService";
import { NotikumiService } from "./NotikumiService";
import { WegowService } from "./WegowService";

@Module({
    controllers: [SearchController],
    providers: [
        NotikumiService,
        WegowService,
        SearchService
    ]
})
export class SearchModule {}