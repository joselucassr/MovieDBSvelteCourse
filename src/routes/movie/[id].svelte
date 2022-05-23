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
	import { fly } from 'svelte/transition';

	export let movieDetail: Movie;

	function numberWithCommas(x: number | undefined): string {
		if (!x) return '0';

		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}
</script>

<div
	class="movie-details"
	in:fly={{ y: 50, duration: 500, delay: 500 }}
	out:fly={{ duration: 500 }}
>
	<div class="img-container">
		<img
			src="https://image.tmdb.org/t/p/original{movieDetail.backdrop_path}"
			alt={movieDetail.title}
		/>
	</div>

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

	.img-container {
		width: 100%;
	}

	img {
		object-fit: cover;

		width: 100%;
		border-radius: 1rem;
	}

	.movie-details {
		margin: 2rem 20%;
	}

	span {
		font-weight: bold;
	}
</style>
