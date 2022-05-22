<script lang="ts" context="module">
	import type { LoadInput } from '@sveltejs/kit';
	import type { Movie } from '$lib/types';
	import { variables } from '$lib/variables';

	const apiKey = variables.movieDBKey;

	export async function load({ fetch, params }: LoadInput) {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}&language=en-US`
		);

		const movieDetail = await res.json();

		if (res.ok) {
			return {
				props: { movieDetail }
			};
		}

		return {
			status: res.status,
			error: new Error('Could not fetch the movies')
		};
	}
</script>

<script lang="ts">
	export let movieDetail: Movie;

	function numberWithCommas(x: number | undefined): string {
		if (!x) return '';

		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}
</script>

<div class="movie-details">
	<img src="https://image.tmdb.org/t/p/w500{movieDetail.poster_path}" alt={movieDetail.title} />

	<div class="txt-container">
		<h1>{movieDetail.title}</h1>
		<p class="overview">{movieDetail.overview}</p>
		<p>
			<span>Release Date</span>
			{movieDetail.release_date} <br />
			<span>Budget:</span> ${numberWithCommas(movieDetail.budget)} <br />
			<span>Rating:</span>
			{movieDetail.vote_average} <br />
			<span>Runtime:</span>
			{movieDetail.runtime} mins
		</p>
	</div>
</div>

<style>
	h1 {
		padding: 1rem 0rem 2rem;
	}

	p {
		padding: 1rem 0rem;
	}

	img {
		height: 70vh;
		border-radius: 1rem;
	}

	.movie-details {
		margin: 2rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.txt-container {
		width: 40vw;
	}

	span {
		font-weight: bold;
	}
</style>
