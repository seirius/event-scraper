import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SearchService, ScrappedEvent } from "./SearchService";

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
        return this.searchService.getNotikumiEvents(query);
    }

}