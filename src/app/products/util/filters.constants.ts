import { Filter } from "../models/filter";

export const FILTERS = new Map<string, Filter>([
    ['priceFrom', { queryParam: 'priceFrom', requestQueryParam: 'price_gte' }],
    ['priceTo', { queryParam: 'priceTo', requestQueryParam: 'price_lte' }],
    ['ratingFrom', { queryParam: 'ratingFrom', requestQueryParam: 'rating.rate_gte' }],
    ['ratingTo', { queryParam: 'ratingTo', requestQueryParam: 'rating.rate_lte' }],
    ['inStock', { queryParam: 'inStock', requestQueryParam: 'stock_ne' }],
    ['hasReviews', { queryParam: 'hasReviews', requestQueryParam: 'rating.count_ne' }],
]);
