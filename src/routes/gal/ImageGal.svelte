<script lang="ts">
	import type { Report } from "$lib/types/report-types";

	export let reports: Report[];

	// Log the reports data
	console.log(reports);
</script>

<style>
    .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .gallery figure {
        margin: 20px;
        border: 1px solid #ccc;
        width: 300px; /* Adjust this value to change the width of the images */
        height: auto; /* This will maintain the aspect ratio */
    }
    .gallery img {
        width: 100%;
        height: auto;
    }
</style>
<div class="gallery">
	{#each reports as report}
		{#if report.imageURL}
			<a href={`/event/${report._id}`}>
				<figure class="image is-4by3">
					<img class="object-fit" src={report.imageURL} alt="crime express logo" />
				</figure>
			</a>
		{/if}
	{/each}
</div>

