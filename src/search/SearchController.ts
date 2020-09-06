import { Controller, Get, HttpStatus, Param, Query } from "@nestjs/common";
import { ApiResponse, ApiQuery } from "@nestjs/swagger";
import { SearchService } from "./SearchService";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import { EventHouse } from "./helpers/EventHouse";

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
    @ApiQuery({
        name: "houses",
        required: false,
    })
    searchByQuery(
        @Param("query") query: string,
        @Query("houses") houses?: EventHouse[],
    ): Promise<ScrappedEvent[]> {
        return this.searchService.getScrappedEvents(query, houses);
    }

}