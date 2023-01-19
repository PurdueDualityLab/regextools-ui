import { RegexEntity } from "./regex-entity.model";

export interface RegexDBQuery {
    positive: string[];
    negative: string[];
}

export interface RegexDBResponse {
    results: RegexEntity[];
}
