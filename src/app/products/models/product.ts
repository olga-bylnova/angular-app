import { Rating } from "./rating";
import { Review } from "./review";

export interface Product {
    _id: string;
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    stock?: number;
    rating?: Rating;
    reviews?: Review[];
}
