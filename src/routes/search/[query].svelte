<script lang="ts" context="module">
	import type { LoadInput } from '@sveltejs/kit';
	import type { Movie } from '$lib/types';
	import { variables } from '$lib/variables';

	const apiKey = variables.movieDBKey;

	export async function load({ fetch, params }: LoadInput) {
		const res = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${params.query}&page=1&include_adult=false`
		);

		const data = await res.json();

		if (res.ok) {
			return {
				props: { searchedMovies: data.results }
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

	import SearchMovies from '$lib/components/SearchMovies.svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';
	export let searchedMovies: Movie[];
</script>

<section in:fly={{ y: 50, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
	<SearchMovies />
	<div class="searched-movies">
		{#each searchedMovies as movie (movie.id)}
			<MovieCard {movie} />
		{/each}
	</div>
</section>

<style>
	.searched-movies {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		column-gap: 1rem;
		row-gap: 2rem;
		height: 20vh;
	}
</style>
