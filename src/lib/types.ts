export interface Movie {
	adult: boolean;
	backdrop_path: string;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	// Optional
	belongs_to_collection?: unknown;
	budget?: number;
	genres?: { id: number; name: string };
	genre_ids?: number[];
	homepage?: string | null;
	imdb_id?: string | null;
	production_companies?: {
		name: string;
		id: number;
		logo_path: string | null;
		origin_country: string;
	}[];
	production_countries?: { iso_3166_1: string; name: string }[];
	revenue?: number;
	runtime?: number | null;
	spoken_languages?: { iso_639_1: string; name: string }[];
	status?: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
	tagline?: string | null;
}
