export class PaginationFilter {
    take: number = 5;
    skip: number = 0;
    limit: number;
    page: number;
    total: number = 0;
    pages: Array<any>;
    sort: string;
    ascendant: boolean;
}