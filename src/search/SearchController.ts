import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SearchService } from "./SearchService";
import { ScrappedEvent } from "./helpers/ScrappedEvent";

@Controller("search")
export class SearchController {

    constructor(
        private searchService: SearchService,
    ) {
        
    }

    @Get(":query")
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Query search"
    })
    searchByQuery(
        @Param("query") query: string
    ): Promise<ScrappedEvent[]> {
        return this.searchService.getScrappedEvents(query);
    }

}