import { Module } from "@nestjs/common";
import { SearchController } from "./SearchController";
import { SearchService } from "./SearchService";
import { NotikumiService } from "./NotikumiService";
import { WegowService } from "./WegowService";
import { TicketmasterService } from "./TicketmasterService";

@Module({
    controllers: [SearchController],
    providers: [
        NotikumiService,
        WegowService,
        TicketmasterService,
        SearchService
    ]
})
export class SearchModule {}