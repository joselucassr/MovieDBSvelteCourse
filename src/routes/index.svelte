<script lang="ts" context="module">
	import type { LoadInput } from '@sveltejs/kit';
	import type { Movie } from '$lib/types';
	import { variables } from '$lib/variables';

	const apiKey = variables.movieDBKey;

	export async function load({ fetch }: LoadInput) {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
		);

		const data = await res.json();

		if (res.ok) {
			return {
				props: { popular: data.results }
			};
		}

		return {
			status: res.status,
			error: new Error('Could not fetch the movies')
		};
	}
</script>

<script lang="ts">
	import PopularMovies from '$lib/components/PopularMovies.svelte';
	import SearchMovies from '$lib/components/SearchMovies.svelte';
	import { fly } from 'svelte/transition';

	export let popular: Movie[];
</script>

<section in:fly={{ y: 50, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
	<SearchMovies />
	<PopularMovies {popular} />
</section>
