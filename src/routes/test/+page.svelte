<script>
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { onMount } from 'svelte';
	import { currentSession, latestReport, subTitle } from '$lib/stores';
	import { reportService } from '$lib/services/report-service';
	import { get } from 'svelte/store';

	let info;
	let error;
	let imageURL;
	let id = "6648b7ff29732cf8bd9b552f"

	//const reportService = new reportService();
	onMount(() => {
		// Load the image URL from the local storage when the component mounts
		imageURL = "";
	});
	async function onUpload(result, widget) {
		if (result.event === 'success') {
			info = result.info;
			imageURL = info.secure_url;
			// Call the uploadImage method from the report service
			const updatedReport = await reportService.uploadImage(id, imageURL, get(currentSession));
			if (updatedReport) {
				imageURL = updatedReport.imageURL;
			}
		} else if (result.event === 'error') {
			error = result.error;
		}
		widget.close();
	}
</script>
<CldUploadWidget uploadPreset="cyy29psm" let:open let:isLoading {onUpload}>
	<button on:click={open} disabled={isLoading}>Upload an Asset</button>
</CldUploadWidget>
{#if error}
	<p>Error: {error.status}</p>
{/if}
{#if imageURL}
	<p>
		<img width="200" height="200" src={imageURL} alt="Uploaded image" />
	</p>
	<p>URL: {imageURL}</p>
{/if}