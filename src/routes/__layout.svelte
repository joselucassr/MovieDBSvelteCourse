<script lang="ts">
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<title>Movie DB</title>
</svelte:head>

<Nav />
<slot />
